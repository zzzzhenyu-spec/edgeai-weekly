# -*- coding: utf-8 -*-
# ============================================================
# build_readme.py —— 从 js/data.js 自动生成周报风格的 README.md
# 用法: python scripts/build_readme.py
# 每周更新 data.js 后运行一次并提交；本地运维手册见 DEVELOPMENT.md（不上传）
# ============================================================
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://zzzzhenyu-spec.github.io/edgeai-weekly/"
CAT_ORDER = ["端侧Agent", "AI硬件", "芯片厂商", "手机厂商", "大模型厂商", "行业动态"]


def load_sections():
    text = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    def field(block, key):
        m = re.search(key + r':\s*"([^"]*)"', block)
        return m.group(1) if m else ""
    meta = {}
    for k in ("issue", "weekRange", "updated", "editorsNote"):
        meta[k] = field(text[:text.index("news:")], k)
    def items(section, end_marker):
        seg = text[text.index(section):text.index(end_marker)]
        blocks = re.split(r'\n\s*\{\s*\n', seg)
        out = []
        for b in blocks[1:]:
            if 'id: "' not in b:
                continue
            out.append({
                "id": field(b, "id"), "cat": field(b, "cat"),
                "date": field(b, "date"), "title": field(b, "title"),
                "source": field(b, "source"), "url": field(b, "url"),
                "summary": field(b, "summary"), "venue": field(b, "venue"),
                "level": field(b, "level"), "authors": field(b, "authors"),
                "group": field(b, "group"),
            })
        return out
    return meta, items("news: [", "/* ---------------- 板块二"), \
        items("papers: [", "/* ---------------- 板块三")


def main():
    meta, news, papers = load_sections()

    L = []
    L.append("# 端侧AI每周情报站 · Edge AI Weekly\n")
    L.append(f"> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读]({SITE})\n")
    L.append(f"## {meta['issue']}（{meta['weekRange']}）\n")
    L.append(f"**本期导读**：{meta['editorsNote']}\n")
    L.append("## 本期速览\n")
    for cat in CAT_ORDER:
        items = [n for n in news if n["cat"] == cat]
        if not items:
            continue
        L.append(f"### {cat}（{len(items)} 条）\n")
        L.append("| 日期 | 要闻 | 来源 |")
        L.append("|------|------|------|")
        for n in sorted(items, key=lambda x: x["date"], reverse=True):
            L.append(f"| {n['date']} | [{n['title']}]({n['url']}) | {n['source']} |")
        L.append("")
    recent = [p for p in papers if p["group"] == "recent"]
    pub = [p for p in papers if p["group"] == "published"]
    L.append(f"## 科研前沿（{len(papers)} 篇）\n")
    L.append(f"- **arXiv 新作跟踪（{len(recent)} 篇，预印本）**：" + "；".join(
        f"[{p['title'][:58]}{'…' if len(p['title']) > 58 else ''}]({p['url']})" for p in recent) + "\n")
    L.append(f"- **已发表精选（{len(pub)} 篇，CCF-A / 顶会）**：" + "；".join(
        f"[{p['title'][:58]}{'…' if len(p['title']) > 58 else ''}]({p['url']}))" for p in pub) + "\n")
    L.append("## 页面板块\n")
    L.append("① 本周资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（端侧 AI 发展史 + 厂商/个人/中文媒体三分区博客库）④ 评论区\n")
    L.append("## 说明\n")
    L.append("- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；")
    L.append("- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；")
    L.append(f"- 本期数据更新于 {meta['updated']}；本 README 由 `scripts/build_readme.py` 自动生成。\n")
    (ROOT / "README.md").write_text("\n".join(L), encoding="utf-8", newline="\n")
    print(f"README.md 已生成：{len(news)} 条资讯 / {len(papers)} 篇论文")


if __name__ == "__main__":
    main()
