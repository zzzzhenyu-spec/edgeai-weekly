# -*- coding: utf-8 -*-
# ============================================================
# fetch_paper_figs.py —— 从 arXiv HTML 版抓论文第一张结构图
# 用法: python scripts/fetch_paper_figs.py
# 论文 ID 自动从 js/data.js 的 venue: "arXiv:xxxx.xxxxx" 提取
# 输出: data/paper_figs.json（整理进 data.js 对应条目 image 字段）
# 注意: 相对路径基于 /html/ 解析；无 HTML 版的新论文暂时无图
# ============================================================
import json, re, time, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent


def ids_from_datajs():
    text = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    return sorted(set(re.findall(r'venue:\s*"arXiv:([\d.]+)"', text)))


def first_fig(html_text):
    for m in re.finditer(r'<img[^>]+src="([^"]+\.(?:png|jpg|gif|webp))"', html_text, re.I):
        src = m.group(1)
        if any(k in src for k in ("assets/x", "figures/", "fig")):
            if src.startswith("/"):
                return "https://arxiv.org" + src
            if not src.startswith("http"):
                return "https://arxiv.org/html/" + src
            return src
    return ""


def main():
    ids = ids_from_datajs()
    print(f"从 data.js 提取到 {len(ids)} 个 arXiv ID")
    out = {}
    for aid in ids:
        fig = ""
        for base in (f"https://arxiv.org/html/{aid}v1", f"https://arxiv.org/html/{aid}"):
            try:
                page = http_get(base).decode("utf-8", "ignore")
                fig = first_fig(page)
                if fig:
                    break
            except Exception:
                pass
            time.sleep(0.8)
        out[aid] = fig
        print(f"{aid}  {fig or '(无HTML版或无图)'}")
        time.sleep(0.8)
    d = ROOT / "data"
    d.mkdir(exist_ok=True)
    (d / "paper_figs.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print("已写入 data/paper_figs.json")


if __name__ == "__main__":
    main()
