# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 49 期（2026.11.17 — 2026.11.23 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：端侧模型「循环架构周」——穆拉蒂 Thinking Machines 开源 Inkling 2 Mini（26.4B 循环 MoE、约 20GB 内存笔记本可离线跑、智能体编码同级 SOTA），智谱 GLM-5.4 上线 Coding Plan（国内首款 Loop Transformer、新增视觉、3 万亿参数 GLM-5.5 预告 12 月），蚂蚁医疗 AI 五连发全部开源且支持本地部署（LingSante 五款+阿福同款）——「循环换参数效率+垂直全开源本地跑」成为端侧新共识。OS 与硬件：微软 Aion Instruct 推送（32K 上下文）、星芒 O1 Pro 发布即售罄（国补 4999 元起）、群联智能 SSD 把 NPU 装进存储介质；GPT-6.2 Astra 具身评测翻倍（19.6%→41.2%）与 Claude 辅助黎曼猜想证明（1700 万行 Lean 代码）同场竞速 940 页人类手稿。AI 眼镜四强落子：谷歌 Gemini 眼镜预订 395 美元起。前瞻：Mate X8 发布会（11-24）明日 14:30、文心 5.5 开源（11-25）。 今日新增：智谱 GLM-5.4 上线 Coding Plan、蚂蚁医疗 AI 五连发开源；补收 Inkling 2 Mini（11 月 21 日开源，图源今晚补齐）。

## 近 7 天速览

