# -*- coding: utf-8 -*-
# ============================================================
# fetch_foreign.py —— 外文信源通道（英文世界的端侧AI动态雷达）
# 用法: python scripts/fetch_foreign.py [-d 3]
# 通道:
#   1) Google News RSS 英文关键词(新闻主通道, Reuters/Verge/TC等一手报道)
#   2) 站点直连 RSS: TechCrunch AI / The Verge / 9to5Mac / Tom's Hardware
#   3) Hacker News (Algolia API): 首页热帖 + 关键词搜索 —— 现象级事件雷达
#   4) Hugging Face Daily Papers: 社区热度论文榜(与 arXiv 捞鱼互补)
#   5) 博主 Bluesky RSS: simonw / rasbt (karpathy、swyx 实测停更,不收录)
# 输出: data/foreign_pool.json —— 供人工/cron 编选时参考的候选池,
#       每条含 title/url/source/date/snip; 编选入库时由人(或模型)编译成中文
# 规则: 各通道独立容错, 单通道失败不影响整体; 按 URL 全局去重
# ============================================================
import sys, json, re, argparse, time
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0.0.0'}

GNEWS_QUERIES = [
    '"on-device AI"', '"edge AI" NPU', '"local LLM"', '"AI PC" Copilot',
    '"AI glasses"', 'smartphone NPU AI',
]
SITE_FEEDS = {
    "TechCrunch AI": "https://techcrunch.com/tag/artificial-intelligence/feed/",
    "The Verge": "https://www.theverge.com/rss/index.xml",
    "9to5Mac": "https://9to5mac.com/feed/",
    "Tom's Hardware": "https://www.tomshardware.com/feeds/all",
}
HN_QUERIES = ["on-device", "local llm", "llama.cpp", "edge ai", "AI PC"]
BLUESKY = {
    "simonw": "https://bsky.app/profile/simonw.bsky.social/rss",
    "rasbt": "https://bsky.app/profile/rasbt.bsky.social/rss",
}
# 站点 RSS 用相关性过滤（Google News 已按查询命中, HN 已按关键词搜索）
AI_KEYS_RE = re.compile(
    r"\b(ai|a\.i\.|llm|llms|gpt|claude|gemini|qwen|deepseek|openai|anthropic|mistral|llama|"
    r"transformer|agent|agents|agentic|inference|gpu|npu|tpu|robot|rag|diffusion|multimodal|"
    r"copilot|vlm|slm|moe|vllm|on-device|on device|edge ai|quantiz|machine learning|"
    r"neural|model|models|chatbot|local llm|smartphone|pc)\b", re.I)
EDGE_HINTS_RE = re.compile(
    r"\b(on-device|on device|edge|npu|local llm|local model|llama\.cpp|gguf|quantiz|"
    r"ai pc|copilot\+|ai glasses|wearab|smartphone|laptop|browser|phone|robot)\b", re.I)


def fetch_xml(url, timeout=25):
    raw = http_get(url, timeout=timeout, headers=UA)
    return ET.fromstring(raw)


def in_window(dt_str, cutoff):
    """尽量宽松地解析各种日期格式, 解析失败视为在窗内(宁多勿漏, 人工再筛)"""
    if not dt_str:
        return True
    try:
        if re.match(r"^\d{4}-\d{2}-\d{2}T", dt_str):
            dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        else:
            dt = parsedate_to_datetime(dt_str)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt >= cutoff
    except Exception:
        return True


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def chan_gnews(cutoff):
    out = []
    for q in GNEWS_QUERIES:
        url = "https://news.google.com/rss/search?q=" + __import__("urllib.parse", fromlist=["x"]).quote(q) + "&hl=en&gl=US&ceid=US:en"
        try:
            root = fetch_xml(url)
        except Exception as e:
            print(f"  [gnews] '{q}' 失败: {str(e)[:50]}"); time.sleep(2); continue
        for it in root.iter("item"):
            title = (it.findtext("title") or "").strip()
            link = (it.findtext("link") or "").strip()
            pub = it.findtext("pubDate") or ""
            src = it.find("source")
            src_name = (src.text or "").strip() if src is not None else "Google News"
            if title and link and in_window(pub, cutoff):
                out.append({"title": title, "url": link, "source": f"Google News · {src_name}",
                            "date": pub[:16], "snip": ""})
        time.sleep(2)
    return out


def chan_sites(cutoff):
    out = []
    for name, url in SITE_FEEDS.items():
        try:
            root = fetch_xml(url)
        except Exception as e:
            print(f"  [sites] {name} 失败: {str(e)[:50]}"); continue
        # RSS 2.0 与 Atom 都统一取 entry/item
        items = list(root.iter("item")) or list(root.iter("{http://www.w3.org/2005/Atom}entry"))
        for it in items:
            title = (it.findtext("title") or "").strip()
            link = it.findtext("link") or ""
            if not link:
                a = it.find("{http://www.w3.org/2005/Atom}link")
                link = (a.get("href") if a is not None else "") or ""
            pub = it.findtext("pubDate") or it.findtext("{http://www.w3.org/2005/Atom}updated") or ""
            desc = strip_html(it.findtext("description") or it.findtext("{http://www.w3.org/2005/Atom}summary") or "")[:220]
            blob = title + " " + desc
            if title and link and in_window(pub, cutoff) and AI_KEYS_RE.search(blob):
                out.append({"title": title, "url": link, "source": name,
                            "date": pub[:16], "snip": desc})
        time.sleep(2)
    return out


