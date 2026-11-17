# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 48 期（2026.11.11 — 2026.11.17 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：端侧 AI 的「交付周」——苹果 HomeView 家庭中枢 299 美元开售、大众 ID.ERA 5X 以 9.99 万元把豆包 2.0 座舱+联发科 8676+征程 6H 双端侧芯片打成标配、三星 AI 眼镜 395 美元开启预售（12 月 10 日韩美上市）。格局层剧震：黄仁勋辞任英伟达 CEO（Kress 临时接任），OpenAI 解散机器人团队押注 GPT-6 Astra 直接当大脑。技术面：Edge0 开源 145B 端侧模型（笔记本本地跑、峰值内存 29GB），全双工语音一周三发（混元 Hy Realtime/Higgs/GPT-Live-1），麒麟 9050 连续披露新马良 GPU 与 AI ISP，北京具身三年方案与韩国 8002 亿韩元端侧芯片路线图同周落地；华为星芒 AI 子品牌官宣、Mate X8 预热、MateBook Fold S 预订，小米 18 Pro 背屏首批适配 Gemini（11 月 18 日香港发布）。 今日新增：llama.cpp v1.0、厨房 AI 硬件 Trepo、阿里 Qwen4-Max 上线、智元 LIFE 终身具身框架、Apple 健康AI 研究、苹果智能眼镜轮廓、韩国修能防 AI 作弊备战、开源鸿蒙轻 AI 越影、千问办公开放 10 款模型（Adobe×迪士尼端侧 AI 联盟补录进第 47 期归档）。

## 近 7 天速览

