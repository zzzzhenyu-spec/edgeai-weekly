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
    weekRange: "2026.10.29 — 11.04 · 近 7 天",
    updated: "2026-11-04",
    status: "rolling",
    editorsNote: "近 7 天聚焦：大模型开源阵营再添旗舰——腾讯混元 Hy4 正式版（770B MoE、首次引入视觉理解，跻身全球最强开源之列，权重近期开源）与 Mistral Large 4（1T 参数）同周登场；国行 Apple 智能今日开测（Siri 直调千问、12 月正式推送），端侧 AI 概念从官宣进入交付阶段。MIT 提出「权重空间编程」：GPT-6 Astra 直接修改 Qwen 权重修复推理死循环，数学正确率从 7.9% 提至 48.1%。智元创新日三层配齐（GO-3 基座+WITA-OMNI 交互+灵渠 OS 系统，年底开源约 2 亿行代码），联想开天首款信创 AI 主机实现全链路国产化（本地跑 35B 模型）。XREAL Aura 成为首款 Android XR 有线眼镜，微信支付机器人携混元端侧模型进 7-ELEVEN，宇树首份季报呈现量产期两本账（营收 +55.7%、扣非 -18.8%）与 Physical Intelligence 零营收 200 亿美元估值成对照。\n今日新增：腾讯混元 Hy4 正式版、国行 Apple 智能开测。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
news: [
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
      id: "n158", cat: "AI硬件", source: "搜狐科技", date: "2026-10-29",
      title: "智元发布具身交互大模型 WITA-OMNI：全双工同时听说、平均响应约 600 毫秒比行业快三倍，曾登顶全双工对话评测全球第一",
      summary: "智元机器人发布具身全模态端到端交互大模型 WITA-OMNI——全双工流式链路支持同时听与说、实时判断语轮切换，机器人响应最快 400 毫秒、平均约 600 毫秒，比行业主流方案快三倍以上、接近人类自然对话反应速度；支持 100 多种语言，视觉等多模态端到端融合。该模型此前曾在全双工对话能力评测中登顶全球第一（力压谷歌、英伟达方案）。",
      detail: "发布：10 月 29 日发布，具身全模态端到端交互大模型。\n交互：全双工流式链路——同时听与说、实时判断语轮切换，消除传统大模型交互「一问一答」的迟滞感。\n指标：机器人响应最快 400 毫秒、平均约 600 毫秒，比行业主流方案快 3 倍以上，接近人类自然对话反应速度；此前曾在全双工对话能力评测中登顶全球第一（力压谷歌、英伟达方案）。\n语言：支持听懂 100 多种语言；视觉等多种模态端到端融合，面向人形机器人交互场景。\n端侧视角：语音交互延迟是人形机器人「像不像人」的第一指标——平均 600 毫秒的全双工把端侧交互推到人类反应速度量级，与 GO-3（决策大脑）、Genie 4（训练环境）共同拼上具身智能的交互-决策-训练三层。",
      tags: ["智元", "WITA-OMNI", "具身智能", "全双工", "语音交互"],
      url: "https://www.sohu.com/a/1094291629_122014422",
      image: "images/news/n158.png",
      imageCap: "WITA-OMNI 交互演示（图源：搜狐科技）",
      highlight: false
    },

