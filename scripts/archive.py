# -*- coding: utf-8 -*-
# ============================================================
# archive.py —— 期次存档库 + 去重/完整性对账（"数据库"管理器）
# 用法:
#   python scripts/archive.py save              # 把 js/data.js 快照为 js/archive/issue-NN.js 并重建 manifest
#   python scripts/archive.py save --from-git <commit>   # 从 git 历史某提交的 data.js 回填存档
#   python scripts/archive.py check             # 候选 vs 存档 去重/覆盖对账（完整性 & 不重复性）
#   python scripts/archive.py list              # 列出存档
# 设计:
#   * 存档 = 仓库内 js/archive/issue-NN.js（window.WEEKLY_ARCHIVE[NN] = {...}），
#     纯 <script> 加载，兼容 GitHub Pages 与 file:// 双击打开（零依赖约束不变）。
#   * manifest.js = 历史期次索引，前端期数选择器读取。
#   * check 把三路候选（RSS/公众号/小红书）与全部历史期 + 当前期比对：
#     URL 精确命中 或 标题相似度 >= 0.62 判为"已收录"；其余为"待发现"。
# ============================================================
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARCH_DIR = ROOT / "js" / "archive"
CAND_FILES = [
    ("RSS资讯", "data/news_candidates.json", "title", "url"),
    ("公众号", "data/wechat_candidates.json", "title", "link"),
    ("小红书", "data/xhs_candidates.json", None, None),   # in_window 数组单独处理
]


def read_datajs_text(source, commit=None):
    if source == "git":
        return subprocess.run(
            ["git", "-C", str(ROOT), "show", f"{commit}:js/data.js"],
            capture_output=True, text=True, encoding="utf-8", check=True).stdout
    return (ROOT / "js" / "data.js").read_text(encoding="utf-8")


def parse_meta(text):
    m = re.search(r'issue:\s*"([^"]+)"', text)
    label = m.group(1) if m else ""
    no = re.search(r"(\d+)(?=\s*期)", label)
    rng = re.search(r'weekRange:\s*"([^"]+)"', text)
    upd = re.search(r'updated:\s*"([^"]+)"', text)
    return {
        "no": int(no.group(1)) if no else None,
        "label": label,
        "range": rng.group(1) if rng else "",
        "updated": upd.group(1) if upd else "",
    }


def save(source="live", commit=None):
    text = read_datajs_text(source, commit)
    meta = parse_meta(text)
    if not meta["no"]:
        print("无法从 data.js 解析期数，中止")
        return 1
    ARCH_DIR.mkdir(parents=True, exist_ok=True)
    # 去掉源文件头部 /* */ 注释块，换存档注释
    body = re.sub(r"^/\*[\s\S]*?\*/\s*", "", text.lstrip())
    body = body.replace("const WEEKLY_DATA =", f'WEEKLY_ARCHIVE[{meta["no"]}] =', 1)
    out = ARCH_DIR / f'issue-{meta["no"]}.js'
    header = (f'/* 自动生成: scripts/archive.py (勿手改) · {meta["label"]} 快照'
              f'（{meta["range"]}，数据更新于 {meta["updated"]}） */\n')
    out.write_text(header + "window.WEEKLY_ARCHIVE = window.WEEKLY_ARCHIVE || {};\n" + body,
                   encoding="utf-8", newline="\n")
    print(f'已存档: {out.relative_to(ROOT)}  ({meta["label"]} · {meta["range"]})')
    rebuild_manifest()
    return 0


def archive_files():
    if not ARCH_DIR.exists():
        return []
    return sorted(ARCH_DIR.glob("issue-*.js"), reverse=True)


def rebuild_manifest():
    entries = []
    for f in archive_files():
        meta = parse_meta(f.read_text(encoding="utf-8"))
        if meta["no"] is None:
            continue
        news_n = len(re.findall(r'id: "n\d+"', f.read_text(encoding="utf-8")))
        papers_n = len(re.findall(r'id: "p\d+"', f.read_text(encoding="utf-8")))
        entries.append({"no": meta["no"], "label": meta["label"], "range": meta["range"],
                        "updated": meta["updated"], "news": news_n, "papers": papers_n})
    entries.sort(key=lambda e: e["no"], reverse=True)
    manifest = ARCH_DIR / "manifest.js"
    lines = ",\n".join(
        "  " + json.dumps(e, ensure_ascii=False) for e in entries)
    manifest.write_text(
        "/* 自动生成: scripts/archive.py (勿手改) · 历史期次索引（新→旧） */\n"
        "window.WEEKLY_ISSUES = [\n" + lines + "\n];\n", encoding="utf-8", newline="\n")
    print(f"manifest.js 已重建：{len(entries)} 期 -> " + ", ".join(str(e['no']) for e in entries))