### 行业关注事件（7 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-16 | [韩国高考 11 月 19 日开考在即：239 名「智能眼镜专责监考员」特训上岗，1312 考点防 AI 作弊，交易所招聘已现 5 年禁考案](https://finance.sina.com.cn/jjxw/2026-11-13/doc-iniypzqc1035537.shtml) | 新浪财经/韩联社 |
| 2026-11-15 | [苹果启动健康 AI 使用研究：最多 20 万美国成人参与，联手 OpenEvidence 临床 AI，数据不用于训练](https://www.apple.com/newsroom/2026/11/apple-launches-research-study-to-explore-the-use-of-ai-for-health/) | Apple 官方 |
| 2026-11-13 | [llama.cpp 发布 v1.0.0：诞生三年半首个正式大版本，语义化版本+稳定 API 承诺，ggml 同步 1.0](https://huggingface.co/blog/ggml-org/llama-cpp-v1) | llama.cpp 官方/HF |
| 2026-11-13 | [OpenAI 解散独立机器人团队：具身智能研究并入通用模型研发，GPT-6 Astra 直接充当机器人「大脑」](https://tech.ifeng.com/c/8y2QsVMnd4N) | 凤凰科技/财富 |
| 2026-11-13 | [北京发布具身智能机器人三年行动方案：2028 年 20 万台年产能、5 万 P 专项算力，「本地化轻量部署」与 RISC-V 智算芯片写入攻关清单](https://jxj.beijing.gov.cn/jxdt/zwyw/202611/t20261113_4944755.html) | 北京市经信局 |
| 2026-11-12 | [黄仁勋辞任英伟达 CEO：CFO Colette Kress 出任临时 CEO，3.8 万亿美元巨头突发掌门人交接](https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition) | 英伟达官方/智东西 |
| 2026-11-12 | [百度世界 2026：李彦宏首提「智能组织」——AI 下一幕，文心闪电深度思考+文心一镜微表情双模型发布](https://i.ifeng.com/c/8xzM4d8Y2gq) | 凤凰网 |

### 端侧Agent（6 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-16 | [开源鸿蒙轻 AI「越影」方案发布：1 块主板+6 款扩展板，让百亿「哑终端」IoT 设备跨入轻智能](https://tech.china.com/articles/20261116/202611161979249.html) | 中华网科技/海思 |
| 2026-11-13 | [华为系开源平台 openJiuwen 发布 RSI 原生 AgentOS：递归自我改进做进系统底座，智能体可「自由变身」持续迭代](https://github.com/openJiuwen-ai) | openJiuwen/GitHub |
| 2026-11-13 | [Cloudflare 开源 AI 智能体专用浏览器 Kitesurf：无 Chromium 容器、资源消耗显著更低，GitHub 开放仓库](https://www.ithome.com/1/027/197.htm) | IT之家/Cloudflare |
| 2026-11-11 | [智元发布终身具身智能框架 LIFE：RoboBeats「心跳」轻量决策模型 0.8B/2B/4B 全开放，任务成功率从 37.5% 提升至 65.8%](https://view.inews.qq.com/a/20261111A093BB00) | 腾讯新闻/新浪财经 |
| 2026-11-11 | [Tether 开源 0.8B 端侧智能体模型 QVAC BotPsy：基于 Qwen3.5 架构、手机本地运行，工具调用胜 2.5B 级](https://m.cnyes.com/news/id/6659587) | 钜亨网/BlockBeats |
| 2026-11-11 | [AI 巨头桌面端开战：Claude 推 Whiteboards 等 AI 办公全家桶直挑微软，谷歌同日上线 Gemini 新旗舰+复刻 OpenCode 桌面应用](https://m.36kr.com/p/4064780118463617) | 36氪 |

### AI硬件（5 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-16 | [苹果首款智能眼镜轮廓渐清：古尔曼称 2027 年 6 月发布、Siri 成主要交互，设计首曝](https://www.sohu.com/a/1102293477_223764) | 搜狐科技/彭博 |
| 2026-11-13 | [前特斯拉 Cybertruck 工程师创业做厨房助手硬件 Trepo：99 美元磁吸冰箱，视觉+旋钮+语音打通库存、菜谱与购物清单](https://www.163.com/dy/article/LBL879B60556CAYF.html) | 网易/AING硬迹 |
| 2026-11-13 | [苹果 HomeView 与新 Apple TV 4K 正式开售：299 美元家庭中枢上市，苹果 AI 硬件进入交付期](https://tech.ifeng.com/c/8xz8XFlXHz2) | 凤凰科技 |
| 2026-11-12 | [三星首款 AI 眼镜 Intelligent Eyewear 开启预售：395 美元起、41 克无屏设计，12 月 10 日韩美上市](https://news.samsung.com/global/samsung-announces-december-release-for-intelligent-eyewear-bringing-a-smarter-way-to-see-the-world) | 三星官方新闻室 |
| 2026-11-12 | [CES 2027 创新奖电脑外设类目六款 AI 硬件获奖：端侧「第二大脑」、无线 GPU 算力坞与 AI 代理审批坞上榜](https://www.163.com/dy/article/LBI1OR4V0556CAYF.html) | 网易/AING硬迹 |

### 芯片厂商（5 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-14 | [华为再披露麒麟 9050 细节：新马良 GPU 性能提升 40%、二代硬件光追，AI ISP 首次实现 2 亿像素融合拍](https://www.ithome.com/1/027/181.htm) | IT之家 |
| 2026-11-12 | [韩国公布端侧 AI 半导体路线图：项目总额 8002 亿韩元，2030 年前完成 10 款芯片开发验证](https://news.qq.com/rain/a/20261112A0BJJT00) | 腾讯新闻 |
| 2026-11-12 | [优必选×沐曦合资芯片公司曦选创智完成 5 亿元天使轮：估值 40 亿元，首颗芯片对标英伟达 Thor、2028 年量产](http://news.10jqka.com.cn/20261112/c681759273.shtml) | 同花顺财经 |
| 2026-11-11 | [联发科×英伟达 RTX Spark 超级芯片登陆 Windows 11 PC：Blackwell GPU+Grace CPU，最高 128GB 统一内存本地跑智能体](https://finance.sina.com.cn/tech/roll/2026-11-12/doc-iniymsip3963100.shtml) | 新浪科技 |
| 2026-11-11 | [华为官方详解麒麟 9050 系列：新一代达芬奇 NPU 性能提升 140%，30B MoE 全模态大模型端侧离线运行仅占 2.5GB 内存](https://original.ifeng.com/c/8xxkY6ktCXa) | 凤凰网 |

### 手机厂商（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-15 | [小米 18 Pro 海外公布背屏适配：谷歌地图、Spotify、Gemini 等首批支持，11 月 18 日香港发布](https://ezone.hk/article/20117600/) | ezone/小米 |
| 2026-11-15 | [华为 Mate X8 折叠屏外观公布：余承东官宣「就要来了」，屏幕、拍照、性能三线新突破](https://www.sohu.com/a/1101872178_163726) | 搜狐科技 |
| 2026-11-11 | [苹果子公司 Claris 暗测 Harbor 应用：Mac 变身本地 AI 服务器，雷雳 5 串联多机集群跑大模型](https://www.ithome.com/1/025/225.htm) | IT之家 |

### 大模型厂商（9 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-16 | [阿里 Qwen4-Max 正式上线：总参 2.4 万亿、每 token 激活约 71B、原生视觉+百万上下文，官宣后续小尺寸模型陆续开源](https://www.ithome.com/1/027/512.htm) | 搜狐科技 |
| 2026-11-16 | [千问办公上线 10 款模型「敞开大门」：Kimi、DeepSeek、GLM 都来了，办公 AI 进入自选模型时代](https://news.qq.com/rain/a/20261116A08VTR00) | 腾讯新闻/澎湃 |
| 2026-11-13 | [无界方舟开源 Edge0-145B 端侧模型：稀疏 MoE 每步仅激活约 10B，MacBook Pro 峰值内存 29GB 本地跑、解码 80 token/s](https://www.sohu.com/a/1101025520_121423427) | 搜狐科技 |
| 2026-11-13 | [腾讯混元发布实时语音模型 Hy Realtime：能说会唱、临场改词，还能边聊边调用工具](https://tech.ifeng.com/c/8y1QBPLjByO) | 凤凰科技 |
| 2026-11-12 | [谷歌发布 Gemini 4 Hydrogen：主打智能体快速执行的高效率档，多项基准反超自家旗舰 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) | Google 官方博客 |
| 2026-11-11 | [文心 5.5 Flash Preview 发布：总参 2800 亿 MoE 激活仅 140 亿、100 万 token 上下文，官宣 11 月 25 日开源](https://tech.ifeng.com/c/8xxwDIS2DX4) | 凤凰科技 |
| 2026-11-11 | [北大系创企开源 aiXcompact-4B 上下文压缩模型：编程 Agent 推理成本降 78%、API 费用降 97%，单卡 A100 可私有部署](https://zhidx.com/p/609168.html) | 智东西 |
| 2026-11-11 | [面壁智能 35B 模型跑进手机：MiniCPM-V 4.7 35B-A3B 以 3GB 内存实现端侧多模态，iPhone 18 Pro Max 实测即问即答](https://news.qq.com/rain/a/20261111A058XQ00) | 每日经济新闻 |
| 2026-11-11 | [阿里 Qwen4 预览版上线千问平台：新一代旗舰主打编程、Agent 与复杂任务，正式版即将发布](https://www.ithome.com/1/025/301.htm) | IT之家 |

### 行业动态（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-13 | [大众 ID.ERA 5X 上市 9.99 万元起：行业首发豆包大模型 2.0 上车，联发科 8676 座舱芯片+地平线征程 6H 420TOPS](https://app.xinhuanet.com/news/article.html?articleId=20261113e85d7b5d0be34606b4117b6d7dd1730c) | 新华网/腾讯新闻 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[Metal Sandbox: Isolated Execution and Command Scheduling f…](https://arxiv.org/abs/2611.17294)；[Acoustic Respiratory Phase Detection on Mobile Devices](https://arxiv.org/abs/2611.16710)；[An Open-Architecture Dual-Core STM32-Based Neural Interfac…](https://arxiv.org/abs/2611.15942)；[EngineAgent: Agentizing On-Device LLM Inference Engines wi…](https://arxiv.org/abs/2611.14356)；[Mobile AI Factory: Building Specialized Language Models fo…](https://arxiv.org/abs/2611.13509)；[HandsOnAid: Building and Evaluating an Offline First-Aid A…](https://arxiv.org/abs/2611.14059)；[Compute Regeneration through Re-Productization: Reorganizi…](https://arxiv.org/abs/2611.11698)；[UMLoad: Fast On-Demand Model Loading on Unified Memory Arc…](https://arxiv.org/abs/2611.04253)；[MedPsy: State-of-the-Art Small Medical Language Models for…](https://arxiv.org/abs/2611.02011)；[Compression Technique Interactions in Small Language Model…](https://arxiv.org/abs/2611.00464)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-17。