{
      id: "n160", cat: "端侧Agent", source: "凤凰科技", date: "2026-10-29",
      title: "微信支付智慧经营机器人首次进店上岗：混元端侧小模型+天籁音频落地 7-ELEVEN 第 2000 家门店",
      summary: "10 月 29 日广东 7-ELEVEN 第 2000 家门店在深圳腾讯总部园区开业，微信支付智慧经营机器人首次进店「上岗」——基于腾讯混元端侧小模型打造、搭配天籁 inside 音频方案（嘈杂门店环境也能听清语音），以多轮对话与 Agent 能力辅助门店销售、收款与经营：导购收银（语音互动+扫码识别+智能识货计价+优惠推荐）、店长经营（经营分析）、趣味互动（迎宾接待）三种模式，迎宾-导购-语音点单整套流程可跑通。",
      detail: "落地：10 月 29 日广东 7-ELEVEN 第 2000 家门店（深圳腾讯总部园区）开业，机器人首次上岗，迎宾接待、商品导购、语音点单整套流程可跑通。\n技术：基于腾讯混元端侧小模型，搭配天籁 inside 音频方案——嘈杂门店环境听清语音；混元多轮对话与 Agent 能力承载交互。\n模式：导购收银（语音互动+扫码识别、智能识货计价、问答点单、推荐优惠套餐）、店长经营（辅助经营分析）、趣味互动（迎宾接待）三模式。\n端侧视角：端侧小模型的线下门店首秀——便利店收银台是嘈杂、多轮、实时性要求极高的端侧 Agent 场景，「混元端侧+天籁音频」组合验证了端侧模型在真实商业环境的落地能力，门店智能化有望成为端侧 Agent 的规模化出货场景。",
      tags: ["微信支付", "7-ELEVEN", "混元", "端侧Agent", "门店机器人"],
      url: "https://feng.ifeng.com/c/8xeRcOsI31X",
      image: "images/news/n160.png",
      imageCap: "智慧经营机器人门店上岗（图源：凤凰科技）",
      highlight: false
    },

{
      id: "n157", cat: "AI硬件", source: "腾讯新闻", date: "2026-10-29",
      title: "智元创新日发布具身基座模型 GO-3 Preview：自研 WRAM 架构一举登顶 RoboDojo 等三大权威榜单，刷新开源 SOTA 且年底全面开源",
      summary: "智元机器人在 2026 创新日发布新一代具身基座模型 GO-3 Preview（联席总裁姚卯青现场介绍）——采用自研具身原生架构 WRAM（World Reasoning Action Model），对理解、预测与动作统一建模实现跨任务泛化与精细操作。模型已登顶 RoboDojo、RoboTwin、RoboColiseum 三大权威评测榜单，多项具身推理评测刷新开源模型 SOTA、可比肩头部闭源模型，计划 2026 年底全面开源。",
      detail: "发布：10 月 29 日智元创新日现场发布，为新一代具身基座模型（机器人的「大脑底座」），不针对单一动作训练、为整机提供通用能力。\n架构：自研 WRAM（World Reasoning Action Model）具身原生架构——理解、预测与动作三层统一建模，实现跨任务泛化与精细操作，演示场景含便利店零售补货等实际任务。\n成绩：登顶 RoboDojo、RoboTwin、RoboColiseum 三大权威评测榜单，多项具身推理评测刷新开源模型 SOTA，官方称表现可比肩头部闭源模型。\n开源：计划 2026 年底全面开源。\n端侧视角：具身基座模型是机器人端侧的「上游水源」——WRAM 把世界推理与动作生成并入同一模型，年底开源意味着国产本体厂商的端侧大脑将有一次公开可选的基座升级，与 Genie 4（训练环境）、Muse×傅利叶（模型-本体分工）共同拼上具身智能版图。",
      tags: ["智元", "GO-3", "具身基座", "WRAM", "机器人"],
      url: "https://news.qq.com/rain/a/20261029A07M4P00",
      image: "images/news/n157.png",
      imageCap: "GO-3 Preview 发布现场（图源：搜狐科技）",
      highlight: false
    },

