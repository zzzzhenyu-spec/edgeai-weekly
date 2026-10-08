# -*- coding: utf-8 -*-
# ============================================================
# audit.py —— 每期发布前质检：结构门禁(离线) + 网络核验(在线)
# 用法:
#   python scripts/audit.py          # 全量：结构门禁 + 网络
#   python scripts/audit.py --fast   # 仅结构门禁(秒级, 提交前终检用)
# 退出码: 有 FAIL -> 1, 其余 -> 0 (供流水线机械判定)
# 检查项:
#   [结构门禁 --fast 即跑, 全部离线]
#     S1 资讯分类 ∈ NEWS_CATS 七类 / 论文分类 ∈ PAPER_CATS (白名单取自 js/app.js, 单一事实源)
#     S2 NEWS_CAT_COLORS 键 == NEWS_CATS(除"全部") —— 数据速览漏计即在此暴露
#     S3 id 唯一 / 资讯 URL 不重复
#     S4 rolling 期事件日 ∈ [今日-6, 今日] (越界=WARN 漏跑/未滑窗; 未来日期=FAIL)
#     S5 README.md 与 data.js 当前内容逐字一致 (改过 data.js 必须重跑 build_readme.py)
#     S6 归档对账: manifest 计数 vs issue-NN.js 实际条数; manifest 最新期 == live 期号-1 (WARN)
#     S7 storylines.json / source_health.json JSON 合法
#   [网络核验]
#     N1 资讯 url 可访问(HTTP 200)，og:title 与我方标题关键词吻合
#     N2 资讯日期 vs 信源 URL/页面里的发布日期一致性
#     N3 论文 arXiv ID 真实存在，标题对得上，日期在近半年内
# 输出: 每条一行 PASS/WARN/FAIL + 原因，最后汇总
# ============================================================
import argparse
import datetime
import json
import re
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_readme as br
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml"}
NS = {"a": "http://www.w3.org/2005/Atom"}


# ---------------- 结构门禁（离线） ----------------

def parse_app_js_constants():
    """从 js/app.js 提取 NEWS_CATS / PAPER_CATS / NEWS_CAT_COLORS——与前端单一事实源，防 audit 自说自话"""
    t = (ROOT / "js" / "app.js").read_text(encoding="utf-8")

    def arr(name):
        m = re.search(r"var " + name + r"\s*=\s*\[(.*?)\];", t, re.S)
        return re.findall(r'"([^"]+)"', m.group(1)) if m else None

    def objkeys(name):
        m = re.search(r"var " + name + r"\s*=\s*\{(.*?)\};", t, re.S)
        return re.findall(r'"([^"]+)"\s*:', m.group(1)) if m else None

    return arr("NEWS_CATS"), arr("PAPER_CATS"), objkeys("NEWS_CAT_COLORS")


