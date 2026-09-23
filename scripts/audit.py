# -*- coding: utf-8 -*-
# ============================================================
# audit.py —— 每周发布前的质检：核验 data.js 全部资讯/论文条目
# 用法: python scripts/audit.py
# 检查项:
#   1. 资讯 url 可访问(HTTP 200)，og:title 与我方标题关键词吻合
#   2. 资讯日期 vs 信源 URL/页面里的发布日期一致性
#   3. 论文 arXiv ID 真实存在，标题对得上，日期在近半年内
# 输出: 每条一行 PASS/WARN/FAIL + 原因，最后汇总
# ============================================================
import re
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml"}
NS = {"a": "http://www.w3.org/2005/Atom"}


def load_entries():
    t = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    news, papers = [], []
    for m in re.finditer(r'id: "(n\d+)"[\s\S]*?date: "([\d-]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?url: "([^"]+)"', t):
        news.append({"id": m.group(1), "date": m.group(2), "title": m.group(3), "url": m.group(4)})
    for m in re.finditer(r'id: "(p\d+)"[\s\S]*?title: "([^"]+)"[\s\S]*?url: "(https://arxiv\.org/abs/([\d.]+))"', t):
        papers.append({"id": m.group(1), "title": m.group(2), "url": m.group(3), "ax": m.group(4)})
    return news, papers


def keywords(title):
    """从我方标题抽核验关键词(去停用词, 取前几个实词)"""
    stop = set("的了和与在将推出发布正式亮相上市携手联手的为为上新品款亿元级年月日")
    words = re.findall(r"[\u4e00-\u9fa5]{2,}|[A-Za-z][\w.+-]{2,}|\d+", title)
    return [w for w in words if not set(w) <= stop][:6]


def audit_news(items):
    rows = []
    for it in items:
        uid, url, date, title = it["id"], it["url"], it["date"], it["title"]
        try:
            b = http_get(url, timeout=28, headers=UA)
            t = b.decode("utf-8", "ignore")
        except Exception as e:
            rows.append((uid, "FAIL", f"无法访问: {str(e)[:60]}"))
            continue
        og = re.search(r'property="og:title" content="([^"]+)"', t)
        ogt = og.group(1) if og else ""
        # 发布日期线索: meta / URL 编码
        dhints = []
        for pat in (r'property="article:published_time" content="([\d-]+)',
                    r'name="publishdate" content="([\d-]+)',
                    r'"pubDate"\s*:\s*"([\d-]+)',
                    r'publish["\']?\s*[:=]\s*["\']([\d-]+)',
                    r'"datePublished"\s*:\s*"([\d-]+)'):
            m2 = re.search(pat, t)
            if m2:
                dhints.append(m2.group(1)[:10])
                break
        mu = re.search(r"/(20\d{6})A?[\w]?/", url) or re.search(r"20\d{2}-\d{2}-\d{2}", url)
        if mu:
            s = mu.group(0)
            d8 = re.search(r"(20\d{2})(\d{2})(\d{2})", s)
            if d8:
                dhints.append("-".join(d8.groups()))
        kws = keywords(title)
        hit = sum(1 for k in kws if k in ogt or k in t[:60000])
        if not ogt and hit < 2:
            rows.append((uid, "WARN", f"页面无 og:title 且关键词命中 {hit}/{len(kws)} (页面 {len(t)//1024}KB)"))
        elif hit >= 2:
            dmsg = f"信源日期线索 {dhints} vs 我方 {date}" if dhints else "无日期线索"
            flag = "PASS"
            why = dmsg
            # URL 内编码日期与标注日期差 >1 天 -> WARN
            for dh in dhints:
                if re.match(r"\d{4}-\d{2}-\d{2}", dh):
                    dd = abs(( __import__("datetime").date.fromisoformat(dh) - __import__("datetime").date.fromisoformat(date)).days)
                    if dd > 1:
                        flag, why = "WARN", f"日期疑似不符: {dmsg}"
                    break
            rows.append((uid, flag, why))
        else:
            rows.append((uid, "WARN", f"关键词命中不足 {hit}/{len(kws)}; og:title={ogt[:40]}"))
        time.sleep(0.35)
    return rows


def audit_papers(items):
    rows, ids = [], ",".join(p["ax"] for p in items)
    try:
        xml = http_get("https://export.arxiv.org/api/query?id_list=" + ids + "&max_results=30",
                       timeout=40, headers={"User-Agent": "Mozilla/5.0"}).decode("utf-8", "ignore")
        root = ET.fromstring(xml)
    except Exception as e:
        return [(p["id"], "FAIL", "arXiv API 失败: " + str(e)[:60]) for p in items]
    got = {}
    for e in root.findall("a:entry", NS):
        ax = (e.findtext("a:id", "", NS).rsplit("/", 1)[-1]).split("v")[0]
        got[ax] = (e.findtext("a:title", "", NS).replace("\n", " ").strip(),
                   e.findtext("a:published", "", NS)[:10])
    import datetime
    today = datetime.date(2026, 9, 23)
    for p in items:
        g = got.get(p["ax"])
        if not g:
            rows.append((p["id"], "FAIL", f"arXiv 上不存在: {p['ax']}"))
            continue
        at, ad = g
        kw = keywords(p["title"])
        hit = sum(1 for k in kw if k.lower() in at.lower())
        age = (today - datetime.date.fromisoformat(ad)).days
        ok_date = 0 <= age <= 183
        if hit >= 2 and ok_date:
            rows.append((p["id"], "PASS", f"匹配({hit}/{len(kw)}) {ad} ({age}天前)"))
        else:
            rows.append((p["id"], "WARN", f"标题命中{hit}/{len(kw)}; arXiv标题={at[:60]}; 日期={ad}({age}天前)"))
    return rows


def main():
    news, papers = load_entries()
    print(f"=== 资讯 {len(news)} 条 ===")
    for uid, flag, why in audit_news(news):
        print(f"[{flag:4}] {uid}: {why}")
    print(f"\n=== 论文 {len(papers)} 篇 ===")
    for uid, flag, why in audit_papers(papers):
        print(f"[{flag:4}] {uid}: {why}")


if __name__ == "__main__":
    main()
