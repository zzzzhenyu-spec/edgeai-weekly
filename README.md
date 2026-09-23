# 端侧AI每周情报站 · Edge AI Weekly

一个**纯静态、零构建、零依赖**的端侧 AI 每周信息汇总网页。双击 `index.html` 即可打开，可直接分享或部署到任意静态托管（GitHub Pages / Vercel / Netlify）。

## 页面结构（四个板块）

| 板块 | 内容 | 数据来源 |
|------|------|----------|
| 01 本周资讯 | 端侧Agent / 芯片厂商 / 手机厂商 / 大模型厂商 / 行业动态，方格卡片 + 悬浮光晕，点击右侧弹出详情 | RSS + 定向检索 + 人工择要 |
| 02 科研前沿 | 端侧大模型、端侧 Agent、推理系统、安全与能效论文，详情按原文扩写中文介绍 + 论文结构图 | arXiv API + DBLP 核对 |
| 03 知识分享 | 端侧 AI 发展史时间线 + 分区博客库（厂商官方 / 个人 / 中文媒体公众号），点击卡片看简介再跳原文 | 人工维护 |
| 04 评论区 | 昵称 + 内容，本地 localStorage 存储 | 浏览器本地 |

**收录规则**：资讯只收**最近一周**（运行日往前 7 天）的事件，超出窗口的厂商动态不放卡片（由页面顶部「厂商雷达」标注覆盖）；来源只用**简体中文或英文**；论文收录 SCI 二区以上期刊 / CCF-B 以上会议（带 `CCF-A` / `顶会` 徽章），近期 arXiv 新作以 `预印本` 标记跟踪，DBLP 核对到正式 venue 后转入已发表。

## 目录结构

```
weekly_info/
├── index.html              # 页面入口
├── css/style.css           # 样式（暗色主题 / 光晕 / 抽屉）
├── js/app.js               # 交互逻辑（渲染 / 筛选 / 词云 / 评论区）
├── js/data.js              # ★ 本期数据（每周更新这个文件）
├── scripts/                # Python 3.10+，全部零第三方依赖
│   ├── fetch_papers.py     # arXiv 论文候选        -> data/papers_candidates.json
│   ├── fetch_news.py       # RSS 资讯候选(近7天)   -> data/news_candidates.json
│   ├── check_dblp.py       # DBLP 核对 venue       -> data/papers_dblp.json
│   ├── find_article.py     # Bing新闻定位文章URL    -> data/articles.json
│   ├── fetch_paper_figs.py # 论文结构图(arXiv HTML)-> data/paper_figs.json
│   ├── serve.py            # 本地预览服务器(禁缓存)
│   └── sources.json        # RSS 订阅源列表（自行增删）
├── data/                   # 脚本生成的候选文件（gitignore，不参与渲染）
└── README.md
```

## 每周更新流程

本地需要 Python 3.10+（无需 pip 安装任何东西）：

```powershell
cd D:\Code\weekly_info
python scripts\fetch_papers.py                 # 1. arXiv 论文候选
python scripts\fetch_news.py                   # 2. RSS 资讯候选（默认近 7 天）
python scripts\check_dblp.py                   # 3. DBLP 核对正式 venue
python scripts\find_article.py "关键词" "关键词" # 4. 定位真实文章 URL（选简中/英文源）
python scripts\fetch_paper_figs.py             # 5. 抓论文结构图（可选）
python scripts\serve.py                        # 6. 本地预览 http://127.0.0.1:8080
```

然后在 `js/data.js` 中人工整理：

1. **meta**：期数、日期范围（运行日往前 7 天）、本期导读；
2. **news[]**：只收窗口内的事件，撰写 `summary`（卡片摘要）与 `detail`（详情，`\n` 分段）；`url` 用具体文章页；`image` 填 og:image（无则留空，前端自动生成兜底封面）；
3. **papers[]**：预印本保留 `group:"recent"`；查到正式 venue（二区+/CCF-B+）的改 `group:"published"` 并更新 `venue`/`level`；
4. 保存刷新页面即可。

> 提示：芯片/手机厂商官方新闻室大多没有 RSS，每周用 `find_article.py` 对重点厂商做定向搜索；本机 Python 若不在 PATH，用完整路径运行。