{
      id: "n145", cat: "AI硬件", source: "新浪科技", date: "2026-10-29",
      title: "智元发布物理 AI 度量衡 Worken（有效智能工时）：活跃机器人数量 × 自主工作时长 × 产出效能比，给具身智能一个「Token」",
      summary: "2026 智元创新日上，联合创始人彭志辉发布首个定义物理 AI 价值的度量衡 Worken（有效智能工时）——公式为「活跃机器人数量 × 自主工作时长 × 产出效能比」，用于度量具身智能部署态的真实产出。数字 AI 以 Token 度量思考量，Worken 则把「机器人能否持续自主干活、干成多少活」压缩为可追踪指标，推动机器人价值评估从「出货量」走向「创造价值」。同场发布《2026 具身智能产业创新报告》并披露上半年营收近 20 亿元。",
      detail: "发布：10 月 29 日上海世博中心 2026 智元创新日（AIGBOT INNOVATION DAY），联合创始人、总裁兼 CTO 彭志辉主讲。\n定义：Worken（有效智能工时）＝活跃机器人数量 × 自主工作时长 × 产出效能比——衡量具身智能在部署态自主、持续完成有价值工作的实际产出，对标数字 AI 的 Token 度量。\n动机：机器人价值长期以「制造数量」计，Worken 把评估拉到「实际创造的价值」——为行业提供标准化度量，也为集群自主进化（机器人互学）提供可比基线。\n同场：《2026 具身智能产业创新报告》发布；智元披露上半年营收近 20 亿元。\n端侧视角：度量衡是产业从 Demo 走向运营的标志——Token 之于大模型经济（每百万 token 计价）如同 Worken 之于机器人经济（每小时有效工时计价），具身智能的商业闭环开始有了自己的计量单位。",
      tags: ["智元", "Worken", "物理AI", "具身智能", "度量衡"],
      url: "https://k.sina.com.cn/article_5952915705_162d248f906703rymu.html",
      image: "images/news/n145.jpg",
      imageCap: "智元创新日 Worken 发布（图源：新浪科技）",
      highlight: false
    },

{
      id: "n141", cat: "手机厂商", source: "搜狐", date: "2026-10-29",
      title: "深兰联合华为鸿蒙生态发布全球首款大模型智能体工作手机 Wowoker：麒麟芯片+端侧大模型，「订阅智能体服务、硬件配套赠送」重构卖机模式",
      summary: "深兰科技联合华为鸿蒙生态与中国移动发布全球首款大模型智能体工作手机 Wowoker——华为麒麟芯片与 HarmonyOS 底座，融合深兰多模态大模型、决策模型与 AgentOS 智能体编排体系，端侧运行支持 AI 通话分身（声音克隆复刻机主声线）、智能话术库与 AI 辅助回复，面向客户开发、营销转化等企业销售全流程。商业模式为「硬件+SaaS+数据+AI」四位一体：企业订阅三年智能体服务包即配套华为规格终端——硬件从一次性买卖变成智能体服务的载体，现场完成多场订购签约。",
      detail: "发布：10 月 29 日发布会，深兰科技×华为鸿蒙生态×中国移动等战略伙伴；定位全球首款「大模型智能体工作手机」，瞄准政企、国央企、金融与泛企业市场。\n能力：麒麟芯片+HarmonyOS 提供华为规格终端底座；深兰多模态大模型与 Decision Model 决策模型经 AgentOS 编排，端侧支持 AI 通话分身（声音克隆复刻机主声线）、智能话术库、AI 辅助回复与客户管理，把销售管理从「结果管理」推向「过程智能管控+人机协同」。\n模式：「订阅智能体服务、硬件配套赠送」——企业采购三年周期智能体服务包即获对应华为规格终端，硬件收入让位服务收入。\n端侧视角：这是「大模型×手机」的一条新岔路——不与消费旗舰拼影像与系统，而把手机重新定义为「企业智能体的随身执行器」；订阅送硬件的定价结构，意味着端侧设备的价值锚点正从规格表转向 Agent 服务本身，与个人智能体（灵光/千问）的入口之争形成企业侧镜像。",
      tags: ["深兰科技", "Wowoker", "华为鸿蒙", "智能体手机", "企业终端"],
      url: "https://m.sohu.com/a/1095005561_120285954",
      image: "images/news/n141.jpg",
      imageCap: "Wowoker 发布会（图源：搜狐/快科技）",
      highlight: false
    },