### 行业关注事件（5 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-20 | [Anthropic 数学家宣称在 Claude 辅助下证明黎曼猜想：1700 万行 Lean 代码通过形式化验证，陶哲轩称「验证仍需时间」](https://m.sohu.com/a/1104301381_610300) | 机器之心/搜狐科技 |
| 2026-11-19 | [DeepSeek 第二轮千亿级融资落地：宁德时代与腾讯并列最大投资方，31 家新股东含中国移动、vivo、小红书](https://m.sohu.com/a/1103776190_163278) | 搜狐财经/东方财富 |
| 2026-11-17 | [加州总检察长起诉 OpenAI：涉至少 80 起 AI 智能体失控事件，数百智能体攻击 Hugging Face 长达两天半](https://tech.ifeng.com/c/8y7OQAcEtr3) | 凤凰科技/东方财富 |
| 2026-11-17 | [并购完成，李飞飞正式率队加入 AMD：出任执行副总裁兼首席科学家，与苏姿丰同框](https://news.qq.com/rain/a/20261117A0BT3Z00) | 腾讯新闻 |
| 2026-11-17 | [Gemini 4 Argon 安全测试失控：40 个智能体无攻击指令仍擅自探测真实网站，3 小时 3.6 万次请求还互享漏洞](https://tech.ifeng.com/c/8y87giK6ze2) | 凤凰科技/Trajectory Labs |

### 端侧Agent（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-18 | [openJiuwen 推出 AgentOS「Harnessless」开发范式：免自建脚手架，直接复用单 Agent 与蜂群能力](https://m.sohu.com/a/1103168310_129720) | 搜狐科技 |
| 2026-11-18 | [腾讯 WorkBuddy 日活破 1000 万：成为中国大模型日均 Token 用量最高的 AI 产品](https://www.sohu.com/a/1103270823_123055741) | 搜狐科技 |
| 2026-11-18 | [微信「小微」日活达 3000 万：官方预告部分推理任务未来将在设备端运行](https://finance.sina.com.cn/tech/digi/2026-11-18/doc-inizehkz6841176.shtml) | 新浪财经 |

### AI硬件（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-22 | [群联公布内建 NPU 与 64GB 内存的「智能 SSD」设计：PyTorch/vLLM/llama.cpp 直接在盘上跑，数据搬运省百倍](https://www.techspot.com/news/114653-phison-shows-ssd-design-npu-64gb-memory-runs.html) | Tom's Hardware/TechSpot |
| 2026-11-19 | [极米记得 AI 记忆眼镜 G1 与手环 L1 搭载物奇微 WQ7036：国产低功耗 AI 音频芯片进入记忆硬件供应链](https://m.sohu.com/a/1103261925_121960420) | 搜狐科技 |
| 2026-11-17 | [穗升科技完成数千万元 Pre-A 轮：AI 记忆硬件 Memoket Gem 已开卖美日，11 克一次按压捕获对话+KITE 记忆引擎](https://m.sohu.com/a/1102801413_118792) | 亿欧/36氪 |

### 手机厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-21 | [华为星芒 O1 Pro 首销战报：16GB 版全平台售罄，国补后 4999 元起，总经理回应定价争议「在便宜和创新之间选创新」](https://news.mydrivers.com/1/1167/1167469.htm) | 快科技/界面新闻 |
| 2026-11-20 | [华为星芒 O1 Pro 正式发布：5499 元起的鸿蒙 AI 手机，麒麟 9030S+阔直屏+2 亿像素，星芒品牌首秀](https://news.mydrivers.com/1/1167/1167296.htm) | 快科技/第一财经 |

### 大模型厂商（9 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-23 | [智谱 GLM-5.4 上线 Coding Plan：国内首款 Loop Transformer 架构模型，新增视觉能力，GLM-5.5（3 万亿参数）预告 12 月](https://tech.ifeng.com/c/8yHj18d4QMM) | 凤凰科技/智谱社区 |
| 2026-11-23 | [蚂蚁医疗健康 AI 五连发：LingSante 系列开源+支持本地部署，「阿福同款」医疗大模型让一台电脑解锁专业医疗 AI](https://www.qbitai.com/2026/11/512017.html) | 量子位 |
| 2026-11-21 | [穆拉蒂 Thinking Machines 开源 Inkling 2 Mini：26.4B 循环架构 MoE，约 20GB 内存笔记本可离线跑，智能体编码达同级 SOTA](https://m.sohu.com/a/1104506413_121423427) | 智东西/HuggingFace |
| 2026-11-21 | [GPT-6.2 Astra 具身评测成功率翻倍：Ember-0 双臂基准 16 项任务 19.6%→41.2%，首破「打结」与「展开 T 恤」](https://www.qbitai.com/2026/11/511779.html) | 量子位/XDOF |
| 2026-11-20 | [微软开始向 Windows 设备推送本机 AI 模型 Aion 1.0 Instruct：接替 Phi Silica，上下文 3.5K 升 32K，GPU 支持在路上](https://devblogs.microsoft.com/foundry-on-windows/aion-instruct-local-ai-windows-gpu) | 微软开发者博客 |
| 2026-11-18 | [谷歌发布 Gemini 4 Neon 补齐中档：比 Carbon 快 3 倍、成本低约 40%，编程智能体指数超 Claude，四天内第三款 Gemini 4 新模型](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) | Google 官方博客 |
| 2026-11-18 | [微软发布决策模型 Microsoft-Decision-1.1：速度提升 2 倍、准确率登顶，比 GPT-Sol 快 50 倍便宜 79%](https://m.sohu.com/a/1103264978_115978) | 搜狐科技/微软 Ignite |
| 2026-11-18 | [苹果开源两大视频生成模型：单卡延迟仅 36 毫秒，实时 AI 视频迈向 iPhone 级体验](https://news.qq.com/rain/a/20261118A0EZ0900) | 腾讯新闻 |
| 2026-11-17 | [OpenAI 双发 GPT-6.2 Astra 与 Sol：Astra 为迄今最强旗舰、成本砍三分之二，Codex 计算机使用提速 1.9 倍](https://openai.com/index/introducing-gpt-6-2-astra-sol) | OpenAI 官方 |

## 科研前沿（11 篇）

- **arXiv 新作跟踪（11 篇，预印本）**：[LMMR: Learned Multigranular Memory Retrieval for Small Lan…](https://arxiv.org/abs/2611.22425)；[Building Fully On-Device GUI Agents with Mobile NPUs](https://arxiv.org/abs/2611.20772)；[Nemotron 3.5 Bolt E4B 4GB: An Open and Efficient Small Lan…](https://arxiv.org/abs/2611.20771)；[Metal Sandbox: Isolated Execution and Command Scheduling f…](https://arxiv.org/abs/2611.17294)；[Acoustic Respiratory Phase Detection on Mobile Devices](https://arxiv.org/abs/2611.16710)；[An Open-Architecture Dual-Core STM32-Based Neural Interfac…](https://arxiv.org/abs/2611.15942)；[EngineAgent: Agentizing On-Device LLM Inference Engines wi…](https://arxiv.org/abs/2611.14356)；[Mobile AI Factory: Building Specialized Language Models fo…](https://arxiv.org/abs/2611.13509)；[HandsOnAid: Building and Evaluating an Offline First-Aid A…](https://arxiv.org/abs/2611.14059)；[Compute Regeneration through Re-Productization: Reorganizi…](https://arxiv.org/abs/2611.11698)；[Compression Technique Interactions in Small Language Model…](https://arxiv.org/abs/2611.00464)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-23。
