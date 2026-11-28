# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 49 期（2026.11.22 — 2026.11.28 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：操作系统层成为新战场——开源鸿蒙社区发布首个具身智能操作系统 RoboOH 2.0（本体抽象层让机器人换本体不必重写软件栈），上海海思同场介绍 Hi-OHOS 平台（星闪＋端侧 AI 下沉为系统框架，瞄准百亿 IoT 终端）。个人 AI 助理之战正面开打：字节「小豆」公测、千问Go 免费代打电话、支付宝车载助手 3.0 把入口延伸到车机（语音点外卖、声纹核身支付，80 多个品牌定点）。车载与机器人端侧加速：蔚来 NWM 3.0 隐式世界模型百倍级加速、小鹏 IRON 自主登台、蚂蚁灵波开源「空间记忆」原生基模（机器人端侧毫秒级实测）、小米汽车世界模型 2.0 公开实时渲染（1260 万段视频训练）、宇树「身外化身 V3.0」全身遥操（同步率 99.8%、延时 80 毫秒）。国产 AI 主机添新路线：峰瞰 PeakStation 以智驾芯片改造对标 DGX Spark（近 500 TOPS、96GB 显存）。黎曼证明压缩 99.56% 至 7.6 万行可本地复现；文心 5.5 Flash、WePocketModel、DFly2 等模型侧开源密集。AI 眼镜遭遇监管三连（韩国、德国、荷兰求禁售 Meta）——「录制提示」正从卖点变门槛。 今日新增：RoboOH 2.0 具身智能操作系统、海思 Hi-OHOS 平台；昨日补收：小米汽车世界模型 2.0、宇树身外化身 V3.0 遥操、峰瞰 PeakStation 国产 AI 主机。

## 近 7 天速览

