# -*- coding: utf-8 -*-
# ============================================================
# fetch_blogs.py —— 抓取博客库的 logo 与近期文章，生成 js/blogs.js
# 用法: python scripts/fetch_blogs.py [-n 30]
# 博客清单读取 js/data.js 的 knowledge.resources（按 name 匹配）
# 输出: js/blogs.js —— const BLOG_FEEDS = {名称: {logo, posts:[{t,u,d,s,e}]}}
#   t=标题 u=链接 d=日期 s=摘要 e=端侧相关(前端高亮)
# 规则: RSS 源取最近 30 条；HTML 解析源取 25 条；
#       端侧相关且无摘要的文章自动抓 og:description 作为介绍
# ============================================================
import sys, json, re, time, html as H
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent

# 各博客的文章列表来源：RSS 优先，无 RSS 的用 HTML 解析
FEEDS = {
    "量子位": "https://www.qbitai.com/feed",
    "Hugging Face Blog": "https://huggingface.co/blog/feed.xml",
    "Simon Willison": "https://simonwillison.net/atom/everything/",
    "Google DeepMind / Developers Blog": "https://blog.google/rss/",
    "IT之家": "https://www.ithome.com/rss/",
    "Chip Huyen": "https://huyenchip.com/feed.xml",
}
# HTML 解析: 名称 -> (列表页URL, 站点根, 链接正则)；列表页可以是 HTML 或 sitemap.xml
HTML_SITES = {
    "Apple Machine Learning Research": ("https://machinelearning.apple.com/", "https://machinelearning.apple.com", r"^/research/[a-z0-9-]+$"),
    "Andrej Karpathy": ("https://karpathy.github.io", "https://karpathy.github.io", r"^/\d{4}/"),
    "Tri Dao": ("https://tridao.me", "https://tridao.me", r"/(blog|notes|p)/"),
    "电子工程专辑 EETimes China": ("https://www.eet-china.com", "https://www.eet-china.com", r"/(mp|news)/a?\d"),
}
# Bing News RSS 站内搜索（无 RSS 且 JS 渲染的站点）: 名称 -> 查询词
SEARCH_SITES = {
    "36氪": "site:36kr.com AI",
    "面壁智能数据洞察": "面壁智能 MiniCPM",
    "Qualcomm AI Hub & Blog": "Qualcomm Snapdragon AI",
}
# GitHub 数据源: 近期活跃仓库（动态列表）
GITHUB_REPOS = {
    "Georgi Gerganov": "ggerganov",
    "Tianqi Chen 陈天奇": "tqchen",
}
# 手工指定高质量 logo（RSS image 抓不到或太丑的）
LOGO_OVERRIDES = {
    "Google DeepMind / Developers Blog": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "IT之家": "https://img.ithome.com/images/logo.png",
    "36氪": "https://img.36krcdn.com/20200828/719c4c8d5eb2de09d4e2b6cc3d1e2d0f.png",
}

EDGE_KEYS = ["端侧", "on-device", "on device", "edge ai", "edge-side", "npu", "天玑", "骁龙",
             "snapdragon", "dimensity", "ai手机", "ai 眼镜", "ai眼镜", "小模型", "slm",
             "quantiz", "量化", "llama.cpp", "gguf", "local llm", "本地大模型", "本地部署",
             "inference", "推理", "mobile", "手机", "mobilecpm", "agentic", "智能体", "端云"]

MAX_RSS = 30
MAX_HTML = 25
MAX_DESC_FETCH = 60
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0"}


def n_arg():
    if "-n" in sys.argv:
        try:
            return int(sys.argv[sys.argv.index("-n") + 1])
        except Exception:
            pass
    return MAX_RSS


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def absolutize(u, base):
    if u.startswith("//"):
        return "https:" + u
    if u.startswith("http"):
        return u
    return base.rstrip("/") + "/" + u.lstrip("/")


def is_edge(text):
    t = text.lower()
    return any(k in t for k in EDGE_KEYS)


MONTHS = {m: str(i + 1).zfill(2) for i, m in enumerate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])}