{
      id: "n142", cat: "AI硬件", source: "凤凰网科技", date: "2026-10-29",
      title: "王腾创业首作 ISHO Ring 正式发布：智能戒指 1799 元起配 AI 睡眠生态，iFlow 温控系统以双 BCG 感知带实现无感监测，订单已破千",
      summary: "前 REDMI 总经理王腾创立的今日宜休（ISHO）举行首场发布会：ISHO Ring 智能戒指标准版 1799 元、Pro 版 2199 元（钛合金内外圈无断缝一体成型，支持睡眠分期、精力管理、日晒监测与运动识别），配套发布 9999 元起的 iFlow 智能温控系统——双 BCG 感知带免穿戴监测心跳、呼吸与体动（支持双人独立），8 个床温传感器与卧室温湿度传感器联动调节睡眠环境；同步推出「ISHO Intelligence」技术体系（ISHO Personal Agent 与生理信号大模型），构建「监测-分析-干预-进化」AI 睡眠健康生态。发布会后订单量已过千件。",
      detail: "发布：10 月 29 日 19:00 北京「AI 睡眠科技生态产品发布会」，今日宜休（Inner Strength High Output）首款硬件；王腾现场感谢小米与雷军，并称产品定价介于小米与华为之间。\n戒指：ISHO Ring 标准版 1799 元、Pro 版 2199 元——航空级钛合金内外圈同色无断缝一体成型，核心健康功能两版一致：睡眠分期、睡眠指标监测、精力管理、日晒监测、健康提示与运动识别；计划圣诞前后开售。\n温控：iFlow 智能温控系统 9999 元起——双 BCG 感知带免穿戴监测心跳/呼吸/体动并支持双人独立识别，8 个床温传感器分区记录床温，联动卧室温湿度传感器调节环境，面向不习惯佩戴设备入睡的人群。\n生态：ISHO Intelligence 个人睡眠健康 AI 技术体系，含 ISHO Personal Agent 与生理信号大模型——「监测-分析-干预-进化」闭环把睡眠做成持续运营的健康服务而非单次硬件销售。\n端侧视角：智能戒指从「手环缩小的替代品」升级为睡眠健康生态的指尖入口——无感监测（BCG 床垫感知带）+ 生理信号大模型的组合，首次把「不穿戴」也纳入 AI 硬件的版图。",
      tags: ["ISHO Ring", "智能戒指", "AI睡眠", "王腾", "今日宜休"],
      url: "https://baike.baidu.com/item/ISHO%20Ring",
      image: "images/news/n142.jpg",
      imageCap: "ISHO Ring（图源：凤凰网科技）",
      highlight: false
    },

{
      id: "n138", cat: "行业关注事件", source: "GitHub（Niko1221/Strata）", date: "2026-10-29",
      title: "开源推理引擎 Strata 发布 0.2.8：一键把大模型装上消费级电脑，本地跑 OpenAI/Anthropic 兼容接口，上线一个月 35,994 星",
      summary: "个人开发者 Niko Veit 的开源项目 Strata 发布 0.2.8——定位「大模型的一键安装包」：桌面应用与终端两种形态，Windows/Linux/macOS 安装器双击即用，在本地起 OpenAI/Anthropic 兼容接口，Claude Code、Codex CLI、OpenCode 等编码工具直连本地模型。主推 Qwen3.8-Flash-Next（ISTA-DASLab/Unsloth 量化包，最低 IQ2_XS），另支持 Qwen3.6-35B-A3B 与 DeepSeek V4.1-Flash-1017（1.75-2.25 bpw，放不进内存的部分从 SSD 流式读取，约需 245GB 磁盘）。硬件覆盖 NVIDIA RTX 20-50 系、AMD RX 6000-9070 与 AI PRO R9700、Intel Arc（Linux）、Apple M1 及以上、Strix Halo。仓库 9 月 24 日创建，一个月 35,994 星；MIT 许可。",
      detail: "项目：Strata 0.2.8 于 10 月 29 日发布；安装后 strata launch 一条命令选模型开跑，strata connect 输出编码工具对接指引。\n模型：Qwen3.8-Flash-Next 推荐 ISTA-DASLab 量化（Q2_0 至 IQ3_S，Coder 版 IQ1_M），Unsloth 提供 UD-Q4_K_XL 到 Q8_0；DeepSeek V4.1-Flash-1017 需 239-274GB 磁盘，实测 RTX 3060 12GB+46GB 内存跑出 9-11 token/s，4 张 AI PRO R9700 达 74-77 token/s，Strix Halo 统一内存 19-21 token/s（代码）。\n工具链：通过本地的 OpenAI/Anthropic 兼容接口，已适配 Claude Code、Codex CLI、OpenCode、Hermes Agent 等编码工具。\n生态位：已被多篇本地推理后端横评与 Ollama、vLLM、llama.cpp 并列讨论。\n端侧视角：端侧推理的门槛正从「会编译 llama.cpp」降到「双击安装器」——本地兼容层让云端编码工具无缝切换到本地模型，隐私与零成本跑智能体工作流成为默认选项；对行业的意义可对标当年 LM Studio 的普及，且进一步打通了终端与工具链。",
      tags: ["Strata", "本地推理", "量化包", "OpenAI 兼容接口", "开源"],
      url: "https://github.com/Niko1221/Strata",
      image: "images/news/n138.png",
      imageCap: "Strata 仓库卡片（图源：GitHub·Niko1221/Strata）",
      highlight: true
    },

