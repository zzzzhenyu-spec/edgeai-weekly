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
    "Tianqi Chen 陈天奇": ("https://tqchen.github.io/sitemap.xml", "https://tqchen.github.io", r"^/blog/\d{4}/"),
    "Georgi Gerganov": ("https://ggerganov.com", "https://ggerganov.com", r"/blog"),
    "Andrej Karpathy": ("https://karpathy.github.io", "https://karpathy.github.io", r"^/\d{4}/"),
    "Tri Dao": ("https://tridao.me", "https://tridao.me", r"/(blog|notes|p)/"),
    "机器之心": ("https://www.jiqizhixin.com/articles", "https://www.jiqizhixin.com", r"^/articles/\d+"),
    "电子工程专辑 EETimes China": ("https://www.eet-china.com", "https://www.eet-china.com", r"/(mp|news)/a?\d"),
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
