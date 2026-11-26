# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 49 期（2026.11.20 — 2026.11.26 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：个人 AI 助理之战正面开打——字节「小豆」邀请制公测（盯消息、比价、替你打电话），阿里千问Go 免费代打电话同周开放，「从聊天到办事」成为大厂共识入口。黎曼猜想形式化证明一周内两连跳：先由 Claude 辅助完成 1700 万行 Lean 证明，再被重构压缩 99.56% 到 7.6 万行——普通电脑一两小时即可本地复现验证。车载与机器人端侧加速落子：蔚来世界模型 NWM 3.0 以隐式世界模型省去渲染获百倍级训练加速、座舱车控完成率提至 95.3%，小鹏 IRON 自主登台演讲（全栈大模型端侧部署），AMD 联手中科慧灵验证人形机器人「大小脑」双处理器架构。模型侧：文心 5.5 Flash 全量开源（280B MoE、Apache 2.0）、微信开源端侧统一模型 WePocketModel（一套 4B 权重检索/生成/决策三合一）、腾讯混元 DFly2 草稿模型零额外显存提速 4.2 倍、PrismML 三值 Bonsai 2.5 在 5.9GB 上打平 FP16 工具调用。AI 眼镜迎来监管与社会的双重拷问：韩国高考 AI 作弊风波致教育部长官辞职、德国消协起诉 Meta 智能眼镜——「录制提示」正从卖点变门槛。 今日新增：黎曼证明压缩至 7.6 万行、蔚来世界模型 3.0、混元开源 DFly2 与 Hy4 flash 量化权重（224B 进 64GB Mac mini）、字节小豆公测、鸿蒙终端破亿与元OS 架构、纽约 AI 玩具禁令；论文板块周四换血 10 篇（端侧个性化、KV 缓存加速、MoE 内存路由、权重编程复现等）。

## 近 7 天速览

