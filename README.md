# 端侧AI每周情报站 · Edge AI Weekly

一个**纯静态、零构建、零依赖**的端侧 AI 每周信息汇总网页。双击 `index.html` 即可打开，可直接分享或部署到任意静态托管（GitHub Pages / Vercel / Netlify）。

## 页面结构（四个板块）

| 板块 | 内容 | 数据来源 |
|------|------|----------|
| 01 本周资讯 | 芯片厂商 / 手机厂商 / 大模型厂商 / 行业动态，方格卡片 + 悬浮光晕，点击右侧弹出详情 | RSS 订阅（`fetch_news.ps1`）+ 人工择要 |
| 02 科研前沿 | 端侧大模型、端侧 Agent、推理系统、安全与能效论文 | arXiv API（`fetch_papers.ps1`）+ DBLP 核对（`check_dblp.ps1`） |
| 03 知识分享 | 端侧 AI 发展史时间线（2016→2026）+ 科学家博客与信源卡片 | 人工维护 |
| 04 评论区 | 昵称 + 内容，本地 localStorage 存储 | 浏览器本地 |

**论文收录标准**：SCI 二区以上期刊 / CCF-B 以上会议正式发表论文（卡片带 `CCF-A` / `顶会` 徽章）；本周 arXiv 新作以 `预印本` 徽章收录跟踪，DBLP 核对到正式 venue 后转入已发表。

## 目录结构

```
weekly_info/
├── index.html            # 页面入口
├── css/style.css         # 样式（暗色主题 / 光晕 / 抽屉）
├── js/app.js             # 交互逻辑（渲染 / 筛选 / 光晕 / 评论区）
├── js/data.js            # ★ 本期数据（每周更新这个文件）
├── scripts/
│   ├── fetch_papers.ps1  # arXiv 抓取端侧AI论文候选
│   ├── fetch_news.ps1    # RSS 抓取新闻候选
│   ├── check_dblp.ps1    # DBLP 核对正式发表 venue
│   └── sources.json      # RSS 订阅源列表（自行增删）
├── data/                 # 脚本生成的候选文件（人工筛选用，不参与页面渲染）
└── README.md
```

## 每周更新流程

本机仅需 Windows PowerShell，无需安装任何东西：

```powershell
cd D:\Code\weekly_info
powershell -ExecutionPolicy Bypass -File scripts\fetch_papers.ps1   # -> data\papers_candidates.json
powershell -ExecutionPolicy Bypass -File scripts\fetch_news.ps1     # -> data\news_candidates.json
powershell -ExecutionPolicy Bypass -File scripts\check_dblp.ps1     # -> data\papers_dblp.json (核对venue)
```

然后在 `js/data.js` 中人工整理：

1. **meta**：期数（ISO 周号）、日期范围、本期导读；
2. **news[]**：从候选中挑选，撰写中文 `summary`（卡片摘要，2~3 行）与 `detail`（详情面板，`\n` 分段）；
3. **papers[]**：预印本保留 `group:"recent"`；查到正式 venue（二区+/CCF-B+）的改 `group:"published"` 并更新 `venue`/`level`；已发表经典工作同样进 `published`；
4. 保存刷新页面即可。

> 提示：脚本生成的 `.ps1` 需保持 **UTF-8 with BOM** 编码（PowerShell 5.1 才能正确读取中文注释）。

## 自定义

- **配色**：`css/style.css` 顶部 `:root` 中的 CSS 变量；
- **RSS 源**：`scripts/sources.json`（建议补充：Qualcomm/MediaTek 新闻室、Hugging Face 博客、厂商官方渠道等）；
- **论文筛选关键词**：`scripts/fetch_papers.ps1` 中 `$queries` 与 `$keywords`；
- **评论区共享化**：当前评论仅存本地浏览器；若需多人互通，推荐接入 [giscus](https://giscus.app)（基于 GitHub Discussions，免费无后端）。

## 数据说明

- 首期（2026 年第 38 期）数据采集于 2026-09-20，来自公开新闻检索与 arXiv API，论文摘要翻译为中文解读；
- `data/` 目录为脚本原始候选输出，仅供每周筛选参考，不参与页面渲染；
- 本项目仅供学习交流，新闻与论文版权归原作者所有。