def norm_title(s):
    return re.sub(r"[\s\d\W_]+", "", (s or "").lower(), flags=re.UNICODE) if s else ""


def collect_records():
    """历史期 + 当前期的全部资讯条目: [{issue,no_source,date,title,url,norm}]"""
    recs = []
    for f in archive_files():
        meta = parse_meta(f.read_text(encoding="utf-8"))
        t = f.read_text(encoding="utf-8")
        for m in re.finditer(r'id: "(n\d+)"[\s\S]*?date: "([\d-]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?url: "([^"]+)"', t):
            recs.append({"issue": f"第{meta['no']}期", "date": m.group(2),
                         "title": m.group(3), "url": m.group(4)})
    t = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    live_no = parse_meta(t)["no"]
    for m in re.finditer(r'id: "(n\d+)"[\s\S]*?date: "([\d-]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?url: "([^"]+)"', t):
        recs.append({"issue": f"当前期(第{live_no}期)", "date": m.group(2),
                     "title": m.group(3), "url": m.group(4)})
    for r in recs:
        r["norm"] = norm_title(r["title"])
        r["url"] = r["url"].strip()
    return recs, live_no


def match(recs, title, url):
    url = (url or "").strip()
    nt = norm_title(title)
    if url:
        for r in recs:
            if r["url"] == url:
                return r, "URL"
    if nt and len(nt) >= 6:
        for r in recs:
            if not r["norm"]:
                continue
            ratio = difflib.SequenceMatcher(None, nt, r["norm"]).ratio()
            if ratio >= 0.62:
                return r, f"标题{ratio:.0%}"
    return None, ""


def load_candidates():
    out = []
    for name, path, tkey, ukey in CAND_FILES:
        p = ROOT / path
        if not p.exists():
            continue
        data = json.loads(p.read_text(encoding="utf-8"))
        if name == "小红书":
            for c in data.get("in_window", []):
                out.append((name, c.get("title", ""), c.get("url", "")))
        else:
            for c in data:
                out.append((name, c.get(tkey, ""), c.get(ukey, "")))
    return out


def check():
    recs, live_no = collect_records()
    cands = load_candidates()
    print(f"存档库: {len(archive_files())} 期 + 当前期，共 {len(recs)} 条资讯记录")
    print(f"待对账候选: {len(cands)} 条（RSS/公众号/小红书）\n")
    stats, fresh = {}, []
    for src, title, url in cands:
        hit, how = match(recs, title, url)
        s = stats.setdefault(src, {"total": 0, "covered": 0})
        s["total"] += 1
        if hit:
            s["covered"] += 1
        else:
            fresh.append((src, title))
    for src, s in stats.items():
        print(f"[{src}] {s['covered']}/{s['total']} 已收录（候选被往期或本期覆盖）")
    print(f"\n=== 未收录候选 {len(fresh)} 条（下一步筛选的净增量池）===")
    for src, title in fresh[:40]:
        print(f"  [{src}] {title[:60]}")
    if len(fresh) > 40:
        print(f"  ...（其余 {len(fresh) - 40} 条略）")
    # 反向校验：当前期条目是否与更早期重复（不重复性）
    print("\n=== 重复性校验（当前期 vs 历史期）===")
    dup = 0
    t = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    hist = [r for r in recs if not r["issue"].startswith("当前期")]
    for m in re.finditer(r'id: "(n\d+)"[\s\S]*?title: "([^"]+)"[\s\S]*?url: "([^"]+)"', t):
        hit, how = match(hist, m.group(2), m.group(3))
        if hit:
            dup += 1
            print(f"  [疑似重复] {m.group(1)} ≈ {hit['issue']} {hit['title'][:40]}（{how}命中）")
    if not dup:
        print("  无重复 ✓")
    return 0


def list_issues():
    for f in archive_files():
        t = f.read_text(encoding="utf-8")
        meta = parse_meta(t)
        news_n = len(re.findall(r'id: "n\d+"', t))
        papers_n = len(re.findall(r'id: "p\d+"', t))
        print(f'{meta["label"]}  {meta["range"]}  资讯{news_n}条/论文{papers_n}篇  更新于 {meta["updated"]}')
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "save":
        src, commit = "live", None
        if "--from-git" in sys.argv:
            src, commit = "git", sys.argv[sys.argv.index("--from-git") + 1]
        sys.exit(save(src, commit))
    if cmd == "check":
        sys.exit(check())
    if cmd == "list":
        sys.exit(list_issues())
    print(__doc__)
