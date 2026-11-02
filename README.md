# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 46 期（2026.10.27 — 11.02 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：谷歌 DeepMind 发布 Genie 4 实时交互世界模型（原生音频+Gemini 在环驱动，定位机器人与智能体的安全训练环境）；Mistral 开源 1T 参数 Large 4 权重（490 亿激活，编程智能体 Token 消耗较 GLM-5.3 省 47%），欧洲最大开放权重旗舰与中国开源阵营形成欧亚两线。XREAL Aura 成为首款 Android XR 有线眼镜——眼镜体不到 95 克、骁龙 Reality Elite 首发算力盒，1099 美元开订；英伟达开源 340 亿参数语音转录模型 Nemotron 3.5 Transcribe（Mamba+MoE 混合架构，30 秒录音 0.13 秒转完），面壁开源 MiniCPM-OCR「读判分离」套件（1.3B 四项基准第一+首创 2B 质检员），端侧模型开源潮再添两员。国行 Apple 智能官宣接入阿里千问（12 月正式推送），Gemini 4 Carbon 登顶综合榜、小米开源 0.8B 文档模型；据 The Information 爆料 Meta 联手傅利叶打造 Muse 物理化身人形原型 Max（英伟达 Thor、3 个月成型）。端侧算力密集换代：苹果 M6 与首款触屏 MacBook Pro、华为麒麟「韬」详解、新芯航途 X7 Ultra 落地边端量产。 今日新增：Genie 4 世界模型、Mistral Large 4 开源、XREAL Aura 开订、Nemotron Transcribe 开源、MiniCPM-OCR 开源、Meta×傅利叶 Max 爆料。

## 近 7 天速览