def chan_hn(cutoff):
    out, seen = [], set()
    def add(h):
        oid = h.get("objectID") or h.get("url") or h.get("title")
        if oid in seen:
            return
        seen.add(oid)
        link = h.get("url") or f"https://news.ycombinator.com/item?id={h.get('objectID','')}"
        out.append({"title": h.get("title") or "", "url": link, "source": "Hacker News",
                    "date": (h.get("created_at") or "")[:10],
                    "snip": f"▲{h.get('points',0)} 分 · {h.get('num_comments',0)} 评论 · {h.get('author','')}"})
    for ep in ["https://hn.algolia.com/api/v1/search?tags=front_page"] + \
              ["https://hn.algolia.com/api/v1/search_by_date?query=" + q.replace(" ", "+") + "&tags=story" for q in HN_QUERIES]:
        try:
            data = json.loads(http_get(ep, timeout=20, headers=UA))
            for h in data.get("hits", []):
                if in_window(h.get("created_at") or "", cutoff):
                    add(h)
        except Exception as e:
            print(f"  [hn] {ep[:60]} 失败: {str(e)[:40]}")
        time.sleep(1.5)
    # 首页热帖再按 AI/端侧关键词收窄, 搜索结果本身已命中
    return [x for x in out if AI_KEYS_RE.search(x["title"]) or "▲" in x["snip"] and x["source"] == "Hacker News"]


def chan_hf(cutoff):
    out = []
    try:
        data = json.loads(http_get("https://huggingface.co/api/daily_papers?limit=30", timeout=25, headers=UA))
    except Exception as e:
        print(f"  [hf] 失败: {str(e)[:50]}"); return out
    for row in data:
        p = row.get("paper", {})
        pid = p.get("id", "")
        if not pid:
            continue
        # row 级 publishedAt = 上 Daily Papers 榜的日期; paper 级是 arXiv 原始日期(可能很久前)
        pub = ((row.get("publishedAt") or p.get("publishedAt") or ""))[:10]
        if not in_window(pub + "T00:00:00Z", cutoff):
            continue
        authors = ", ".join(a.get("name", "") for a in (p.get("authors") or [])[:3])
        out.append({"title": p.get("title") or "", "url": f"https://huggingface.co/papers/{pid}",
                    "source": "HF Daily Papers", "date": pub,
                    "snip": f"▲{p.get('upvotes', '?')} 赞 · {authors}"})
    return out


def chan_social(cutoff):
    out = []
    for who, url in BLUESKY.items():
        try:
            root = fetch_xml(url, timeout=15)
        except Exception as e:
            print(f"  [bsky] {who} 失败: {str(e)[:40]}"); continue
        for it in root.iter("item"):
            title = (it.findtext("title") or "").strip()
            link = (it.findtext("link") or "").strip()
            pub = it.findtext("pubDate") or ""
            desc = strip_html(it.findtext("description") or "")[:200]
            if link and in_window(pub, cutoff):
                out.append({"title": title or desc[:60], "url": link, "source": f"Bluesky · @{who}",
                            "date": pub[:16], "snip": desc})
        time.sleep(1)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("-d", type=int, default=3, help="时间窗(天), 默认3(每日扫描用); 周更大版本用 -d 7")
    args = ap.parse_args()
    cutoff = datetime.now(timezone.utc) - timedelta(days=args.d)

    pool = {"generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"), "days": args.d}
    print(f"外文通道扫描 (近 {args.d} 天)...")
    for key, fn, cap in [("gnews", chan_gnews, 40), ("sites", chan_sites, 30),
                          ("hackernews", chan_hn, 30), ("hf_papers", chan_hf, 20),
                          ("social", chan_social, 30)]:
        try:
            items = fn(cutoff)
        except Exception as e:
            print(f"  [{key}] 通道异常(跳过): {str(e)[:60]}")
            items = []
        # URL 去重(保序)
        seen, uniq = set(), []
        for x in items:
            if x["url"] not in seen:
                seen.add(x["url"]); uniq.append(x)
        pool[key] = uniq[:cap]
        print(f"  {key:12s} {len(pool[key]):3d} 条")

    total = sum(len(pool[k]) for k in ["gnews", "sites", "hackernews", "hf_papers", "social"])
    out = ROOT / "data" / "foreign_pool.json"
    out.write_text(json.dumps(pool, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"共 {total} 条 -> {out}")


if __name__ == "__main__":
    main()