{
      id: "n135", cat: "大模型厂商", source: "智东西", date: "2026-10-29",
      title: "谷歌发布 Gemini 4 Carbon：面向持续智能体工作流的新旗舰，综合榜登顶超越 Opus 5.5 与 GPT-6 Astra，间接提示注入攻击零得手",
      summary: "谷歌凌晨发布 Gemini 4 系列新旗舰 Carbon——专为可连续数天推进的智能体工作流构建，在 Artificial Analysis 综合指数以 59 分登顶，超越 Claude Opus 5.5 与 GPT-6 Astra；编程（SWE-sweep、Terminal-Bench 4.0）与智能体（Agents' Last Exam 77.4%）多项第一，安全方向 SEC-bench Pro 88.2%、间接提示注入攻击成功率 0%。定价与 Argon 持平（输入 2 美元/输出 10 美元每百万 token），先向网络安全防御者分阶段开放。同场财报：谷歌云收入同比大涨 103%、积压订单 5610 亿美元。",
      detail: "发布：北京时间 10 月 29 日凌晨，继 9 月底 Argon 与 10 月中旬开放之后的系列第二步；Carbon 定位「持续运行的 Agentic 工作流」旗舰，可数天内持续推进复杂工程任务。\n榜单：Artificial Analysis Intelligence Index v5.0 得 59 分综合第一；SWE-sweep 与 Terminal-Bench 4.0 编程第一（FrontierSWE 2 上 61.2% 仍落后 GPT-6 Astra 的 65.5%）；Agents' Last Exam v1.1 77.4% 领先、OSWorld-2.1 离线子集 81.5% 居第二；图表理解与视觉相似度第一；RiemannBench 80.0%（较 Argon 高 4%）、安全代码生成成功率超 Argon 两倍。\n安全：SEC-bench Pro 88.2%、ExploitGym 54.8%、CWE-bench 71%，间接提示注入攻击成功率 0%——「漏洞挖掘显著飞跃」。\n开放：分阶段——先开放部分网络安全防御人员，经 Fairwind 计划扩至可信伙伴，再向开发者/企业/消费者开放；输入 2 美元、输出 10 美元每百万 token（缓存输入减免 95%）。\n同场财报：Alphabet 季度营收 1275.77 亿美元（+25%），谷歌云 307.09 亿美元（+103%、增速约为 Azure 两倍），云积压订单 5610 亿美元；资本开支 513.55 亿美元（+114%），自由现金流转负，财报后盘后跌约 10%。\n端侧视角：Carbon 本体纯云端，但其 OSWorld、computer use 高分意味着「云大脑+本机之手」的智能体上限又被抬高——TPU 同步开始卖进客户自有数据中心，智能体算力栈正分层商品化。",
      tags: ["谷歌", "Gemini 4 Carbon", "旗舰模型", "网络安全", "智能体"],
      url: "https://zhidx.com/p/605392.html",
      image: "images/news/n135.jpg",
      imageCap: "Gemini 4 Carbon（图源：智东西）",
      highlight: false
    },

