# -*- coding: utf-8 -*-
# ============================================================
# fetch_news.py —— 抓取 RSS/Atom 订阅源中的端侧AI相关新闻候选
# 用法: python scripts/fetch_news.py [-d 7]
# 订阅源: scripts/sources.json；输出 data/news_candidates.json
# 每期窗口 = 运行日往前 N 天（默认 7，严格执行"只收最近一周"）
# ============================================================
import sys, json, re, time, urllib.request, html
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) weekly-info/1.0"}

KEYWORDS = [
    "端侧", "端侧ai", "端侧大模型", "on-device", "on device", "edge ai", "edge-side",
    "edge llm", "npu", "ai手机", "ai phone", "小模型", "slm", "small language model",
    "mobile ai", "local ai", "offline ai", "agentic ai", "inference",
    "apple intelligence", "gemini nano", "galaxy ai", "天玑", "骁龙", "snapdragon",
    "dimensity", "瑞芯微", "rk1828", "展锐", "全志", "海思", "麒麟", "玄戒",
    "昇腾", "ascend", "寒武纪", "cambricon", "地平线", "黑芝麻", "燧原", "摩尔线程", "芯原",
    "蓝心", "小艺", "andresgpt", "openclaw", "workbuddy", "jev", "typesafe",
    "minicpm", "端云协同",
    "ai眼镜", "智能眼镜", "ai耳机", "hearable", "ai pc", "copilot+",
    "gemini intelligence", "qwen intelligence", "agentic os", "ai硬件",
    # 端侧工具链谱系(2026-09-30 补): 本地推理/量化/移动端运行时/CV框架/离线语音
    "llama.cpp", "gguf", "ollama", "mlx", "executorch", "litert", "tflite",
    "coreml", "openvino", "onnx", "ncnn", "mnn", "sherpa", "whisper.cpp",
    "mediapipe", "directml", "jetson", "本地大模型", "本地部署",
]


def days_arg():
    if "-d" in sys.argv:
        try:
            return int(sys.argv[sys.argv.index("-d") + 1])
        except Exception:
            pass
    return 7


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def parse_date(s):
    s = (s or "").strip()
    if not s:
        return None
    try:
        return parsedate_to_datetime(s)
    except Exception:
        pass
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(s, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except Exception:
            continue
    return None


def items_of(root):
    """兼容 RSS 2.0 与 Atom，统一返回 [{title,link,date,desc}]"""
    out = []
    for it in root.iter("item"):  # RSS 2.0
        out.append({
            "title": it.findtext("title") or "",
            "link": it.findtext("link") or "",
            "date": it.findtext("pubDate") or "",
            "desc": it.findtext("description") or "",
        })
    ns = "{http://www.w3.org/2005/Atom}"
    for it in root.iter(ns + "entry"):  # Atom
        link = ""
        for l in it.findall(ns + "link"):
            link = l.get("href") or link
            if l.get("rel") in (None, "alternate"):
                link = l.get("href") or link
        out.append({
            "title": it.findtext(ns + "title") or "",
            "link": link,
            "date": it.findtext(ns + "published") or it.findtext(ns + "updated") or "",
            "desc": it.findtext(ns + "summary") or "",
        })
    return out


def main():
    days = days_arg()
    since = datetime.now(timezone.utc) - timedelta(days=days)
    sources = json.loads((ROOT / "scripts" / "sources.json").read_text(encoding="utf-8"))
    results = []
    for s in sources:
        print(f"抓取: {s['name']} ({s['url']})")
        try:
            req = urllib.request.Request(s["url"], headers=UA)
            root = ET.fromstring(urllib.request.urlopen(req, timeout=30).read())
        except Exception as e:
            print(f"  [失败] {str(e)[:80]}")
            continue
        hit = 0
        for it in items_of(root):
            title = html.unescape(it["title"]).strip()
            if not title:
                continue
            text = (title + " " + html.unescape(it["desc"])).lower()
            matched = [k for k in KEYWORDS if k in text]
            if not matched:
                continue
            dt = parse_date(it["date"]) or datetime.now(timezone.utc)
            if dt < since:
                continue
            plain = strip_tags(html.unescape(it["desc"]))
            if len(plain) > 400:
                plain = plain[:400] + "..."
            results.append({
                "source": s["name"], "cat": s["cat"], "title": title,
                "date": dt.strftime("%Y-%m-%d"), "matched": ",".join(matched),
                "summary": plain, "url": it["link"],
            })
            hit += 1
        print(f"  命中 {hit} 条")
        time.sleep(0.8)

    # ---- 候选漏斗加固(2026-09-30, 对标五步漏斗实践) ----
    # 步骤二「内容完整性」: 标题过短/无有效链接的候选直接丢弃
    results = [r for r in results if len(r["title"]) >= 8 and (r["url"] or "").startswith("http")]

    # 步骤五「入库查重」前置: 池内同标题去重 + 对当前窗口已收录条目打 dup 标记(标记不删,
    # 供编选时跳过; 权威查重仍是 archive.py check 的 URL精确/标题相似度双通道)
    def norm_title(t):
        return re.sub(r"[\W_]+", "", t.lower())

    cur_titles = set()
    try:
        data_js = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
        cur_titles = {norm_title(t) for t in re.findall(r'title: "([^"]+)"', data_js)}
    except Exception:
        pass
    seen_t, kept = set(), []
    for r in results:
        k = norm_title(r["title"])
        if not k or k in seen_t:
            continue
        seen_t.add(k)
        r["dup_with_current"] = k in cur_titles
        kept.append(r)
    results = kept

    results.sort(key=lambda x: x["date"], reverse=True)
    d = ROOT / "data"
    d.mkdir(exist_ok=True)
    (d / "news_candidates.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    n_dup = sum(1 for r in results if r.get("dup_with_current"))
    print(f"\n共 {len(results)} 条候选（近 {days} 天，其中 {n_dup} 条疑似已在当前窗口），已写入 data/news_candidates.json")
    for r in results:
        print(f"[{r['date']}][{r['source']}] {r['title']}")


if __name__ == "__main__":
    main()