def check_structure():
    rows = []
    news_cats, paper_cats, colors = parse_app_js_constants()
    if not news_cats or not paper_cats or not colors:
        rows.append(("结构", "FAIL", "无法从 js/app.js 解析 NEWS_CATS/PAPER_CATS/NEWS_CAT_COLORS——audit 与前端脱钩，先修本脚本"))
        return rows
    meta, news, papers = br.load_sections()
    today = datetime.date.today()

    # S1 分类白名单
    for n in news:
        if n["cat"] not in news_cats:
            rows.append((n["id"], "FAIL",
                         f"分类「{n['cat']}」不在资讯七类里（{ '/'.join(c for c in news_cats if c != '全部')}）"
                         "——论文分类名误用到资讯会令筛选 chips 与数据速览漏计该条"))
    for p in papers:
        if p["cat"] not in paper_cats:
            rows.append((p["id"], "FAIL", f"分类「{p['cat']}」不在论文分类 PAPER_CATS 里"))

    # S2 前端常量自洽（数据速览只按 NEWS_CAT_COLORS 键统计）
    if sorted(colors) != sorted(c for c in news_cats if c != "全部"):
        rows.append(("结构", "FAIL", f"NEWS_CAT_COLORS 键与 NEWS_CATS(除全部)不一致: {sorted(colors)} vs {sorted(c for c in news_cats if c != '全部')}"))

    # S3 id / URL 去重
    ids = [n["id"] for n in news] + [p["id"] for p in papers]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    if dup:
        rows.append(("结构", "FAIL", f"重复 id: {dup}"))
    urls = [n["url"] for n in news]
    dupu = sorted({u for u in urls if urls.count(u) > 1})
    if dupu:
        rows.append(("结构", "FAIL", f"资讯重复 URL: {dupu[:2]}"))

    # S4 滚动窗口
    status = re.search(r'status:\s*"([^"]+)"', (ROOT / "js" / "data.js").read_text(encoding="utf-8"))
    if status and status.group(1) == "rolling":
        lo = today - datetime.timedelta(days=6)
        for n in news:
            if not n["date"]:
                rows.append((n["id"], "FAIL", "缺少事件日 date 字段"))
                continue
            d = datetime.date.fromisoformat(n["date"])
            if d > today:
                rows.append((n["id"], "FAIL", f"事件日 {n['date']} 晚于今日——未来事件不可收录"))
            elif d < lo:
                rows.append((n["id"], "WARN", f"事件日 {n['date']} 已滑出窗口 [{lo}, {today}]——当日任务未跑或漏滑窗，需滑出/补录"))

    # S5 README 同步门禁
    try:
        expect = br.render(meta, news, papers)
        actual = (ROOT / "README.md").read_text(encoding="utf-8")
        if expect != actual:
            rows.append(("README", "FAIL", "README.md 与 data.js 当前内容不一致（data.js 改动后未重跑 build_readme.py）——重跑: python scripts/build_readme.py"))
        else:
            rows.append(("README", "PASS", "README 与 data.js 同步"))
    except Exception as e:
        rows.append(("README", "FAIL", "README 一致性比对异常: " + str(e)[:70]))

    # S7 记忆文件 JSON 合法
    for f in ("data/storylines.json", "data/source_health.json"):
        try:
            d = json.loads((ROOT / f).read_text(encoding="utf-8"))
            if not isinstance(d, dict) or not d:
                rows.append(("结构", "WARN", f"{f} 为空或非对象"))
        except Exception as e:
            rows.append(("结构", "FAIL", f"{f} JSON 解析失败: {str(e)[:60]}"))
    return rows


def check_archive():
    rows = []
    mf = ROOT / "js" / "archive" / "manifest.js"
    if not mf.exists():
        rows.append(("归档", "WARN", "manifest.js 不存在（可能是首期，尚未归档）"))
        return rows
    try:
        mt = mf.read_text(encoding="utf-8")
        issues = json.loads(mt[mt.index("["):mt.rindex("]") + 1])
    except Exception as e:
        return [("归档", "FAIL", "manifest.js 解析失败: " + str(e)[:60])]
    live = br.load_sections()[0].get("issue", "")
    m = re.search(r"第\s*(\d+)\s*期", live)
    live_no = int(m.group(1)) if m else None
    for it in issues:
        f = ROOT / "js" / "archive" / f"issue-{it['no']}.js"
        if not f.exists():
            rows.append(("归档", "FAIL", f"manifest 列出第 {it['no']} 期但 issue-{it['no']}.js 不存在"))
            continue
        t = f.read_text(encoding="utf-8")
        nn, pp = len(re.findall(r'id: "n\d+"', t)), len(re.findall(r'id: "p\d+"', t))
        if nn != it["news"] or pp != it["papers"]:
            rows.append(("归档", "FAIL", f"第 {it['no']} 期 manifest 计数 {it['news']}/{it['papers']} 与实际文件 {nn}/{pp} 不符"))
    if issues and live_no and issues[0]["no"] != live_no - 1:
        rows.append(("归档", "WARN", f"manifest 最新为第 {issues[0]['no']} 期, live 为第 {live_no} 期——周日快照后应相差 1"))
    if not rows:
        rows.append(("归档", "PASS", f"{len(issues)} 期计数对账一致"))
    return rows