{
      id: "n136", cat: "AI硬件", source: "Apple 官方", date: "2026-10-29",
      title: "苹果发布首款触屏 MacBook Pro：PROLED XDR 双层串联 OLED、Mac 历史上首次触控与灵动岛，M5 Max 最高 128GB 内存整机本地跑千亿参数模型",
      summary: "苹果「十月双波」第二波落地：全新设计 MacBook Pro（14/16 英寸）首发 PROLED XDR 双层串联 OLED（HDR/SDR 峰值 2000 尼特、对比度 1000 万比 1、10–120Hz），Mac 历史上首次引入触控与灵动岛（承载 Spotlight、实时活动与 Siri AI）；搭载 M5 Pro/Max（Pro 线停留 M5 代际，与昨日基础款 M6 形成分层），GPU 每核内置神经加速器，M5 Max 最高 128GB 统一内存、官方称可「完全在设备上运行数千亿参数大模型」。国行 22999 元起，11 月 6 日发售。",
      detail: "发布：官方通稿 10 月 28 日（美西）、北京时间今日预购，11 月 6 日发售——与昨日 14 英寸 M6 基础款（15999 元起）构成十月双波：基础线走 M6、专业线以全新形态停留 M5 Pro/Max 代际。\n屏幕：PROLED XDR 双层串联 OLED，14.2/16.3 英寸，HDR 与 SDR 峰值最高 2000 尼特、对比度 1000 万比 1、ProMotion 10–120Hz，P3 与 Adobe RGB 色域、超 80% Rec.2020，可选纳米纹理玻璃。\n交互革命：Touch 首次登上 Mac（触控内建于面板）；灵动岛进 Mac，承载 Spotlight、实时活动与 Siri AI（macOS 27.2 测试版）；媒体报道 A 面发光 logo 随新设计回归（官方通稿未着墨）。\n端侧 AI：GPU 每核内置神经加速器；M5 Max 最高 128GB 统一内存与 16TB 存储，官方称可完全在设备上运行「数千亿参数」级大模型；续航最长 24 小时，机身较前代减重约 220–320 克。\n定价：国行 14 英寸 M5 Pro 22999 元起、16 英寸 27999 元起、14 英寸 M5 Max 36999 元起、16 英寸 M5 Max 38999 元起（美国 2899–4799 美元）。\n端侧视角：继基础款 M6 之后，苹果把「整机本地跑千亿参数模型」写进专业线的官方卖点——触控+灵动岛则把交互入口对齐手机范式，AI PC 的定义权之争进入「形态+算力」双战场。",
      tags: ["苹果", "MacBook Pro", "触屏Mac", "PROLED XDR", "M5 Max"],
      url: "https://www.apple.com/newsroom/2026/10/apple-unveils-groundbreaking-macbook-pro-with-proled-xdr-display/",
      image: "images/news/n136.jpg",
      imageCap: "MacBook Pro（PROLED XDR）（图源：Apple Newsroom）",
      highlight: false
    },

