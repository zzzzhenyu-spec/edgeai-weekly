# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 49 期（2026.11.20 — 2026.11.26 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：百度如期兑现承诺，文心 5.5 Flash Preview 全量开源（280B MoE、Apache 2.0 可商用，HuggingFace 与 ModelScope 同步上架，支持 vLLM/SGLang 部署）——国产旗舰开源权重再添一档。端侧模型「循环架构」落地三连：Inkling 2 Mini（26.4B 循环 MoE、约 20GB 内存笔记本离线跑）、智谱 GLM-5.4 Coding Plan（国内首款 Loop Transformer），「用循环换参数效率」渐成共识。硬件侧：华为 Mate X8（麒麟 9050 Pro 逻辑折叠芯片）、机械革命 RTX Spark 主机（128GB 统一内存本地跑 2500 亿参数）开卖；迈特芯 MEGA188 3D-TPU 回片点亮（3D 堆叠 DRAM 峰值带宽 600GB/s、5W 下跑 Qwen3-8B 达 80 TPS），与群联「智能 SSD」同周——算力正向存储层下沉。特斯拉 FSD V15 开始推送，车机换上世界模型缩小版 Reality View 实景视图；另有谷歌 Genie 4 开发者开放、中汽中心座舱 AI 分级（C1-C5）、Claude 辅助黎曼猜想证明（1700 万行 Lean 代码）、蚂蚁医疗 AI 五连发开源。千问Go「代打电话」全面免费开放（AI 智能体开始承包订餐厅、找快递这类真实通话事务）；辛米尔科技业界首提「端侧超节点」（异构端侧设备组队计算，吞吐量+270% 为厂商口径）。微信 AI 开源端侧统一模型 WePocketModel（一套 4B 权重兼顾检索、生成、决策，三模型 21GB 压到 8GB）；PrismML 三值 Bonsai 2.5 27B 在 5.9GB 体积上把智能体工具调用拉回 FP16 水平；蚂蚁阿福发布「福环」「福戒」AI 健康穿戴（最长 14 天续航），Elliptic Labs 签署智能眼镜超声波手势概念验证协议，华为 Mate X8 配备行业首个 30B 端侧 MoE（小艺简报/智拍/修图全本地），三星人形机器人灵巧手曝光（单手 20 电机，CES 2027 拟发 HR/HE 两款）。 今日新增：微信 WePocketModel 开源、蚂蚁福环福戒、PrismML Bonsai 2.5、Elliptic Labs 眼镜手势、三星人形机器人灵巧手、千问Go 免费代打电话、端侧超节点首提、文心 5.5 全量开源、特斯拉 FSD V15、迈特芯 MEGA188。

## 近 7 天速览