def norm_date(d):
    """统一日期为 YYYY-MM-DD / YYYY-MM；RSS 英文格式转数字"""
    d = (d or "").strip()
    m = re.match(r"\w{3},\s*(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})", d)
    if m and m.group(2)[:3] in MONTHS:
        return f"{m.group(3)}-{MONTHS[m.group(2)[:3]]}-{int(m.group(1)):02d}"
    m = re.match(r"(\d{4})-(\d{2})(?:-\d{2})?", d)
    if m:
        return m.group(0)[:10]
    m = re.match(r"(\d{4})\.(\d{1,2})", d)
    if m:
        return f"{m.group(1)}-{int(m.group(2)):02d}"
    return d[:10]


def parse_feed(url):
    """RSS/Atom -> (logo, [post])"""
    try:
        xml = http_get(url, timeout=40).decode("utf-8", "ignore")
        root = ET.fromstring(xml)
    except Exception:
        return "", []
    logo = ""
    for img in root.iter("image"):
        u = img.findtext("url")
        if u:
            logo = absolutize(u, url)
            break
    ns = "{http://www.w3.org/2005/Atom}"
    if not logo:
        ic = root.find(ns + "icon")
        if ic is not None and ic.text:
            logo = absolutize(ic.text.strip(), url)
    posts = []
    for it in list(root.iter("item")) + list(root.iter(ns + "entry")):
        link = (it.findtext("link") or "").strip()
        if not link.startswith("http"):
            for l in it.findall(ns + "link"):
                if l.get("rel") in (None, "alternate") and (l.get("href") or "").startswith("http"):
                    link = l.get("href")
                    break
        if not link.startswith("http"):
            continue
        posts.append({
            "t": H.unescape(it.findtext("title") or "").strip(),
            "u": link,
            "d": (it.findtext("pubDate") or it.findtext(ns + "published") or "")[:16].strip(),
            "s": strip_tags(H.unescape(it.findtext("description") or it.findtext(ns + "summary") or ""))[:80],
        })
        if len(posts) >= MAX_RSS:
            break
    return logo, posts


def parse_html(list_url, base, pattern):
    """HTML 列表页解析 -> (logo, [post])"""
    try:
        page = http_get(list_url, timeout=40).decode("utf-8", "ignore")
    except Exception:
        return "", []
    logo = ""
    m = re.search(r'<link[^>]+rel=["\'](?:apple-touch-icon|icon)["\'][^>]+href=["\']([^"\']+)', page)
    if m:
        logo = absolutize(m.group(1), base)
    if not logo:
        logo = base.rstrip("/") + "/favicon.ico"
    seen, posts = set(), []
    # sitemap.xml 支持: <loc> 提取
    if list_url.endswith(".xml") or page.lstrip().startswith("<?xml"):
        for m in re.finditer(r"<loc>([^<]+)</loc>", page):
            full = m.group(1).strip()
            if not full.startswith(base):
                continue
            path = full[len(base):]
            if not re.search(pattern, path) or full in seen:
                continue
            seen.add(full)
            ym = re.search(r"/(\d{4})(?:/(\d{2}))?", path)
            d = ym.group(1) + (("." + ym.group(2)) if ym.group(2) else "") if ym else ""
            posts.append({"t": path.strip("/").split("/")[-1].replace("-", " ")[:90],
                          "u": full, "d": d, "s": ""})
            if len(posts) >= MAX_HTML:
                break
        return logo, posts
    for m in re.finditer(r'<a[^>]+href="([^"#]+)"[^>]*>(.*?)</a>', page, re.S):
        href, inner = m.group(1), m.group(2)
        if href.startswith("http"):
            if not href.startswith(base):
                continue
            path = href[len(base):]
        else:
            path = href
        if not re.search(pattern, path):
            continue
        full = absolutize(href if href.startswith("http") else path, base)
        if full in seen:
            continue
        title = strip_tags(inner)
        if len(title) < 12:
            continue
        seen.add(full)
        ym = re.search(r"/(\d{4})(?:/(\d{2}))?", path)
        d = ym.group(1) + (("." + ym.group(2)) if ym.group(2) else "") if ym else ""
        posts.append({"t": H.unescape(title)[:90], "u": full, "d": d, "s": ""})
        if len(posts) >= MAX_HTML:
            break
    return logo, posts


def fetch_desc(post):
    """抓文章页 og:description 作为摘要"""
    try:
        page = http_get(post["u"], timeout=30).decode("utf-8", "ignore")
        m = re.search(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']+)', page) \
            or re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', page)
        if m:
            post["s"] = strip_tags(H.unescape(m.group(1)))[:110]
    except Exception:
        pass