### 行业关注事件（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-31 | [DeepSeek 开源 Super-agent 原型 dsh-superagent：Router+Worker 双层架构让 AI 指挥 AI 干活，可接入 GitHub 与飞书主动处理任务](https://zhidx.com/p/606311.html) | 智东西 |
| 2026-10-31 | [据 The Information 爆料：Meta 联手傅利叶打造 Muse「物理化身」人形机器人原型 Max，1.5 米高搭载英伟达 Thor，3 个月做出已启动二代](https://finance.sina.com.cn/tech/digi/2026-11-01/doc-inixepty4337025.shtml) | 新浪科技 |
| 2026-10-29 | [开源推理引擎 Strata 发布 0.2.8：一键把大模型装上消费级电脑，本地跑 OpenAI/Anthropic 兼容接口，上线一个月 35,994 星](https://github.com/Niko1221/Strata) | GitHub（Niko1221/Strata） |

### 端侧Agent（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-28 | [Anthropic 岗位插件库 knowledge-work-plugins：把「财务顾问」等知识岗位的领域知识与工具打包给 Claude Cowork，33,851 星本周仍在高频迭代](https://github.com/anthropics/knowledge-work-plugins) | GitHub（anthropics/knowledge-work-plugins） |
| 2026-10-27 | [微信输入法上线「AI 录音笔」：录音实时转写为结构化网页，自动剔噪、提炼重点、生成图表，iOS/安卓/电脑全平台开放](https://www.ithome.com/1/018/492.htm) | IT之家 |
| 2026-10-27 | [蚂蚁灵光 2.0 发布：从「任务执行者」升级「事务管理者」——跨会话记忆、主动盯办与支付宝生态工具链](https://www.leiphone.com/category/industrynews/IxG2F47VLIt3uTOW.html) | 雷峰网 |

### AI硬件（6 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-30 | [智元联合清华与无问芯穹发布群体经验学习范式 CEL：96 台真机集群成功率从 86.7% 提升至 98.3%，机器人开始互相学习](https://finance.ifeng.com/c/8xdnytFdKqj) | 凤凰财经 |
| 2026-10-29 | [智元发布物理 AI 度量衡 Worken（有效智能工时）：活跃机器人数量 × 自主工作时长 × 产出效能比，给具身智能一个「Token」](https://k.sina.com.cn/article_5952915705_162d248f906703rymu.html) | 新浪科技 |
| 2026-10-29 | [王腾创业首作 ISHO Ring 正式发布：智能戒指 1799 元起配 AI 睡眠生态，iFlow 温控系统以双 BCG 感知带实现无感监测，订单已破千](https://baike.baidu.com/item/ISHO%20Ring) | 凤凰网科技 |
| 2026-10-29 | [苹果发布首款触屏 MacBook Pro：PROLED XDR 双层串联 OLED、Mac 历史上首次触控与灵动岛，M5 Max 最高 128GB 内存整机本地跑千亿参数模型](https://www.apple.com/newsroom/2026/10/apple-unveils-groundbreaking-macbook-pro-with-proled-xdr-display/) | Apple 官方 |
| 2026-10-28 | [首款 Android XR 有线眼镜 XREAL Aura 开订：眼镜体不到 95 克、骁龙 Reality Elite 首发算力盒，1099 美元起谷歌商店同售](https://blog.google/products-and-platforms/platforms/android/xreal-aura/) | Google Blog |
| 2026-10-27 | [Rokid 发布首款全彩 AI 眼镜 Rokid Color：0.16cc Micro-LED 光机、4999 元起，55 克全天候佩戴，同场 Glasses 2 与乐奇魔戒组成全家族](https://zhidx.com/p/604685.html) | 智东西 |

### 芯片厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-29 | [新芯航途发布智驾大模型芯片 X7 Ultra：700 TOPS 端到端智驾算力，中国首发量产 Armv9 车规 CPU，X7 系列已装车 10 款](https://www.ithome.com/1/019/603.htm) | IT之家 |
| 2026-10-28 | [苹果发布 M6 款 MacBook Pro：双 16 核神经引擎较 M5 提速最高 1.9 倍，GPU 核内神经加速器加持，本地跑大模型成为标配卖点](https://www.apple.com/newsroom/2026/10/apple-introduces-the-new-14-inch-macbook-pro-with-m6/) | Apple 官方 |

### 手机厂商（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-31 | [国行 Apple 智能官宣接入阿里千问：Siri 问答、系统级写作与视觉智能三线打通，11 月 4 日开发者 Beta 开测、12 月正式推送](https://zhidx.com/p/606181.html) | 智东西 |
| 2026-10-29 | [深兰联合华为鸿蒙生态发布全球首款大模型智能体工作手机 Wowoker：麒麟芯片+端侧大模型，「订阅智能体服务、硬件配套赠送」重构卖机模式](https://m.sohu.com/a/1095005561_120285954) | 搜狐 |
| 2026-10-28 | [华为终端发布会八款齐发：Pura 90 Plus 与畅享 100 全系登场，详解麒麟「韬」系列——逻辑折叠晶体管密度提升 28%、跨层带宽 125TB/s](https://zhidx.com/p/604988.html) | 智东西 |

### 大模型厂商（7 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-30 | [小米开源 0.8B 文档理解模型 Xiaomi-OCR-0：单一模型覆盖解析/抽取/问答三任务，OmniDocBench 1B 以下第一](https://github.com/xiaomi-research/Xiaomi-OCR-0) | GitHub（xiaomi-research） |
| 2026-10-29 | [谷歌发布 Gemini 4 Carbon：面向持续智能体工作流的新旗舰，综合榜登顶超越 Opus 5.5 与 GPT-6 Astra，间接提示注入攻击零得手](https://zhidx.com/p/605392.html) | 智东西 |
| 2026-10-29 | [Mistral 开源 1T 参数 Large 4 权重：490 亿激活原生多模态，编程智能体 Token 消耗较 GLM-5.3 省 47%，欧洲最大开放权重旗舰落地](https://www.ithome.com/1/019/865.htm) | IT之家 |
| 2026-10-29 | [英伟达开源语音转录模型 Nemotron 3.5 Transcribe：340 亿参数 Mamba+MoE 混合架构，30 秒录音 0.13 秒转完](https://zhidx.com/p/605500.html) | 智东西 |
| 2026-10-28 | [面壁开源 MiniCPM-OCR 系列：1.3B 识别模型四项基准全球第一，首创 2B「AI 质检员」给 OCR 结果打分，12 芯片平台首日适配](https://github.com/OpenBMB/MiniCPM-V) | 面壁智能 |
| 2026-10-27 | [Liquid AI 单日放出 LFM3 全家族：三混合架构 2B 级 6 款覆盖文本/视觉/音频/Omni/决策，4-bit 约 1GB 内存，1.7B 平均分超 Qwen3.5-4B](https://www.liquid.ai/blog/lfm3) | Liquid AI 官方博客 |
| 2026-10-27 | [谷歌 DeepMind 发布 Genie 4 实时交互世界模型：原生音频+物理模拟，Gemini 在环驱动，定位机器人与智能体的安全训练环境](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-genie-4/) | Google Blog |

### 行业动态（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-28 | [AI PC 换机潮落空：AI 需求虹吸内存产能致全球 PC 出货暴跌 21%，DRAM 涨价 208% 倒逼售价攀升](https://tech.fxxz.com/article/9064.html) | 快科技 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[CovNav: Conformal Prediction-Guided Adaptive Inference for…](https://arxiv.org/abs/2610.27677)；[Context-Aware Prompt Injection Detection via Small Languag…](https://arxiv.org/abs/2610.28364)；[LLMs Prompted for Legal Context Refuse More: Overrefusal f…](https://arxiv.org/abs/2610.26211)；[MX-Like Tensor Core for LLM Inference with NPU Integration…](https://arxiv.org/abs/2610.26083)；[Muse Glimmer 30B: An On-Device Agentic Model](https://arxiv.org/abs/2610.24628)；[MedPAO-Assist: Edge-Deployable, Modality-Aware Agentic AI …](https://arxiv.org/abs/2610.26913)；[From Billion-Scale to Million-Scale Language Models: Opera…](https://arxiv.org/abs/2610.23534)；[FederatedBytes: Tokenizer-Free, Byte-Level Small Language …](https://arxiv.org/abs/2610.22906)；[MemLLM: End-to-end In-Storage Acceleration of On-device RA…](https://arxiv.org/abs/2610.22579)；[BiShield-TEE: On the (In-)Security of Unilateral Weight Ob…](https://arxiv.org/abs/2610.21565)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-02。
