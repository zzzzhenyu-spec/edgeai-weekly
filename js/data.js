/* ============================================================
 * 端侧AI每周情报站 · 数据文件（2026 第 39 期 · 09.17–09.23）
 * 每周更新流程：
 *   1) scripts\fetch_papers.ps1     arXiv 论文候选
 *   2) scripts\fetch_news.ps1       RSS 资讯候选
 *   3) scripts\check_dblp.ps1       DBLP 核对 venue
 *   4) scripts\find_article.ps1     定位真实文章 URL
 *   5) scripts\fetch_paper_figs.ps1 抓取论文结构图(arXiv HTML版)
 *   6) 人工筛选后整理进本文件
 * 字段：url=阅读原文(用具体文章页)；image=详情配图(og:image或论文图,
 *       无则前端自动生成兜底封面)；imageCap=配图说明；
 *       resources[].intro=博客简介(点击卡片弹出)
 * ============================================================ */
const WEEKLY_DATA = {

  meta: {
    issue: "2026 · 第 39 期",
    weekRange: "2026.09.17 — 09.23",
    updated: "2026-09-23",
    editorsNote: "本期窗口 09.17–09.23：骁龙峰会 9·22 开幕，8 Elite Gen 6 正式发布，主题直指「智能体时代来临」；「哑巴 AI」Jev 三天刷屏硅谷，不生成文本的「系统一模型」引发范式讨论；阶跃星辰 600B 旗舰宣布 10 月开源；机构报告称系统级 Agent 进入加速期。盘面背景：天玑 9600 Pro 领跑 2nm、豆包 AI 手机量产、麒麟 9050 Pro 回归。学术侧本周端侧方向集中于推理系统、SLM 工具调用与 TEE 安全。"
  },

  /* ---------------- 板块一：本周资讯 ----------------
   * 分类：端侧Agent / 芯片厂商 / 手机厂商 / 大模型厂商 / 行业动态
   * 超出本期窗口的重要事件以「背景」性质收录
   */
  news: [
    {
      id: "n2", cat: "芯片厂商", source: "Qualcomm / XDA-Developers", date: "2026-09-22",
      title: "骁龙峰会开幕：8 Elite Gen 6 正式发布，主题「智能体时代来临」",
      summary: "9 月 22 日毛伊岛峰会正式公布 8 Elite Gen 6 两档旗舰：2nm 制程、Oryon CPU 最高 5.11GHz，Hexagon NPU 新增 Element Accelerator 与更大共享内存，原生面向端侧智能体。",
      detail: "Snapdragon Summit 2026（9 月 22–24 日，夏威夷毛伊岛）以「The agentic age is here（智能体时代来临）」为主题开幕，正式公布新一代旗舰平台 Snapdragon 8 Elite Gen 6，并提供更高定位的 Extreme 档。\n规格要点：首次采用 2nm 制程；Oryon CPU 核心频率最高 5.11GHz，两档均可达到 5GHz 级；GPU 性能大幅提升，Extreme 档为 GPU 增加更多 AI 功能；泄露定价约 320 美元，首发机型预计年底前亮相。\n端侧 AI 是本届峰会绝对主角：新一代 Hexagon NPU 完全围绕智能体（Agentic）工作负载重构——新增 Element Accelerator（元素加速器）、显著增大的共享内存，此前高通已披露其支撑端侧运行 30B 级大模型的目标；同时强调把更多算力、内存与 AI 能力留在手机本地。\n峰会其余议程（9·23–24）还将发布骁龙 X 系列 PC 平台与智能体开发工具链更新。",
      tags: ["Snapdragon Summit 2026", "8 Elite Gen 6", "Hexagon NPU", "2nm"],
      url: "https://www.xda-developers.com/qualcomms-new-snapdragon-8-elite-gen-6-chip-lineup-powerful-ultra-premium-tier/",
      image: "https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2026/09/snapdragon-8-elite-gen-6-header.jpg",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n11", cat: "大模型厂商", source: "unwire.pro / 36氪 / TechCrunch", date: "2026-09-21",
      title: "「哑巴 AI」Jev 刷屏：不生成文本的「系统一模型」，决策快 200 倍",
      summary: "前 OpenAI 研究员创办的 TypeSafe AI 发布 Jev：不做对话、直接输出类型安全的概率化决策，70ms 级响应、快约 200 倍、便宜约 400 倍；上线 3 天获 Vercel / Cloudflare / LangChain 整合。",
      detail: "Jev 是 TypeSafe AI（前 OpenAI 研究员 Diogo Almeida 创办）9 月 15 日开放早期访问的新模型，被媒体称为「哑巴 AI」：\n它基于 transformer 架构，但不是 LLM——不写文章、不写代码、不陪聊，放弃逐 token 的文本生成，直接输出「类型安全的概率化决策」并内置校准（calibration），对标心理学中快思考的「系统一」能力。因此它高速、轻量，官方与第三方评测称在相关决策任务上比传统 LLM 快约 200 倍、便宜约 400 倍，且从机制上避免幻觉。\n有多轰动：发布 3 天内获 Vercel、Cloudflare、LangChain 等主流平台整合；内测开放不到 36 小时涌入 14 万开发者；同日公司宣布完成 DCVC 领投的 4000 万美元种子轮。TechCrunch 评价其为「一种新型 AI 模型」，Wikipedia 已收录词条。\n争议同样存在：36氪发文《一个「不说话」的 AI 刷屏，Jev 真是新范式吗？》讨论其在企业自动化中的真实边界；其轻量高速的特性也让业界开始讨论与端侧模型的组合可能。",
      tags: ["Jev", "TypeSafe AI", "系统一模型", "决策模型"],
      url: "https://unwire.pro/2026/09/21/jev-system-one-model-typesafe-ai/news/",
      image: "https://cdn.unwire.pro/wp-content/uploads/2026/09/fb_photo20260920t155.png",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n12", cat: "端侧Agent", source: "东吴证券（腾讯新闻） / 36氪", date: "2026-09-21",
      title: "系统级 Agent 进入加速期：豆包、荣耀、vivo、OPPO 密集落地",
      summary: "机构报告：豆包手机助手消费者版量产落地，荣耀、vivo、OPPO 系统级智能体密集跟进；开源侧 OpenClaw（「小龙虾」）成为 2026 现象级端侧 Agent，腾讯 WorkBuddy 等衍生适配崛起。",
      detail: "东吴证券 9 月 21 日报告指出：系统级 Agent 进入加速期——豆包手机助手消费者版随努比亚 NaviX Ultra 实现量产落地，荣耀、vivo、OPPO 密集布局系统级智能体；执行框架 Harness 开始系统级商用，GUI（图形界面操作）与 A2A（智能体间通信）两条路线并行演进，成为下半年最确定的产业主线。\n开源侧，本地优先（local-first）、模型无关的 OpenClaw 成为 2026 年最现象级的开源端侧 Agent（社区昵称「小龙虾」）：三层架构，支持 Windows / macOS / Linux 及移动端，可直接与 LM Studio、Ollama 等本地模型协同，官方文档见 docs.openclaw.ai；腾讯 3 月发布的 WorkBuddy 完全兼容其技能生态，主打国内场景适配，两者常被并列对比。\n学术侧本周亦有呼应：MCP 式工具调用在单板机上的可靠性基准（论文板块 p6）、车载 SLM 函数调用（p5）均指向同一问题——让小模型在端侧可靠地「动手」。",
      tags: ["系统级Agent", "OpenClaw", "WorkBuddy", "手机智能体"],
      url: "https://news.qq.com/rain/a/20260921A046EN00",
      image: "https://inews.gtimg.com/om_ls/On-vObCIUNjBT2QmAbIIetUc87uUIwDooLRvnRrAl6QSwAA_640330/0",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n10", cat: "行业动态", source: "网易科技 / 腾讯新闻", date: "2026-09-20",
      title: "阶跃星辰发布 Step 5 Preview：600B MoE 旗舰，10 月 15 日开源",
      summary: "阶跃星辰发布新一代旗舰基座 Step 5 Preview：总参数 600B、激活约 27B 的稀疏 MoE，支持 100 万 token 上下文与视觉输入，已跻身全球开源前三，10 月 15 日开源。",
      detail: "阶跃星辰 9 月 20 日发布新一代旗舰基座模型 Step 5 Preview：采用稀疏 MoE 架构，总参数 600B、推理时仅激活约 27B，支持 100 万 token 上下文与文本 + 视觉双模态输入，重点面向 AI 编程、软件工程、专业知识工作与金融四大场景，并针对长程 Agent 任务（long-horizon agentic tasks）优化。\n评测表现：Artificial Analysis Intelligence Index 得分 44，发布一日内由全球开源模型第三升至第二；单任务成本据称约为 Claude Opus 5 的 1/8。\n官方宣布将于 10 月 15 日开源。阶跃星辰成立于 2023 年 4 月，是上海头部大模型独角兽，坚持自研超级模型路线，此前已多轮开源 Step 系列中小模型。",
      tags: ["阶跃星辰", "Step 5 Preview", "MoE", "开源"],
      url: "https://www.163.com/tech/article/L78VD8I600098IEO.html"
    },
    {
      id: "n3", cat: "手机厂商", source: "巨潮资讯（搜狐号）/ 新浪财经", date: "2026-09-17",
      title: "「端侧AI之战正式打响」：字节豆包 AI 手机 NaviX Ultra 亮相",
      summary: "努比亚 NaviX Ultra（豆包手机二代）9 月 16 日正式发布，5499 元起，搭载豆包手机助手消费者版，被称为全球首款规模量产的 AI 智能体手机。",
      detail: "《端侧AI之战正式打响｜巨潮》一文盘点近期端侧 AI 整机动态：努比亚 NaviX Ultra（豆包手机二代）于 9 月 16 日正式发布并开售，5499 元起（12GB+512GB，16GB+1TB 版 7499 元），由中兴通讯努比亚全链路主导、与字节跳动合作，搭载第五代骁龙8至尊版平台与豆包手机助手消费者版。\n产品核心是把 AI 智能体技术从工程样机推进到规模化量产商用：围绕「听得懂、能干活、记得住、够安全」四大能力，支持全场景自然语义理解，可自主跨应用完成比价下单、行程规划等多步骤任务——手机从「你操作它」变成「它帮你办事」。该机此前在 WAIC 2026 亮相并获 SAIL 卓越人工智能引领者奖。\n同场竞争：苹果 Apple 智能 + 全新 Siri AI 已在 WWDC26 发布；刚上市的小米 18 Fold 内置 Xiaomi 端侧模型。文章判断：跳出耗资巨大的云端大模型军备竞赛、转向端侧模型研发，正成为更多企业深度参与 AI 浪潮的路径。",
      tags: ["豆包", "NaviX Ultra", "AI智能体手机", "努比亚"],
      url: "https://www.sohu.com/a/1077629065_122014422",
      image: "https://q3.itc.cn/q_70/images03/20260918/8e7d8da3bcd743c8b9362d1748862d0b.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n1", cat: "芯片厂商", source: "联发科新闻室", date: "2026-09-15",
      title: "联发科发布天玑 9600 Pro：全球首款 2nm 手机芯片，双 NPU 面向端侧智能体",
      summary: "首发 2nm 工艺，多核功耗降低 61%、单核性能提升约 17%；全新双 NPU AI 引擎专为端侧与 Agentic AI 负载设计，支持最高 300 亿参数端侧模型。",
      detail: "联发科 9 月 15 日于新竹宣布推出 Dimensity 9600 Pro，成为全球首款量产 2nm 手机 SoC（台积电代工），也是首款采用 Arm 下一代 C2 核心 CPU 与新一代 GPU 设计的芯片。\n性能与能效：多核功耗降低 61%，单核性能提升约 17%；新一代 GPU 峰值性能提升最高 27%、峰值功耗降低 24%、光线追踪性能提升 18%。\n端侧 AI：全新双 NPU AI 引擎针对生成式与智能体（Agentic）AI 工作负载优化，支持最高 30B 参数的端侧模型与多模态推理——这是手机芯片首次官方宣称支持 300 亿参数级端侧模型；影像与游戏体验同步升级。\n首批搭载机型预计 2026 年四季度亮相。2nm 制程 + 原生智能体算力，把端侧 AI 竞赛同时推向新高度。",
      tags: ["天玑 9600 Pro", "2nm", "双NPU", "30B端侧模型"],
      url: "https://www.mediatek.com/press-room/mediatek-dimensity-9600-pro-sets-new-standard-for-flagship-smartphone-chips",
      image: "https://www.mediatek.com/hubfs/MediaTek%20Assets/Images/Static%20Images/Ghosted%20M%201200X%20630.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n17", cat: "芯片厂商", source: "腾讯新闻（慧甚/财报解读）", date: "2026-09-14",
      title: "全志科技：毛利率跳升 10 个百分点，端侧 AI 红利初步兑现",
      summary: "全志科技最新财报显示毛利率同比跳升约 10 个百分点，端侧 AI 平台化战略初步验证；公司正从「平板之王」转型为端侧 AI 平台型供应商，AI 视觉生态全面提速。",
      detail: "全志科技正处在从传统平板/盒子 SoC 供应商向端侧 AI 平台化供应商的转型通道：最新财报毛利率同比跳升约 10 个百分点，被市场解读为端侧 AI 红利的初步兑现；但存货去化节奏偏慢，制约了估值修复的速度。\n产品与生态侧，7 月收官的「智慧视界」生态创新大会聚焦 AI 视觉，推动智慧视觉领域生态建设加速；在「AI 硬件风口向端侧迁移」的行业叙事下，全志与瑞芯微分别代表两条平台化路线，年内均被机构密集跟踪对比。\n公司此前以平板 SoC 起家（「平板之王」），当前产品矩阵覆盖智能硬件、智能视觉、工业等多场景，端侧 AI 平台化是其估值故事的核心变量。",
      tags: ["全志科技", "端侧AI红利", "AI视觉", "国产芯片"],
      url: "https://news.qq.com/rain/a/20260914A0BS6J00",
      image: "https://inews.gtimg.com/om_ls/OCNhgKhT1pzn6wblg3AALr0EM1f7Qu1XBubxn0bFXy7NsAA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n4", cat: "手机厂商", source: "电脑王阿达 / 爱范儿（综合）", date: "2026-09-16",
      title: "小米 18 Fold 上市：首款搭载 MiMo 端侧模型，自研玄戒 O3 + 澎湃 OS4 集结",
      summary: "小米 18 Fold 首发集结自研玄戒 O3 芯片、澎湃 OS4 与端侧大模型三大自研科技；端侧模型内存与带宽占用直降约 30%，是首款搭载 MiMo 端侧模型的手机。",
      detail: "小米 18 Fold 是小米首款「中折叠」形态旗舰：折叠态宽 83.6mm，展开 163.8mm、7.58 吋内屏，重 219g，被评价为「合上是护照、展开是小平板」；9 月上旬发布后于本期内上市，起售价约万元档。\n自研三件套集结：首发小米自研玄戒 O3 旗舰 SoC、澎湃 OS4 与端侧大模型——这也是首款搭载 MiMo 端侧模型的手机。评测普遍认可其折痕控制、续航（6000mAh 金沙江电池 + LPDDR6）与竖屏大屏体验；相机快门与部分系统细节仍有短板。\n端侧看点：配合 LPDDR6 内存的高带宽，理论上可支撑更大规模端侧模型运行；端侧模型对内存和带宽的占用直降约 30%，精度几乎无损。行业层面，2026 下半年国产旗舰普遍进入「百亿参数端侧模型 + 专用 NPU」配置区间。",
      tags: ["小米 18 Fold", "MiMo 端侧模型", "玄戒 O3", "折叠屏"],
      url: "https://www.kocpc.com.tw/archives/668074",
      image: "https://www.kocpc.com.tw/wp-content/uploads/2026/09/20260908003901_0_3e24d8.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n15", cat: "芯片厂商", source: "腾讯新闻 / 瑞芯微官网", date: "2026-09-09",
      title: "瑞芯微：端侧 AI 撞上「内存墙」，RK182X 用 3D 堆叠抢先作答",
      summary: "端侧大模型推理瓶颈正从算力转向内存带宽；瑞芯微 RK182X 以 3D 堆叠 DRAM + 20 TOPS NPU 支持 3B/7B 模型端侧百 token/s 输出、可多颗叠加；上半年营收 +40.6%、净利 +61.7%。",
      detail: "端侧大模型上量后，「内存墙」成为行业共识性瓶颈——限制推理速度的不再是 NPU 算力而是内存带宽。瑞芯微被业界视作提前押注正确路线的样本，其思路是把内存堆到算力旁边：\nRK182X 系列是全球首颗 3D 架构 AI 协处理器（与兆易创新合作）：多核 RISC-V CPU + 3D 堆叠高带宽 DRAM（2.5/5GB）+ 20 TOPS INT8 NPU，支持 3B/7B 大模型端侧推理并突破百 token/s 输出，端到端延迟低；采用「主控 SoC + AI 协处理器」双芯架构，可按终端算力需求叠加一颗或多颗，给传统工业设备等存量终端补 AI 能力，已落地十余行业、300+ 客户项目。\n动态：WAIC 2026 上以「端侧 AI 领跑者」姿态展示成熟方案，新一代端侧 AI 协处理器已完成核心验证（预计 Q3 发布）；车载侧与面壁智能合作 AI BOX 座舱方案；2026 半年报营收 +40.6%、净利 +61.7%，端侧 AI 战略全面兑现。",
      tags: ["瑞芯微", "RK182X", "内存墙", "AIoT"],
      url: "https://news.qq.com/rain/a/20260909A08KQZ00",
      image: "https://inews.gtimg.com/om_ls/Oq-w6dl74buF-Ll3-XrlSPSRHDVETxoR6TNFx_CbLJNqwAA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n6", cat: "大模型厂商", source: "新浪财经 / 时代周报", date: "2026-09-09",
      title: "面壁智能开源 MiniCPM5-2B：AA 榜单 4B 以下第一，初具端侧通用 Agent 能力",
      summary: "面壁智能开源 MiniCPM5-2B：AA 指数登顶全球 4B 以下、初具端侧通用 Agent 能力并完成多款主流芯片适配；7 月 WAIC 还发布了具身智能系列 MiniCPM-Robot。",
      detail: "面壁智能 9 月 9 日正式开源 MiniCPM5-2B 端侧文本大模型（联合 OpenBMB 发布）：在 Artificial Analysis 综合指数以 17 分登顶，位列全球 4B 参数以下第一；在综合知识、数学推理、代码、指令遵循与智能体能力五个维度做到同尺寸领先，初具端侧通用 Agent 能力，并完成多款主流芯片平台适配。\n背景：7 月 WAIC 2026「智在终端，惠及千行」论坛上，面壁已发布该模型与公司首个具身智能系列 MiniCPM-Robot（含通用 VLA 模型 RobotManip 等），并联合中国信通院启动相关标准工作。\n商业化与生态：MiniCPM 系列端侧模型将搭载三星数款旗舰机型上市；截至 6 月底开源系列累计下载突破 3800 万次，覆盖文本、视觉、语音全模态。公司 8 月启动上市辅导，被称为「中国最大端侧 AI 独角兽」。",
      tags: ["MiniCPM5-2B", "面壁智能", "开源", "端侧Agent"],
      url: "https://finance.sina.com.cn/roll/2026-09-09/doc-inirfqcs5705758.shtml",
      image: "https://n.sinaimg.cn/spider20260909/66/w1716h750/20260909/2a73-28986079a0f82f5a2ee7aba0325736a1.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n13", cat: "手机厂商", source: "凤凰科技 / 雷达财经", date: "2026-09-07",
      title: "华为 Mate XT2 首发「全新麒麟 9050 Pro」：端侧跑 300 亿参数 MoE 模型",
      summary: "9 月 7 日华为发布三折叠 Mate XT2 与阔直板 Pura X View，全系首发麒麟 9050 Pro（时隔数年的全新麒麟）；基于达芬奇架构 NPU，率先实现总参数 300 亿、激活 20 亿的 MoE 端侧模型。",
      detail: "华为 9 月 7 日在广州举办全场景新品发布会，一次推出两款形态极端的新机：第三代三折叠 Mate XT2 与阔直板 Pura X View（业界首发可折叠灵盾防窥屏）。\n芯片是最大看点：全系首发麒麟 9050 Pro——继 Mate 40 之后时隔数年的全新麒麟芯片，首拆显示丝印「2035」；搭配 HarmonyOS 7，整机性能较上代提升 42%。日媒评价其「已摆脱美国限制」。\n端侧 AI：基于达芬奇架构 NPU 的端侧算力跃升，率先实现总参数 300 亿、激活参数 20 亿的 MoE 端侧大模型；华为小艺 AI 大模型亦在国家网信办首批手机端侧模型备案名单中。海思路线重新回到端侧 AI 竞争主牌桌。",
      tags: ["华为", "Mate XT2", "麒麟9050 Pro", "MoE端侧模型"],
      url: "https://tech.ifeng.com/c/8wF7D0O9uAg",
      image: "https://x0.ifengimg.com/ucms/2026_37/280077E2FA4F36712B112D361F101C1FBC1D37D7_size983_w1300_h720.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n14", cat: "手机厂商", source: "EETimes China / 观察者网", date: "2026-09",
      title: "9 月旗舰 AI 手机扎堆：vivo X500 / OPPO Find X10 / 荣耀 Magic9 / 小米 18 Pro",
      summary: "9 月被称为「机圈史上最激烈新品月」：vivo X500、OPPO Find X10、荣耀 Magic9、小米 18 Pro 集中发布；MagicOS 11、原系统 7、ColorOS 17 相继升级，「AI 智能体手机」成为发布会核心标签。",
      detail: "9 月旗舰扎堆：苹果秋季发布会（A20 系列芯片）、vivo X500、OPPO Find X10、荣耀 Magic9、小米 18 Pro 与小米 18 Fold（玄戒 O3）、华为（麒麟 + 韬定律芯片）同台对决，媒体称激烈程度「史无前例」。\n系统层同步换代：荣耀 MagicOS 11、vivo 原系统 7、OPPO ColorOS 17 相继发布，全部把「AI 智能体手机」作为核心标签；隐私策略上荣耀、vivo、OPPO 均采用「端侧本地处理优先 + 加密云端上传」的组合。\n供给侧：网信办 7 月首次以独立类目公布 7 款手机端侧生成式 AI 备案（华为小艺、OPPO AndesGPT、vivo 蓝心、Apple 智能、小米、努比亚豆包、三星）。\n也有冷静声音：钛媒体《AI 手机的「皇帝新衣」》指出厂商 PPT 宏大但用户端功能（AI 消除/摘要/转写）体验与宣传存在落差——行业需要在「发布会 AI」与「日常可用 AI」之间补齐差距。",
      tags: ["AI手机", "vivo X500", "OPPO Find X10", "荣耀 Magic9"],
      url: "https://www.eet-china.com/mp/a520119.html"
    },
    {
      id: "n16", cat: "芯片厂商", source: "新浪科技 / 展锐官网", date: "2026-08-14",
      title: "紫光展锐：三大核心能力构筑 AI 新基建，平台化端侧 AI + 5G",
      summary: "展锐以「AI+5G」平台化端侧 AI 方案服务消费电子：从软件栈到异构计算平台提供端侧算力与连接基座；5G SoC 进入全球头部品牌供应链，新紫光集团把端侧 AI 芯片列入四大研发方向。",
      detail: "紫光展锐的端侧 AI 路线是「平台化」：以端侧算力平台、AI 软件栈、5G 连接三大核心能力为消费电子提供端侧 AI 算力与稳定连接基座。AWE 2026 上以「芯联世界，万物 AI+」为主题展示 AI+5G 解决方案，MWC 2026 亦展出从软件栈到异构计算平台的 UNISOC 端侧 AI 方案。\n市场侧，展锐 5G SoC 已进入全球头部品牌供应链（小米部分海外机型搭载并出货印度等市场），被评价为「终于熬出了头」——5G 能力开始被全球市场验证。\n集团层面：新紫光集团 5 月成立后确立四大重点研发方向，端侧 AI 芯片与 AI 工具位列其中，同时布局面向 AGI 的全链路研发；展锐作为集团端侧算力核心平台，承担「AI 新基建」角色。",
      tags: ["紫光展锐", "AI+5G", "端侧AI平台", "UNISOC"],
      url: "https://finance.sina.com.cn/tech/roll/2026-08-14/doc-ininfvzv2967822.shtml",
      image: "https://n.sinaimg.cn/spider20260814/56/w548h308/20260814/1f26-36f61bf716602006fbff276faf15db20.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n8", cat: "芯片厂商", source: "Qualcomm Newsroom / TechPowerUp", date: "2026-08-31",
      title: "高通与 HUMAIN 推出 Horizon Ultra AI PC：首发 18 核骁龙 X2 Elite，面向端侧 Agentic AI",
      summary: "LEAP 2026 上高通与沙特 HUMAIN 发布 Horizon Ultra AI PC：首发 18 核心骁龙 X2 Elite 平台，CPU+GPU+NPU 融合面向端侧 AI 与智能体，企业版 9 月 20 日起可用。",
      detail: "高通与沙特 HUMAIN（公共投资基金 PIF 旗下 AI 公司）在 LEAP 2026 联合发布 Horizon Ultra AI PC，作为 Horizon 产品线新旗舰：首发搭载 18 核心骁龙 X2 Elite 平台，把 CPU、GPU 与 NPU 算力聚合面向端侧 AI 工作负载（报道称 NPU 算力达 80 TOPS 级），主打 Agentic AI 场景与 Snapdragon Developer Workspace 开发者体验，首发合作微软平台，企业版于 9 月 20 日开放。\n同期高通还宣布在 HUMAIN 设立 AI 工程中心，深化沙特本地化 AI 基础设施合作。\n该产品延续骁龙 X 系列在 PC 端侧 AI 的路线——「端侧 AI」战场正从手机扩展到 PC、机器人与边缘整机等多形态终端。",
      tags: ["AI PC", "骁龙 X2 Elite", "HUMAIN", "LEAP 2026"],
      url: "https://www.techpowerup.com/352216/qualcomm-and-humain-unveil-horizon-ultra-ai-pc-at-leap-2026"
    },
    {
      id: "n5", cat: "大模型厂商", source: "Apple Machine Learning Research", date: "2026-06-08",
      title: "苹果 AFM 3 家族：20B 稀疏模型全端侧运行，Foundation Models 框架大升级",
      summary: "WWDC26 发布第三代基础模型：AFM 3 Core（约 3B 稠密端侧）与 AFM 3 Core Advanced（约 20B 稀疏架构、激活仅 1–4B）全端侧运行；另有三款云端模型跑在私有云计算上。",
      detail: "苹果在 WWDC26（6 月 8 日）发表《Introducing the Third Generation of Apple's Foundation Models》，公开第三代基础模型 AFM 3 家族的架构与评估细节：\n端侧两款——AFM 3 Core 为约 3B 参数稠密模型，为 Apple 芯片优化、低延迟运行；AFM 3 Core Advanced 是头条：约 20B 总参数的稀疏（MoE）架构，每次推理仅激活约 1–4B 参数，完全在设备端运行，是苹果迄今最强大的端侧模型，仅在最强 Apple 芯片机型上解锁。在其约 10 亿激活参数档位上，人类评估 Overall Quality 偏好率 44.7% vs 17.6% 领先对比模型。\n云端三款模型全部运行于私有云计算（Private Cloud Compute）：用户数据不存储、苹果不可访问。另有报道称该家族训练与 Google 有合作，但苹果澄清 Siri 不由 Gemini 驱动。\n开发者侧：Foundation Models 框架（Swift 原生 API）大升级——新增私有云计算访问、第三方与开源模型接入、引导式生成（guided generation）与工具调用；Siri AI 全面重构，Siri Expressive Voices 完全端侧实时合成语音。",
      tags: ["AFM3", "Apple Intelligence", "Siri AI", "稀疏MoE"],
      url: "https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models",
      image: "https://mlr.cdn-apple.com/media/hero_AFM_7f9df52a3e.png",
      imageCap: "配图来自 Apple ML Research"
    },
    {
      id: "n7", cat: "大模型厂商", source: "Qwen 官方 / Hugging Face", date: "2026-03-02",
      title: "Qwen 端侧侧写：Qwen3.5 小尺寸系列开源（0.8B–9B 原生多模态）",
      summary: "通义千问开源 Qwen3.5-0.8B/2B/4B/9B 四款小尺寸模型，原生多模态训练，0.8B/2B 面向手机与 IoT 等端侧场景；马斯克点评「惊人的智能」。",
      detail: "阿里通义千问 3 月 2 日晚开源 4 款 Qwen3.5 小尺寸模型（0.8B / 2B / 4B / 9B）：官方强调这不是大模型的简单缩小版，而是基于 Qwen3.5 基础模型构建、原生多模态训练——轻量模型也具备视觉理解能力，能直接处理图像与文本，采用高智能密度设计与 MoE 机制提升计算效率。\n定位分工：0.8B 与 2B 体积极小、推理速度极快，面向移动设备、IoT 等端侧场景；4B / 9B 满足服务器端与多样化部署。Qwen3.5 家族（0.8B–397B）发布后在 Hugging Face 开源榜包揽前四，马斯克点赞称其拥有「惊人的智能」。\n模型权重在 Hugging Face / ModelScope 开放下载，已成为国产端侧生态（手机、车机与第三方固件适配）的重要模型供给；后续 Qwen3.8-Flash-Next（8 月底）作为 Qwen4 架构预览延续了这条开源路线。",
      tags: ["Qwen3.5", "开源小模型", "原生多模态", "IoT"],
      url: "https://huggingface.co/Qwen/Qwen3.5-0.8B",
      image: "https://cdn-thumbnails.huggingface.co/social-thumbnails/models/Qwen/Qwen3.5-0.8B.png",
      imageCap: "模型卡来自 Hugging Face"
    },
    {
      id: "n9", cat: "行业动态", source: "新京报 / 新浪财经", date: "2026-07-28",
      title: "行业观察：《端侧智能2026：规模化落地元年》报告发布，端云协同成主流叙事",
      summary: "行业报告宣告「告别云端军备竞赛」：端侧智能从概念验证迈向规模化落地；高通同场发声「端云协同是个人 AI 的必然方向，分布式推理将重构终端算力体系」。",
      detail: "近期产业信号密集：面壁智能联合产业方发布《端侧智能2026：规模化落地元年》报告，核心判断是端侧 AI 正「告别云端军备竞赛」，从概念验证与 Demo 阶段进入规模化落地阶段——2025 年国内端侧大模型备案已超 200 款，2026 年预计达 360 款。\n车载场景的转向最具代表性：从单纯比拼端侧参数量，转向「云端处理复杂推理 + 车机运行小模型」的端云协同架构；算力、模型、网络等要素在 2026 年同期接近成熟，被业内称为智能汽车端云协同的「分水岭」。\n高通中国朱元堃 7 月底表态：「端云协同是个人 AI 的必然方向，分布式推理将重构终端算力体系」——与本周天玑 9600 Pro、骁龙 8 Elite Gen 6 把 NPU 面向智能体重构的取向一致。",
      tags: ["行业观察", "端云协同", "规模化落地", "分布式推理"],
      url: "https://www.bjnews.com.cn/detail/1784964485129329.html"
    }
  ],

  /* ---------------- 板块二：科研前沿 ----------------
   * 收录标准：SCI 二区以上期刊 / CCF-B 以上会议论文（group=published）
   * 本周 arXiv 新作作为预印本收录跟踪（group=recent），录用后转入已发表
   * detail 为按论文原文（摘要）忠实扩写的中文介绍
   * image=论文结构图(自动抓取自 arXiv HTML 版, 无 HTML 版时前端生成兜底封面)
   */
  papers: [
    {
      id: "p1", group: "recent", cat: "推理与系统", date: "2026-09-15",
      title: "End-to-End Latency-Minimizing and Load-Balanced Request Scheduling for Edge LLM Inference in Agentic AI Services",
      authors: "Zhen Li, Jun Cai, Haoran Gao 等",
      venue: "arXiv:2609.17193", level: "预印本",
      summary: "提出 LYREO 在线调度框架：跨时隙建模传输、prefill、迭代解码与 KV 缓存演化，用 Lyapunov 优化联合最小化端到端时延并均衡异构边缘服务器负载。",
      detail: "研究背景：LLM 驱动的智能体（Agentic）AI 服务对推理时延极其敏感，推动 LLM 部署到分布式边缘服务器。但边缘环境里通信与计算能力异构、推理状态动态演化，使得「每个请求选哪台服务器」变成一个随时间变化、且跨时隙相互耦合的决策问题。本文研究在线请求调度，目标是联合最小化长期平均端到端时延、并均衡异构服务器间的负载分布。\n两大挑战：其一，传统时延模型无法准确刻画多阶段 LLM 执行的细粒度动态（传输、预填充、逐 token 解码、KV 缓存增长各有特性）；其二，调度决策的时延后果要等请求完成后才能观测，无法即时评估决策好坏。\n方法：作者构建跨时隙（cross-slot）推理模型，为每个请求刻画传输、prefill、迭代级解码与 KV 缓存演化，并用「KV 缓存内存-时间消耗」度量服务器负载；在此基础上提出 LYREO：用 Lyapunov 优化把长期负载均衡约束转化为可在线求解的形式，并用奖励重分配（reward redistribution）+ 基于序列的回报预测，把延迟观测的「迟到反馈」转成及时的学习信号，支持更早的调度决策。\n结果：在多种配置的仿真中，LYREO 一致取得比代表性学习类与启发式基线更低的时延与更均衡的负载分布。",
      tags: ["边缘推理", "请求调度", "Lyapunov 优化"],
      url: "https://arxiv.org/abs/2609.17193"
    },
    {
      id: "p2", group: "recent", cat: "端云协同", date: "2026-09-14",
      title: "CIDERS: Cloud-Edge LLM Collaborative Learning via Accelerating Personalized Bilevel Optimization",
      authors: "Victor H. Chen, Hairui Yu, Stella K. Chung, Hong Yan",
      venue: "arXiv:2609.15664", level: "预印本",
      summary: "首次将云-边 LLM 协作形式化为个性化双层优化：上层优化边缘个性化、下层管理云端知识迁移；压缩边缘路径上数学推理 3.1×、代码生成 1.7× 提升。",
      detail: "研究背景：随着物理世界智能化推进，「云-边协作 LLM」成为有前景的部署路线：云端提供统一的知识底座，边缘侧做领域个性化。但现有云边范式难以平衡「全局共识」与「本地个性化」——两边目标并不天然一致。\n问题形式化：本文首次把云边 LLM 协作建模为个性化双层优化（bilevel optimization）：上层优化边缘侧个性化目标，下层管理云端知识迁移，二者协调演化，从而在数学上同时刻画「共识」与「个性」。\n方法（CIDERS 求解器）：把模型分解为「可学习骨干 + 信使（messenger）」两部分——云端对可学习骨干执行知识迁移，关键机制是共识变量校正（consensus-variate correction）：把全局轨迹嵌入每一步本地个性化更新中，调和个性化与共识的冲突；配套任务感知蒸馏。\n理论：给出局部轨迹的几何刻画与完整收敛性保证，揭示「个性化程度 vs 全局收敛速度」之间存在显式的权衡结构。\n实验：在压缩边缘路径上，数学推理提升 3.1×、代码生成提升 1.7×，指令任务相对提升 10%；机制实验把增益归因于早期共识校正协调与任务感知蒸馏。",
      tags: ["云边协同", "双层优化", "个性化"],
      url: "https://arxiv.org/abs/2609.15664",
      image: "https://arxiv.org/html/2609.15664v1/figure_5_control_statistics_pca.png",
      imageCap: "论文图表 · 自动抓取自 arXiv HTML 版"
    },
    {
      id: "p3", group: "recent", cat: "安全与隐私", date: "2026-09-09",
      title: "Understanding the Security Boundary of Obfuscation-based On-Device LLM Protection",
      authors: "Hanyi Zhou, Chenyang Li, Yuanzhe Pang 等（清华）",
      venue: "arXiv:2609.10117", level: "预印本",
      summary: "形式化 TEE 端侧 LLM 保护的「混淆原语」并刻画安全边界，新攻击 Collapse 击穿 USENIX Sec'25 / IEEE S&P'25 / NeurIPS'25 多个已发表方案，再以新原语扩展边界。",
      detail: "研究背景：TEE（可信执行环境）是保护端侧 LLM 知识产权（模型权重）的有前途机制，但 TEE 算力有限。主流做法是「TEE-Shielded LLM Partition（TSLP）」：对计算密集的层施加混淆（obfuscation）变换后卸载到外部 GPU，只把轻量运算留在 TEE 内。然而这类防御大多是启发式设计，已有多个方案被针对性攻击攻破。\n核心问题：能否建立统一的原语（primitives），形式化刻画这类方法的安全边界，并系统性地扩展它？\n方法：作者把「混淆原语」形式化为满足特定代数性质的线性计算二元组，证明代表性 TSLP 框架的矩阵级权重变换都可以表达为这些原语的复合；其典范形式 O_prior 由此刻画了整个原语家族的结构性安全边界。\n攻击：提出原语指导的新攻击 Collapse，利用该结构边界暴露的漏洞，成功攻破多个已发表于顶会的 TSLP 方案——ArrowCloak（USENIX Security'25）、TSQP（IEEE S&P'25）、LoRO（NeurIPS'25），说明「启发式混淆」存在共性弱点。\n防御推进：进一步提出两种新的混淆原语，与既有构造组合成 O_ext，把安全边界向外扩展，为下一代 TEE 端侧 LLM 防护给出设计空间。",
      tags: ["TEE", "模型知识产权", "混淆原语"],
      url: "https://arxiv.org/abs/2609.10117", highlight: true
    },
    {
      id: "p4", group: "recent", cat: "能效与评测", date: "2026-09-09",
      title: "PELM: Power Efficient On-Device LLM Inference with Speculative Decoding and Dynamic Voltage Frequency Scaling",
      authors: "Weisi Yang, Stephen Xia（Northwestern / imec）",
      venue: "arXiv:2609.09662", level: "预印本",
      summary: "把投机解码与「可变验证深度」作为 DVFS 调频之外的两个新旋钮，实现更省电的端侧 LLM 推理：最多 23.1% 加速、52.4% 能耗降低，代码已开源。",
      detail: "研究背景：把 LLM 直接部署到手机等移动平台有隐私、个性化、低时延等收益，但 LLM 计算需求远超资源受限平台的承受力；更麻烦的是移动设备外形紧凑、没有风扇等散热手段，高处理器占用率极易过热降频（throttling），进一步拖慢推理。\n现有工作的缺口：面向移动 LLM 的 DVFS（动态电压频率调节）功耗治理方法大多只优化硬件参数与处理器频率，在部分热受限场景下失效。\n关键洞察：并非所有 token 都需要「全深度推理」才能保持高质量生成——这打开了算法层（投机解码）与系统层（频率调节）联合优化的空间。\n方法（PELM）：在传统 DVFS 频率调节之上，增加两个负载相关的调节旋钮——投机解码（speculative decoding）与可变验证深度（variable verification depth），把优化空间从一维扩展到多维，动态权衡速度、能耗与生成质量。\n结果：跨多个硬件平台与数据集的评估显示，PELM 相比最先进的功耗治理方法最多提速 23.1%、降低能耗 52.4%，同时任务表现相当。源代码开源（github.com/imec-nu/PELM）。",
      tags: ["投机解码", "DVFS", "能耗优化"],
      url: "https://arxiv.org/abs/2609.09662"
    },
    {
      id: "p5", group: "recent", cat: "端侧智能体", date: "2026-09-09",
      title: "From Fixed Keys to Readable Schemas: Small Language Models for Vehicle Agent Function Calls",
      authors: "Hamed Jafarzadeh Asl, Yuanhao Yu, Vahid Partovi Nia",
      venue: "arXiv:2609.09476", level: "预印本",
      summary: "车载 SLM 函数调用设计选择研究：Functional Token 推理紧凑但无法泛化到未见函数，Schema-in-Prompt 可泛化但内存与延迟更高；函数面表示方式比模型规模更关键。",
      detail: "研究背景：车载语音助手必须在严格的内存与时延约束下，把自然语言请求翻译成准确的车辆函数调用，这让小语言模型（SLM）成为端侧部署的有力候选。一个关键设计问题是：如何向模型呈现「可调用的函数面」？\n两种方案：其一是为每个函数训练专用 Functional Token（FT，固定键）——推理紧凑，但只能调用训练时学过的函数；其二是把函数的 JSON Schema 直接放进提示词（Schema-in-Prompt, SIP，可读模式）——能泛化到未见函数，代价是提示更长、推理开销更大。\n基准构建：基于 Android Automotive 的 79 个车辆函数，构建 9,822 条单轮样本，包含 held-out（留出）函数与应当拒绝的域外请求；在 270M–1.7B 四个 SLM 上做对等微调对比。\n主要发现：已见函数上，270M 模型即可追平 1.7B，综合最佳出现在 0.6B；held-out 函数上 FT 按构造零准确率，而 SIP 随规模显著提升；域外请求上 FT 会错误调用训练过的不可用函数，SIP 则能依据所提供的函数列表更可靠地拒绝。\n结论与代价：函数面的表示方式（而非模型规模）决定了 SLM 函数调用的能力与失败模式；SIP 的灵活性以更高内存占用与推理延迟为代价，作者还给出解释 SIP 泛化能力的理论分析。",
      tags: ["车载智能体", "SLM", "函数调用"],
      url: "https://arxiv.org/abs/2609.09476",
      image: "https://arxiv.org/html/2609.09476v1/figures/teaser.png",
      imageCap: "论文结构图 · 自动抓取自 arXiv HTML 版"
    },
    {
      id: "p6", group: "recent", cat: "端侧智能体", date: "2026-09-07",
      title: "Beyond Fluent Generation: A CPU Reliability Benchmark for MCP-Style Tool Calling in Sub-2B Small Language Models for Edge Deployment",
      authors: "Abrar Shahriar, Qurat-Ul-Ain Mastoi",
      venue: "arXiv:2609.07370", level: "预印本",
      summary: "在树莓派 / Jetson Nano 等单板机上评测 5 款 <2B 模型的 MCP 式工具调用：Qwen2.5-1.5B 最佳（75–79%），1000 条原始回复仅 5 条可直接解析为 JSON——端侧 Agent 高度依赖输出恢复。",
      detail: "研究背景：树莓派、NVIDIA Jetson Nano、Arduino UNO Q、Orange Pi、LattePanda 等资源受限单板机，催生了减少云依赖、改善数据本地性、容忍断连的端侧 SLM 智能体。而 MCP 式工具调用对模型的要求远高于「生成流畅文本」：必须输出机器可读 JSON、选对工具、补全所有必填参数、避免误动作。\n基准设计：在 100 条提示（天气检索、网页搜索、计算、邮件撰写、任务创建）上，对五款 2B 以下开源模型（Phi-1.5、Pythia-1.4B、TinyLlama-1.1B-Chat、Qwen2.5-0.5B/1.5B）做贪心与核采样两种解码评测；评分维度包括可解析性、工具名正确性、参数完整性与取值一致性，并设计了一个恢复解析器（剥离 Markdown 围栏、抽取花括号子串）。\n核心结果：严格的事后审计发现 1000 条原始回复中只有 5 条能直接解析为 JSON；经恢复解析器后 Qwen2.5-1.5B 达 75%（贪心）/79%（采样），Qwen2.5-0.5B 贪心 72% 但采样下降到 32%，Phi-1.5 为 0%，Pythia 与 TinyLlama 最多 7%——端侧 Agent 高度依赖输出恢复层。\n资源侧：CPU 探针显示 Qwen2.5-1.5B 需 7,960MiB 内存、平均 30.8s 延迟；Qwen2.5-0.5B 为 3,637MiB、10.6s，揭示可靠性-资源权衡。作者建议安全部署需要 schema 校验、受限生成、最小权限执行与后果性操作的人工升级通道。",
      tags: ["MCP", "工具调用", "单板机"],
      url: "https://arxiv.org/abs/2609.07370"
    },
    {
      id: "p7", group: "recent", cat: "推理与系统", date: "2026-09-03",
      title: "LeanStream: A Speculate-and-Refine Streaming Framework for Efficient on-Device LLM Inference",
      authors: "Renyuan Liu, Yuyang Leng, Kaiyan Liu 等（IBM / UIUC）",
      venue: "arXiv:2609.03079", level: "预印本",
      summary: "「推测-精化」流式框架：用部分 GPU 结果渐进修正计算 / 加载 / 缓存保留优先级，实现 GPU 执行与存储 I/O 细粒度重叠；内存降低 4.8–7.5×，吞吐再提 1.6–2.1×。",
      detail: "研究背景：端侧 LLM 推理对隐私与响应速度有吸引力，但模型权重远超手机/嵌入式设备的可用 DRAM。已有系统利用激活稀疏性把权重卸载到 SSD/闪存，却面临一个根本性的系统矛盾：准确的稀疏执行决策需要最新的上下文，而计算与 I/O 的高效重叠需要尽早预测——于是现有设计要么串行执行，要么付出冗余权重读取、额外计算与缓存开销。\n方法（LeanStream）：提出「推测-精化（speculate-and-refine）」的流式执行框架——用部分 GPU 计算结果渐进地精化三类优先级：计算优先级、加载优先级与缓存保留优先级，从而在保证正确性的前提下实现 GPU 执行与存储 I/O 的细粒度流水线重叠。\n实现与评估：在移动与嵌入式两类平台上实现 LeanStream。与既有端侧 LLM 推理系统相比：在取得前人最优吞吐的条件下，内存占用降低 4.8–7.5×；在内存受限设置下，token 生成吞吐再提升 1.6–2.1×。",
      tags: ["推理系统", "存储卸载", "流式执行"],
      url: "https://arxiv.org/abs/2609.03079"
    },
    {
      id: "p8", group: "recent", cat: "能效与评测", date: "2026-09-02",
      title: "How Do Prompt Variations Affect Energy Consumption in On-Device LLMs?",
      authors: "Wei Hu, Xiaolong Tu, Dawei Chen 等（GSU / Google）",
      venue: "arXiv:2609.01798", level: "预印本",
      summary: "首个系统研究提示词设计如何影响端侧 LLM 能耗：认知负荷主要影响每 token 能耗，措辞模式通过 token 用量影响总能耗；端侧提示工程需要「模型感知」。",
      detail: "研究背景：LLM 正越来越多地部署在手机等移动设备上，能耗随之成为关键部署约束；然而提示词（prompt）设计对能耗的影响此前缺乏系统研究。\n实验设计：本文开展了一项覆盖提示属性、数据集、模型与设备四个维度的广泛实证研究，并对推理过程做分相剖析（profiling），把能耗拆分为 prefill（预填充）与 decode（解码）两个阶段分别计量。\n主要发现：提示的两个属性以不同机制影响能耗——认知负荷（cognitive load，任务本身要求的高低）主要改变「每 token 的能耗成本」；措辞模式（phrasing pattern，同一任务的不同表达方式）则主要通过「token 使用量」影响总能耗。\n进一步分析：能耗-质量联合分析显示，提示设计对不同模型会重塑出不同的可达前沿（Pareto frontier）——同样的提示优化在 A 模型上省电、在 B 模型上可能适得其反。结论：面向能耗的端侧提示工程应当「模型感知」（model-aware）。代码、数据与脚本已开源（amai-gsu.github.io/PromptProperty/）。",
      tags: ["提示工程", "能耗", "实证研究"],
      url: "https://arxiv.org/abs/2609.01798"
    },
    {
      id: "p9", group: "recent", cat: "能效与评测", date: "2026-09-01",
      title: "Triple-Bottom-Line Sustainability of Language Models for Edge AI: A Comparison Between SLMs and Quantized LLMs",
      authors: "Jainil Dharmil Shah",
      venue: "arXiv:2609.00665", level: "预印本",
      summary: "提出三支柱「全息可持续性得分 HSS」（能力效率 / 能耗 / 安全）对比原生 SLM 与量化 LLM 共 30 种配置：Qwen3-30B-A3B/GGUF Q4 综合第一——量化大模型未必输给原生小模型。",
      detail: "研究背景：边缘 AI 的模型选型通常只看单一指标——准确率、时延、内存、能耗或安全之一；而一个可部署的语言模型必须同时平衡这五个维度。\n方法：提出可复现的「全息可持续性得分（Holistic Sustainability Score, HSS）」，按三重底线（triple bottom line）组织：经济支柱（能力 + 系统效率）、环境支柱（运行时 GPU 能耗）、社会支柱（有害提示的鲁棒性，以攻击成功率近似）。实验覆盖 5 个 BF16 原生 SLM 与 5 个 LLM，后者在 BF16 / INT8 / NF4 4-bit / GPTQ 4-bit / GGUF Q4 五种量化下共形成 30 种实测配置；能力用 5 个零样本基准评估，效率测时延/吞吐/峰值显存/能耗。\n结果：综合排名第一的是 Qwen3-30B-A3B / GGUF Q4（93.38 分），其次 Mistral-Small-24B / GGUF Q4（92.40）；SLM 中排名最高的是 Phi-4-mini / BF16（89.49）。\n结论：「原生训练的小模型必然是更可持续的边缘选择」这一假设并不普适成立——优化得当的量化大模型可以在整体上胜出；量化是系统级的设计选择，而非单调的「精度-效率」折衷。作者同时说明 HSS 得分相对于其比较池与代理指标定义。",
      tags: ["模型选择", "量化", "可持续性"],
      url: "https://arxiv.org/abs/2609.00665",
      image: "https://arxiv.org/html/2609.00665v1/figures/figure_1.png",
      imageCap: "论文结构图 · 自动抓取自 arXiv HTML 版"
    },
    {
      id: "p10", group: "recent", cat: "推理与系统", date: "2026-09-01",
      title: "mzCache: On-Device LLM Memory Management under Multitasking",
      authors: "Hongseung Yu, Minsung Kim, Jongseok Park, Kyunghan Lee（SNU）",
      venue: "arXiv:2609.01338", level: "预印本",
      summary: "面向手机多任务内存压力的端侧 LLM 内存管理：细粒度共享缓冲 + 混合换出，利用 SoC 统一内存实现 GPU 零等待推理与 CPU 侧并行恢复，TTFT 降低 2.1–5.5×；基于 llama.cpp 落地为安卓应用。",
      detail: "研究背景：端侧手机 LLM 推理正获得大量关注，但手机运行在高度动态的多任务环境中——用户频繁切换应用造成内存压力，操作系统会把 LLM 的内存（模型权重 + KV 缓存）逐出（evict）。当新推理请求到来时，系统只能通过慢速存储读取恢复被逐出的内存、或整块重算 KV 缓存，严重劣化响应速度。\n方法（mzCache）：一个面向多任务环境的端侧 LLM 推理系统，核心是「面向恢复的内存管理」：把 LLM 内存划分为细粒度共享缓冲，支持部分逐出与部分恢复，并允许 CPU 与 GPU 跨处理器并发访问；配合混合 swap 与 backward-out 逐出策略，保证从任意逐出状态都能低延迟恢复。\n关键机制：利用移动 SoC 的统一内存（unified memory）特性，让 CPU 侧的恢复与 GPU 侧的推理并发进行——GPU 无需等待恢复完成即可「零等待」继续推理。\n实现与结果：在 llama.cpp 上实现并打包为 Android 应用。真实多任务场景下，相比「存储 backed 部分卸载」方案，Time-to-First-Token（首 token 时延）降低 2.1–5.5×。",
      tags: ["内存管理", "多任务", "llama.cpp"],
      url: "https://arxiv.org/abs/2609.01338"
    },
    {
      id: "p11", group: "published", cat: "推理与系统", date: "2024-01-01",
      title: "LLM in a Flash: Efficient Large Language Model Inference with Limited Memory",
      authors: "Keivan Alizadeh Sharifi, Iman Mirzadeh 等（Apple）",
      venue: "ICLR 2024", level: "顶会",
      summary: "苹果经典工作：利用激活稀疏性与投影层「闪存驻留」，把超过可用 DRAM 的大模型推理搬到手机上，是端侧大模型存储卸载路线的奠基之作。",
      detail: "研究背景：LLM 的参数量远超手机等设备的 DRAM 容量，如何「在有限内存下跑超内存大小的模型」是端侧部署的根本问题。苹果团队的答案是：不把整个模型装进 DRAM，而是把大部分权重留在闪存（NAND）上，推理时按需读取。\n两大核心技术：其一是稀疏感知（sparsity-aware）的加载——利用前馈层激活的稀疏性，只读取非零激活对应的权重行，大幅减少闪存读取量；其二是「带投影层的低秩读取」——为每层存储一组小的「锚点」神经元及其投影（低秩近似），先读锚点再投影出其余输出，进一步压缩需要搬运的数据量。两者叠加在准确率几乎无损的前提下显著降低时延。\n效果与影响：该方法使超出 DRAM 容量 2 倍以上的 LLM 能在移动设备上高效运行，直接影响了 Apple Intelligence 的端侧推理栈；此后所有「闪存/SSD 卸载」方向的研究（包括本周的 LeanStream）都以它为对照基线。",
      tags: ["闪存卸载", "稀疏性", "奠基工作"],
      url: "https://arxiv.org/abs/2312.11514"
    },
    {
      id: "p12", group: "published", cat: "推理与系统", date: "2024-01-01",
      title: "PowerInfer: Fast Large Language Model Inference with Consumer-grade GPUs",
      authors: "Yixin Song, Zeyu Mi, Haotian Xie 等（上海交大 IPADS）",
      venue: "MLSys 2024", level: "系统顶会",
      summary: "利用 LLM 推理的激活局部性，热神经元驻 GPU、冷神经元留 CPU，消费级 GPU 上最高 11.7× 加速；后续 PowerInfer-2 把该路线带上手机，首次在智能手机跑超百亿参数模型。",
      detail: "关键观察：LLM 推理存在显著的「激活局部性」——少量「热」神经元贡献了大部分激活值，而大多数「冷」神经元很少被激活。传统推理引擎把所有权重放在同一设备，白白浪费了这一性质。\n方法（PowerInfer）：构建 GPU-CPU 混合推理引擎——自适应地把热神经元放进 GPU 显存并缓存，冷神经元留在 CPU 内存与 GPU 之间按需换入换出；配合细粒度流水线隐藏跨设备通信。针对 MLP 层与注意力层分别设计了利用局部性的算子。\n结果：在 RTX 4090 等消费级 GPU 上，相对 llama.cpp 最高取得 11.69× 加速，同时保持生成质量。\n后续影响：其手机端续作 PowerInfer-2（2024）通过异构神经网络计算、细粒度权重复用与中心化 KV 缓存，首次在智能手机上运行超百亿参数模型，成为端侧大模型系统化的标志性成果；「热冷分离」也成为端侧推理的通用设计模式。",
      tags: ["激活局部性", "混合推理", "手机部署"],
      url: "https://arxiv.org/abs/2312.12456"
    },
    {
      id: "p13", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "ArrowCloak: TEE-Shielded LLM Partitioning with Obfuscation",
      authors: "ArrowCloak 作者团队",
      venue: "USENIX Security 2025", level: "CCF-A",
      summary: "TEE 保护的端侧 LLM 推理：以代数混淆变换把计算密集层安全卸载到 GPU、仅轻量运算留在 TEE，兼顾模型知识产权保护与性能。",
      detail: "研究背景：端侧部署的 LLM 面临模型权重（核心知识产权）被窃取的风险；TEE 能提供强隔离但算力有限，无法承载 LLM 的全部矩阵运算。\n方法（ArrowCloak）：属于「TEE-Shielded LLM Partition」路线的代表工作——对 LLM 中计算密集的层施加可证明的（provable）混淆变换后，安全地卸载到不受信任的 GPU 执行；只把轻量且敏感的运算保留在 TEE 内。混淆变换在数学上保证 GPU 侧无法从变换后的计算中恢复权重信息，从而以远小于纯 TEE 执行的开销，获得接近的机密性保证。\n效果：在保护权重机密性的同时，推理性能显著优于把全部计算放进 TEE 的基线。\n后续：本周预印本《Understanding the Security Boundary…》（p3）提出的 Collapse 攻击揭示了此类混淆方案的共性漏洞，ArrowCloak 亦在其列——建议与本板块 p3 对照阅读，关注作者的修补版本。",
      tags: ["TEE", "混淆", "USENIX Sec'25"],
      url: "https://www.usenix.org/conference/usenixsecurity25"
    },
    {
      id: "p14", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "TSQP: Efficient and Secure LLM Inference through TEE-based Spatial Quantization Partitioning",
      authors: "TSQP 作者团队",
      venue: "IEEE S&P 2025", level: "CCF-A",
      summary: "面向量化 LLM 的 TEE 防护：将推理按空间切分，敏感计算保留 TEE、量化等重负载卸载 GPU，兼顾安全与效率；与 ArrowCloak 同属 TSLP 路线。",
      detail: "研究背景：与 ArrowCloak 同属「TEE-Shielded LLM Partition（TSLP）」技术路线，但聚焦量化 LLM 场景——量化是端侧部署的标配，而量化运算的算力需求使纯 TEE 执行不现实。\n方法（TSQP）：把量化 LLM 的推理计算图按「空间」切分：安全敏感的计算（如部分线性层的密钥相关运算）保留在 TEE 内，计算繁重的量化矩阵乘等卸载到不受信任的 GPU 加速；通过特定的空间划分与数据变换，保证卸载部分不泄露权重信息，同时把 TEE 内的计算与通信开销控制在可用范围。\n效果：相较纯 TEE 方案大幅提升性能，相较无保护卸载显著提升机密性，在安全-效率曲线上取得更好的平衡点。\n后续：本周 Collapse 攻击（见 p3）指出其特定架构实现存在可利用的攻击面，说明 TSLP 路线仍需形式化的安全边界分析——这正是 p3 的贡献方向。",
      tags: ["TEE", "量化", "IEEE S&P'25"],
      url: "https://sp2025.ieee-security.org"
    },
    {
      id: "p15", group: "published", cat: "安全与隐私", date: "2025-01-01",
      title: "LoRO: Low-Rank Obfuscation for TEE-Assisted DNN/LLM Inference on Untrusted GPUs",
      authors: "LoRO 作者团队",
      venue: "NeurIPS 2025", level: "CCF-A",
      summary: "以低秩（low-rank）变换为混淆原语保护端侧模型权重知识产权的 TEE-GPU 协同推理方案，低秩结构带来更小的 TEE 内计算与通信开销。",
      detail: "研究背景：TEE 辅助 + 不可信 GPU 加速的混合推理中，如何在卸载计算的同时隐藏模型权重，是该路线的核心问题；已有混淆方案的开销与安全强度各有短板。\n方法（LoRO）：把「低秩（low-rank）变换」作为核心混淆原语——对需要卸载到 GPU 的计算施加低秩分解形式的变换，使 GPU 侧观察到的是经变换后的中间表示而非原始权重；低秩结构同时把 TEE 内需要完成的计算与通信量压到很低，兼顾安全与端侧可接受的延迟。\n适用范围：面向 DNN/LLM 的 TEE 辅助推理设计，对线性层密集的 transformer 结构尤其友好。\n后续：作为 NeurIPS 2025 发表的 TSLP 代表方案，其低秩原语组合同样被本周 Collapse 攻击（p3）证明存在可利用的安全边界——与 p3 提出的 O_ext 新原语对照阅读，能完整看到这条研究线的攻防演进。",
      tags: ["低秩混淆", "TEE", "NeurIPS'25"],
      url: "https://neurips.cc"
    }
  ],

  /* ---------------- 板块三：知识分享 ----------------
   * resources 按 group 分区显示: 厂商官方博客 / 个人博客 / 中文媒体 · 公众号
   * intro=点击卡片弹出的简介(段落以 \n 分隔)
   */
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
      { group: "厂商官方博客", name: "Apple Machine Learning Research", type: "厂商研究博客", letter: "A",
        text: "AFM 系列技术报告、端侧训练与适配的一手资料。",
        url: "https://machinelearning.apple.com",
        intro: "苹果的官方机器学习研究博客，发表 Apple Intelligence 背后的基础模型（AFM 系列）技术报告、端侧优化的第一手细节，以及 ML 团队的论文解读。\n代表作：《Introducing Apple's On-Device and Server Foundation Models》（2024，首次公开 3B 端侧模型的架构与训练后优化）、《Updates to Apple's Foundation Models》（2025）与本周收录的 AFM 3 第三代报告（2026）。\n适合谁：想了解工业界最强端侧模型如何炼成（后训练、蒸馏、适配器、评测方法）的工程师与研究者。文章全部免费、无需注册。" },
      { group: "厂商官方博客", name: "Qualcomm AI Hub & Blog", type: "厂商研究博客", letter: "Q",
        text: "数百个端侧优化模型一键部署到骁龙平台，量化、编译与异构计算的工程实践大全。",
        url: "https://aihub.qualcomm.com",
        intro: "高通官方的端侧 AI 开发者门户 + 研究博客：AI Hub 收录数百个已在骁龙平台优化（量化/编译/算子调优）的模型，可一键部署到真机；博客侧持续输出 NPU 架构、量化实践与端侧智能体（Agentic AI）的技术文章。\n看点：Hexagon NPU 的编程模型与最佳实践、Snapdragon Summit 后的模型支持更新、端侧 Stable Diffusion / LLM 的官方示例代码。\n适合谁：做安卓端侧部署、需要「模型-芯片」联合调优的移动端工程师。" },
      { group: "厂商官方博客", name: "Google DeepMind / Developers Blog", type: "厂商研究博客", letter: "G",
        text: "Gemini Nano、AICore 与 Android 端侧 AI 的官方进展；AICORE API 与 ML Kit 的端侧能力说明中心。",
        url: "https://blog.google/technology/ai/",
        intro: "Google 官方 AI 博客（DeepMind + Developers 合流），端侧相关内容集中在：Gemini Nano 与 Android AICore 的每次更新、ML Kit / MediaPipe 的端侧能力（推荐用Generative AI API 一行代码调用内置小模型）、以及 Gemma 开源系列的发布说明。\n看点：Gemma 系列开源模型的发布与变体（含面向端侧的轻量版）、Chrome / Android 内置 AI 能力路线图。\n适合谁：安卓生态开发者，以及跟踪「系统级内置模型」路线的从业者。" },
      { group: "厂商官方博客", name: "面壁智能数据洞察", type: "厂商研究博客", letter: "面",
        text: "MiniCPM 技术解读与「知识密度」路线的持续输出，国产端侧模型的第一视角。",
        url: "https://www.modelbest.cn",
        intro: "面壁智能（ModelBest）官方渠道，持续输出 MiniCPM 系列端侧模型的技术解读：模型设计、量化方案、端侧推理优化与「知识密度定律」研究路线；官网新闻室同步发布商业化落地动态（如搭载三星旗舰）。\n看点：MiniCPM-V 多模态、MiniCPM-o 全模态、MiniCPM5-2B 与具身系列 MiniCPM-Robot 的发布说明；配套 Hugging Face / GitHub 开源仓库。\n适合谁：关注国产端侧模型第一视角、做中文场景端侧部署的团队。" },
      { group: "个人博客", name: "Tianqi Chen 陈天奇", type: "个人博客", letter: "T",
        text: "MLC LLM / TVM / MX 作者，用编译器视角系统解决端侧部署问题的开创者。",
        url: "https://tqchen.github.io",
        intro: "陈天奇（CMU 教授，Apache TVM / MLC-LLM / MX 生态作者）的个人博客。他把机器学习编译（MLC）作为方法论，系统回答「模型如何高效跑进各种硬件」——从 GPU 到手机 NPU。\n代表作：《Bringing LLMs to Any Device with MLC LLM》系列（在 iPhone/安卓上部署 Llama 的开创性实践）、MLC 课程讲义、以及关于 AI 系统技术栈演进的系列长文。\n适合谁：想从编译器与系统层面（而非调用 API 层面）理解端侧部署的学习者；配套开源课程可跟学。" },
      { group: "个人博客", name: "Georgi Gerganov", type: "个人博客", letter: "G",
        text: "llama.cpp / GGML / whisper.cpp 作者，GGUF 量化生态奠基人；端侧推理开源事实标准的源头。",
        url: "https://ggerganov.com",
        intro: "Georgi Gerganov 的个人站点。他是 llama.cpp、GGML、whisper.cpp 等项目的作者——GGUF 量化格式与 CPU 推理优化的事实标准，几乎所有端侧/本地推理工具链（Ollama、LM Studio 等）都构建在他的工作之上。\n看点：ggml 的架构笔记、量化方法的演进讨论，以及他近年创业（本地推理方向）后的实践分享；GitHub 动态本身就是端侧推理技术的风向标。\n适合谁：想理解「为什么 4-bit 量化能在笔记本/手机上跑大模型」底层原理的工程师。" },
      { group: "个人博客", name: "Andrej Karpathy", type: "个人博客", letter: "K",
        text: "从 nanoGPT 到 LLM101n，把大模型拆到最小可运行单元；理解小模型训练原理的最佳入门材料。",
        url: "https://karpathy.github.io",
        intro: "前特斯拉 AI 总监、OpenAI 创始成员 Karpathy 的博客与公开课合集。虽然不专门写「端侧」，但他把 transformer 训练拆到最小可运行单元的讲解方式，是理解小模型（也是端侧模型）原理的最佳起点。\n代表作：《The Unreasonable Effectiveness of Recurrent Neural Networks》、nanoGPT（约 300 行训练出 GPT-2）、视频课《Let's build GPT》与《Deep Dive into LLMs》、以及教学项目 LLM101n。\n适合谁：需要补齐「模型内部原理」基础的端侧工程师；所有材料免费。" },
      { group: "个人博客", name: "Horace He", type: "个人博客", letter: "H",
        text: "PyTorch 核心 contributor，专注推理效率与 ML 系统；写端侧 / 推理优化最深入的个人博客之一。",
        url: "https://horacehe.gg",
        intro: "Horace He（PyTorch / TorchInference 核心 contributor）的个人博客，主题集中在推理效率与 ML 系统的交叉点：注意力变体、量化误差分析、Kernel 融合、动态批处理等。\n代表作：《Fast Attention》系列的测算与思考（对 FlashAttention 一代的背景理解极有帮助）、关于 LLM 推理栈瓶颈的系统性分析。\n适合谁：做推理优化（云端或端侧）的研究者与内核工程师——文章以「把问题算清楚」著称，公式与实测并重。" },
      { group: "个人博客", name: "Simon Willison", type: "个人博客", letter: "S",
        text: "LLM 应用实践的一手笔记，工具调用、提示工程与安全议题跟踪，更新勤、观点实。",
        url: "https://simonwillison.net",
        intro: "Django 联合创始人 Simon Willison 的博客，近五年几乎每天更新 LLM 应用实践笔记：新模型发布的一手上手测评、工具调用（tool use）与提示工程实践、LLM 安全（提示注入等）议题跟踪。\n看点：每款重要模型发布当天他几乎都会给出实测；llm 命令行工具与 Datasette 生态的作者；对「本地/端侧运行模型」也有大量实操记录（Ollama/llama.cpp 场景）。\n适合谁：把 LLM 真正用进产品的工程师；想跟进模型生态变化但没时间刷推的人——他的博客就是高信噪比的过滤器。" },
      { group: "个人博客", name: "Chip Huyen", type: "个人博客", letter: "C",
        text: "《Designing Machine Learning Systems》作者，ML 系统与部署领域的经典书写者，端侧工程化的方法论参考。",
        url: "https://huyenchip.com",
        intro: "Chip Huyen（《Designing Machine Learning Systems》与《AI Engineering》作者）的个人博客，专注 ML/AI 系统的工程化：从数据管道、模型部署、推理服务到近年密集更新的 LLM 工程议题（RAG、评估、推理优化）。\n代表作：《Machine Learning Tooling》系列盘点、《The Implications of LLMs for ML Engineering》等长文——中文圈广泛流传的多个「AI 工程化」框架源自她的梳理。\n适合谁：需要系统性方法论（而非碎片技巧）的 ML 平台 / 端侧部署工程师；她的书是许多团队的入门教材。" },
      { group: "中文媒体 · 公众号", name: "量子位", type: "中文媒体 · 微信公众号同名", letter: "量",
        text: "AI 资讯与模型发布第一时间的中文报道，公众号与网站同步更新，追踪国内外端侧动态的高频信源。",
        url: "https://www.qbitai.com",
        intro: "国内头部 AI 资讯媒体之一（微信公众号同名推送），以快、覆盖全著称：海内外模型发布当天出中文报道，端侧方向常见 MiniCPM、Qwen 小模型、骁龙/天玑 NPU、AI 手机等选题。\n看点：模型发布快讯 + 榜单解读（Artificial Analysis 等指数的中文转述多引自此）、产品实测类稿件质量稳定。\n适合谁：需要每天 5 分钟扫一遍 AI 圈动态的从业者；官网可按标签检索历史文章。" },
      { group: "中文媒体 · 公众号", name: "机器之心", type: "中文媒体 · 微信公众号同名", letter: "机",
        text: "中文 AI 资讯与论文解读，端侧模型发布与技术综述跟踪的常用中文信源。",
        url: "https://www.jiqizhixin.com",
        intro: "国内最有影响力的 AI 技术媒体之一（微信公众号同名），强项是论文解读与技术综述：重要论文发布后常有中文拆解（配图讲解架构），端侧方向覆盖量化、蒸馏、端侧推理框架与移动智能体。\n看点：论文解读专栏、产业落地案例报道、年度技术盘点；对学术读者尤其友好。\n适合谁：想用中文跟进论文进展、又希望读到结构化解读的研究者与研究生。" },
      { group: "中文媒体 · 公众号", name: "36氪", type: "中文媒体 · 微信公众号同名", letter: "3",
        text: "科技产业报道，端侧 AI 的产业侧视角（融资、商业化、竞争格局）的主要来源之一。",
        url: "https://www.36kr.com",
        intro: "头部科技产业媒体（微信公众号同名），端侧相关内容偏商业视角：厂商竞争格局分析（如此前《「端侧AI战事」升级》系列）、创业公司融资、AI 手机/AI 硬件的产业链报道。\n看点：深度产业稿件 + 上市公司财报解读（瑞芯微/全志等端侧芯片股的财报分析多见于此）。\n适合谁：关心「端侧 AI 怎么赚钱、谁在投」的从业者与投资人；技术与产业视角与本站资讯板块互补。" },
      { group: "中文媒体 · 公众号", name: "电子工程专辑 EETimes China", type: "中文媒体 · 公众号同名", letter: "电",
        text: "半导体产业深度媒体，端侧芯片（瑞芯微 / 展锐 / 全志 / 海思）动态与供应链跟踪的首选中文信源。",
        url: "https://www.eet-china.com",
        intro: "老牌半导体产业媒体（微信公众号同名），强项在芯片层：SoC 架构解析、NPU 算力对比、供应链与工艺节点报道，国产端侧芯片厂商（瑞芯微、紫光展锐、全志、海思）的动态跟踪密度远高于泛科技媒体。\n看点：新品发布的技术拆解、工程师社区讨论、供应链数据；本站多条芯片厂商条目（如 9 月机圈混战）即源于此。\n适合谁：需要看懂「端侧 AI 的算力从哪来」的硬件工程师与产业分析师。" },
      { group: "中文媒体 · 公众号", name: "IT之家", type: "中文媒体 · 微信公众号同名", letter: "I",
        text: "消费科技快讯，手机厂商端侧 AI 功能与新机动态的快速信源。",
        url: "https://www.ithome.com",
        intro: "国内更新最快的消费科技资讯站之一（微信公众号同名），手机厂商的端侧 AI 功能上线、系统更新（ColorOS/原系统/MagicOS 的 AI 特性）、新机曝光与发布第一手快讯多源于此。\n看点：更新频率极高、带官方配图；适合作为 RSS 订阅源做每日扫描（本站 fetch_news 脚本已收录其 RSS）。\n适合谁：关注「端侧 AI 功能今天上了什么新」的产品与运营同学。" }
    ]
  }
};