### 接入微信公众号内容（可选）

微信没有开放的内容 API，但 GitHub 上有成熟的自建方案，把公众号转成标准 RSS 后即可被 `fetch_news.py` 直接消费：

| 项目 | 地址 | 说明 |
|------|------|------|
| WeWe RSS | github.com/cooderl/wewe-rss | 最流行；基于微信读书接口订阅公众号，Docker 一键部署，输出标准 RSS |
| we-mp-rss | github.com/rachelos/we-mp-rss | 公众号转 Markdown/PDF + 定时更新 + 生成 RSS |
| wechat2rss | wechat2rss.xlab.app | 托管服务，部分免费额度 |

部署 WeWe RSS（`docker run -d -p 4000:4000 cooderl/wewe-rss`）后，把你关注的公众号（量子位、机器之心、新智元等）生成的 `http://localhost:4000/feeds/xxx.atom` 填进 `scripts/sources.json`，之后每周 `fetch_news.py` 就会自动抓公众号文章。注意这类方案依赖个人微信读书账号，有风控风险，建议小规模使用。

### 接入小红书内容（可选）

小红书同样没有开放 API，GitHub 上主流方案（都需要**小号扫码登录**，注意风控）：

| 项目 | 地址 | 说明 |
|------|------|------|
| MediaCrawler | github.com/NanmiCoder/MediaCrawler | ~25k star；小红书/抖音/快手/B站/微博/知乎多平台爬虫，CDP 连真实 Chrome，支持关键词搜索与评论抓取 |
| xhs-mcp | github.com/jobsonlook/xhs-mcp | 小红书 MCP 服务（x-s/x-t 签名逆向），可接入 Claude Desktop 等 |
| XHS-Downloader 等 | 见知乎「小红书爬虫开源神器」整理 | 笔记下载/搜索类工具 |

小红书对 AI 硬件（AI 眼镜、AI 耳机、AI 玩具）的**真实用户体验内容**是独有补充：用 MediaCrawler 按「端侧AI / AI眼镜 / AI硬件」关键词抓笔记，输出 JSON 后即可并入每周候选池。

## 部署到云端（任选其一，均为免费）

> 上传时**不需要** `data/` 文件夹（脚本生成的筛选候选，不参与页面渲染）。

### 方案一：GitHub Pages（推荐长期使用，每周更新方便）

1. 注册/登录 [github.com](https://github.com)，新建 **Public** 仓库（如 `edgeai-weekly`）；
2. 空仓库页点 **uploading an existing file**，把 `index.html`、`css/`、`js/`、`scripts/`、`README.md` 拖进去提交；
3. **Settings → Pages** → Source 选 **Deploy from a branch**，分支 `main`、目录 `/ (root)`，保存；
4. 约 1 分钟后得到 `https://你的用户名.github.io/edgeai-weekly/`；
5. **每周更新**：仓库里直接编辑 `js/data.js` 提交，或本地 `git push`，线上 1 分钟自动生效。

### 方案二：Cloudflare Pages（拖拽即用，国内访问通常更稳）

[dash.cloudflare.com](https://dash.cloudflare.com) → Workers 和 Pages → 创建 → Pages → 上传资产，拖入项目文件夹即得 `https://项目名.pages.dev`。

### 方案三：Netlify Drop（最快）

[app.netlify.com/drop](https://app.netlify.com/drop) 拖入文件夹，几秒出链接；注册免费账号保存站点。

## 自定义

- **配色**：`css/style.css` 顶部 `:root` 变量；
- **RSS 源 / 关键词**：`scripts/sources.json` 与 `fetch_news.py` 的 `KEYWORDS`；
- **论文检索词**：`scripts/fetch_papers.py` 的 `QUERIES` / `KEYWORDS`；
- **评论区共享化**：当前评论仅存本地浏览器；需多人互通推荐接入 [giscus](https://giscus.app)。

## 数据说明

- 本期（2026 年第 39 期）数据采集于 2026-09-23，来自公开新闻检索与 arXiv API，论文摘要翻译为中文解读；
- `data/` 目录为脚本原始候选输出，仅供每周筛选参考，不参与页面渲染；
- 本项目仅供学习交流，新闻与论文版权归原作者所有。