{
      id: "n137", cat: "芯片厂商", source: "IT之家", date: "2026-10-29",
      title: "新芯航途发布智驾大模型芯片 X7 Ultra：700 TOPS 端到端智驾算力，中国首发量产 Armv9 车规 CPU，X7 系列已装车 10 款",
      summary: "XHEART 新芯航途发布智驾大模型芯片 X7 Ultra——700 TOPS 大模型算力（量产模型实测 99.99% 对齐），搭载中国首发量产的 Armv9 车规级 CPU（性能提升 20%、能效提升 10%）；超大核 NPU 架构核内数据互联达 TB/s 级、计算利用率 98.7%，针对 Transformer 关键算子优化。对比行业旗舰内存带宽消耗下降 80%、能效翻倍；X7 系列量产 8 个月累计出货超 20 万颗、装车 10 款，Momenta 与 QNX 参与量产平台合作。",
      detail: "发布：10 月 29 日发布会，CEO 李宗霖主讲；公司 2023 年创立，蔚来资本等投资。\n规格：700 TOPS 大模型算力，量产模型实测 99.99% 对齐；中国首发量产 Armv9 车规级 CPU，性能提升 20%、能效提升 10%，集成 SVE2 向量引擎；超大核 NPU 架构核内数据互联速率 TB/s 级，计算利用率 98.7%，对 Layernorm、Softmax、Transpose 等 Transformer 关键算子优化，原生支持 FP16/FP32。\n能效：对比行业旗舰内存带宽消耗下降 80%、能效提升 100%——「大模型定义芯片」路线的量产答卷（Momenta CEO 曹旭东同日公开其「大模型定义芯片」洞察，两家口径相互呼应）。\n落地：X7 系列量产 8 个月累计出货超 20 万颗、装车 10 款车型；与 Momenta、QNX 合作打造量产级自动驾驶平台。\n端侧视角：车规是端侧大模型最苛刻的落地场（功能安全+功耗+成本三重约束）——700 TOPS 级智驾芯片进入量产爬坡期，「座舱智驾统一大算力」正在把汽车变成最大的端侧 AI 终端。",
      tags: ["新芯航途", "X7 Ultra", "车规芯片", "智驾大模型", "700TOPS"],
      url: "https://www.ithome.com/1/019/603.htm",
      image: "images/news/n137.jpg",
      imageCap: "X7 Ultra（图源：IT之家）",
      highlight: false
    },

{
      id: "n150", cat: "大模型厂商", source: "IT之家", date: "2026-10-29",
      title: "Mistral 开源 1T 参数 Large 4 权重：490 亿激活原生多模态，编程智能体 Token 消耗较 GLM-5.3 省 47%，欧洲最大开放权重旗舰落地",
      summary: "法国 Mistral AI 正式开放 Mistral Large 4（代号 Le Chonk）模型权重——1 万亿总参数、490 亿激活（含嵌入与输出层 520 亿）的原生多模态模型，在其欧洲自有数据中心用 3800 块 Grace Blackwell GPU 从零训练。编程智能体指数 48% 与 GLM-5.3 基本持平，但平均每任务 Token 消耗少 47%。修改版 MIT 许可：个人、学术、微调与常规商用免费，MaaS 转售需单独授权。",
      detail: "开源：10 月 29 日开放权重（Hugging Face: mistralai/Mistral-Large-4-1T-A52B），此版为三周前初版经政府与企业实测后的性能优化升级版。\n规格：1T 总参数、490 亿激活的原生多模态 MoE；3800 块 NVIDIA Grace Blackwell 在欧洲自有数据中心从零训练——欧洲 AI 主权旗帜的旗舰落地。\n性能：Artificial Analysis Coding Agent Index 得分 48%，与领先开源模型 GLM-5.3 基本持平，但平均每个任务消耗的 Token 数量减少 47%。\n许可：修改版 MIT——个人、学术、修改、微调与常规商业化免费；面向 MaaS 转售的云服务商须单独获取商业授权。在线版定价输入 0.70 美元/百万 Token、缓存输入 0.07 美元、输出 2.10 美元。\n端侧视角：开放权重旗舰是端侧小模型蒸馏与量化的上游「水源」——欧洲线开放权重与中国厂商阵营（DeepSeek/GLM/Kimi/Qwen）形成欧亚两线，开源生态的模型底座选择更多元。",
      tags: ["Mistral", "Large 4", "开放权重", "MoE", "欧洲AI"],
      url: "https://www.ithome.com/1/019/865.htm",
      image: "images/news/n150.png",
      imageCap: "Mistral Large 4 权重开放（图源：IT之家）",
      highlight: true
    },

