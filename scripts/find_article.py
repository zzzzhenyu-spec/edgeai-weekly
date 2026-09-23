# -*- coding: utf-8 -*-
# ============================================================
# find_article.py —— 用 Bing 新闻 RSS 定位真实文章 URL
# 用法: python scripts/find_article.py "查询1" "查询2" ...
# 输出: 控制台 + data/articles.json
# 说明: 优先选简体中文或英文来源；繁体站点(台湾/香港媒体)建议不用
# ============================================================
import sys, json, re, time, urllib.parse, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Safari/537.36"}


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout).read()


def bing_news(query):
    url = "https://www.bing.com/news/search?q=" + urllib.parse.quote(query) + "&format=RSS"
    try:
        root = ET.fromstring(fetch(url))
    except Exception as e:
        print(f"  [请求失败] {e}")
        return []
    items = []
    for it in root.iter("item"):
        title = re.sub(r"\s+", " ", (it.findtext("title") or "").strip())
        link = it.findtext("link") or ""
        m = re.search(r"[?&]url=([^&]+)", link)
        if m:
            link = urllib.parse.unquote(m.group(1))
        if link.startswith("http"):
            items.append({"title": title, "url": link})
    return items


def main():
    queries = sys.argv[1:] or ["端侧AI 本周新闻"]
    out = []
    for q in queries:
        print(f"=== {q}")
        for it in bing_news(q)[:6]:
            print("  " + it["title"][:64])
            print("    " + it["url"])
            out.append({"query": q, **it})
        time.sleep(1.2)
    d = ROOT / "data"
    d.mkdir(exist_ok=True)
    (d / "articles.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n已写入 data/articles.json（{len(out)} 条）")


if __name__ == "__main__":
    main()
