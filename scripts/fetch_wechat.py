# -*- coding: utf-8 -*-
# ============================================================
# fetch_wechat.py —— 微信公众号文章候选（经搜狗微信搜索通道）
# 用法: python scripts/fetch_wechat.py [-d 7]
# 原理: weixin.sogou.com 文章搜索按关键词检索公众号文章，
#       解析标题/公众号名/时间戳/摘要，过滤近 N 天，输出候选。
# 输出: data/wechat_candidates.json（发现层候选，按 CRITERIA.md §6：
#       成条必须回落到 S1-S4 可核验文章页，公众号源仅作线索）
# 注意: 搜狗对高频访问有风控（antispider 验证码页）。脚本每词
#       间隔 8 秒、逐词抓取；命中验证码即停止并提示稍后重试。
# ============================================================
import datetime
import html
import json
import re
import sys
import time
import urllib.parse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
}

# 与 CRITERIA.md §2 覆盖矩阵保持同步（控制数量防风控，每次查询间隔 8s）
QUERIES = [
    "端侧AI", "端侧大模型", "AI眼镜", "AI手机", "NPU",
    "昇腾", "麒麟芯片", "玄戒", "骁龙", "天玑",
    "MiniCPM", "千问 眼镜", "端侧智能体",
]


def days_arg():
    if "-d" in sys.argv:
        try:
            return int(sys.argv[sys.argv.index("-d") + 1])
        except Exception:
            pass
    return 7


def clean(s):
    s = re.sub(r"<!--.*?-->", "", s)
    s = re.sub(r"<[^>]+>", "", s)
    return html.unescape(re.sub(r"\s+", " ", s)).strip()


def parse_cards(page):
    """解析搜狗文章卡片: [{title, account, ts, summary, link}]"""
    out = []
    blocks = re.split(r'<li id="sogou_vr_11002601_box_\d+"', page)[1:]
    for b in blocks:
        mt = re.search(r'<h3>\s*<a[^>]*href="([^"]+)"[^>]*uigs="article_title_\d+"[^>]*>(.*?)</a>', b, re.S)
        if not mt:
            continue
        link = "https://weixin.sogou.com" + html.unescape(mt.group(1))
        title = clean(mt.group(2))
        acc = re.search(r'<span class="all-time-y2">([^<]+)</span>', b)
        ts = re.search(r"timeConvert\('(\d{10})'\)", b)
        summ = re.search(r'<p class="txt-info"[^>]*>(.*?)</p>', b, re.S)
        out.append({
            "title": title,
            "account": clean(acc.group(1)) if acc else "",
            "ts": int(ts.group(1)) if ts else 0,
            "summary": clean(summ.group(1))[:200] if summ else "",
            "link": link,
        })
    return out


def main():
    days = days_arg()
    since = datetime.datetime.now() - datetime.timedelta(days=days)
    results, seen = [], set()
    for q in QUERIES:
        url = "https://weixin.sogou.com/weixin?type=2&query=" + urllib.parse.quote(q)
        print(f"检索: {q}")
        try:
            page = http_get(url, timeout=25, headers=UA).decode("utf-8", "ignore")
        except Exception as e:
            print(f"  [失败] {str(e)[:70]}")
            time.sleep(8)
            continue
        if "antispider" in page:
            print("  [风控] 搜狗要求验证码，本次中止——请降低频率或换网络稍后重试")
            break
        cards = parse_cards(page)
        hit = 0
        for c in cards:
            if not c["ts"]:
                continue
            dt = datetime.datetime.fromtimestamp(c["ts"])
            if dt < since:
                continue
            key = c["title"][:30]
            if key in seen:
                continue
            seen.add(key)
            results.append({
                "date": dt.strftime("%Y-%m-%d"), "account": c["account"],
                "title": c["title"], "summary": c["summary"],
                "link": c["link"], "query": q,
            })
            hit += 1
        print(f"  命中 {hit} 条（页内卡片 {len(cards)} 张）")
        time.sleep(8)

    results.sort(key=lambda x: (x["date"], x["title"]), reverse=True)
    d = ROOT / "data"
    d.mkdir(exist_ok=True)
    (d / "wechat_candidates.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n共 {len(results)} 条候选（近 {days} 天），已写入 data/wechat_candidates.json")
    for r in results:
        print(f"[{r['date']}][{r['account'][:14]}] {r['title'][:44]}")


if __name__ == "__main__":
    main()