def github_posts(user, repo, posts_dir):
    """读博客仓库 _posts 目录 -> 文章列表（文件名含日期）"""
    url = f"https://api.github.com/repos/{user}/{repo}/contents/{posts_dir}"
    try:
        data = json.loads(http_get(url, timeout=30))
    except Exception:
        return []
    posts = []
    for f in data:
        name = f.get("name", "")
        m = re.match(r"(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|markdown|html)$", name)
        if not m:
            continue
        slug = m.group(4)
        # tqchen 博客 URL 形如 /blog/YYYY/MM/DD/slug
        link = f"https://{repo}/blog/{m.group(1)}/{m.group(2)}/{m.group(3)}/{slug}"
        posts.append({"t": slug.replace("-", " ")[:90], "u": link,
                      "d": f"{m.group(1)}-{m.group(2)}-{m.group(3)}", "s": ""})
    return posts


def github_repos(user):
    """近期活跃仓库 -> 动态列表"""
    url = f"https://api.github.com/users/{user}/repos?sort=pushed&per_page=10"
    try:
        data = json.loads(http_get(url, timeout=30))
    except Exception:
        return []
    posts = []
    for r in data:
        d = (r.get("pushed_at") or "")[:10]
        desc = (r.get("description") or "")[:80]
        posts.append({"t": r.get("name", "") + "（仓库更新）", "u": r.get("html_url", ""),
                      "d": d, "s": desc})
    return posts


def bing_news_posts(query):
    """Bing News RSS 站内搜索 -> 文章列表"""
    url = "https://www.bing.com/news/search?q=" + urllib.parse.quote(query) + "&format=RSS"
    try:
        xml = http_get(url, timeout=30).decode("utf-8", "ignore")
        root = ET.fromstring(xml)
    except Exception:
        return []
    posts = []
    for it in root.iter("item"):
        link = (it.findtext("link") or "")
        m = re.search(r"[?&]url=([^&]+)", link)
        if m:
            link = urllib.parse.unquote(m.group(1))
        if not link.startswith("http"):
            continue
        posts.append({"t": H.unescape(it.findtext("title") or "").strip(),
                      "u": link,
                      "d": norm_date(it.findtext("pubDate") or ""),
                      "s": strip_tags(H.unescape(it.findtext("description") or ""))[:80]})
        if len(posts) >= MAX_RSS:
            break
    return posts


def sort_key(p):
    dated = bool(re.match(r"\d{4}", p["d"]))
    return (0 if dated else 1, p["d"] or "0",)


def main():
    global MAX_RSS
    MAX_RSS = n_arg()
    text = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    names = re.findall(r'name:\s*"([^"]+)",\s*type:', text)
    out, fetched = {}, 0
    for name in names:
        posts, logo = [], ""
        if name in FEEDS:
            logo, posts = parse_feed(FEEDS[name])
        elif name in HTML_SITES:
            logo, posts = parse_html(*HTML_SITES[name])
        elif name in GITHUB_REPOS:
            posts = github_repos(GITHUB_REPOS[name])
        elif name in SEARCH_SITES:
            posts = bing_news_posts(SEARCH_SITES[name])
        logo = LOGO_OVERRIDES.get(name, "") or logo
        for p in posts:
            p["d"] = norm_date(p["d"])
            p["e"] = is_edge(p["t"] + " " + p.get("s", ""))
        posts.sort(key=sort_key, reverse=True)
        # 端侧相关但无摘要的 -> 抓 og:description（全局限量）
        for p in posts:
            if p["e"] and not p["s"] and fetched < MAX_DESC_FETCH:
                fetch_desc(p)
                fetched += 1
                time.sleep(0.8)
        out[name] = {"logo": logo, "posts": posts}
        print(f"{name}: logo={'Y' if logo else 'N'} posts={len(posts)} edge={sum(1 for p in posts if p['e'])}")
    js = ("/* 自动生成: scripts/fetch_blogs.py (勿手改) */\nconst BLOG_FEEDS = "
          + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
    (ROOT / "js" / "blogs.js").write_text(js, encoding="utf-8", newline="\n")
    total = sum(len(v["posts"]) for v in out.values())
    print(f"\njs/blogs.js 已生成: {len(out)} 博客 / {total} 篇文章 / 补摘要 {fetched} 篇")


if __name__ == "__main__":
    main()
