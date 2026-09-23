# -*- coding: utf-8 -*-
# ============================================================
# fetch_papers.py —— 从 arXiv 抓取"端侧AI"相关最新论文候选
# 用法: python scripts/fetch_papers.py [-d 21]
# 输出: data/papers_candidates.json + 控制台摘要
# 人工筛选(期刊二区以上 / CCF-B 以上会议)后整理进 js/data.js
# ============================================================
import sys, json, re, time, urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
NS = "{http://www.w3.org/2005/Atom}"

QUERIES = [
    'all:"on-device LLM"', 'all:"on-device AI"', 'all:"on-device agent"',
    'all:"on-device inference"', 'all:"edge LLM"', 'all:"small language model"',
    'all:"LLM smartphone"',
]
KEYWORDS = [
    "on-device", "on device", "edge device", "edge ai", "edge llm", "smartphone",
    "mobile device", "mobile llm", "wearable", "iot", "embedded device", "npu",
    "resource-constrained", "resource constrained", "端侧", "edge-side",
    "mobile agent", "edge computing",
]


def days_arg():
    if "-d" in sys.argv:
        try:
            return int(sys.argv[sys.argv.index("-d") + 1])
        except Exception:
            pass
    return 21


def main():
    days = days_arg()
    since = datetime.now(timezone.utc) - timedelta(days=days)
    seen, results = set(), []

    for q in QUERIES:
        print(f"查询: {q}")
        url = ("https://export.arxiv.org/api/query?search_query="
               + urllib.parse.quote(q) + "&sortBy=submittedDate&sortOrder=descending&max_results=25")
        try:
            root = ET.fromstring(http_get(url))
        except Exception as e:
            print(f"  [请求失败] {e}")
            time.sleep(3)
            continue
        for e in root.iter(NS + "entry"):
            aid = e.findtext(NS + "id") or ""
            if not aid or aid in seen:
                continue
            pub = datetime.fromisoformat((e.findtext(NS + "published") or "").replace("Z", "+00:00"))
            if pub < since:
                continue
            title = re.sub(r"\s+", " ", e.findtext(NS + "title") or "").strip()
            summary = re.sub(r"\s+", " ", e.findtext(NS + "summary") or "").strip()
            text = (title + " " + summary).lower()
            matched = [k for k in KEYWORDS if k in text]
            if not matched:
                continue
            seen.add(aid)
            authors = [a.findtext(NS + "name") for a in e.findall(NS + "author")]
            results.append({
                "id": aid, "title": title, "authors": authors[:12],
                "published": pub.strftime("%Y-%m-%d"),
                "cats": ",".join(c.get("term", "") for c in e.findall(NS + "category")),
                "matched": ",".join(matched), "summary": summary, "url": aid,
            })
        time.sleep(3)

    results.sort(key=lambda x: x["published"], reverse=True)
    d = ROOT / "data"
    d.mkdir(exist_ok=True)
    (d / "papers_candidates.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n共 {len(results)} 篇候选（近 {days} 天），已写入 data/papers_candidates.json")
    for r in results:
        print(f"[{r['published']}] {r['title']}")


if __name__ == "__main__":
    main()
