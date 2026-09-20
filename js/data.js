/* ============================================================
 * 端侧AI周报 · 数据文件
 * 每周更新流程：
 *   1) 运行 scripts\fetch_papers.ps1  -> data\papers_candidates.json
 *   2) 运行 scripts\fetch_news.ps1    -> data\news_candidates.json
 *   3) 运行 scripts\check_dblp.ps1    -> 核对正式发表 venue
 *   4) 人工筛选(资讯择要 / 论文取 SCI二区+ 或 CCF-B+ 会议,
 *      预印本标记跟踪) 后整理进本文件对应数组
 * ============================================================ */
const WEEKLY_DATA = {

  meta: {
    issue: "2026 · 第 38 期",
    weekRange: "2026.09.14 — 09.20",
    updated: "2026-09-20",
    editorsNote: "本周端侧AI迎来芯片密集发布窗口：联发科 9 月 15 日抢先推出全球首款 2nm 手机 SoC 天玑 9600 Pro，双 NPU 原生面向智能体（Agentic）AI；高通骁龙峰会 9 月 22 日开幕，8 Elite Gen 6 双芯片将至，Hexagon NPU 为端侧智能体重构。整机侧，字节豆包 AI 手机 NaviX Ultra 亮相、小米 18 Fold 内置端侧模型。学术侧，本周 arXiv 端侧方向新作集中于推理系统、SLM 工具调用与 TEE 安全三大赛道。"
  },

  /* ---------------- 板块一：本周资讯 ---------------- */
  news: [
    {
      id: "n1", cat: "芯片厂商", source: "联发科新闻室 / TechPowerUp", date: "2026-09-15",
      title: "联发科发布天玑 9600 Pro：全球首款 2nm 手机芯片，双 NPU 面向端侧智能体",
      summary: "首发 2nm 工艺，多核功耗降低 61%、单核性能提升约 17%；全新双 NPU AI 引擎专为端侧与 Agentic AI 负载设计，是端侧 AI 算力竞赛的标志性节点。",
      detail: "联发科 9 月 15 日于新竹宣布推出 Dimensity 9600 Pro，成为全球首款量产 2nm 手机 SoC。\n三大看点：其一，2nm 工艺带来多核功耗 61% 的降幅与约 17% 的单核性能提升；其二，全新双 NPU AI 引擎针对端侧生成式与智能体（Agentic）AI 工作负载优化，支撑本地多模态推理；其三，游戏、影像与计算能效全面升级。\n该芯片把「2nm 制程竞赛」与「端侧智能体竞赛」同时推向新高度，首批搭载机型预计四季度亮相。",
      tags: ["天玑 9600 Pro", "2nm", "双NPU", "Agentic AI"],
      url: "https://www.mediatek.com/press-room", highlight: true
    },
    {
      id: "n2", cat: "芯片厂商", source: "Computerworld / Smartprix", date: "2026-09-10",
      title: "骁龙峰会 9·22 前瞻：8 Elite Gen 6 双芯片，Hexagon NPU 为端侧智能体重构",
      summary: "高通将于 9 月 22–24 日毛伊岛峰会发布 8 Elite Gen 6 与 Gen 6 Pro；Hexagon NPU 围绕 Agentic AI 重构，Oryon CPU 传闻主频 5.11GHz，台积电 3nm 工艺。",
      detail: "据 Computerworld 9 月 10 日报道，高通将在 Snapdragon Summit 2026（9 月 22–24 日，夏威夷毛伊岛）发布 Snapdragon 8 Elite Gen 6 与 Gen 6 Pro 两款旗舰平台。\n最大看点是 Hexagon NPU 正围绕「智能体式」端侧 AI 重构——高通的公开策略是「把更多算力、内存与 AI 能力留在手机本地」。\n泄露规格包括 5.11GHz 的 Oryon CPU、台积电 3nm 工艺与显著提升的 GPU 性能；Pro 版本（SM8975）定位更高价档。端侧 Agentic AI 将成为本轮旗舰 SoC 的核心战场。",
      tags: ["Snapdragon Summit 2026", "8 Elite Gen 6", "Hexagon NPU", "3nm"],
      url: "https://www.computerworld.com", highlight: true
    },
    {
      id: "n3", cat: "手机厂商", source: "新浪财经", date: "2026-09-17",
      title: "「端侧AI之战正式打响」：字节豆包 AI 手机 NaviX Ultra 亮相",
      summary: "新浪财经 9 月 17 日刊文盘点：豆包 AI 手机 NaviX Ultra 于 9 月 16 日正式亮相，端侧大模型上机竞争进入白热化。",
      detail: "新浪财经 9 月 17 日发表《端侧AI之战正式打响》，盘点本周端侧 AI 整机动态：字节跳动旗下豆包 AI 手机 NaviX Ultra 于 9 月 16 日正式亮相；苹果 Apple 智能 + 全新 Siri AI 已在 WWDC26 发布；刚刚上市的小米 18 Fold 内置 Xiaomi 端侧模型。\n文章指出，2026 年被业内视为「端侧AI落地元年」——旗舰手机已可在断网状态下本地运行百亿参数级大模型，竞争焦点从单纯算力转向「模型 + 芯片 + 系统」的整体整合。",
      tags: ["豆包", "NaviX Ultra", "AI手机"], 
      url: "https://finance.sina.com.cn", highlight: true
    },
    {
      id: "n4", cat: "手机厂商", source: "新浪财经（综合）", date: "2026-09-16",
      title: "小米 18 Fold 上市：内置 Xiaomi 端侧大模型",
      summary: "新上市的小米 18 Fold 折叠旗舰内置 Xiaomi 端侧大模型，结合折叠大屏的多任务与办公场景提供本地 AI 能力，是国产「模型上机」的又一落地样本。",
      detail: "小米 18 Fold 作为本周上市的新旗舰，内置 Xiaomi 端侧大模型。在折叠屏大屏形态下，端侧模型承担离线问答、文档处理、跨应用调度等本地任务。\n结合行业节奏，2026 年下半年国产旗舰普遍进入「百亿参数端侧模型 + 专用 NPU」配置区间，端侧能力正成为高端机型的标准卖点与差异化战场。",
      tags: ["小米 18 Fold", "端侧模型", "折叠屏"],
      url: "https://finance.sina.com.cn"
    },
    {
      id: "n5", cat: "大模型厂商", source: "Apple Machine Learning Research", date: "2026-06-08",
      title: "苹果 AFM 3 家族：20B MoE 全端侧模型与 Foundation Models 框架",
      summary: "WWDC26 发布 5 款 AFM3 基础模型：AFM 3 Core 为 3B 稠密端侧模型，AFM 3 Core Advanced 为约 20B 稀疏（MoE）架构、全端侧运行；Siri AI 与实时端侧语音合成同步亮相。",
      detail: "苹果在 WWDC26 公开第三代基础模型 AFM 3 家族，共 5 款：AFM 3 Core 为 3B 参数稠密模型，完全在设备端运行；AFM 3 Core Advanced 采用约 20B 参数稀疏（MoE）架构，同样全部端侧运行，是苹果迄今最强大的端侧模型。\nSiri AI 全面升级，其中 Siri Expressive Voices 由 AFM 3 Core Advanced 驱动、完全在设备上实时合成语音；Siri 还被嵌入灵动岛，可下滑唤出。\n开发者可通过 Foundation Models 框架（Swift 原生 API）直接调用与 Apple Intelligence 同源的端侧模型。本周豆包、小米等动作均在与该路线对标。",
      tags: ["AFM3", "Apple Intelligence", "Siri AI", "MoE"],
      url: "https://machinelearning.apple.com"
    },
    {
      id: "n6", cat: "大模型厂商", source: "新京报 / 证券时报 / IT之家", date: "2026-07-19",
      title: "面壁智能：MiniCPM5-2B 发布、搭载三星旗舰，MiniCPM-V 4.6 定档 9 月",
      summary: "WAIC 2026 上面壁发布 MiniCPM5-2B 端侧文本模型与 MiniCPM-Robot 具身 VLA 模型；MiniCPM 系列确认搭载三星数款旗舰；1.3B 的 MiniCPM-V 4.6 端侧约 6GB 内存可运行，9 月发布会已官宣。",
      detail: "面壁智能 7 月在上海 WAIC 2026「智在终端」论坛发布 MiniCPM5-2B 端侧文本大模型（在 Artificial Analysis 指数上超越 4B 及以下量级对手）与首个具身智能系列 MiniCPM-Robot（VLA 模型）。\n商业化方面，MiniCPM 系列端侧模型将搭载三星数款旗舰机型上市，覆盖全球头部厂商。\n开源方面，5 月联合清华开源的 MiniCPM-V 4.6 仅 1.3B 参数、端侧约 6GB 内存即可运行，官方已官宣 9 月发布会，值得持续关注。",
      tags: ["MiniCPM", "面壁智能", "三星", "VLA"],
      url: "https://www.modelbest.cn"
    },
    {
      id: "n7", cat: "大模型厂商", source: "Qwen 官方（综合报道）", date: "2026-08-26",
      title: "Qwen 端侧侧写：Qwen3.5 小模型家族开源，Flash-Next 预览 Qwen4 架构",
      summary: "通义千问 3 月开源 Qwen3.5-0.8B/2B/4B/9B 四款小尺寸模型，可直接部署于笔记本等终端；8 月 26 日推出 Qwen3.8-Flash-Next，作为 Qwen4 架构的开放权重预览。",
      detail: "阿里通义千问在端侧小模型路线上持续加码：2026 年 3 月 2 日开源 Qwen3.5 小尺寸系列（0.8B / 2B / 4B / 9B），面向笔记本电脑等终端设备部署；8 月 26 日推出 Qwen3.8-Flash-Next（主模型 1250 亿参数，含 510 亿参数 n-gram 嵌入表），作为 Qwen4 架构的开放权重预览。\n开源小模型家族是国产端侧生态（手机、车机与第三方适配）的重要模型供给。",
      tags: ["Qwen3.5", "开源小模型", "通义千问"],
      url: "https://qwen.ai"
    },
    {
      id: "n8", cat: "芯片厂商", source: "Qualcomm Newsroom", date: "2026-09",
      title: "高通与 HUMAIN 推出 Horizon Ultra AI PC：CPU+GPU+NPU 融合的端侧 AI 整机",
      summary: "高通与沙特 HUMAIN 联合发布 Horizon Ultra AI PC，将 CPU、GPU 与 NPU 算力融合面向端侧 AI，首发搭载微软平台——端侧 AI 战场正从手机扩展到 PC 与边缘整机。",
      detail: "高通与 HUMAIN 联合推出 Horizon Ultra AI PC，作为 Horizon 产品线新旗舰，把 CPU、GPU 与 NPU 三类算力聚合面向端侧 AI 工作负载，并宣布与微软平台首发合作。\n该产品延续骁龙 X 系列在 PC 端侧 AI 的路线，进一步说明「端侧 AI」正从手机扩展到 PC、机器人与边缘服务器等多形态终端。",
      tags: ["AI PC", "骁龙 X", "HUMAIN"],
      url: "https://www.qualcomm.com/news"
    },
    {
      id: "n9", cat: "行业动态", source: "36氪 / 新浪科技", date: "2026-09-18",
      title: "行业观察：端侧AI进入规模化落地阶段，端云协同成为车端主流",
      summary: "机构观察：2025 年端侧模型备案超 200 款、2026 年预计达 360 款；车载大模型转向「云端复杂推理 + 车机小模型」；竞争核心从算力转向模型、芯片与系统的深度整合。",
      detail: "综合近期产业报道：其一，端侧 AI 正从概念验证迈向规模落地，2025 年端侧大模型备案已超 200 款，2026 年预计达 360 款；其二，车载场景转向端云协同——云端处理复杂推理、车机运行小模型，不再单纯比拼端侧参数量；其三，「模型变小变轻已不够」，关键在于模型与底层框架、芯片、设备场景的深度配合。\n这与本周天玑 9600 Pro、骁龙 8 Elite Gen 6 把 NPU 面向智能体重构的取向一致：算力、内存与系统软件栈的协同成为胜负手。",
      tags: ["行业观察", "端云协同", "规模化落地"],
      url: "https://www.36kr.com"
    },
    {
      id: "n10", cat: "行业动态", source: "网易科技", date: "2026-09-19",
      title: "大模型周报：阶跃星辰 Step 5 Preview（6000 亿参数）等密集迭代",
      summary: "本周大模型迭代密集：阶跃星辰跳过 4.X 直接发布 6000 亿参数 Step 5 Preview；AI 加速嵌入办公与操作系统，与端侧轻量化形成「两翼」格局。",
      detail: "网易科技 9 月 19 日汇总本周 AI 动态：阶跃星辰推出 Step 5 Preview，参数量 6000 亿，跳过 Step 4.X 直接进入 Step 5；AI 正加速嵌入办公软件与操作系统层。\n从端侧视角看，云端参数量竞赛与端侧轻量化并非对立——云端旗舰负责复杂推理与蒸馏教师，端侧小模型负责隐私、延迟敏感的日常任务，「端云协同」是 2026 年的主流叙事。",
      tags: ["阶跃星辰", "Step 5", "端云协同"],
      url: "https://www.163.com"
    }
  ],

  /* ---------------- 板块二：科研前沿 ----------------
   * 收录标准：SCI 二区以上期刊 / CCF-B 以上会议论文（group=published）
   * 本周 arXiv 新作作为预印本收录跟踪（group=recent），录用后转入已发表
   */
  papers: [
    {
      id: "p1", group: "recent", cat: "推理与系统", date: "2026-09-15",
      title: "End-to-End Latency-Minimizing and Load-Balanced Request Scheduling for Edge LLM Inference in Agentic AI Services",
      authors: "Zhen Li, Jun Cai, Haoran Gao 等",
      venue: "arXiv:2609.17193", level: "预印本",
      summary: "提出 LYREO 在线调度框架：跨时隙建模传输、prefill、迭代解码与 KV 缓存演化，用 Lyapunov 优化联合最小化端到端时延并均衡异构边缘服务器负载。",
      detail: "面向智能体 AI 服务的低时延需求，本文研究分布式边缘服务器上的 LLM 请求在线调度。两大难点：传统时延模型无法刻画多阶段 LLM 执行的细粒度动态；调度决策的时延后果要等请求完成才能观测。\n作者构建跨时隙推理模型（传输 / prefill / 迭代级解码 / KV 缓存演化），以「KV 缓存内存-时间消耗」度量服务器负载；LYREO 用 Lyapunov 优化转化长期负载均衡约束，并用奖励重分配 + 序列级回报预测把延迟结果变成及时的学习信号。多种配置仿真下，时延与负载均衡均优于代表性学习类与启发式基线。",
      tags: ["边缘推理", "请求调度", "Lyapunov 优化"],
      url: "https://arxiv.org/abs/2609.17193"
    },
    {
      id: "p2", group: "recent", cat: "端云协同", date: "2026-09-14",
      title: "CIDERS: Cloud-Edge LLM Collaborative Learning via Accelerating Personalized Bilevel Optimization",
      authors: "Victor H. Chen, Hairui Yu, Stella K. Chung, Hong Yan",
      venue: "arXiv:2609.15664", level: "预印本",
      summary: "首次将云-边 LLM 协作形式化为个性化双层优化：上层优化边缘个性化、下层管理云端知识迁移；压缩边缘路径上数学推理 3.1×、代码生成 1.7× 提升。",
      detail: "现有云边协同难以兼顾「云端统一知识底座」与「边缘领域个性化」。本文首次提出个性化双层优化框架：上层优化边缘侧个性化，下层管理云端知识迁移，实现云边协调演化。\n求解器 CIDERS 把模型分解为可学习骨干 + 信使（messenger），云端对骨干做知识迁移，并通过共识变量校正把全局轨迹嵌入每步本地个性化；理论给出局部轨迹的几何刻画与完整收敛保证，揭示个性化与全局收敛的显式权衡。\n实验：压缩边缘路径上数学推理 3.1×、代码生成 1.7×，指令任务相对 +10%。",
      tags: ["云边协同", "双层优化", "个性化"],
      url: "https://arxiv.org/abs/2609.15664"
    },
    {
      id: "p3", group: "recent", cat: "安全与隐私", date: "2026-09-09",
      title: "Understanding the Security Boundary of Obfuscation-based On-Device LLM Protection",
      authors: "Hanyi Zhou, Chenyang Li, Yuanzhe Pang 等（清华）",
      venue: "arXiv:2609.10117", level: "预印本",
      summary: "形式化 TEE 端侧 LLM 保护的「混淆原语」并刻画安全边界，新攻击 Collapse 击穿 USENIX Sec'25 / IEEE S&P'25 / NeurIPS'25 多个已发表方案，再以新原语扩展边界。",
      detail: "TEE 保护端侧 LLM 知识产权的主流做法（TSLP：重计算层混淆后卸载 GPU、轻量层留在 TEE）多为启发式设计，已被证明存在针对性攻击。\n本文形式化定义满足特定代数性质的「混淆原语」（线性计算二元组），证明代表性方法的矩阵级权重变换均为原语复合，其典范形式 O_prior 刻画了该家族的结构边界；并提出原语指导的新攻击 Collapse，暴露 ArrowCloak（USENIX Security'25）、TSQP（IEEE S&P'25）、LoRO（NeurIPS'25）等多个顶会方案的共同漏洞；最后提出两种新原语构成 O_ext，扩展安全边界。",
      tags: ["TEE", "模型知识产权", "混淆原语"],
      url: "https://arxiv.org/abs/2609.10117", highlight: true
    },
    {
      id: "p4", group: "recent", cat: "能效与评测", date: "2026-09-09",
      title: "PELM: Power Efficient On-Device LLM Inference with Speculative Decoding and Dynamic Voltage Frequency Scaling",
      authors: "Weisi Yang, Stephen Xia（ Northwestern / imec）",
      venue: "arXiv:2609.09662", level: "预印本",
      summary: "把投机解码与「可变验证深度」作为 DVFS 调频之外的两个新旋钮，实现更省电的端侧 LLM 推理：最多 23.1% 加速、52.4% 能耗降低，代码已开源。",
      detail: "移动平台紧凑无风扇、高负载容易热降频。现有面向移动 LLM 的 DVFS 方法多只调硬件参数与频率，在热受限场景下失效。\nPELM 的洞察是「并非所有 token 都需要全深度推理」：在传统 DVFS 之上增加两个负载相关维度——投机解码与可变验证深度，把优化空间扩展到多维。\n跨硬件平台与数据集评估显示：较现有功耗治理方法最多提速 23.1%、能耗降低 52.4%，任务表现相当。开源：github.com/imec-nu/PELM。",
      tags: ["投机解码", "DVFS", "能耗优化"],
      url: "https://arxiv.org/abs/2609.09662"
    },
    {
      id: "p5", group: "recent", cat: "端侧智能体", date: "2026-09-09",
      title: "From Fixed Keys to Readable Schemas: Small Language Models for Vehicle Agent Function Calls",
      authors: "Hamed Jafarzadeh Asl, Yuanhao Yu, Vahid Partovi Nia",
      venue: "arXiv:2609.09476", level: "预印本",
      summary: "车载 SLM 函数调用设计选择研究：Functional Token 推理紧凑但无法泛化到未见函数，Schema-in-Prompt 可泛化但内存与延迟更高；函数面表示方式比模型规模更关键。",
      detail: "车机助手要在严格内存与时延约束下把自然语言翻译成准确的车辆函数调用。两种设计：为每个函数训练专用 Functional Token（FT），或把函数 Schema 直接放进提示（SIP）。\n作者基于 Android Automotive 构建 9,822 条单轮样本、79 个车载函数基准（含 held-out 函数与需拒绝的请求），在 270M–1.7B 四个 SLM 上对等微调对比。\n发现：已见函数上 270M 即可追平 1.7B，综合最佳在 0.6B；held-out 函数上 FT 按构造零准确率，SIP 随规模显著提升；域外请求上 SIP 更可靠地拒绝。结论：函数面表示方式而非模型规模决定能力与失败模式。",
      tags: ["车载智能体", "SLM", "函数调用"],
      url: "https://arxiv.org/abs/2609.09476"
    },
    {
      id: "p6", group: "recent", cat: "端侧智能体", date: "2026-09-07",
      title: "Beyond Fluent Generation: A CPU Reliability Benchmark for MCP-Style Tool Calling in Sub-2B Small Language Models for Edge Deployment",
      authors: "Abrar Shahriar, Qurat-Ul-Ain Mastoi",
      venue: "arXiv:2609.07370", level: "预印本",
      summary: "在树莓派 / Jetson Nano 等单板机上评测 5 款 <2B 模型的 MCP 式工具调用：Qwen2.5-1.5B 最佳（75–79%），1000 条原始回复仅 5 条可直接解析为 JSON——端侧 Agent 高度依赖输出恢复。",
      detail: "MCP 式工具调用要求模型输出机器可读 JSON、选对工具、补全参数、避免误动作——远难于「生成流畅文本」。\n本文在 100 条提示（天气 / 搜索 / 计算 / 邮件 / 任务创建）上评测 Phi-1.5、Pythia-1.4B、TinyLlama-1.1B、Qwen2.5-0.5B/1.5B 五款 <2B 开源模型：严格审计下 1000 条原始回复仅 5 条可直接 JSON 解析；经恢复解析器（剥离 Markdown 围栏、提取花括号子串）后 Qwen2.5-1.5B 达 75%（贪心）/ 79%（采样）。\n资源侧：Qwen2.5-1.5B 需 7,960MiB 内存、平均 30.8s 延迟。作者呼吁安全部署需 schema 校验、受限生成、最小权限执行与人工升级通道。",
      tags: ["MCP", "工具调用", "单板机"],
      url: "https://arxiv.org/abs/2609.07370"
    },
    {
      id: "p7", group: "recent", cat: "推理与系统", date: "2026-09-03",
      title: "LeanStream: A Speculate-and-Refine Streaming Framework for Efficient on-Device LLM Inference",
      authors: "Renyuan Liu, Yuyang Leng, Kaiyan Liu 等（IBM / UIUC）",
      venue: "arXiv:2609.03079", level: "预印本",
      summary: "「推测-精化」流式框架：用部分 GPU 结果渐进修正计算 / 加载 / 缓存保留优先级，实现 GPU 执行与存储 I/O 细粒度重叠；内存降低 4.8–7.5×，吞吐再提 1.6–2.1×。",
      detail: "端侧 LLM 权重远超 DRAM，SSD/闪存卸载方案面临根本矛盾：准确的稀疏执行决策需要最新上下文，而计算与 I/O 重叠需要提前预测——现有设计要么串行执行、要么付出冗余权重读取与缓存开销。\nLeanStream 用部分 GPU 结果渐进精化（progressive refinement）计算、加载与缓存保留三类优先级，在移动与嵌入式平台上实现 GPU 执行与存储 I/O 的细粒度重叠。\n结果：在既有系统最优吞吐下内存降低 4.8–7.5×，token 生成吞吐再提升 1.6–2.1×。",
      tags: ["推理系统", "存储卸载", "流式执行"],
      url: "https://arxiv.org/abs/2609.03079"
    },
    {
      id: "p8", group: "recent", cat: "能效与评测", date: "2026-09-02",
      title: "How Do Prompt Variations Affect Energy Consumption in On-Device LLMs?",
      authors: "Wei Hu, Xiaolong Tu, Dawei Chen 等（GSU / Google）",
      venue: "arXiv:2609.01798", level: "预印本",
      summary: "首个系统研究提示词设计如何影响端侧 LLM 能耗：认知负荷主要影响每 token 能耗，措辞模式通过 token 用量影响总能耗；端侧提示工程需要「模型感知」。",
      detail: "LLM 加速上机后，能耗成为关键部署约束，但提示设计对能耗的影响缺乏系统研究。\n本文覆盖多提示属性、数据集、模型与设备的实证研究，按 prefill 与 decode 分相剖析能耗。发现：认知负荷（cognitive load）主要改变单位 token 能耗；措辞模式（phrasing pattern）主要通过 token 数量起作用。\n能耗-质量分析进一步显示，提示设计对不同模型重塑不同的可达前沿（Pareto frontier）——因此端侧提示工程应当模型感知。代码与数据开源。",
      tags: ["提示工程", "能耗", "实证研究"],
      url: "https://arxiv.org/abs/2609.01798"
    },
    {
      id: "p9", group: "recent", cat: "能效与评测", date: "2026-09-01",
      title: "Triple-Bottom-Line Sustainability of Language Models for Edge AI: A Comparison Between SLMs and Quantized LLMs",
      authors: "Jainil Dharmil Shah",
      venue: "arXiv:2609.00665", level: "预印本",
      summary: "提出三支柱「全息可持续性得分 HSS」（能力效率 / 能耗 / 安全）对比原生 SLM 与量化 LLM 共 30 种配置：Qwen3-30B-A3B/GGUF Q4 综合第一——量化大模型未必输给原生小模型。",
      detail: "边缘 AI 选型常只看单一指标，而可部署模型必须平衡能力、时延、内存、能耗与安全。\n本文提出可复现的 Holistic Sustainability Score：经济支柱（能力 + 系统效率）、环境支柱（GPU 运行能耗）、社会支柱（有害提示鲁棒性）；5 个 BF16 SLM 与 5 个 LLM 在 BF16/INT8/NF4/GPTQ-4bit/GGUF Q4 下共 30 种配置。\n结果：Qwen3-30B-A3B/GGUF Q4 以 93.38 居首，Phi-4-mini/BF16 是 SLM 中最优（89.49）。「原生 SLM 必然更可持续」的假设不普适成立；量化是系统级选择而非单调的精度-效率折衷。",
      tags: ["模型选择", "量化", "可持续性"],
      url: "https://arxiv.org/abs/2609.00665"
    },
    {
      id: "p10", group: "recent", cat: "推理与系统", date: "2026-09-01",
      title: "mzCache: On-Device LLM Memory Management under Multitasking",
      authors: "Hongseung Yu, Minsung Kim, Jongseok Park, Kyunghan Lee（SNU）",
      venue: "arXiv:2609.01338", level: "预印本",
      summary: "面向手机多任务内存压力的端侧 LLM 内存管理：细粒度共享缓冲 + 混合换出，利用 SoC 统一内存实现 GPU 零等待推理与 CPU 侧并行恢复，TTFT 降低 2.1–5.5×；基于 llama.cpp 落地为安卓应用。",
      detail: "手机多任务频繁切换导致 LLM 内存（权重 + KV 缓存）被系统逐出，新请求到来只能慢速存储读取或整块重算 KV，严重劣化响应。\nmzCache 将 LLM 内存划分为细粒度共享缓冲，支持部分逐出 / 恢复与跨处理器并发访问；混合 swap 与 backward-out 逐出策略保证任意逐出状态下的低延迟恢复；再利用移动 SoC 统一内存，让 CPU 侧恢复与 GPU 推理并发进行，实现「零等待」推理。\n在 llama.cpp 上实现并部署为 Android 应用，Time-to-First-Token 较存储 backed 部分卸载降低 2.1–5.5×。",
      tags: ["内存管理", "多任务", "llama.cpp"],
      url: "https://arxiv.org/abs/2609.01338"
    },
    {
      id: "p11", group: "published", cat: "推理与系统", date: "2024-01-01",
      title: "LLM in a Flash: Efficient Large Language Model Inference with Limited Memory",
      authors: "Keivan Alizadeh Sharifi, Iman Mirzadeh 等（Apple）",
      venue: "ICLR 2024", level: "顶会",
      summary: "苹果经典工作：利用激活稀疏性与投影层「闪存驻留」，把超过可用 DRAM 的大模型推理搬到手机上，是端侧大模型存储卸载路线的奠基之作。",
      detail: "核心思想：不把整个模型装进 DRAM，而是把大部分权重留在闪存（NAND），推理时利用激活稀疏性只读取需要的行，并通过「锚点 + 投影」进一步压缩需要搬运的数据量。\n该方法使超出 DRAM 容量的 LLM 能在移动设备上高效运行，直接影响了 Apple Intelligence 的端侧推理栈，也是后续所有端侧「存储卸载」研究（如本周 LeanStream）的对照基线。",
      tags: ["闪存卸载", "稀疏性", "奠基工作"],
      url: "https://arxiv.org/abs/2312.11514"
    },
    {
      id: "p12", group: "published", cat: "推理与系统", date: "2024-01-01",
      title: "PowerInfer: Fast Large Language Model Inference with Consumer-grade GPUs",
      authors: "Yixin Song, Zeyu Mi, Haotian Xie 等（上海交大 IPADS）",
      venue: "MLSys 2024", level: "系统顶会",
      summary: "利用 LLM 推理的激活局部性，热神经元驻 GPU、冷神经元留 CPU，消费级 GPU 上最高 11.7× 加速；后续 PowerInfer-2 把该路线带上手机，首次在智能手机跑超百亿参数模型。",
      detail: "观察到 LLM 推理中少量「热」神经元贡献大部分激活，PowerInfer 构建 GPU-CPU 混合推理引擎：自适应划分并缓存热神经元于 GPU、冷神经元留 CPU，配合细粒度流水线隐藏通信。\n在 RTX 4090 等消费级 GPU 上相对 llama.cpp 最高 11.69× 加速。其手机端后续工作 PowerInfer-2（2024）通过异构神经网络计算与细粒度权重复用，首次在智能手机上运行超百亿参数模型，是端侧大模型系统化的标志性成果。",
      tags: ["激活局部性", "混合推理", "手机部署"],
      url: "https://arxiv.org/abs/2312.12456"
    },
    {
      id: "p13", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "ArrowCloak: TEE-Shielded LLM Partitioning with Obfuscation",
      authors: "ArrowCloak 作者团队",
      venue: "USENIX Security 2025", level: "CCF-A",
      summary: "TEE 保护的端侧 LLM 推理：以代数混淆变换把计算密集层安全卸载到 GPU、仅轻量运算留在 TEE，兼顾模型知识产权保护与性能。",
      detail: "TEE（可信执行环境）算力有限，难以承载 LLM 全量计算；ArrowCloak 属于「TEE-Shielded LLM Partition」路线的代表：对计算密集层施加可证明的混淆变换后卸载到不受信的 GPU，敏感轻量运算保留在 TEE 内，在保护权重知识产权的同时显著快于纯 TEE 执行。\n注意：本周预印本《Understanding the Security Boundary…》提出的 Collapse 攻击揭示了此类方案的共性漏洞，ArrowCloak 亦在其列，建议关注后续修补版本。",
      tags: ["TEE", "混淆", "USENIX Sec'25"],
      url: "https://www.usenix.org/conference/usenixsecurity25"
    },
    {
      id: "p14", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "TSQP: Efficient and Secure LLM Inference through TEE-based Spatial Quantization Partitioning",
      authors: "TSQP 作者团队",
      venue: "IEEE S&P 2025", level: "CCF-A",
      summary: "面向量化 LLM 的 TEE 防护：将推理按空间切分，敏感计算保留 TEE、量化等重负载卸载 GPU，兼顾安全与效率；与 ArrowCloak 同属 TSLP 路线。",
      detail: "与 ArrowCloak 同属「TEE-Shielded LLM Partition」技术路线，面向量化 LLM 场景：把推理图按空间切分，TEE 内执行安全敏感部分，计算繁重的量化运算卸载到 GPU 加速，以更小的 TEE 开销换取可用的端侧推理性能。\n本周 Collapse 攻击同样指出其特定架构实现存在可利用的攻击面，是评估该类方案安全边界时的重要参照。",
      tags: ["TEE", "量化", "IEEE S&P'25"],
      url: "https://sp2025.ieee-security.org"
    },
    {
      id: "p15", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "LoRO: Low-Rank Obfuscation for TEE-Assisted DNN/LLM Inference on Untrusted GPUs",
      authors: "LoRO 作者团队",
      venue: "NeurIPS 2025", level: "CCF-A",
      summary: "以低秩（low-rank）变换为混淆原语保护端侧模型权重知识产权的 TEE-GPU 协同推理方案，低秩结构带来更小的 TEE 内计算与通信开销。",
      detail: "LoRO 用低秩变换作为核心混淆原语：在卸载到不可信 GPU 的计算中隐藏权重信息，同时低秩结构使 TEE 内的计算与通信开销显著降低，保持端侧可接受的延迟。\n作为 NeurIPS 2025 发表的 TSLP 代表方案，其低秩原语组合同样被本周 Collapse 攻击证明存在可利用的安全边界，值得与 O_ext 新原语对照阅读。",
      tags: ["低秩混淆", "TEE", "NeurIPS'25"],
      url: "https://neurips.cc"
    }
  ],

  /* ---------------- 板块三：知识分享 ---------------- */
  knowledge: {
    timeline: [
      { year: "2016–2017", title: "CNN 轻量化时代", text: "SqueezeNet、MobileNet 提出深度可分离卷积等轻量化结构，视觉模型首次大规模上手机：人脸解锁、相册智能分类成为端侧 AI 的第一批杀手级应用。" },
      { year: "2017–2019", title: "NPU 登场", text: "Apple A11 Neural Engine、华为麒麟 970 首提手机「NPU」、高通 Hexagon 演进——AI 算力成为 SoC 核心卖点，端侧 AI Benchmark 生态出现。" },
      { year: "2020–2022", title: "Transformer 时代的错位", text: "大模型在云端爆发，端侧仍以 CV / 语音小模型为主；Hugging Face 开源生态兴起，为后来「小模型下沉终端」埋下伏笔。" },
      { year: "2023", title: "LLM 上手机元年", text: "llama.cpp 与 GGUF 量化格式出现，MLC LLM 把 Llama 2 跑上手机，高通演示端侧 Stable Diffusion——「大模型端侧化」从不可能变为工程问题。" },
      { year: "2024", title: "端侧 AI 系统化", text: "Apple Intelligence 登场（约 3B 端侧模型 + 私有云计算），Gemini Nano / AICore 进入安卓；Gemma、Phi-3、Qwen 小模型井喷；PowerInfer 等推理系统研究爆发。" },
      { year: "2025", title: "多模态与稀疏化", text: "MiniCPM-V/o、Gemma 3n、Phi-4-mini 等多模态端侧模型成熟；旗舰 NPU 算力破百 TOPS；投机解码、KV 缓存管理成为端侧标配技术。" },
      { year: "2026", title: "端侧智能体元年", text: "AFM 3 Core Advanced（约 20B MoE）全端侧运行、天玑 9600 Pro 双 NPU 原生面向 Agentic AI、车企转向端云协同；SLM 工具调用（MCP）成为学术与产业共同热点。" }
    ],
    resources: [
      { name: "Apple Machine Learning Research", type: "厂商研究博客", letter: "A",
        text: "AFM 系列技术报告、端侧训练与适配的一手资料；了解工业界最强端侧模型如何炼成，这里是第一信源。",
        url: "https://machinelearning.apple.com" },
      { name: "Qualcomm AI Hub & Blog", type: "厂商研究博客", letter: "Q",
        text: "数百个端侧优化模型一键部署到骁龙平台，量化、编译与异构计算的工程实践大全。",
        url: "https://aihub.qualcomm.com" },
      { name: "Google DeepMind / Developers Blog", type: "厂商研究博客", letter: "G",
        text: "Gemini Nano、AICore 与 Android 端侧 AI 的官方进展；AICORE API 与 ML Kit 的端侧能力说明中心。",
        url: "https://blog.google/technology/ai/" },
      { name: "Tianqi Chen 陈天奇", type: "个人博客", letter: "T",
        text: "MLC LLM / TVM / MX 作者，用编译器视角系统解决端侧部署问题的开创者；想理解「模型如何跑进硬件」，从他的文章读起。",
        url: "https://tqchen.github.io" },
      { name: "Georgi Gerganov", type: "个人博客", letter: "G",
        text: "llama.cpp / GGML / whisper.cpp 作者，GGUF 量化生态奠基人；端侧推理开源事实标准的源头。",
        url: "https://ggerganov.com" },
      { name: "Andrej Karpathy", type: "个人博客", letter: "K",
        text: "从 nanoGPT 到 LLM101n，把大模型拆到最小可运行单元；理解小模型训练原理的最佳入门材料。",
        url: "https://karpathy.github.io" },
      { name: "Simon Willison", type: "个人博客", letter: "S",
        text: "LLM 应用实践的一手笔记，工具调用、提示工程与安全议题跟踪，更新勤、观点实。",
        url: "https://simonwillison.net" },
      { name: "Chip Huyen", type: "个人博客", letter: "C",
        text: "《Designing Machine Learning Systems》作者，ML 系统与部署领域的经典书写者，端侧工程化的方法论参考。",
        url: "https://huyenchip.com" },
      { name: "机器之心", type: "中文媒体", letter: "机",
        text: "中文 AI 资讯与论文解读，端侧模型发布与技术综述跟踪的常用中文信源。",
        url: "https://www.jiqizhixin.com" },
      { name: "面壁智能数据洞察", type: "厂商研究博客", letter: "面",
        text: "MiniCPM 技术解读与「知识密度」路线的持续输出，国产端侧模型的第一视角。",
        url: "https://www.modelbest.cn" }
    ]
  }
};