{
      id: "n152", cat: "大模型厂商", source: "智东西", date: "2026-10-29",
      title: "英伟达开源语音转录模型 Nemotron 3.5 Transcribe：340 亿参数 Mamba+MoE 混合架构，30 秒录音 0.13 秒转完",
      summary: "英伟达发布并开源语音转录模型 Nemotron 3.5 Transcribe——总参数约 340 亿、单次激活约 43 亿，骨干为 Nemotron 3.5 Lightning 30B-A3B（52 层中 23 层 Mamba-2、23 层 MoE、仅 6 层 Attention）。支持 40 种语言、最长 1 小时录音、六种自然语言指令切换的转写形态；英文 9 大公开测试集平均词错误率 4.71% 优于 Qwen3-ASR-1.7B。单卡 RTX PRO 6000 Blackwell 上 30 秒音频约 0.13 秒转完，配套 Granary-v2 开放数据集。",
      detail: "开源：10 月 29 日发布并开放权重与技术报告，配套 46 万小时级开放语音数据集 Granary-v2（伪标注、人工改进与语音翻译数据为主要训练源）。\n规格：总参数约 340 亿、激活约 43 亿；骨干 52 层=23 层 Mamba-2（长序列）+23 层 MoE（稀疏激活）+6 层 Attention——混合架构在保留总参数规模的同时压住单次推理算力。\n能力：40 种语言、最长 1 小时录音无需分段；六种指令切换形态——逐字、书面化、上下文辅助、说话人标注、非言语信息、语音翻译；并行编码器分别处理语音与说话人信息。\n成绩：英文 Open ASR Leaderboard 9 测试集平均词错误率 4.71%（Qwen3-ASR-1.7B 为 4.94%）；多人发言转写 15.80% 优于专用级联系统；强化学习把英文词错率从 4.34% 再压到 4.00%。\n效率：单张 RTX PRO 6000 Blackwell 上，NVFP4 量化+DFlash2 解码最高每秒处理 2238 秒音频，30 秒音频约 0.13 秒；提供 BF16、FP8、NVFP4 三档精度适配不同显存。\n端侧视角：语音转录是 AI 录音笔、会议耳机等端侧品类的核心模型底座——「大总参+小激活」路线在语音模态再次成立，单工作站可跑的门槛让硬件厂商可直接跟进。",
      tags: ["Nemotron", "语音转录", "英伟达", "开源", "Mamba"],
      url: "https://zhidx.com/p/605500.html",
      image: "images/news/n152.png",
      imageCap: "Nemotron 3.5 Transcribe 模型概览（图源：MindStudio）",
      highlight: false
    },

{
      id: "n161", cat: "AI硬件", source: "新浪财经", date: "2026-10-29",
      title: "智元发布具身智能原生操作系统灵渠 OS 1.0：年底开源约 2 亿行代码与 5000 多个生态软件包，定义机器人硬件接入新范式",
      summary: "智元机器人在创新日发布业界首个具身智能原生操作系统灵渠 OS 1.0——定义机器人本体硬件接入新范式，支持 15 类 100 余种外设快速接入；针对机器人本体高可靠性、确定性、低时延需求完成全栈确定性优化，覆盖从构建到部署全流程。年底将把经过量产验证的约 2 亿行代码与 5000 多个生态软件包向全行业开源，提供端到端构建工具链。",
      detail: "发布：10 月 29 日智元创新日发布（合伙人熊彦介绍），从业界首个参考框架（2025 年 7 月 WAIC 开源计划）到 Alpha 版（2026 年 3 月）再到 1.0 正式版。\n能力：定义机器人本体硬件接入新范式——15 类 100 余种外设快速接入；面向高可靠性、确定性、低时延的全栈确定性优化；覆盖底层硬件使能到上层应用的全技术栈，经量产机器人大规模验证。\n开源：2026 年底全面开源——约 2 亿行经量产验证的代码+5000 多个生态软件包+端到端构建工具链，预集成具身智能开源组件。\n端侧视角：具身智能的「Windows 时刻」——机器人操作系统层首次出现量产验证后整体开源的国产方案，与 GO-3（大脑模型）、WITA-OMNI（交互）同场发布，智元把具身智能的模型-交互-系统三层一次配齐，本体厂商的端侧软件底座有了开源选项。",
      tags: ["智元", "灵渠OS", "具身智能", "机器人操作系统", "开源"],
      url: "https://finance.sina.com.cn/jjxw/2026-10-29/doc-iniwwiey2874096.shtml",
      image: "images/news/n161.png",
      imageCap: "灵渠 OS 1.0（图源：新浪财经）",
      highlight: true
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