# ---------------- 网络核验（在线） ----------------

def keywords(title):
    """从我方标题抽核验关键词(去停用词, 取前几个实词)"""
    stop = set("的了和与在将推出发布正式亮相上市携手联手的为为上新品款亿元级年月日")
    words = re.findall(r"[\u4e00-\u9fa5]{2,}|[A-Za-z][\w.+-]{2,}|\d+", title)
    return [w for w in words if not set(w) <= stop][:6]


def audit_news(items):
    rows = []
    # 价值锚点 lint（CRITERIA §6.5/§7-1.8）: 厂商类条目标题出现市场数据用语 -> WARN
    # 销量/股价只能作注脚，不得占据标题主体（用户 2026-09-28 明确反馈）
    MKT_RE = re.compile(r"销量|首销|激活量|股价|市值|出货量|市占")
    VENDOR_CATS = ("手机厂商", "芯片厂商", "AI硬件")
    for it in items:
        uid, url, date, title = it["id"], it["url"], it["date"], it["title"]
        if it.get("cat") in VENDOR_CATS and MKT_RE.search(title):
            rows.append((uid, "WARN", f"价值锚点: 标题含市场数据用语「{MKT_RE.search(title).group(0)}」——厂商条目应以端侧AI能力为主体，销量仅注脚"))
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
                    dd = abs((datetime.date.fromisoformat(dh) - datetime.date.fromisoformat(date)).days)
                    if dd > 1:
                        flag, why = "WARN", f"日期疑似不符: {dmsg}"
                    break
            rows.append((uid, flag, why))
        else:
            rows.append((uid, "WARN", f"关键词命中不足 {hit}/{len(kws)}; og:title={ogt[:40]}"))
        time.sleep(0.35)
    return rows


def audit_papers(items):
    rows, ids = [], ",".join(re.search(r"arxiv\.org/abs/([\d.]+)", p["url"]).group(1) for p in items if "arxiv.org/abs/" in p["url"])
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
    today = datetime.date.today()
    for p in items:
        m = re.search(r"arxiv\.org/abs/([\d.]+)", p["url"])
        if not m:
            rows.append((p["id"], "WARN", f"非 arXiv 链接, 跳过: {p['url'][:50]}"))
            continue
        g = got.get(m.group(1))
        if not g:
            rows.append((p["id"], "FAIL", f"arXiv 上不存在: {m.group(1)}"))
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
    ap = argparse.ArgumentParser(description="周报发布前质检")
    ap.add_argument("--fast", action="store_true", help="跳过网络核验，只跑结构/一致性门禁（提交前终检）")
    args = ap.parse_args()

    all_rows = []
    struct = check_structure() + check_archive()
    all_rows += struct
    print(f"=== 结构与一致性门禁（离线, {len(struct)} 项） ===")
    for uid, flag, why in struct:
        print(f"[{flag:4}] {uid}: {why}")

    if not args.fast:
        meta, news, papers = br.load_sections()
        print(f"\n=== 资讯 {len(news)} 条 ===")
        r = audit_news(news)
        all_rows += r
        for uid, flag, why in r:
            print(f"[{flag:4}] {uid}: {why}")
        print(f"\n=== 论文 {len(papers)} 篇 ===")
        r = audit_papers(papers)
        all_rows += r
        for uid, flag, why in r:
            print(f"[{flag:4}] {uid}: {why}")

    n_pass = sum(1 for x in all_rows if x[1] == "PASS")
    n_warn = sum(1 for x in all_rows if x[1] == "WARN")
    n_fail = sum(1 for x in all_rows if x[1] == "FAIL")
    print(f"\n=== 汇总: {n_pass} PASS / {n_warn} WARN / {n_fail} FAIL ===")
    if n_fail:
        print("存在 FAIL，修完再提交（README 不一致 -> 重跑 build_readme.py；分类越界 -> 改 data.js 后重跑 build_readme.py）")
        sys.exit(1)


if __name__ == "__main__":
    main()
