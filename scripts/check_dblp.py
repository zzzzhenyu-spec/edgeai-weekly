# -*- coding: utf-8 -*-
# ============================================================
# check_dblp.py —— 用 DBLP API 核对候选论文的正式发表 venue
# 用法: python scripts/check_dblp.py
# 输入: data/papers_candidates.json；输出: data/papers_dblp.json
# 说明: DBLP 也收录 arXiv(CoRR)，type 为 Informal 即纯预印本；
#       命中期刊/会议条目则说明已有正式 venue，按 二区/CCF-B+ 筛选
# ============================================================
import json, re, time, sys, urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent


def norm(t):
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", (t or "").lower())).strip()


def main():
    inFile = ROOT / "data" / "papers_candidates.json"
    if not inFile.exists():
        print(f"未找到 {inFile}，请先运行 fetch_papers.py")
        return
    items = json.loads(inFile.read_text(encoding="utf-8"))
    out = []
    for p in items:
        key = norm(p["title"])
        words = " ".join(key.split(" ")[:10])
        url = "https://dblp.org/search/publ/api?q=" + urllib.parse.quote(words) + "&format=json&h=10"
        venue = year = typ = ""
        try:
            data = json.loads(http_get(url))
            for h in (data.get("result", {}).get("hits", {}).get("hit") or []):
                info = h.get("info", {})
                dt = norm(info.get("title", ""))
                if dt == key or dt in key or key in dt:
                    venue, year, typ = info.get("venue", ""), info.get("year", ""), info.get("type", "")
                    break
        except Exception as e:
            print(f"  [DBLP 失败] {p['title'][:40]} :: {str(e)[:50]}")
        status = f"DBLP: {venue} {year} [{typ}]" if venue else "未收录"
        print(f"[{status}] {p['title']}")
        out.append({
            "title": p["title"], "published": p.get("published"), "authors": p.get("authors"),
            "summary": p.get("summary"), "url": p.get("url"),
            "dblp_venue": venue, "dblp_year": year, "dblp_type": typ,
        })
        time.sleep(1.5)
    (ROOT / "data" / "papers_dblp.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n核对完成，已写入 data/papers_dblp.json")


if __name__ == "__main__":
    main()