### 行业关注事件（4 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-25 | [Elliptic Labs 签署智能眼镜概念验证协议：超声波+端侧 AI 实现佩戴检测与触控手势，不加硬件传感器](https://www.vrtuoluo.cn/546527.html) | Elliptic Labs官方/VR陀螺 |
| 2026-11-24 | [辛米尔科技业界首提「端侧超节点」：数据中心超节点架构下沉端侧，异构设备组队计算吞吐量提升 270%](https://www.qbitai.com/2026/11/512362.html) | 量子位/机器之心 |
| 2026-11-20 | [中汽中心推出国内首个智能座舱 AI 分级评价体系：C1 规则响应到 C5 全域智能五级，覆盖八大能力九大场景](https://www.sohu.com/a/1103929994_121345914) | 搜狐汽车/观点网 |
| 2026-11-20 | [Anthropic 数学家宣称在 Claude 辅助下证明黎曼猜想：1700 万行 Lean 代码通过形式化验证，陶哲轩称「验证仍需时间」](https://m.sohu.com/a/1104301381_610300) | 机器之心/搜狐科技 |

### AI硬件（4 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-25 | [三星自研人形机器人再曝光：灵巧手单手 20 电机直驱，CES 2027 拟发布 HR/HE 两款](https://m.sohu.com/a/1106306959_549351) | 搜狐科技/IT之家 |
| 2026-11-23 | [蚂蚁阿福发布首批 AI 健康穿戴「福环」「福戒」：手环+戒指最长 14 天续航，AI 生成健康报告](https://m.sohu.com/a/1105140656_114760) | 界面新闻/搜狐科技 |
| 2026-11-22 | [群联公布内建 NPU 与 64GB 内存的「智能 SSD」设计：PyTorch/vLLM/llama.cpp 直接在盘上跑，数据搬运省百倍](https://www.techspot.com/news/114653-phison-shows-ssd-design-npu-64gb-memory-runs.html) | Tom's Hardware/TechSpot |
| 2026-11-21 | [特斯拉 FSD V15 开始推送：车机换上「世界模型缩小版」Reality View 实景视图，马斯克称效果像在玩 GTA](https://m.sohu.com/a/110553429_236796) | 搜狐科技/腾讯新闻 |

### 手机厂商（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-24 | [华为 Mate X8 发布：12999 元起全系麒麟 9050 Pro「逻辑折叠」芯片，18:08 开启预售，12 月上市](https://www.leiphone.com/category/industrynews/SA56oov1EKhe9sPs.html) | 雷峰网/凤凰科技 |
| 2026-11-21 | [华为星芒 O1 Pro 首销战报：16GB 版全平台售罄，国补后 4999 元起，总经理回应定价争议「在便宜和创新之间选创新」](https://news.mydrivers.com/1/1167/1167469.htm) | 快科技/界面新闻 |
| 2026-11-20 | [华为星芒 O1 Pro 正式发布：5499 元起的鸿蒙 AI 手机，麒麟 9030S+阔直屏+2 亿像素，星芒品牌首秀](https://news.mydrivers.com/1/1167/1167296.htm) | 快科技/第一财经 |

### 大模型厂商（9 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-25 | [百度如期全量开源文心 5.5 Flash Preview：280B MoE Apache 2.0 可商用，HuggingFace 与 ModelScope 同步上架](https://www.oschina.net/news/503792) | 百度官方/开源中国 |
| 2026-11-25 | [千问Go 全面开放免费「代打电话」：订餐厅、找快递、寻失物都交给 AI，通话先亮明身份](https://www.leiphone.com/category/industrynews/L9rc3Khgc8pFgYtD.html) | 雷峰网/IT之家 |
| 2026-11-25 | [PrismML 开源三值 Bonsai 2.5 27B：5.9GB 体积工具调用打平 FP16，智能体编码恢复至九成](https://prismml.com/news/bonsai-2-5-27b) | PrismML官方/Mezha |
| 2026-11-23 | [智谱 GLM-5.4 上线 Coding Plan：国内首款 Loop Transformer 架构模型，新增视觉能力，GLM-5.5（3 万亿参数）预告 12 月](https://tech.ifeng.com/c/8yHj18d4QMM) | 凤凰科技/智谱社区 |
| 2026-11-23 | [蚂蚁医疗健康 AI 五连发：LingSante 系列开源+支持本地部署，「阿福同款」医疗大模型让一台电脑解锁专业医疗 AI](https://www.qbitai.com/2026/11/512017.html) | 量子位 |
| 2026-11-23 | [微信 AI 开源端侧统一模型 WePocketModel：一套 4B 权重兼顾检索、生成与决策，三模型 21GB 压到 8GB](https://m.sohu.com/a/1105381748_129720) | 机器之心/搜狐科技 |
| 2026-11-21 | [穆拉蒂 Thinking Machines 开源 Inkling 2 Mini：26.4B 循环架构 MoE，约 20GB 内存笔记本可离线跑，智能体编码达同级 SOTA](https://m.sohu.com/a/1104506413_121423427) | 智东西/HuggingFace |
| 2026-11-21 | [GPT-6.2 Astra 具身评测成功率翻倍：Ember-0 双臂基准 16 项任务 19.6%→41.2%，首破「打结」与「展开 T 恤」](https://www.qbitai.com/2026/11/511779.html) | 量子位/XDOF |
| 2026-11-20 | [微软开始向 Windows 设备推送本机 AI 模型 Aion 1.0 Instruct：接替 Phi Silica，上下文 3.5K 升 32K，GPU 支持在路上](https://devblogs.microsoft.com/foundry-on-windows/aion-instruct-local-ai-windows-gpu) | 微软开发者博客 |

## 科研前沿（11 篇）

- **arXiv 新作跟踪（11 篇，预印本）**：[LMMR: Learned Multigranular Memory Retrieval for Small Lan…](https://arxiv.org/abs/2611.22425)；[Building Fully On-Device GUI Agents with Mobile NPUs](https://arxiv.org/abs/2611.20772)；[Nemotron 3.5 Bolt E4B 4GB: An Open and Efficient Small Lan…](https://arxiv.org/abs/2611.20771)；[Metal Sandbox: Isolated Execution and Command Scheduling f…](https://arxiv.org/abs/2611.17294)；[Acoustic Respiratory Phase Detection on Mobile Devices](https://arxiv.org/abs/2611.16710)；[An Open-Architecture Dual-Core STM32-Based Neural Interfac…](https://arxiv.org/abs/2611.15942)；[EngineAgent: Agentizing On-Device LLM Inference Engines wi…](https://arxiv.org/abs/2611.14356)；[Mobile AI Factory: Building Specialized Language Models fo…](https://arxiv.org/abs/2611.13509)；[HandsOnAid: Building and Evaluating an Offline First-Aid A…](https://arxiv.org/abs/2611.14059)；[Compute Regeneration through Re-Productization: Reorganizi…](https://arxiv.org/abs/2611.11698)；[Compression Technique Interactions in Small Language Model…](https://arxiv.org/abs/2611.00464)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-26。