### 行业关注事件（10 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-26 | [黎曼猜想证明「瘦身」成功：Anthropic 研究员用 Claude 把 1700 万行 Lean 代码重构到 7.6 万行，压缩 99.56%](https://www.qbitai.com/2026/11/512819.html) | 量子位/Anthropic |
| 2026-11-26 | [荷兰三家机构入禀法院求禁售 Meta 智能眼镜：指违反欧洲隐私法，12 月中旬简易判决](https://tech.ifeng.com/c/8yNPIyAsIHX) | 凤凰科技/C114 |
| 2026-11-25 | [Elliptic Labs 签署智能眼镜概念验证协议：超声波+端侧 AI 实现佩戴检测与触控手势，不加硬件传感器](https://www.vrtuoluo.cn/546527.html) | Elliptic Labs官方/VR陀螺 |
| 2026-11-25 | [智元「灵心」平台上线一年孵化超 3 万个机器人智能体：2 万多用户、7 万多条平台内容](https://www.qbitai.com/2026/11/512715.html) | 量子位（智元灵心供稿） |
| 2026-11-25 | [HarmonyOS 创新技术沟通会：鸿蒙终端设备数破 1 亿跨越「梅特卡夫拐点」，元OS 架构亮相](https://m.ithome.com/html/1032495.htm) | IT之家/搜狐科技 |
| 2026-11-24 | [德国消费者保护协会起诉 Meta 与依视路陆逊梯卡：Ray-Ban 摄像头智能眼镜销售未告知「公共场所无法合规使用」](https://www.sohu.com/a/1106153787_114760) | IT之家/搜狐科技 |
| 2026-11-24 | [纽约州签署全美首个 AI 聊天玩具禁令：五年禁止制造分销销售，违规每日最高罚 1.5 万美元](https://tech.ifeng.com/c/8yMKDYlxVpB) | 纽约州长办公室/凤凰科技 |
| 2026-11-24 | [辛米尔科技业界首提「端侧超节点」：数据中心超节点架构下沉端侧，异构设备组队计算吞吐量提升 270%](https://www.qbitai.com/2026/11/512362.html) | 量子位/机器之心 |
| 2026-11-24 | [IDC 发布 2027 中国智能眼镜十大洞察：具备本地 AI 推理能力的产品占比将升至 50%，NPU 迎来标配化](https://www.ithome.com/1/031/553.htm) | IDC 官方/IT之家 |
| 2026-11-22 | [韩国高考 AI 眼镜作弊风波：111 起电子设备违规，教育部长官崔教振引咎辞职](https://news.qq.com/rain/a/20261124A0CJT300) | 腾讯新闻/凤凰网科技 |

### 端侧Agent（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-27 | [支付宝车载助手 3.0 发布：语音点外卖、付充电费，声纹核身支付上车，80 多个品牌定点合作](https://www.ithome.com/1/033/541.htm) | IT之家/雷峰网 |

### AI硬件（11 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-28 | [开源鸿蒙社区发布首个具身智能操作系统 RoboOH 2.0：RoboMaestro 运行底座＋RoboFrame 本体抽象层，支持双足四足轮式旋翼](https://www.ithome.com/1/033/980.htm) | IT之家/快科技 |
| 2026-11-27 | [蚂蚁灵波开源两款「空间记忆」原生基模：LingBot-Map 2.0 建图可随时纠偏，LingBot-Navi 记忆跨任务复用，机器人端侧可跑](https://www.qbitai.com/2026/11/513227.html) | 量子位/雷峰网 |
| 2026-11-27 | [小米汽车世界模型 2.0 发布并公开实时渲染演示：支持 1-7 路摄像头视角，训练语料 1260 万段视频](https://www.ithome.com/1/033/919.htm) | IT之家/小米汽车 |
| 2026-11-27 | [宇树发布全身实时遥操「身外化身 V3.0 守护」：同步率最高 99.8%、端到端延时最低 80 毫秒](https://www.chinastarmarket.cn/detail/2547022) | 科创板日报/什么值得买 |
| 2026-11-26 | [蔚来发布世界模型 NWM 3.0：隐式世界模型省去渲染获百倍级训练加速，座舱车控任务完成率从 40% 提至 95.3%](https://www.qbitai.com/2026/11/512897.html) | 量子位/蔚来官方 |
| 2026-11-26 | [峰瞰智能高交会发布桌面级国产 AI 主机 PeakStation：智驾芯片改造近 500 TOPS、96GB 显存，对标 DGX Spark](https://www.jazzyear.com/article_info.html?id=1915) | 甲子光年（独家） |
| 2026-11-25 | [三星自研人形机器人再曝光：灵巧手单手 20 电机直驱，CES 2027 拟发布 HR/HE 两款](https://m.sohu.com/a/1106306959_549351) | 搜狐科技/IT之家 |
| 2026-11-25 | [小鹏科技日：人形机器人 IRON 自主登台双语演讲，三颗图灵 AI 芯片 2250 TOPS 支撑全栈大模型端侧部署](https://auto.sina.com.cn/jishu/2026-11-25/detail-inizxxye8572247.shtml) | 小鹏官网/新浪汽车 |
| 2026-11-23 | [蚂蚁阿福发布首批 AI 健康穿戴「福环」「福戒」：手环+戒指最长 14 天续航，AI 生成健康报告](https://m.sohu.com/a/1105140656_114760) | 界面新闻/搜狐科技 |
| 2026-11-22 | [群联公布内建 NPU 与 64GB 内存的「智能 SSD」设计：PyTorch/vLLM/llama.cpp 直接在盘上跑，数据搬运省百倍](https://www.techspot.com/news/114653-phison-shows-ssd-design-npu-64gb-memory-runs.html) | Tom's Hardware/TechSpot |
| 2026-11-22 | [马斯克确认特斯拉 AI5 芯片优先给 Optimus：算力约 AI4 的 12 倍、内存约 96GB，汽车继续用 AI4](https://news.qq.com/rain/a/20261125A046S600) | 快科技/IT之家 |

### 芯片厂商（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-28 | [上海海思介绍 Hi-OHOS 平台：星闪＋端侧 AI＋超高清音视频融入开源鸿蒙，瞄准百亿量级 IoT 终端轻智能升级](https://www.ithome.com/1/033/928.htm) | IT之家 |

### 手机厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-11-24 | [华为 Mate X8 发布：12999 元起全系麒麟 9050 Pro「逻辑折叠」芯片，18:08 开启预售，12 月上市](https://www.leiphone.com/category/industrynews/SA56oov1EKhe9sPs.html) | 雷峰网/凤凰科技 |
| 2026-11-23 | [荣耀 700 系列发布：YOYO 携手豆包，豆包首次进入荣耀产品名与唤醒词，国补 2899 元起](https://www.honor.com/cn/news/honor-700-launch/) | 荣耀官方/智东西 |

### 大模型厂商（9 条）

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

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[LogToPersona: New Benchmark and Efficient Persona Predicti…](https://arxiv.org/abs/2611.33510)；[Correct Precedents Induce Policy Violations in On-Device L…](https://arxiv.org/abs/2611.27216)；[Decision models for UAVBench and the viability of edge dep…](https://arxiv.org/abs/2611.28331)；[CarrierKV: An Edge LLM Accelerator with Positional Carrier…](https://arxiv.org/abs/2611.26857)；[LEDGE: An Efficient Simulator for Distributed LLM Serving …](https://arxiv.org/abs/2611.24085)；[Learning through Discernment: when a small language model …](https://arxiv.org/abs/2611.23716)；[TRACK: Tool-Augmented Reasoning over Time Series for Fault…](https://arxiv.org/abs/2611.21178)；[CECAR: Cache & Expert Co-Aware Routing Accelerates On-Devi…](https://arxiv.org/abs/2611.20119)；[LazyWeights: Decode-on-Demand Edge LLMs](https://arxiv.org/abs/2611.17108)；[TQIR: Trellis Quantization with Integer Reconstruction for…](https://arxiv.org/abs/2611.15231)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（每周知识点与排期 + 博客与厂商动态 + GitHub 端侧框架与高星仓库）

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-11-28。