### 行业关注事件（10 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-26 | [黎曼猜想证明「瘦身」成功：Anthropic 研究员用 Claude 把 1700 万行 Lean 代码重构到 7.6 万行，压缩 99.56%](https://www.qbitai.com/2026/11/512819.html) | 量子位/Anthropic |
| 2026-11-25 | [Elliptic Labs 签署智能眼镜概念验证协议：超声波+端侧 AI 实现佩戴检测与触控手势，不加硬件传感器](https://www.vrtuoluo.cn/546527.html) | Elliptic Labs官方/VR陀螺 |
| 2026-11-25 | [智元「灵心」平台上线一年孵化超 3 万个机器人智能体：2 万多用户、7 万多条平台内容](https://www.qbitai.com/2026/11/512715.html) | 量子位（智元灵心供稿） |
| 2026-11-25 | [HarmonyOS 创新技术沟通会：鸿蒙终端设备数破 1 亿跨越「梅特卡夫拐点」，元OS 架构亮相](https://m.ithome.com/html/1032495.htm) | IT之家/搜狐科技 |
| 2026-11-24 | [德国消费者保护协会起诉 Meta 与依视路陆逊梯卡：Ray-Ban 摄像头智能眼镜销售未告知「公共场所无法合规使用」](https://www.sohu.com/a/1106153787_114760) | IT之家/搜狐科技 |
| 2026-11-24 | [纽约州签署全美首个 AI 聊天玩具禁令：五年禁止制造分销销售，违规每日最高罚 1.5 万美元](https://tech.ifeng.com/c/8yMKDYlxVpB) | 纽约州长办公室/凤凰科技 |
| 2026-11-24 | [辛米尔科技业界首提「端侧超节点」：数据中心超节点架构下沉端侧，异构设备组队计算吞吐量提升 270%](https://www.qbitai.com/2026/11/512362.html) | 量子位/机器之心 |
| 2026-11-22 | [韩国高考 AI 眼镜作弊风波：111 起电子设备违规，教育部长官崔教振引咎辞职](https://news.qq.com/rain/a/20261124A0CJT300) | 腾讯新闻/凤凰网科技 |
| 2026-11-20 | [中汽中心推出国内首个智能座舱 AI 分级评价体系：C1 规则响应到 C5 全域智能五级，覆盖八大能力九大场景](https://www.sohu.com/a/1103929994_121345914) | 搜狐汽车/观点网 |
| 2026-11-20 | [Anthropic 数学家宣称在 Claude 辅助下证明黎曼猜想：1700 万行 Lean 代码通过形式化验证，陶哲轩称「验证仍需时间」](https://m.sohu.com/a/1104301381_610300) | 机器之心/搜狐科技 |

### AI硬件（6 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-26 | [蔚来发布世界模型 NWM 3.0：隐式世界模型省去渲染获百倍级训练加速，座舱车控任务完成率从 40% 提至 95.3%](https://www.qbitai.com/2026/11/512897.html) | 量子位/蔚来官方 |
| 2026-11-25 | [三星自研人形机器人再曝光：灵巧手单手 20 电机直驱，CES 2027 拟发布 HR/HE 两款](https://m.sohu.com/a/1106306959_549351) | 搜狐科技/IT之家 |
| 2026-11-25 | [小鹏科技日：人形机器人 IRON 自主登台双语演讲，三颗图灵 AI 芯片 2250 TOPS 支撑全栈大模型端侧部署](https://auto.sina.com.cn/jishu/2026-11-25/detail-inizxxye8572247.shtml) | 小鹏官网/新浪汽车 |
| 2026-11-23 | [蚂蚁阿福发布首批 AI 健康穿戴「福环」「福戒」：手环+戒指最长 14 天续航，AI 生成健康报告](https://m.sohu.com/a/1105140656_114760) | 界面新闻/搜狐科技 |
| 2026-11-22 | [群联公布内建 NPU 与 64GB 内存的「智能 SSD」设计：PyTorch/vLLM/llama.cpp 直接在盘上跑，数据搬运省百倍](https://www.techspot.com/news/114653-phison-shows-ssd-design-npu-64gb-memory-runs.html) | Tom's Hardware/TechSpot |
| 2026-11-21 | [特斯拉 FSD V15 开始推送：车机换上「世界模型缩小版」Reality View 实景视图，马斯克称效果像在玩 GTA](https://m.sohu.com/a/110553429_236796) | 搜狐科技/腾讯新闻 |

### 手机厂商（4 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-24 | [华为 Mate X8 发布：12999 元起全系麒麟 9050 Pro「逻辑折叠」芯片，18:08 开启预售，12 月上市](https://www.leiphone.com/category/industrynews/SA56oov1EKhe9sPs.html) | 雷峰网/凤凰科技 |
| 2026-11-23 | [荣耀 700 系列发布：YOYO 携手豆包，豆包首次进入荣耀产品名与唤醒词，国补 2899 元起](https://www.honor.com/cn/news/honor-700-launch/) | 荣耀官方/智东西 |
| 2026-11-21 | [华为星芒 O1 Pro 首销战报：16GB 版全平台售罄，国补后 4999 元起，总经理回应定价争议「在便宜和创新之间选创新」](https://news.mydrivers.com/1/1167/1167469.htm) | 快科技/界面新闻 |
| 2026-11-20 | [华为星芒 O1 Pro 正式发布：5499 元起的鸿蒙 AI 手机，麒麟 9030S+阔直屏+2 亿像素，星芒品牌首秀](https://news.mydrivers.com/1/1167/1167296.htm) | 快科技/第一财经 |

### 大模型厂商（12 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-26 | [腾讯混元开源草稿模型 DFly2：与目标模型共享 KV 缓存零额外显存，长文与智能体场景加速最高 4.2 倍](https://www.ithome.com/1/032/929.htm) | IT之家/腾讯混元 |
| 2026-11-25 | [百度如期全量开源文心 5.5 Flash Preview：280B MoE Apache 2.0 可商用，HuggingFace 与 ModelScope 同步上架](https://www.oschina.net/news/503792) | 百度官方/开源中国 |
| 2026-11-25 | [千问Go 全面开放免费「代打电话」：订餐厅、找快递、寻失物都交给 AI，通话先亮明身份](https://www.leiphone.com/category/industrynews/L9rc3Khgc8pFgYtD.html) | 雷峰网/IT之家 |
| 2026-11-25 | [PrismML 开源三值 Bonsai 2.5 27B：5.9GB 体积工具调用打平 FP16，智能体编码恢复至九成](https://prismml.com/news/bonsai-2-5-27b) | PrismML官方/Mezha |
| 2026-11-25 | [腾讯混元开源 Hy4 flash GGUF 量化权重与推理代码：224B 模型塞进 64GB Mac mini，最小版本仅原体积 30%](https://www.oschina.net/news/503813) | 开源中国/凤凰网 |
| 2026-11-24 | [字节豆包个人智能体「小豆」开启邀请制公测：盯消息、比价、订票、替你打电话，与千问Go 正面相撞](https://m.36kr.com/p/4083578123184773) | 36氪/每日经济新闻 |
| 2026-11-23 | [智谱 GLM-5.4 上线 Coding Plan：国内首款 Loop Transformer 架构模型，新增视觉能力，GLM-5.5（3 万亿参数）预告 12 月](https://tech.ifeng.com/c/8yHj18d4QMM) | 凤凰科技/智谱社区 |
| 2026-11-23 | [蚂蚁医疗健康 AI 五连发：LingSante 系列开源+支持本地部署，「阿福同款」医疗大模型让一台电脑解锁专业医疗 AI](https://www.qbitai.com/2026/11/512017.html) | 量子位 |
| 2026-11-23 | [微信 AI 开源端侧统一模型 WePocketModel：一套 4B 权重兼顾检索、生成与决策，三模型 21GB 压到 8GB](https://m.sohu.com/a/1105381748_129720) | 机器之心/搜狐科技 |
| 2026-11-21 | [穆拉蒂 Thinking Machines 开源 Inkling 2 Mini：26.4B 循环架构 MoE，约 20GB 内存笔记本可离线跑，智能体编码达同级 SOTA](https://m.sohu.com/a/1104506413_121423427) | 智东西/HuggingFace |
| 2026-11-21 | [GPT-6.2 Astra 具身评测成功率翻倍：Ember-0 双臂基准 16 项任务 19.6%→41.2%，首破「打结」与「展开 T 恤」](https://www.qbitai.com/2026/11/511779.html) | 量子位/XDOF |
| 2026-11-20 | [微软开始向 Windows 设备推送本机 AI 模型 Aion 1.0 Instruct：接替 Phi Silica，上下文 3.5K 升 32K，GPU 支持在路上](https://devblogs.microsoft.com/foundry-on-windows/aion-instruct-local-ai-windows-gpu) | 微软开发者博客 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[LogToPersona: New Benchmark and Efficient Persona Predicti…](https://arxiv.org/abs/2611.33510)；[Correct Precedents Induce Policy Violations in On-Device L…](https://arxiv.org/abs/2611.27216)；[Decision models for UAVBench and the viability of edge dep…](https://arxiv.org/abs/2611.28331)；[CarrierKV: An Edge LLM Accelerator with Positional Carrier…](https://arxiv.org/abs/2611.26857)；[LEDGE: An Efficient Simulator for Distributed LLM Serving …](https://arxiv.org/abs/2611.24085)；[Learning through Discernment: when a small language model …](https://arxiv.org/abs/2611.23716)；[Replicating and Extending Weight-Space Programming: Fronti…](https://arxiv.org/abs/2611.21449)；[TRACK: Tool-Augmented Reasoning over Time Series for Fault…](https://arxiv.org/abs/2611.21178)；[CECAR: Cache & Expert Co-Aware Routing Accelerates On-Devi…](https://arxiv.org/abs/2611.20119)；[LazyWeights: Decode-on-Demand Edge LLMs](https://arxiv.org/abs/2611.17108)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-26。
