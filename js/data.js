/* ============================================================
 * 端侧AI每周情报站 · 数据文件（滚动窗口 · 以运行日为终点的近 7 天 · 周日快照归档见 js/archive/manifest.js）
 * 每周更新流程（Python 脚本，本地需 Python 3.10+）：
 *   python scripts\fetch_papers.py      # arXiv 论文候选
 *   python scripts\fetch_news.py        # RSS 资讯候选(默认近7天)
 *   python scripts\check_dblp.py        # DBLP 核对 venue
 *   python scripts\find_article.py "关键词..."  # 定位真实文章URL
 *   python scripts\fetch_paper_figs.py  # 抓取论文结构图(arXiv HTML版)
 * 收录规则：资讯只收最近一周(运行日往前7天)的事件，超出窗口的
 * 厂商动态不放卡片(由厂商雷达标注覆盖)；来源只用简体中文或英文。
 * 字段：url=阅读原文(具体文章页)；image=详情配图(og:image或正文图, 必配——
 *       源站被墙/无图时换用第三方报道图源并标明图源, 不得空图上站)
 * ============================================================ */
const WEEKLY_DATA = {

  meta: {
    issue: "2026 · 第 46 期",
    weekRange: "2026.10.30 — 11.05 · 近 7 天",
    updated: "2026-11-05",
    status: "rolling",
    editorsNote: "近 7 天聚焦：腾讯混元 Hy4 正式版（770B MoE 首次引入视觉理解，跻身全球最强开源）与 Mistral Large 4（1T 参数）双旗舰开源，MIT「权重空间编程」实现 GPT-6 Astra 直接修改 Qwen 权重（数学正确率 7.9%→48.1%）。国行 Apple 智能开测（Siri 直调千问、12 月正式推送）点燃端侧主线——端侧 AI 概念今日集体大涨（润欣 20cm 涨停、乐鑫创历史新高）。智元创新日三层配齐（GO-3+WITA-OMNI+灵渠 OS 底层开源约 2 亿行），优必选发布 Thinker-Sim 具身仿真平台；联想开天首款信创 AI 主机实现全链路国产化（本地跑 35B），国科微规划 GK6950 端侧 AI 芯片瞄准具身智能。XREAL Aura 开启 Android XR 有线眼镜时代，三星首款 AI 眼镜 12 月中旬上市在即，Omdia 预估 2027 AI PC 渗透率冲 60%。\n今日新增：Kimi Hosted Agents 托管智能体、端侧 AI 概念集体大涨（千问国行 Apple 智能开测催化）、国科微 GK6950 端侧 AI 芯片规划。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
news: [
{
      id: "n178", cat: "端侧Agent", source: "IT之家", date: "2026-11-05",
      title: "月之暗面发布 Kimi Hosted Agents 托管智能体：Harness 作为云端服务提供，有状态会话+持久沙箱+纯 HTTP 接入",
      summary: "月之暗面正式发布 Kimi Hosted Agents（托管智能体）——基于 Kimi Durable Harness，将支撑 Agent 运行的 Harness 框架作为云端服务（Harness as a Service）提供：企业无需自行搭建沙箱与会话基础设施，即可让智能体 7×24 小时执行长程任务。核心特性：有状态服务（会话历史、沙箱状态与产出文件持久化在服务端）、纯 HTTP+SSE 接入（无需 SDK，curl 即可调用）、智能体配置为持久化版本化对象（会话通过 agent_id 引用）、开箱即用的工具执行与失败恢复。",
      detail: "发布：11 月 5 日正式发布（IT之家/搜狐/网易多源），产品文档已在 Kimi API 开放平台上线。\n定位：基于 Kimi Durable Harness 的全托管智能体运行环境——企业无需自建沙箱、会话基础设施，7×24 小时执行长程任务。\n特性：有状态服务——会话历史、沙箱状态与产出文件持久化在服务端，API 可归档/删除会话；纯 HTTP+SSE 接入，无需 SDK 兼容层；智能体是持久化版本化配置对象（模型选择/系统提示词/可用工具），会话通过 agent_id 引用；开箱即用含工具执行、沙箱、失败恢复。\n端侧视角：「Harness as a Service」把 Agent 基础设施从「开发者自己搭」变成「平台托管」——Kimi 继游戏开发解决方案后再次延伸 Agent 生态布局；端侧开发者的 Agent 可直接接入云端托管运行时，端云协同的 Agent 开发闭环正在成形。",
      tags: ["Kimi", "Hosted Agents", "Harness", "云端服务", "智能体"],
      url: "https://www.ithome.com/1/022/572.htm",
      image: "images/news/n178.png",
      imageCap: "Kimi Hosted Agents 发布（图源：IT之家）",
      highlight: false
    },
{
      id: "n177", cat: "行业关注事件", source: "财联社", date: "2026-11-05",
      title: "端侧 AI 概念集体大涨：润欣科技 20cm 涨停、乐鑫科技创历史新高，千问国行 Apple 智能开测点燃端侧主线",
      summary: "端侧 AI 概念今日集体走强——润欣科技 20cm 涨停、博通集成涨停，乐鑫科技涨超 7% 创历史新高，瑞芯微、芯原股份、移远通信、天键股份涨超 5%。催化主线是国行 Apple 智能昨日开测（Siri 直调千问）与本周端侧 AI 密集落地（混元 Hy4/LongCat-2.5 国产算力/联想信创 AI 主机）——端侧 AI 概念从「官宣」进入「交付」阶段，芯片与模组厂商率先受益。",
      detail: "行情：11 月 5 日端侧 AI 概念集体走强——润欣科技 20cm 涨停、博通集成涨停，乐鑫科技涨超 7% 股价创历史新高，瑞芯微、芯原股份、燕东微、移远通信涨超 5%；当日全市场超 4800 只个股上涨。\n催化：国行 Apple 智能昨日（11 月 4 日）开启 Beta 测试（Siri 直调千问，12 月正式推送）——端侧 AI 概念从「官宣」进入「交付」阶段；叠加本周端侧落地密集（腾讯混元 Hy4 正式版/美团 LongCat-2.5 国产算力训练/联想首款信创 AI 主机/进博会高通端侧展示）。\n端侧视角：端侧 AI 正在从「技术叙事」变成「产业基本面」——芯片（乐鑫/瑞芯微）、模组（润欣/博通/移远）率先兑现业绩预期，反映市场对「端侧 AI 出货量级」的定价正在加速；后续观察厂商 Q4 订单与出货数据能否兑现涨幅预期。",
      tags: ["端侧AI", "概念股", "千问", "Apple智能", "产业落地"],
      url: "https://www.cls.cn/detail/2525789",
      image: "images/news/n177.png",
      imageCap: "端侧 AI 概念集体走强（图源：凤凰财经）",
      highlight: false
    },

{
      id: "n176", cat: "芯片厂商", source: "快科技", date: "2026-11-05",
      title: "国科微规划 GK6950 端侧 AI 芯片：面向人机交互与具身智能，配套 GK-VGGT-SLAM 流式空间智能方案",
      summary: "国科微公布端侧 AI 芯片新规划——GK6950 系列面向人机交互与具身智能（机器人）应用，针对端侧算力、内存、带宽与功耗有限且需低时延响应的挑战设计，在有限预算内兼顾响应速度、推理效率与空间精度，将于明年正式推出；配套推出轻量级 GK-VGGT-SLAM 流式空间智能方案支持机器人空间感知。公司已形成媒体显示、AI 视觉、车载电子与人机交互四大端侧 AI 产品系列，受益于端侧 AI 芯片放量前三季度归母净利润同比大增 5640%。",
      detail: "规划：11 月 5 日公布（网易/快科技报道），GK6950 端侧 AI 芯片系列将于明年正式推出。\n定位：面向人机交互与具身智能（机器人）——端侧算力、内存、带宽与功耗预算有限且需低时延响应，在有限预算内兼顾响应速度、推理效率与空间精度。\n配套：轻量级 GK-VGGT-SLAM 流式空间智能方案——支持机器人空间感知（SLAM=同步定位与地图构建）。\n背景：国科微已形成媒体显示、AI 视觉、车载电子、人机交互四大端侧 AI 产品系列；端侧 AI SoC 布局机器人（含具身智能）、AI PC、无人机、工业计算；受益端侧 AI 芯片放量，前三季度归母净利润同比大增 5640%，全系鸿蒙适配。\n端侧视角：国产芯片厂商正从「通用 SoC」转向「场景专用端侧 AI SoC」——GK6950 面向机器人+人机交互的定位说明端侧 AI 芯片开始按场景分化出专用产品线；GK-VGGT-SLAM 的空间智能方案瞄准的是机器人空间感知这个尚未有成熟专用芯片的空窗。",
      tags: ["国科微", "GK6950", "端侧AI芯片", "具身智能", "SLAM"],
      url: "https://news.mydrivers.com/1/1163/1163455.htm",
      image: "images/news/n176.png",
      imageCap: "国科微端侧 AI 布局（图源：快科技）",
      highlight: false
    },

{
      id: "n169", cat: "大模型厂商", source: "IT之家", date: "2026-11-04",
      title: "腾讯发布混元 Hy4 正式版：首次引入视觉理解跻身全球最强开源模型之列，权重近期开源",
      summary: "腾讯正式发布新一代大语言模型混元 Hy4——总参数 770B（MoE 架构、激活 49B、上下文 1M），在 8 月 preview 版基础上大幅扩展预训练与后训练规模，首次引入视觉理解能力（图像细节识别、复杂图表分析与视觉数学）与 Computer Use（图形界面和命令行操作），官方称综合表现跻身全球最强开源模型之列。办公生产力评测平均效果得分 83.18 分、任务通过率 96.15%，12 个评测场景中 9 个排名国内第一。模型权重将于近期开源，轻量版 Hy4 flash 随后发布。",
      detail: "发布：11 月 4 日正式版发布（此前 8 月 28 日发布 Hy4 preview），联合早报/财新/IT之家/央广多源。\n升级：预训练与后训练规模显著扩展——底座参数保持约 770B，首次引入视觉理解能力；大幅提升指令遵循、长文理解、长程任务、深度研究等综合能力，以实用性为核心原则。\n成绩：办公生产力评测平均效果得分 83.18 分、任务通过率 96.15%；12 个评测场景中 9 个排名国内第一；跻身全球最强开源模型之列。\n开源：模型权重将于近期开源；轻量版 Hy4 flash 也将随后发布。\n端侧视角：770B/49B 的开源旗舰是端侧小模型蒸馏与量化的上游新水源——腾讯的端云协同战略（Hy4 云侧+Hy4 flash 轻量版端侧）正在闭环，国产开源阵营（DeepSeek/Qwen/GLM/Kimi）再添一员，770B 的 MoE 激活 49B 意味着消费级硬件部署有了新可能。\n诚实边界：团队坦承与顶尖闭源模型仍有较大差距，「全球最强开源」为官方口径，独立评测待验证。",
      tags: ["腾讯混元", "Hy4", "开源模型", "MoE", "视觉理解"],
      url: "https://www.ithome.com/1/022/035.htm",
      image: "images/news/n169.png",
      imageCap: "混元 Hy4 正式版发布（图源：IT之家）",
      highlight: true
    },

{
      id: "n170", cat: "手机厂商", source: "新浪财经", date: "2026-11-04",
      title: "国行 Apple 智能今日开启 Beta 测试：Siri 可直接调用千问，12 月随 iOS 27.3 正式推送",
      summary: "国行 Apple 智能今日（11 月 4 日）随 iOS 27.3 开发者 Beta 版开启测试——首批功能包括实时翻译、写作工具、视觉智能、照片消除与智绘表情，Siri 可直接调用阿里通义千问的广博知识（用户可用 Siri 唤「千问」），12 月随 iOS 27.3 正式版面向中国用户全面推送。苹果在千问接入国行 Apple 智能官宣（10 月 31 日）四天后如约开启测试，端侧 AI 概念股应声走高。",
      detail: "开测：11 月 4 日随 iOS 27.3 开发者 Beta 版开放测试（官宣四天后如约兑现）；12 月随 iOS 27.3 正式版全面推送。\n首批功能：实时翻译（即时翻译）、写作工具、视觉智能、照片 App 的消除工具、智绘表情五大功能。\nSiri 集成：Siri 可直接调用千问的广博知识，用户可以用 Siri 喊「千问」——海外头部终端选择国产大模型落地的端侧 AI 里程碑。\n端侧视角：国行版 Apple 智能是端侧 AI 消费市场的标志性落地——千问作为首批接入苹果端侧的中国大模型，直接触达数亿 iOS 用户；今日开测也意味着端侧 AI 概念从「官宣」阶段正式进入「交付」阶段（受此影响端侧 AI 概念股震荡走高，龙迅股份、乐鑫科技涨超 10%）。",
      tags: ["Apple Intelligence", "千问", "端侧AI", "iOS", "Siri"],
      url: "https://k.sina.com.cn/article_5952915705_162d248f906703sd1i.html",
      image: "images/news/n170.png",
      imageCap: "国行 Apple 智能开测（图源：新浪财经）",
      highlight: false
    },

{
      id: "n166", cat: "大模型厂商", source: "新浪科技", date: "2026-11-03",
      title: "MIT 提出「权重空间编程」：GPT-6 Astra 直接修改 Qwen 权重修复推理死循环，数学正确率从 7.9% 提至 48.1%",
      summary: "MIT 研究人员提出「权重空间编程」（Weight-Space Programming）：让 GPT-6 Astra 直接分析并修改 Qwen3.5-0.8B 的神经网络权重——无需梯度下降或重新训练，仅改动约 0.016% 的参数，MATH-500 测试正确率即从 7.9% 提升至 48.1%（约 6 倍），指令遵循能力也提升近两倍。Astra 检查权重后定位到导致模型反复陷入推理循环的关键问题——有评论指出「修的是死循环，不是智商」。",
      detail: "发布：11 月 3 日多源报道（36氪/新浪/凤凰/知乎），MIT 团队工作公开。\n方法：权重空间编程——大模型（GPT-6 Astra）阅读另一个小模型（Qwen3.5-0.8B）的内部权重并直接修改，绕过梯度下降与重新训练的完整流程。\n结果：仅改动约 0.016% 参数，MATH-500 正确率 7.9%→48.1%（约 6 倍）；指令遵循能力提升近两倍。\n边界：Astra 修复的是「反复陷入推理循环」的权重病灶而非全面提升智力——「修的是死循环，不是智商」；能力上限与泛化范围仍待同行检验。\n端侧视角：「模型修理模型」的新范式——若权重手术可由强模型在本地完成，端侧小模型的自修复/自优化就有了技术路径；0.016% 的改动量也意味着修复包极小，端侧模型的「补丁分发」在工程上可行。",
      tags: ["MIT", "权重空间编程", "GPT-6", "Qwen", "模型修复"],
      url: "https://finance.sina.com.cn/tech/roll/2026-11-03/doc-inixkzym8904144.shtml",
      image: "images/news/n166.png",
      imageCap: "权重空间编程示意（图源：新浪科技）",
      highlight: false
    },

{
      id: "n168", cat: "AI硬件", source: "IT之家", date: "2026-11-03",
      title: "联想开天发布首款信创 AI 主机：兆芯 KX-7000+后摩「力擎」LQ50 全国产异构算力，本地跑 35B 大模型",
      summary: "联想开天发布首款信创 AI 主机——兆芯开先 KX-7000 八核处理器（自研内核微架构+Chiplet）搭配后摩智能「力擎」LQ50 NPU，本地算力 160 TOPS（INT8）、最高可选 320 TOPS 配置，可本地运行 35B 量级大模型；预装麒麟操作系统与天禧 AI Pro 智能体。国产 ZX86 CPU 与国产 NPU 协同的异构架构实现「全链路国产化」，1.6 升机身支持 7×24 小时自主执行 AI 任务，面向政企敏感数据闭环场景。",
      detail: "发布：11 月 3 日发布（IT之家/新浪/快科技多源）。\n配置：兆芯开先 KX-7000 八核（自研内核微架构+Chiplet 技术）+ 后摩智能「力擎」LQ50 NPU——本地算力 160 TOPS INT8，最高可选 320 TOPS；可本地运行 35B 量级大模型。\n软件：预装麒麟操作系统与天禧 AI Pro 智能体。\n形态：1.6 升紧凑机身，支持 7×24 小时自主执行 AI 任务。\n端侧视角：「全链路国产化」的端侧算力样板——国产 CPU+国产 NPU+国产 OS+国产智能体第一次在 1.6 升主机里配齐完整闭环，160-320 TOPS 本地算力把 35B 模型拉进政企桌面的敏感数据场景，信创市场从「能用」走向「能跑 AI」的标志性产品。",
      tags: ["联想", "信创", "AI主机", "兆芯", "后摩智能"],
      url: "https://www.ithome.com/1/021/779.htm",
      image: "images/news/n168.png",
      imageCap: "联想开天信创 AI 主机（图源：快科技）",
      highlight: false
    },

{
      id: "n167", cat: "端侧Agent", source: "搜狐科技", date: "2026-11-02",
      title: "月之暗面发布 Kimi 游戏开发与创意工作解决方案：K3.1 Pro+Kimi Code+Work 三层组合，接入 Unity/UE/Blender 插件",
      summary: "月之暗面正式发布「游戏开发与创意工作解决方案」——基于 Kimi K3.1 Pro 模型、Kimi Code 与 Kimi Work 系列 Agent 产品的组合方案，接入 Unity、Unreal Engine、Blender 等专业游戏开发工具插件，面向游戏团队的开发与创意工作流提效。这是 Kimi 继 K3.1 Pro（10-24 发布、11 月开放开源权重）之后向垂直行业工作流的第一次系统化落地。",
      detail: "发布：11 月 2 日发布、11 月 3 日报道潮（搜狐/网易/观点网多源）。\n构成：K3.1 Pro（2.8 万亿参数旗舰）+ Kimi Code（代码）+ Kimi Work 系列 Agent（工作流编排）三层组合，接入 Unity/Unreal Engine/Blender 专业工具插件。\n定位：帮助游戏团队提升开发与创意工作效率——从设计、编码到资产制作的垂直行业方案。\n端侧视角：大模型厂商正从「发模型」转向「发行业工作流包」——游戏开发是 AI 渗透最快的创意产业之一，模型+代码+Agent 的三层组合与 Unity/UE 引擎插件的深度绑定，为国产模型在专业创意工具链的落地打了个样。",
      tags: ["Kimi", "月之暗面", "游戏开发", "Agent", "工作流"],
      url: "https://m.sohu.com/a/1096211105_655634",
      image: "images/news/n167.png",
      imageCap: "Kimi 游戏开发解决方案（图源：搜狐科技）",
      highlight: false
    },

{
      id: "n155", cat: "大模型厂商", source: "亿邦动力", date: "2026-11-02",
      title: "美团发布 LongCat-2.5：1.6 万亿参数原生多模态、全程国产算力训练，面向长程智能体任务比肩国际闭源模型",
      summary: "美团发布新一代大模型 LongCat-2.5——面向长程智能体任务的原生多模态模型，总参数 1.6 万亿，训练全程由国产算力完成，整体能力比肩国际成熟闭源模型与头部开源模型。在 6 月 LongCat-2.0（首次在国产算力上完成万亿参数全流程训练与推理）基础上，强化原生视觉理解与智能体编程，并优化国产算力上的长上下文训练与推理效率。王兴明确「不做 Token 工厂」，模型服务本地生活主业——配套 AI 经营工作台「妙手」已服务古茗、徐升记、益禾堂等连锁品牌。",
      detail: "发布：11 月 2 日官宣，LongCat 系列第三代（2.0 于 6 月首次在国产算力完成万亿参数全流程训练与推理）。\n规格：总参数 1.6 万亿的原生多模态模型，训练全程国产算力；强化原生视觉理解与智能体编程能力，优化国产算力上的长上下文训练与推理效率——「国芯国模」再进一步。\n定位：CEO 王兴 8 月财报会口径——不会成为 Token 工厂，模型与 AI 产品用于支持主业、进入真实工作流解决真实问题。\n落地：技术博客案例显示模型可自主构建渠道利润表，识别支付 GMV 增长 23.2% 而渠道利润下降 1.7% 的增长质量问题并给出资源配置建议；AI 经营工作台「妙手」覆盖经营分析、门店管理与增长获客，已服务古茗、徐升记、益禾堂等连锁品牌。\n端侧视角：1.6 万亿参数全程国产算力训练是「国芯国模」路线的旗舰实证——国产算力从「能训练」走到「训出比肩闭源的旗舰」，为端侧蒸馏与量化提供了国产上游水源；智能体编程与长程任务能力也将沿妙手类工作台渗透到终端商家。",
      tags: ["LongCat", "美团", "国产算力", "多模态", "智能体"],
      url: "https://www.ebrun.com/20261102/718021.shtml",
      image: "images/news/n155.png",
      imageCap: "LongCat-2.5 技术博客案例（图源：亿邦动力）",
      highlight: true
    },

{
      id: "n156", cat: "行业动态", source: "财联社", date: "2026-11-02",
      title: "趋境科技联合智谱与摩尔线程发布国产异构推理「AI Token 工厂」解决方案，打通模型—推理—芯片产业闭环",
      summary: "趋境科技近日联合智谱与摩尔线程正式发布「国产异构推理高品质 AI Token 工厂解决方案」，率先打通「模型—推理—芯片」产业闭环，以底层系统工程重塑 Token 经济性——同等硬件投入下有效产出成倍提升，大幅降低综合成本。背景：趋境科技 10 月 26 日刚完成超 13 亿元 B 轮融资（年内累计 24 亿元），其 ATaaS 平台已在真实生产级环境实现国产芯片承载万亿级头部大模型。",
      detail: "发布：11 月 2 日财联社电讯，趋境科技联合智谱（模型侧）与摩尔线程（芯片侧）发布联合方案，定位「国产异构推理高品质 AI Token 工厂」。\n闭环：方案打通「模型—推理—芯片」三层——智谱 GLM 系列模型、趋境 ATaaS 推理平台、摩尔线程国产 GPU，以底层系统工程重塑 Token 经济性，同等硬件投入下有效产出成倍提升。\n背景：趋境 10 月 26 日完成超 13 亿元 B 轮融资（年内累计 24 亿元），募集投向高品质 Token 产能扩张与推理底层技术研发；其平台已在真实生产级环境实现国产芯片承载万亿级头部大模型，整体性价比对标国际最领先算力。\n端侧视角：「Token 工厂」是端侧 AI 的云侧镜像——推理性价比的提升直接决定端云协同的分工边界（哪些任务留在端侧、哪些上云）；摩尔线程的「云-边-端」全栈矩阵意味着同一套国产推理栈有机会从云侧工厂延伸到边端设备。",
      tags: ["Token工厂", "智谱", "摩尔线程", "国产算力", "推理"],
      url: "https://www.cls.cn/detail/2522336",
      image: "images/news/n156.png",
      imageCap: "趋境科技（图源：腾讯新闻）",
      highlight: false
    },

{
      id: "n171", cat: "AI硬件", source: "IT之家", date: "2026-11-02",
      title: "优必选发布具身智能仿真平台 Thinker-Sim：自研 Thinker-GS 高保真场景重建+SimReady 资产自动化生成，构建机器人训练与能力评测一站式体系",
      summary: "优必选科技 11 月 2 日发布具身智能仿真平台 Thinker-Sim，构建覆盖真实场景数字化、规模化仿真数据合成、机器人能力评测的一站式技术体系。平台采用自研 Thinker-GS 高保真场景重建算法与全流程 SimReady 资产自动化生成技术，实现从真实场景采集、三维重建到仿真资产生成的高效转换，并内置标准化仿真任务模板，让真实世界快速进入仿真、验证机器人能力。",
      detail: "发布：11 月 2 日优必选官宣（优必选公众号），IT之家一线报道。\n体系：一站式覆盖真实场景数字化、规模化仿真数据合成、机器人能力评测——基于真实工厂产线环境三维重建，可还原厂区空间布局、环境结构与视觉细节，并按训练、数据采集、算法评测等任务灵活加载机器人、生产设备、人员等前景资产。\n重建与资产：自研 Thinker-GS 高保真场景重建算法+全流程 SimReady 资产自动化生成——支持图文驱动的三维资产批量生成、低模拓扑优化、视觉材质生成与碰撞体自动配置，兼顾高质量视觉表现、物理仿真适配与规模化生产效率；可面向商业服务等场景快速生成数字孪生环境。\n评测：内置丰富的标准化仿真任务模板，覆盖机器人常用训练、数据合成与评测场景——无需从零搭建环境，模板选择与参数配置即可快速启动；支持仿真过程实时画面推流、任务状态监控与运行结果反馈。\n端侧视角：仿真平台是具身智能的「数据工厂」——真实世界高保真数字化与规模化数据合成直接决定机器人端侧策略的训练上限，标准化评测模板则让本体厂商能力对比有了统一基线；与 Genie 4（训练环境）、GO-3（基座模型）等共同补齐具身智能「训练-评测-部署」链路，头部本体厂商自建仿真基础设施的军备竞赛开打。",
      tags: ["优必选", "Thinker-Sim", "具身智能", "仿真平台", "机器人评测"],
      url: "https://www.ithome.com/1/020/888.htm",
      image: "images/news/n171.png",
      imageCap: "Thinker-Sim 具身智能仿真平台（图源：IT之家）",
      highlight: false
    },

{
      id: "n174", cat: "AI硬件", source: "IT之家", date: "2026-11-02",
      title: "消息称三星首款 AI 眼镜 12 月中旬登陆韩国美国：骁龙 AR1 Gen 1+Android XR 集成 Gemini，无屏语音交互续航 9 小时",
      summary: "据 TrendForce 11 月 2 日报道，三星计划 12 月中旬在韩国和美国推出品牌首款 AI 智能眼镜（命名暂定 Intelligent Eyewear，售价未定），首发市场不包括欧洲、中国和日本。该产品预计搭载高通骁龙 AR1 Gen 1 处理器、单次充电续航最长 9 小时，基于谷歌 Android XR 平台集成 Gemini AI，无显示屏、以语音交互为主，提供实时翻译与语音导航。",
      detail: "传闻：TrendForce 11 月 2 日报道（三星尚未官宣，标题保留「消息称」口径）；12 月中旬韩国、美国首发，先评估两地需求与用户反馈再决定是否扩大市场。\n规格：预计搭载高通骁龙 AR1 Gen 1 处理器，单次充电续航最长 9 小时；基于谷歌 Android XR 平台、集成 Gemini AI，通过摄像头和麦克风感知环境，提供实时翻译、语音导航等功能；可拍摄文件与会议场景并将信息整理到 Galaxy 手机笔记 App；无显示屏，主要通过语音交互。\n设计：三星已与 Gentle Monster、Warby Parker 合作——今年 5 月 Google I/O 展示两种设计方案，上月伦敦 Galaxy Unpacked 活动另现两款设计。\n竞争：Meta 已深耕智能眼镜多年、产品覆盖高中低价格段；XREAL AURA 作为首款 Android XR 智能 AR 眼镜预计 11 月中旬在美国、加拿大、日本、韩国出货。\n端侧视角：骁龙 AR1 Gen 1+云端 Gemini 的组合延续 Meta Ray-Ban 范式——眼镜端侧只承担感知与音频交互、重推理放在云端，9 小时续航正是无屏轻负载设计的红利；安卓 XR 阵营（谷歌平台+三星整机+XREAL 先行出货）对 Meta 的合围将在 12 月正式开打，AI 眼镜「无屏语音+有屏 XR」双路线并进。",
      tags: ["三星", "AI眼镜", "Android XR", "Gemini", "TrendForce"],
      url: "https://www.ithome.com/1/020/866.htm",
      image: "images/news/n174.jpg",
      imageCap: "三星首款 AI 眼镜设计示意（图源：IT之家）",
      highlight: false
    },

{
      id: "n172", cat: "AI硬件", source: "IT之家", date: "2026-11-01",
      title: "阿里千问 AI 眼镜 OTA 升级：新增通话翻译与媒体翻译，嘈杂环境同声传译抗噪再升级",
      summary: "阿里旗下千问 AI 眼镜 11 月 1 日迎来 OTA 升级：新增通话翻译（打电话、线上会议跨国无障碍实时翻译）与媒体翻译（海外播客、外语网课、外语大片实时翻译，千问 AI 穿戴 App 同步显示译文），并再次升级抗噪能力、优化嘈杂环境下的语音识别，让同声传译更准确及时。千问 AI 眼镜 G1 于今年 3 月开售，后续推出旗舰 S1，10 月又发布支持换电池的 N1 系列（2899 元起）。",
      detail: "升级：11 月 1 日 OTA 推送，三大更新。\n通话翻译：打电话、线上会议跨国无障碍实时翻译。\n媒体翻译：听海外播客、上外语网课、看外语大片支持实时翻译，千问 AI 穿戴 App 同步显示译文。\n抗噪：优化嘈杂环境下的语音识别，同声传译更准确、更及时。\n阵容：千问 AI 眼镜 G1 今年 3 月开售；旗舰 S1 在交互、显示、续航及硬件配置上均有升级；10 月发布 N1 系列（支持更换电池，Pro 版支持眼动交互/全天候健康监测），售 2899 元起。\n端侧视角：翻译是 AI 眼镜第一个被高频验证的刚需场景——通话与媒体翻译把「眼镜同传」从演示拉进日常通信与内容消费链路；嘈杂环境抗噪识别正是端侧音频前处理的价值点。与千问接入国行 Apple 智能同周，阿里在端侧入口上「眼镜+手机」两线并进。",
      tags: ["千问眼镜", "AI眼镜", "同声传译", "OTA", "阿里巴巴"],
      url: "https://www.ithome.com/1/020/768.htm",
      image: "images/news/n172.jpg",
      imageCap: "千问 AI 眼镜本次 OTA 更新内容（图源：IT之家）",
      highlight: false
    },

{
      id: "n159", cat: "AI硬件", source: "新浪财经", date: "2026-10-31",
      title: "罗技 MX KEYPAD 国行 799 元发售：9 个 LCD 自定义键一键调用 WorkBuddy，AI 入口硬件化再添一类",
      summary: "罗技 MX KEYPAD「创意工作台」国行 10 月 31 日发售，定价 799 元（美国 9 月 8 日以 99.99 美元先行）——9 个全彩可自定义 LCD 按键+2 个翻页按钮、每个应用最多 15 页配置，深度兼容腾讯 WorkBuddy（装插件一键调用默认快捷配置，国行购买赠送 WorkBuddy 积分）。Logi Actions SDK 支持开发者构建插件与宏、可借编程智能体生成集成代码，同期推出 MX Master 4 开发者特别版鼠标。",
      detail: "发售：10 月 31 日国行开售 799 元；美国市场 9 月 8 日以 99.99 美元率先发售。\n形态：9 个全彩可自定义 LCD 按键+2 个翻页按钮，每个应用最多 15 页操作；按键不作打字用，主打启动命令、运行宏与快捷操作。\nAI 集成：深度兼容腾讯 WorkBuddy——安装插件后一键调用默认快捷配置并可自定义更多快捷操作；国行购买赠送 WorkBuddy 积分。\n生态：Logi Actions SDK 主导开发者生态，可构建自定义插件、宏、脚本与快捷键，并可用编程智能体生成集成代码；同期推出 MX Master 4 开发者特别版（MX 系列首个特别版，终端风格设计）。\n端侧视角：AI 入口硬件化再添新品类——继 Copilot 键之后，LCD 可编程键与国产 AI 助手（WorkBuddy）的官方级配对，外设大厂把「一键唤起 AI」做成了标配能力。",
      tags: ["罗技", "MX KEYPAD", "WorkBuddy", "AI配件", "外设"],
      url: "https://finance.sina.com.cn/tech/digi/2026-10-31/doc-inixavkz4014346.shtml",
      image: "images/news/n159.png",
      imageCap: "MX KEYPAD（图源：搜狐科技）",
      highlight: false
    },

{
      id: "n143", cat: "手机厂商", source: "智东西", date: "2026-10-31",
      title: "国行 Apple 智能官宣接入阿里千问：Siri 问答、系统级写作与视觉智能三线打通，11 月 4 日开发者 Beta 开测、12 月正式推送",
      summary: "阿里巴巴官宣与苹果达成合作——千问大模型全面接入国行 Apple 智能：Siri 可直接调用千问回答问答并支持用文档和照片提问（发送前征得用户同意）；系统写作工具新增「千问创作」可按主题生成内容与图像；视觉智能支持「询问千问」识别相机所见。11 月 4 日起随 iOS 开发者 Beta 开放测试，12 月随 iOS 27.3 正式版面向中国用户推送；用户请求与生成回复均不会被用于模型训练。",
      detail: "官宣：10 月 31 日阿里官方公众号发布公告，苹果侧同步上线国行 Apple 智能官网。\n角色：千问在国行承担海外版中第三方大模型的角色——①Siri 问答（可传文档与照片向千问提问，发送前 Siri 征得同意）；②写作工具系统级接入「千问创作（Compose with Qwen）」，按主题生成文字与图像；③视觉智能「询问千问」识别相机所见，经相机控制、操作按钮或控制中心唤起。\n时间线：11 月 4 日起随 iOS 开发者 Beta 开测，12 月随 iOS 27.3 正式版面向中国用户；适用国行支持 Apple 智能的 iPhone（或定位与账户均在中国区）。\n隐私：用户请求与生成回复不用于阿里模型训练；登录可用 Apple 账户或千问 App 账户。\n端侧视角：国内「大模型×手机」的最高规格落地——旗舰海外模型在华首次让位于国产模型进入 Siri 级系统入口；千问经「手机厂商系统入口+千问App+开放平台」三线并进，与豆包、灵光在个人智能体入口上的对峙正式升级到 OS 层。",
      tags: ["苹果", "千问", "Apple智能", "Siri", "国行iPhone"],
      url: "https://zhidx.com/p/606181.html",
      image: "images/news/n143.jpg",
      imageCap: "千问接入国行 Apple 智能（图源：爱范儿）",
      highlight: true
    },

{
      id: "n148", cat: "行业关注事件", source: "智东西", date: "2026-10-31",
      title: "DeepSeek 开源 Super-agent 原型 dsh-superagent：Router+Worker 双层架构让 AI 指挥 AI 干活，可接入 GitHub 与飞书主动处理任务",
      summary: "DeepSeek 团队开源 Super-agent 设计探索原型 dsh-superagent-prototype（MIT 协议）——一个主动性编码 Agent，以 DeepSeek Harness 插件包形式封装，针对单个 GitHub 仓库工作。核心架构为 Router+Worker 双层：Router 负责任务调度，Worker 执行具体编码，实现「AI 指挥 AI」；可接入 GitHub 与飞书——工作群里讨论某个 Bug 时它能主动感知并处理，自动对接 CI 与 Issue 开发流程。团队强调自主性与克制并重，会主动干活也懂得何时闭嘴。",
      detail: "发布：10 月 31 日开源至 deepseek-ai/dsh-superagent-prototype（MIT 协议），属研究原型非正式产品，定位验证技术路线。\n架构：Router+Worker 双层——Router 负责全局调度与任务分解，Worker 执行具体编码工作，实现多 Agent 协作的「指挥-执行」模式。\n能力：主动性编码 Agent，针对单个 GitHub 仓库工作——接入 GitHub 和飞书后，工作群里讨论某个 Bug 时能主动感知并处理；自动对接 CI、Issue 等开发流程，形成「感知-分析-修复-提交」闭环。\n设计哲学：自主性与克制并重——Agent 会主动干活但也懂得不过度打扰用户，何时主动何时等待由 Router 层判断。\n诚实边界：DeepSeek 团队在文章结尾坦言该架构尚未完全解决所有问题，仍在持续探索中。\n端侧视角：这是继 ACE（谷歌）、灵光 2.0（蚂蚁）之后又一层级的智能体基础设施——前两者解决「智能体需要什么算力与环境」，dsh-superagent 解决「多个智能体如何协作」；开源生态的 Agent 框架正在从单 Agent 工具链走向多 Agent 编排，端侧执行层（OpenCode/WorkBuddy 等）的上层调度有了开源参照。",
      tags: ["DeepSeek", "Super-agent", "开源", "多Agent协作", "Router-Worker"],
      url: "https://zhidx.com/p/606311.html",
      image: "images/news/n148.png",
      imageCap: "dsh-superagent 架构（图源：智东西）",
      highlight: false
    },

{
      id: "n154", cat: "行业关注事件", source: "新浪科技", date: "2026-10-31",
      title: "据 The Information 爆料：Meta 联手傅利叶打造 Muse「物理化身」人形机器人原型 Max，1.5 米高搭载英伟达 Thor，3 个月做出已启动二代",
      summary: "据 The Information 援引知情人士，Meta 已与中国机器人公司傅利叶合作打造人形机器人原型「Max」——被视为 Meta Muse 模型的物理化身：身高约 1.5 米、体重约 48 公斤、搭载英伟达 Thor 芯片，硬件基于傅利叶前三代产品重新定制（身高比例、头显、摄像头与新手脚模块），研发仅用 3 个月。项目由扎克伯格亲自带队，第二代 Max 2 已启动开发，暂无正式上市时间表。",
      detail: "爆料：The Information 独家（10 月 31 日），国内多源转述规格一致；Meta 与傅利叶均未官方确认，属高可信爆料而非官宣，后续以官方口径为准。\n规格：身高接近 5 英尺（约 1.5 米）、体重约 106 磅（约 48 公斤）；搭载英伟达 Thor 机器人芯片；硬件基于傅利叶前三代产品，重新定制身高比例、头部设计、显示屏与摄像头，新增手部脚部模块。\n进度：研发仅用 3 个月；已启动第二代 Max 2 开发；目标是协助 Meta 机器人部门完善后续产品，暂无正式上市时间表。\n端侧视角：Muse 开放权重旗舰第一次有了「物理化身」——开放权重模型+中国供应链+英伟达端侧算力（Thor）的组合，具身智能「模型-本体」分工再添一例，傅利叶由此进入全球机器人叙事中心。",
      tags: ["Meta", "傅利叶", "人形机器人", "Muse", "具身智能"],
      url: "https://finance.sina.com.cn/tech/digi/2026-11-01/doc-inixepty4337025.shtml",
      image: "images/news/n154.png",
      imageCap: "Meta×傅利叶机器人原型 Max（图源：新浪科技）",
      highlight: false
    },

{
      id: "n146", cat: "AI硬件", source: "凤凰财经", date: "2026-10-30",
      title: "智元联合清华与无问芯穹发布群体经验学习范式 CEL：96 台真机集群成功率从 86.7% 提升至 98.3%，机器人开始互相学习",
      summary: "清华大学、无问芯穹与智元机器人联合提出群体经验学习（Collective Experience Learning，CEL）新范式——机器人不再仅依靠人类示教，而是借鉴群体中其他机器人同伴的真实作业轨迹作为经验来源。在 96 台真实机器人集群验证中，相同训练时间下任务成功率从 16 台的 86.7% 提升至 98.3%；配套 FERT 失败引导经验检索机制提高经验复用效率，为具身智能规模化落地提供从数据到智能的全栈闭环路径。",
      detail: "发布：10 月 30 日智元机器人联合清华大学、无问芯穹正式发布。\n范式：传统路径是「人类示教→机器人模仿」，CEL 改为「集群中任意成员的作业轨迹都成为全体成员的经验」——通过共享和积累经验持续共同提升。\n数据：机器人数量从 16 台增至 96 台时，相同实际训练时间下任务成功率从 86.7% 提升至 98.3%（另有报道集群验证成功率达 97.5%），证明群体规模扩大有利于经验积累。\n技术：配套 FERT（Failure-guided Experience Retrieval）失败引导经验检索——当某台机器人遇到失败时，系统优先检索群体中类似失败场景的成功经验进行针对性学习，提高经验复用效率。\n端侧视角：群体学习的前提是每台机器人都具备端侧推理能力——「集群自主进化」的瓶颈已从单机智能转向群体协同基础设施，与 Worken 度量衡同属智元「部署态」技术体系。",
      tags: ["智元", "群体学习", "CEL", "具身智能", "集群进化"],
      url: "https://finance.ifeng.com/c/8xdnytFdKqj",
      image: "images/news/n146.jpg",
      imageCap: "CEL 群体经验学习示意（图源：凤凰财经）",
      highlight: false
    },

{
      id: "n144", cat: "大模型厂商", source: "GitHub（xiaomi-research）", date: "2026-10-30",
      title: "小米开源 0.8B 文档理解模型 Xiaomi-OCR-0：单一模型覆盖解析/抽取/问答三任务，OmniDocBench 1B 以下第一",
      summary: "小米开源轻量级文档理解模型 Xiaomi-OCR-0——仅 0.8B 参数的统一 OCR 视觉语言模型，以 Qwen3.5-0.8B-Base 为起点、在约 1.7 亿条 OCR 中心样本上训练，单一模型同时支持文档解析、关键信息抽取与 OCR 视觉问答三大任务，OmniDocBench 1B 以下级别排名第一；权重与推理代码上线 Hugging Face 与 GitHub，社区 GGUF 量化版已出现。",
      detail: "发布：小米研究团队开源，权重与评测管线同步上线 Hugging Face（xiaomi-research/Xiaomi-OCR-0）与 GitHub。\n规格：0.8B 参数，Qwen3.5-0.8B-Base 起点，约 1.7 亿条 OCR 中心样本训练；单模型三合一——文档解析、关键信息抽取、OCR 视觉问答。\n成绩：OmniDocBench 1B 以下级别第一；该级别竞争正酣——智谱 GLM-OCR（0.9B）、百度 PaddleOCR-VL（0.9B）、阿里 OvisOCR2（0.8B）密集落子，轻量文档理解成为大厂小模型竞技的新赛场。\n落地：社区已出 GGUF 量化版，端侧与消费级显卡可本地部署。\n端侧视角：0.8B 级 OCR 三合一模型是「手机可跑的文档智能」的最小完备形态——票据、合同、课件在端侧解析闭环，配合微信 AI 录音笔等输入侧能力，端侧办公智能的拼图正在加速补齐。",
      tags: ["小米", "Xiaomi-OCR-0", "文档理解", "开源模型", "0.8B"],
      url: "https://github.com/xiaomi-research/Xiaomi-OCR-0",
      image: "images/news/n144.png",
      imageCap: "Xiaomi-OCR-0 仓库卡（图源：GitHub）",
      highlight: false
    },

{
      id: "n175", cat: "行业动态", source: "IT之家", date: "2026-10-30",
      title: "Omdia 预估 AI PC 出货占比 2027 年达 60%：69% 办公用户愿为端侧 AI 溢价，但仅 9% 将 AI 列为主要换机原因",
      summary: "Omdia 10 月 30 日发布分析指出，AI PC 出货占比将从 2025 年的 33% 升至 2027 年的 60%、2030 年达 79%，本地 AI 装机基础随换机周期逐步形成。调研显示 69% 用 PC 办公的受访者愿为可直接在设备上处理 AI 任务的电脑支付溢价，但仅 9% 将 AI 功能列为主要换机原因（62% 因设备变慢、损坏或想换新而换机）；内存占 PC 物料成本已从约 15% 升至近 40%，是端侧 AI 普及的最大变量。",
      detail: "预测：AI PC 出货占比 2025 年 33%→2027 年 60%→2030 年 79%——无论买家是否主动提出需求，本地 AI 装机基础都会随换机周期到来。\n意愿落差：69% 办公受访者愿为端侧 AI 支付溢价，但仅 9% 把 AI 列为主要换机原因、62% 换机是因变慢/损坏/想换新——AI PC 价值主张尚未真正打动买家；另有 78% 办公受访者每周至少数次使用 AI，其中仅 12% 使用单位或学校提供的工具，影子 AI 风险突出。\n成本逻辑：企业 AI 支出持续上涨（86% 设 AI 预算的组织预计 2027 年支出进一步上升），头部厂商转向 token 计费后支出更难预测；开源权重模型大幅缩小与前沿模型差距、量化压缩让模型可装入 PC 内存、NPU 成新机标配，越来越多常规 AI 工作可本地运行。\n内存变量：内存占 PC 物料成本自 2025 年以来从约 15% 升至近 40%，可能促使买家选更低内存配置，而本地 AI 恰恰需要更大内存；智能体 AI 是本地推理早期落地场景，对内存容量与带宽要求远超主流 PC，首批高端机型溢价较高。\n端侧视角：报告把「端侧推理 vs 云端 token 成本」算成了商业账——云成本是随用量增长的持续性开销，PC 是一次性投入，量化技术正把越来越多常规推理路由到端侧；69% 溢价意愿与 9% 换机动因的落差说明端侧 AI 目前仍是「搭车换机」的附赠能力，行业需要把端侧能力转化为可落地的商业案例。",
      tags: ["AI PC", "Omdia", "端侧AI", "渗透率", "内存成本"],
      url: "https://www.ithome.com/1/019/852.htm",
      image: "images/news/n175.png",
      imageCap: "Omdia AI PC 出货占比预测（图源：IT之家）",
      highlight: false
    },

  ],
papers: [
    {
      id: "p1", group: "recent", cat: "推理与系统", date: "2026-10-20",
      title: "CovNav: Conformal Prediction-Guided Adaptive Inference for Object Goal Navigation",
      authors: "CovNav Team 等",
      venue: "arXiv:2610.27677", level: "预印本",
      summary: "目标物体导航（ObjectNav）中云端大模型有时延与隐私风险、端侧小模型推理质量不足——CovNav 用共形预测（Conformal Prediction）引导自适应推理，按导航场景动态决定何时调用更强的模型能力，在未见环境中以空间常识（物体共现）引导智能体找到目标。",
      detail: "背景：具身智能体要在未见过的环境里执行「找到一个床」这类目标导航，依赖物体共现等空间常识——大模型编码了这种常识，但部署在机器人上暴露质量与效率的取舍：云端模型带来时延与隐私风险，端侧小模型能力受限。\n方法：CovNav 以共形预测为引导机制做自适应推理——为导航决策提供统计意义上的置信边界，动态调节推理投入。\n端侧视角：共形预测给「小模型何时够用、何时必须升级」提供了有理论保证的判据，是端云协同导航从启发式走向可校准路线的代表性工作。",
      tags: ["具身导航", "共形预测", "自适应推理", "端云协同"],
      url: "https://arxiv.org/abs/2610.27677"
    },
    {
      id: "p2", group: "recent", cat: "安全与隐私", date: "2026-10-20",
      title: "Context-Aware Prompt Injection Detection via Small Language Models in RAG Pipelines: nokast-secureRAG",
      authors: "nokast Team 等",
      venue: "arXiv:2610.28364", level: "预印本",
      summary: "本地 RAG 系统面临间接提示注入与检索投毒——检索内容中的恶意指令被误当可信输入。nokast-secureRAG 用约 0.5B 参数的小语言模型充当检索与生成之间的「语义防火墙」：联合评估用户查询与检索上下文，对内容分类拦截，全程可在端侧运行。",
      detail: "背景：本地检索增强生成（RAG）让端侧个性化推理成为可能，但检索到的内容可能夹带恶意指令（间接提示注入、检索投毒），被生成侧误信执行。\n方法：约 0.5B 参数小语言模型作为语义防火墙插在检索与生成之间——联合考察用户查询与检索上下文的语义关系，对是否存在注入意图做上下文感知分类。\n端侧视角：安全层也要端侧化——0.5B 量级说明「语义防火墙」可随主模型常驻设备本地，端侧 RAG 的安全闭环不依赖云端审查。",
      tags: ["提示注入", "RAG安全", "语义防火墙", "小语言模型"],
      url: "https://arxiv.org/abs/2610.28364"
    },
    {
      id: "p3", group: "recent", cat: "安全与隐私", date: "2026-10-19",
      title: "LLMs Prompted for Legal Context Refuse More: Overrefusal from Small On-Premises LLMs in Criminal Legal Context",
      authors: "Legal NLP Group 等",
      venue: "arXiv:2610.26211", level: "预印本",
      summary: "保密要求推动法律从业者转向本地小模型处理案卷（摘要/翻译/改写），但遵循提示规范自报身份（「我是律师…」）的习惯带来意外代价——此类「权威框架」会令模型在刑事法律语境中选择性拒答更多；过度拒答正成为端侧小模型落地的隐性质量税。",
      detail: "背景：法律行业的保密要求使小型本地 LLM 成为日常任务（摘要、翻译、改写）的选择，案件数据不出内网。\n发现：用户按提示工程惯例声明角色（如「我是一名律师」）反而提高模型在刑事语境中的拒答率——权威框架触发选择性拒答，正常的法律工作流被频繁打断。\n端侧视角：本地部署解决了数据保密，却把云端侧的内容策略压缩进小模型——「过度拒答」是端侧小模型进入专业领域时被低估的行为缺陷，需要在模型与提示层同时校准。",
      tags: ["过度拒答", "本地模型", "法律AI", "行为校准"],
      url: "https://arxiv.org/abs/2610.26211"
    },
    {
      id: "p4", group: "recent", cat: "推理与系统", date: "2026-10-19",
      title: "MX-Like Tensor Core for LLM Inference with NPU Integration via Hardware-Software Co-Design Exploration",
      authors: "Architecture Lab 等",
      venue: "arXiv:2610.26083", level: "预印本",
      summary: "块缩放量化格式（OCP MX、NVFP4）已是 LLM 推理的高效数据格式，但共享缩放、权重与激活格式的组合设计空间从未被系统刻画——本文以软硬件协同设计探索该空间，寻找精度-硅面积的帕累托最优配置，并给出与 NPU 集成的张量核设计。",
      detail: "背景：块缩放量化格式被广泛采用，但其设计空间（共享缩放位宽、权重与激活格式的组合）缺乏系统探索，精度与硅开销的联合权衡此前未被标定，真正的帕累托最优配置不明。\n方法：软硬件协同设计探索——在设计空间上系统评估精度与硬件代价，刻画帕累托前沿，并给出可集成 NPU 的类 MX 张量核实现。\n端侧视角：为端侧推理芯片的下一代张量核给出格式选型依据——在 NPU 面积与功耗约束下选择「够准且最省」的量化组合，是端侧算力持续下沉（本周 Synaptics SR200 同题）的学术侧支点。",
      tags: ["块缩放量化", "张量核", "NPU", "软硬件协同"],
      url: "https://arxiv.org/abs/2610.26083"
    },
    {
      id: "p5", group: "recent", cat: "端侧智能体", date: "2026-10-17",
      title: "Muse Glimmer 30B: An On-Device Agentic Model",
      authors: "Meta 等",
      venue: "arXiv:2610.24628", level: "预印本",
      summary: "Meta 开源 30B 参数的因果语言模型 Muse Glimmer（带感知编码器），专为消费级硬件上的自主智能体任务打造——把多步推理、可靠工具使用与失败恢复整合进单一模型，可完全本地运行无需云端，接受文本与图像输入、输出文本。",
      detail: "定位：开源 30B 参数模型+感知编码器，面向消费设备本地运行的智能体——多步推理、可靠工具调用与失败恢复一体化，不依赖云端基础设施。\n输入输出：文本与图像输入、文本输出；权重开放下载。\n端侧视角：30B 是「工作站/高端手机可承载」的端侧智能体量级——Meta 在开放权重侧（Muse Spark Open 816B 之后）补上智能体专型号，与本周 Muse 下月登陆 Meta 眼镜的财报叙事同源：模型-终端-订阅的端侧生态全栈正在成形。",
      tags: ["Muse Glimmer", "端侧智能体", "开源模型", "工具使用"],
      url: "https://arxiv.org/abs/2610.24628"
    },
    {
      id: "p6", group: "recent", cat: "端侧智能体", date: "2026-10-17",
      title: "MedPAO-Assist: Edge-Deployable, Modality-Aware Agentic AI for Radiology Report Structuring",
      authors: "MedPAO Team 等",
      venue: "arXiv:2610.26913", level: "预印本",
      summary: "放射报告结构化长期被专有云端模型或需要高端 GPU 的大模型垄断，与临床对数据隐私和离线运行的要求冲突——MedPAO-Assist 是边缘可部署的智能体框架，按模态感知组织放射报告结构化流程，把医疗 AI 推回院内边缘。",
      detail: "背景：LLM 做放射报告结构化要么用专有云模型、要么用需高端 GPU 的开源大模型——临床工作流要求数据隐私与离线运行，这是落地瓶颈。\n方案：MedPAO-Assist 边缘可部署智能体框架，模态感知（modality-aware）地组织结构化生成流程，适配影像科的环境约束。\n端侧视角：医疗是端侧 AI 的高价值刚需场景（隐私+离线+合规三重约束），智能体化（而非单纯小模型化）是边缘医疗应用的新形态。",
      tags: ["边缘医疗", "放射报告", "智能体框架", "隐私计算"],
      url: "https://arxiv.org/abs/2610.26913"
    },
    {
      id: "p7", group: "recent", cat: "安全与隐私", date: "2026-10-16",
      title: "From Billion-Scale to Million-Scale Language Models: Operational Capabilities for Embedded Post-Exploitation",
      authors: "Security Research Group 等",
      venue: "arXiv:2610.23534", level: "预印本",
      summary: "百万参数级超紧凑语言模型（SLM）因计算足迹极小，被视为未来「自主恶意软件」的候选载体——在连接受限、时延与隐私（攻击者视角）约束无法使用云端推理的场景下，本文系统评估超紧凑模型在入侵后渗透阶段的可运作能力。",
      detail: "背景：SLM 在资源受限环境的价值正在被安全研究双面审视——同样的特性（低算力、离线、难审计）也使其可能成为自主恶意软件的推理引擎，而后渗透阶段的实际能力此前缺乏系统刻画。\n工作：面向嵌入式后渗透场景，评估百万参数级模型在无云端依赖时可支撑的操作能力边界。\n端侧视角：这是端侧模型能力的「压力测试反面样本」——小模型能做的，恶意负载同样能做；端侧安全体系（本期的语义防火墙、TEE 保护）需要与端侧模型能力同步演进，攻防两侧共用同一条小型化技术曲线。",
      tags: ["小模型安全", "后渗透", "自主恶意软件", "威胁评估"],
      url: "https://arxiv.org/abs/2610.23534"
    },
    {
      id: "p8", group: "recent", cat: "推理与系统", date: "2026-10-16",
      title: "FederatedBytes: Tokenizer-Free, Byte-Level Small Language Models for Efficient Multimodal Federated Learning",
      authors: "FederatedBytes Team 等",
      venue: "arXiv:2610.22906", level: "预印本",
      summary: "联邦学习可在保护各端本地数据隐私的前提下汇总全局模型，但计算与通信开销阻碍其服务 NLP 与多模态负载——FederatedBytes 提出无分词器的字节级小语言模型，直接处理字节级文本与多模态数据，大幅降低联邦训练的通信与计算负担。",
      detail: "背景：联邦学习（FL）让分布式客户端在不共享本地数据的前提下共建全局模型，隐私友好；但传统 NLP 管线的重计算与重通信使其难以覆盖当代工作负载。\n方法：字节级（tokenizer-free）小语言模型——绕开词表不一致问题（各端分词器差异是 FL 的隐性障碍），直接以字节为单位处理文本与多模态数据。\n端侧视角： tokenizer-free 是「同一模型在异构端侧设备间可联邦演化」的前提——字节数据天然对齐，端侧众设备协同训练的工程门槛随之下降。",
      tags: ["字节级模型", "联邦学习", "多模态", "隐私训练"],
      url: "https://arxiv.org/abs/2610.22906"
    },
    {
      id: "p9", group: "recent", cat: "推理与系统", date: "2026-10-15",
      title: "MemLLM: End-to-end In-Storage Acceleration of On-device RAG using Precomputed KV Caches",
      authors: "MemLLM Team 等",
      venue: "arXiv:2610.22579", level: "预印本",
      summary: "端侧 RAG 的长上下文预填（prefill）是主要瓶颈——离线预计算 KV 缓存虽省算力，但数 GB 缓存在设备窄互连上形成 I/O 墙；MemLLM 用存内计算（in-storage）端到端加速预计算 KV 缓存的读取与注入，让「外置记忆」真正可在端侧跑起来。",
      detail: "背景：边缘设备上的 RAG 支持个性化推理且保隐私，但其长度不对称性使预填阶段成为瓶颈；服务器侧预计算 KV 缓存的方案搬到端侧后，多 GB 缓存经窄互连搬运形成严重 I/O 墙。\n方法：MemLLM 端到端存内加速——把预计算 KV 缓存的消费过程下沉到存储介质内部，绕开主互连搬运。\n端侧视角：与本期资讯侧的 KV 缓存压缩线（架构级压缩）互补——压缩让缓存变小，存内计算让缓存的读取不再走「总线」，两条路线共同拆端侧长上下文的 I/O 墙。",
      tags: ["存内计算", "KV缓存", "端侧RAG", "预填加速"],
      url: "https://arxiv.org/abs/2610.22579"
    },
    {
      id: "p10", group: "recent", cat: "安全与隐私", date: "2026-10-15",
      title: "BiShield-TEE: On the (In-)Security of Unilateral Weight Obfuscation",
      authors: "Zhiyuan Wang 等",
      venue: "arXiv:2610.21565", level: "预印本",
      summary: "揭示端侧 TEE 参数混淆的单边变换漏洞——混淆密钥被「解的唯一性」暴露，代表性方案 GroupCover 与 ArrowCloak 的保护可被击穿；提出双边混淆框架 BiShield-TEE，通过输入与输出维度联合混淆诱导「解的歧义性」重建保护。",
      detail: "背景：端侧部署 LLM 越来越普遍（时延与隐私），但专有模型面临逆向与窃取风险；TEE 提供硬件隔离推理，但多数 TEE 参数混淆依赖单边矩阵变换（仅混淆输出侧）。\n漏洞：识别出「解的唯一性」（SDP）缺陷——混淆密钥被唯一确定，暴露真实密钥结构；攻击下 GroupCover 与 ArrowCloak 的保护降至可忽略，攻击准确率超过全屏蔽黑盒基线 2.4 倍并恢复接近完整的模型功能。\n方案：BiShield-TEE 双边框架，联合混淆输入与输出维度诱导歧义解，配合硬件保护重建有效的权重保密。",
      tags: ["TEE", "模型保护", "参数混淆", "端侧安全"],
      url: "https://arxiv.org/abs/2610.21565"
    },
  ],

  /* ------------- 板块三：知识分享 ------------- */
    knowledge: {
    /* 每周一个知识点（KNOWLEDGE_PLAN.md 16 讲周更，2026-10-25 首期）：weekly 只放元数据+lesson 指针，
       正文与配图在 knowledge/ 子项目（lessons/lesson-NN.js + assets/），点开卡片按需加载 */
    weekly: { no: 2, lesson: 2,
      week: "2026.10.26 — 11.01",
      title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT",
      hook: "同一个数，FP16 用 16 个比特、65,536 种取值来存；4-bit 只给 16 个等距格子。量化就是这场「搬家」——怎么搬、搬到哪个格子、由谁说了算。看懂这一讲，GPTQ、AWQ、Q4_K_M 就不再是黑话。",
      next: "第 3 讲 · 经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化"
    },
    plan: [
      { no: 1, title: "大模型是怎么装进手机的：一次端侧推理的完整旅程", week: "已完结 · 10.16—10.25" },
      { no: 2, title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT", week: "本周 · 10.30 上线" },
      { no: 3, title: "经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化", week: "11.08" },
      { no: 4, title: "经典量化算法 II：AWQ 与 SmoothQuant——激活感知的权重缩放", week: "11.15" },
      { no: 5, title: "GGUF 与 k-quants：Q4_K_M 们是什么；FP4/FP8 低比特前沿", week: "11.22" },
      { no: 6, title: "推理框架全景：从 llama.cpp 到 MNN 的选型地图", week: "11.29" },
      { no: 7, title: "投机解码：小模型起草、大模型验证的提速术", week: "12.06" },
      { no: 8, title: "KV 缓存的攻防：PagedAttention、KV 量化、GQA/MLA", week: "12.13" },
      { no: 9, title: "FlashAttention 与算子优化：「会算」不如「会搬」", week: "12.20" },
      { no: 10, title: "端侧 MoE：总参数很大、每次只算一点", week: "12.27" },
      { no: 11, title: "小模型是怎么炼成的：蒸馏、剪枝与数据配方", week: "2027.01.03" },
      { no: 12, title: "端云协同与模型路由：小大模型分工的艺术", week: "01.10" },
      { no: 13, title: "NPU 编译器：模型是怎么「翻译」给芯片的", week: "01.17" },
      { no: 14, title: "端侧多模态：视觉编码器上手机的难题", week: "01.24" },
      { no: 15, title: "端侧 Agent 运行时与安全（MCP、TEE）", week: "01.31" },
      { no: 16, title: "能效与评测：怎么科学衡量「端侧跑得好不好」", week: "02.07" }
    ],
    resources: [
      { group: "厂商官方博客", name: "Apple Machine Learning Research", type: "厂商研究博客", letter: "A",
        text: "AFM 系列技术报告、端侧训练与适配的一手资料。",
        url: "https://machinelearning.apple.com",
        intro: "苹果的官方机器学习研究博客，发表 Apple Intelligence 背后的基础模型（AFM 系列）技术报告、端侧优化的第一手细节，以及 ML 团队的论文解读。\n代表作：《Introducing Apple's On-Device and Server Foundation Models》（2024，首次公开 3B 端侧模型的架构与训练后优化）、《Updates to Apple's Foundation Models》（2025）与 AFM 3 第三代报告（2026）。\n适合谁：想了解工业界最强端侧模型如何炼成（后训练、蒸馏、适配器、评测方法）的工程师与研究者。文章全部免费、无需注册。" },
      { group: "厂商官方博客", name: "Qualcomm AI Hub & Blog", type: "厂商研究博客", letter: "Q",
        text: "数百个端侧优化模型一键部署到骁龙平台，量化、编译与异构计算的工程实践大全。",
        url: "https://aihub.qualcomm.com",
        intro: "高通官方的端侧 AI 开发者门户 + 研究博客：AI Hub 收录数百个已在骁龙平台优化（量化/编译/算子调优）的模型，可一键部署到真机；博客侧持续输出 NPU 架构、量化实践与端侧智能体（Agentic AI）的技术文章。\n看点：Hexagon NPU 的编程模型与最佳实践、Snapdragon Summit 后的模型支持更新、端侧 Stable Diffusion / LLM 的官方示例代码。\n适合谁：做安卓端侧部署、需要「模型-芯片」联合调优的移动端工程师。" },
      { group: "厂商官方博客", name: "Google DeepMind / Developers Blog", type: "厂商研究博客", letter: "G",
        text: "Gemini Nano、AICore 与 Android 端侧 AI 的官方进展；AICORE API 与 ML Kit 的端侧能力说明中心。",
        url: "https://blog.google/technology/ai/",
        intro: "Google 官方 AI 博客（DeepMind + Developers 合流），端侧相关内容集中在：Gemini Nano 与 Android AICore 的每次更新、ML Kit / MediaPipe 的端侧能力（Generative AI API 一行代码调用内置小模型）、以及 Gemma 开源系列的发布说明。\n看点：Gemma 系列开源模型的发布与变体（含面向端侧的轻量版）、Chrome / Android 内置 AI 能力路线图。\n适合谁：安卓生态开发者，以及跟踪「系统级内置模型」路线的从业者。" },
      { group: "厂商官方博客", name: "NVIDIA Technical Blog", type: "厂商技术博客", letter: "N",
        text: "Jetson 边缘平台、TensorRT 模型优化与 Isaac 机器人的官方一手工程文章。",
        url: "https://developer.nvidia.com/blog",
        intro: "NVIDIA 开发者技术博客（更新极勤，日均多篇），端侧相关集中在 Jetson 系列（Orin/Thor）的平台与模型部署文章、TensorRT / TensorRT-LLM 的推理优化实践、TAO 工具链与 Isaac 机器人边缘侧应用。\n看点：Jetson 新品与 JetPack 软件栈更新、开源模型在边缘设备上的官方部署指南。\n适合谁：做边缘盒子、机器人、智能摄像头方向，需要 GPU 边缘算力部署的工程师。文章量大，建议按 Jetson / TensorRT 关键词筛选阅读。" },
      { group: "厂商官方博客", name: "Microsoft DevBlogs · DirectX/DirectML", type: "厂商技术博客", letter: "M",
        text: "Windows AI 芯片路线的一手阵地：DirectML 在各家 NPU/GPU 上的端侧推理更新。",
        url: "https://devblogs.microsoft.com/directx/",
        intro: "微软 DevBlogs 的 DirectX 频道，Windows 端侧 AI 的底层通道——DirectML（DirectX 之上的机器学习推理层）与 Windows AI 平台的更新在此首发；Copilot+ PC 本地模型栈（ONNX Runtime + DirectML 执行提供方）的底层进展也常在此披露。\n看点：DirectML 新特性（NPU 支持范围、驱动级 AI 加速）、Windows AI 相关 API 演进。\n适合谁：做 Windows 平台（AI PC / Copilot+ PC）端侧推理与 NPU 适配的工程师。" },
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
      { group: "个人博客", name: "Tri Dao", type: "个人博客", letter: "T",
        text: "FlashAttention 作者，专注高效注意力与推理 Kernel；端侧推理框架大量复用他的工作。",
        url: "https://tridao.me",
        intro: "Tri Dao（普林斯顿，FlashAttention / FlashDecoding / Mamba 共同作者）的个人主页与博客，主题是高效深度学习：注意力变体、IO 感知的 Kernel 设计、长上下文推理优化。\n看点：FlashAttention 系列论文与博客讲解——端侧推理框架（llama.cpp、MLC 等）的注意力实现大量建立在他的工作之上；对理解「推理为什么快/慢」的底层逻辑极有价值。\n适合谁：做推理 Kernel 与模型架构优化的工程师与研究者。" },
      { group: "个人博客", name: "Simon Willison", type: "个人博客", letter: "S",
        text: "LLM 应用实践的一手笔记，工具调用、提示工程与安全议题跟踪，更新勤、观点实。",
        url: "https://simonwillison.net",
        intro: "Django 联合创始人 Simon Willison 的博客，近五年几乎每天更新 LLM 应用实践笔记：新模型发布的一手上手测评、工具调用（tool use）与提示工程实践、LLM 安全（提示注入等）议题跟踪。\n看点：每款重要模型发布当天他几乎都会给出实测；llm 命令行工具与 Datasette 生态的作者；对「本地/端侧运行模型」也有大量实操记录（Ollama/llama.cpp 场景）。\n适合谁：把 LLM 真正用进产品的工程师；想跟进模型生态变化但没时间刷推的人——他的博客就是高信噪比的过滤器。" },
      { group: "个人博客", name: "Sebastian Raschka", type: "个人博客 · AI工程Newsletter", letter: "R",
        text: "《Build a Large Language Model (From Scratch)》作者，LLM 架构与量化的第一线拆解，端侧工程师的进阶读物。",
        url: "https://magazine.sebastianraschka.com",
        intro: "威斯康星大学教授、《Build a Large Language Model (From Scratch)》作者，Newsletter《Ahead of AI》约半月一更（2026-09 实测持续更新中）。\n看点：LLM 架构演进长文拆解（KV 缓存共享、MoE、推理效率）、量化技术系列、本地 coding agent 实操——与端侧部署直接相关的主题密度很高；代码级讲解是其招牌。\n适合谁：想理解「模型为什么这么设计、怎么压得更小」底层逻辑的端侧工程师。" },
      { group: "个人博客", name: "Interconnects (Nathan Lambert)", type: "个人博客 · 开源模型Newsletter", letter: "L",
        text: "开源/开放权重模型生态的第一时间解读：Qwen、Gemma、Llama 每次发布都有结构化分析，端侧小模型的「上游水源」。",
        url: "https://www.interconnects.ai",
        intro: "Allen AI 前研究经理、RLHF 重要推动者 Nathan Lambert 的 Newsletter，周更（2026-09 实测每周多篇）。\n看点：开源权重模型（Qwen / Gemma / Llama / DeepSeek）发布的逐家对比、模型许可与开源政策分析、定期「Open Models Reading List」汇总——端侧小模型的源头动态多在这里第一时间出现。\n适合谁：需要判断「开源模型格局往哪走」的从业者；做端侧模型选型前的背景功课。" },
      { group: "中文媒体 · 公众号", name: "智东西", type: "中文媒体 · 微信公众号同名", letter: "智",
        text: "AI 产业一线媒体，AI 硬件发布会与芯片供应链深度报道的主力中文信源。",
        url: "https://www.zhidx.com",
        intro: "国内头部 AI 产业媒体（微信公众号同名推送，网站 RSS 直连已接入本站抓取池），强项在硬件与产业链：AI 手机、AI 眼镜等发布会的一手报道、芯片与供应链的深度稿件、创业公司与商业化动态。\n看点：国产 AI 硬件新品的报道常快于综合媒体，产业分析类长文质量稳定；AI 眼镜、机器人、智能座舱等垂直条线有专题整理。\n适合谁：需要产业侧视角（竞争格局、供应链、商业化）补充技术视角的从业者。" },
      { group: "中文媒体 · 公众号", name: "爱范儿", type: "中文媒体 · 微信公众号同名", letter: "爱",
        text: "消费科技媒体，AI 眼镜/耳机等新硬件的真机实测与体验报告密度最高。",
        url: "https://www.ifanr.com",
        intro: "老牌消费科技媒体（微信公众号同名，RSS 直连已接入本站抓取池），报道视角偏产品与体验：AI 眼镜、AI 耳机、AI 手机的新品真机上手与长测是其强项，发布会现场报道稳定。\n看点：新形态 AI 硬件的「实际可用性」评价（续航、佩戴、翻译效果实测）多源于此；旗下 APPSO 专注手机 AI 功能与效率工具体验。\n适合谁：关心端侧 AI 硬件「用起来怎么样」而不仅是参数的产品与市场同学。" },
      { group: "中文媒体 · 公众号", name: "量子位", type: "中文媒体 · 微信公众号同名", letter: "量",
        text: "AI 资讯与模型发布第一时间的中文报道，公众号与网站同步更新，追踪国内外端侧动态的高频信源。",
        url: "https://www.qbitai.com",
        intro: "国内头部 AI 资讯媒体之一（微信公众号同名推送），以快、覆盖全著称：海内外模型发布当天出中文报道，端侧方向常见 MiniCPM、Qwen 小模型、骁龙/天玑 NPU、AI 手机等选题。\n看点：模型发布快讯 + 榜单解读（Artificial Analysis 等指数的中文转述多引自此）、产品实测类稿件质量稳定。\n适合谁：需要每天 5 分钟扫一遍 AI 圈动态的从业者；官网可按标签检索历史文章。" },
      { group: "中文媒体 · 公众号", name: "36氪", type: "中文媒体 · 微信公众号同名", letter: "3",
        text: "科技产业报道，端侧 AI 的产业侧视角（融资、商业化、竞争格局）的主要来源之一。",
        url: "https://www.36kr.com",
        intro: "头部科技产业媒体（微信公众号同名），端侧相关内容偏商业视角：厂商竞争格局分析（如此前《「端侧AI战事」升级》系列）、创业公司融资、AI 手机/AI 硬件的产业链报道。\n看点：深度产业稿件 + 上市公司财报解读（瑞芯微/全志等端侧芯片股的财报分析多见于此）。\n适合谁：关心「端侧 AI 怎么赚钱、谁在投」的从业者与投资人；技术与产业视角与本站资讯板块互补。" },
      { group: "中文媒体 · 公众号", name: "电子工程专辑 EETimes China", type: "中文媒体 · 公众号同名", letter: "电",
        text: "半导体产业深度媒体，端侧芯片（瑞芯微 / 展锐 / 全志 / 海思）动态与供应链跟踪的首选中文信源。",
        url: "https://www.eet-china.com",
        intro: "老牌半导体产业媒体（微信公众号同名），强项在芯片层：SoC 架构解析、NPU 算力对比、供应链与工艺节点报道，国产端侧芯片厂商（瑞芯微、紫光展锐、全志、海思）的动态跟踪密度远高于泛科技媒体。\n看点：新品发布的技术拆解、工程师社区讨论、供应链数据。\n适合谁：需要看懂「端侧 AI 的算力从哪来」的硬件工程师与产业分析师。" },
      { group: "中文媒体 · 公众号", name: "IT之家", type: "中文媒体 · 微信公众号同名", letter: "I",
        text: "消费科技快讯，手机厂商端侧 AI 功能与新机动态的快速信源。",
        url: "https://www.ithome.com",
        intro: "国内更新最快的消费科技资讯站之一（微信公众号同名），手机厂商的端侧 AI 功能上线、系统更新（ColorOS/原系统/MagicOS 的 AI 特性）、新机曝光与发布第一手快讯多源于此。\n看点：更新频率极高、带官方配图；适合作为 RSS 订阅源做每日扫描。\n适合谁：关注「端侧 AI 功能今天上了什么新」的产品与运营同学。" },
      { group: "社区与平台", name: "Hugging Face Blog", type: "平台官方博客", letter: "H",
        text: "开源模型与端侧部署的一线实践：SmolLM 端侧小模型、量化工具链与新模型发布的第一手说明。",
        url: "https://huggingface.co/blog",
        intro: "Hugging Face 官方博客，开源生态的「发射台」：新模型与新功能的第一手发布说明、量化与推理优化的工程实践、以及 SmolLM 端侧小模型系列的设计文章。\n看点：SmolLM 端侧模型的发布与技术报告解读、transformers 生态的量化工具链（bitsandbytes / GPTQ / AWQ 集成）、与合作伙伴的手机/浏览器端侧落地案例。\n适合谁：所有做端侧模型选型与部署的工程师——配套的 Daily Papers 榜单也是发现社区热点论文的风向标。" },
      { group: "端侧工具链官方", name: "PyTorch Blog", type: "工具链官方博客", letter: "P",
        text: "ExecuTorch 端侧运行时与 torchao 量化的第一手发布说明与工程实践。",
        url: "https://pytorch.org/blog",
        intro: "PyTorch 官方博客（更新极勤），端侧相关集中在 ExecuTorch——PyTorch 官方的端侧部署运行时（模型导出、量化、委托到 CPU/DSP/NPU 后端）的版本说明与教程，以及 torchao 量化技术、iOS/Android 移动端官方示例。\n看点：ExecuTorch 新版本与后端委托（XNNPACK / CoreML / QNN 等）支持进展、模型压缩与量化的官方实践。\n适合谁：从 PyTorch 训练生态向移动/嵌入式部署模型的工程师——训练侧到端侧的最短官方路径。" },
      { group: "端侧工具链官方", name: "Ollama Blog", type: "工具链官方博客", letter: "O",
        text: "本地大模型运行时的版本动态与新模型支持说明，本地部署事实标准的风向标。",
        url: "https://ollama.com/blog",
        intro: "Ollama 官方博客。Ollama 把 llama.cpp 级的本地推理封装成「一条命令跑模型」的体验，是个人开发者本地跑大模型的事实标准（macOS/Linux/Windows 全平台）。\n看点：新版本的功能演进（多模态、工具调用、并发与上下文管理）与新模型上架说明——某端侧级模型首发可用常在这里最先出现。\n适合谁：在本地/私有环境部署开源模型的开发者与企业 IT；跟踪「本地大模型易用性」演进的产品经理。" },
      { group: "端侧工具链官方", name: "ONNX / ONNX Runtime", type: "开放标准 · 推理引擎", letter: "O",
        text: "跨框架模型交换标准与微软维护的高性能推理引擎，端侧部署中间格式的事实标准。",
        url: "https://onnxruntime.ai",
        intro: "ONNX 是开放的模型表示标准（PyTorch/TensorFlow 等框架导出的通用中间格式），ONNX Runtime 是微软维护的跨平台推理引擎（Windows/安卓/iOS/Linux/嵌入式），支持量化与多种执行提供方（CPU / DirectML / CoreML / QNN / XNNPACK）。\n看点：官网博客（onnxruntime.ai/blogs）与版本发布——移动端执行提供方、生成式 API 与量化工具 Olive 的更新；Windows AI PC 官方路线的必经一站。\n适合谁：需要「一次导出、多端运行」的应用工程师。版本动态另见本库「端侧工具链 Release 雷达」。" },
      { group: "端侧工具链官方", name: "Intel OpenVINO Blog", type: "工具链官方博客", letter: "I",
        text: "Intel 端侧推理引擎的优化实践：CPU/iGPU/NPU 一套 API，AI PC 与边缘盒子的官方路线。",
        url: "https://blog.openvino.ai",
        intro: "OpenVINO 是 Intel 的开源推理引擎（CPU/iGPU/NPU 统一 API），覆盖 AI PC（Core Ultra 的 NPU）、边缘计算盒与工业视觉场景；官方博客持续输出模型优化（NNCF 量化）、异构部署与生成式 AI 边缘侧实践的教程。\n看点：OpenVINO 新版本特性（NPU 支持与 LLM 边缘推理优化）、与 Intel 硬件联调的一手指南。\n适合谁：x86 生态做端侧部署、工业质检/边缘盒子方向的工程师。版本动态另见本库「端侧工具链 Release 雷达」。" },
      { group: "端侧工具链官方", name: "Apple MLX 生态", type: "开源框架 · GitHub", letter: "M",
        text: "苹果官方的 Apple silicon 本地推理框架：统一内存视角的数组库 + LLM 推理栈。",
        url: "https://github.com/ml-explore/mlx",
        intro: "MLX 是苹果机器学习研究团队（ml-explore）开源的 Apple silicon 数值计算与推理框架：针对统一内存架构设计（CPU/GPU 共享内存、零拷贝），配合 mlx-lm 可在 Mac 上高效运行大模型——「Mac 本地大模型」当前的事实标准之一（LM Studio 等产品的底层选项）。\n看点：框架与 mlx-lm 的版本节奏、Apple ML Research 博客上 MLX 相关研究（扩散模型加速、多模态端侧化）。\n适合谁：在 Mac 生态做本地推理与模型移植的工程师。版本动态另见本库「端侧工具链 Release 雷达」。" },
      { group: "端侧工具链官方", name: "端侧工具链 Release 雷达", type: "Release 聚合 · 每日跟踪", letter: "R",
        text: "14 个核心端侧项目的官方版本发布动态：本地推理/量化、移动端运行时、CV 框架、离线语音。",
        url: "https://github.com/topics/on-device",
        intro: "聚合端侧开源工具链的官方 Release Notes：本地推理与量化（llama.cpp、Ollama、MLX）、移动端运行时（ExecuTorch、LiteRT、MediaPipe、coremltools）、推理格式与引擎（ONNX、ONNX Runtime、OpenVINO）、国产 CV 框架（ncnn、MNN）、离线语音（whisper.cpp、sherpa-onnx）。\n看点：重要版本的第一时间信号——新硬件后端支持、量化格式演进、新模型能力接入；其中 llama.cpp 为日更构建，日常小版本仅留痕、里程碑版本才进资讯板块。\n适合谁：想一眼看全「端侧工具链这周谁发了什么版」的工程师。" }
    ]
  }
};
