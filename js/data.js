/* ============================================================
 * 端侧AI每周情报站 · 数据文件（2026 第 39 期 · 09.17–09.23）
 * 每周更新流程（Python 脚本，本地需 Python 3.10+）：
 *   python scripts\fetch_papers.py      # arXiv 论文候选
 *   python scripts\fetch_news.py        # RSS 资讯候选(默认近7天)
 *   python scripts\check_dblp.py        # DBLP 核对 venue
 *   python scripts\find_article.py "关键词..."  # 定位真实文章URL
 *   python scripts\fetch_paper_figs.py  # 抓取论文结构图(arXiv HTML版)
 * 收录规则：资讯只收最近一周(运行日往前7天)的事件，超出窗口的
 * 厂商动态不放卡片(由厂商雷达标注覆盖)；来源只用简体中文或英文。
 * 字段：url=阅读原文(具体文章页)；image=详情配图(og:image或论文图,
 *       无则前端自动生成兜底封面)；imageCap=配图说明
 * ============================================================ */
const WEEKLY_DATA = {

  meta: {
    issue: "2026 · 第 39 期",
    weekRange: "2026.09.17 — 09.24",
    updated: "2026-09-24",
    editorsNote: "本期只收录最近一周（09.17–09.24）动态：小米 18 Pro 今日全球首发 2nm 骁龙8E6 Pro；Rokid 二代 AI 眼镜今日数贸会首秀；高通正式发布第六代骁龙8双旗舰（2nm、端侧 300 亿参数模型，小米 18 Pro 即将首发）；手机端侧AI备案新增荣耀 YOYO Claw、小米 miclaw、阶跃终端 AI；AI硬件赛道升温——豆包做手机、阿里造平板、千问办公硬件曝光、AI眼镜混战；「哑巴 AI」Jev 刷屏硅谷；云栖大会 AI 新品密集；联发科 CX C10 Max 将驱动 Googlebook；Google Home 开放 MCP；阶跃 600B 旗舰宣布 10 月开源。学术侧 arXiv 近期新作集中于推理系统、SLM 工具调用与 TEE 安全。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
  news: [
    {
      id: "n26", cat: "手机厂商", source: "MSN 科技 / 快科技", date: "2026-09-24",
      title: "小米 18 Pro 今日登场：全球首发 2nm 骁龙8E6 Pro，跑分出炉",
      summary: "小米 18 Pro 今日（9·24）发布：全球首发 2nm 骁龙8E6 Pro，跑分显示安卓单核最高分；5999 元起档位，配防窥屏与双 2 亿像素——2nm 端侧 AI 旗舰正式到达消费者手中。",
      detail: "小米 18 Pro 系列今日登场，全球首发 2nm 制程的骁龙8E6 Pro（8 Elite Gen 6 Pro）。\n发布会前跑分已出炉：骁龙8E6 系列拿下安卓单核最高分，配合 LPDDR6 内存与澎湃 OS4；影像上配备双 2 亿像素与防窥屏，起售档 5999 元（全系较上代上涨约千元）。\n意义：这是 2nm 制程 + 面向智能体的 Hexagon NPU 首次到达消费者手中——高通本周在骁龙峰会上主讲的「端侧智能体时代」，从今天开始可以被真实买到。",
      tags: ["小米 18 Pro", "骁龙8E6 Pro", "2nm", "安卓单核纪录"],
      url: "https://www.msn.cn/zh-cn/news/other/%E5%85%A8%E7%90%83%E9%A6%96%E5%8F%912nm%E9%AA%81%E9%BE%998e6-pro-%E5%B0%8F%E7%B1%B318-pro%E8%B7%91%E5%88%86%E5%87%BA%E7%82%89/ar-AA2cxWZu",
      highlight: true
    },
    {
      id: "n27", cat: "AI硬件", source: "搜狐科技", date: "2026-09-24",
      title: "Rokid 二代 AI 眼镜今日全球首秀：第五届数贸会登场",
      summary: "Rokid（乐奇）第二代 AI 眼镜今日（9·24）在第五届数贸会全球首秀——AI 眼镜赛道再添重磅玩家，与 Meta / 小米 / 雷鸟的混战继续升级。",
      detail: "Rokid 二代 AI 眼镜于 9 月 24 日在杭州第五届全球数字贸易博览会上全球首秀。\nRokid 是国内 AR / AI 眼镜头部玩家之一，一代产品已与支付宝等生态深度整合；二代产品预计在光学显示、端侧多模态理解与佩戴形态上继续迭代（以首秀发布为准）。\n结合本周 AI 眼镜行业盘点（见本板块另一条）：Meta 领跑出货、国内厂商密集发布，「下一代端侧 AI 入口」之争正进入产品密度最高的阶段。",
      tags: ["Rokid", "AI眼镜", "数贸会", "全球首秀"],
      url: "https://www.sohu.com/a/1079659740_447547",
      image: "https://q2.itc.cn/q_70/images03/20260923/616a701b1b4046d993ed57c46e409b06.jpeg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n28", cat: "AI硬件", source: "腾讯新闻 / 新浪财经", date: "2026-09-17",
      title: "OPPO 发布「心力球」：全天候主动式 AI 硬件，年内到来",
      summary: "OPPO 公开全新品类——全天候主动式 AI 硬件「心力球」，预计今年晚些时候上市：AI 硬件从「被动工具」走向「主动智能体」。",
      detail: "OPPO 发布全天候主动式 AI 硬件「心力球」，预计今年晚些时候到来。\n新品类的关键词是「主动式」：不再等待用户指令，而是全天候感知场景并主动给出建议——端侧智能体需要一个常在的物理载体，这与此轮 AI OS 换代、系统级 Agent 落地是同一逻辑。\n行业语境：豆包做手机、阿里造平板、OPPO 做主动式硬件——模型厂商与手机厂商都在探索「App 之外」的 AI 硬件形态。",
      tags: ["OPPO", "心力球", "主动式AI硬件", "新品类"],
      url: "https://news.qq.com/rain/a/20260917A0AMVQ00",
      image: "https://n.sinaimg.cn/spider20260917/328/w660h468/20260917/c755-7cd5ebbefefefe578f1beb8079dfa7a9.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n2", cat: "芯片厂商", source: "腾讯新闻 / Qualcomm", date: "2026-09-23",
      title: "高通正式发布第六代骁龙8双旗舰：2nm 制程，端侧可跑 300 亿参数模型",
      summary: "骁龙峰会正式发布 8 Elite Gen 6 双旗舰：2nm 制程、Oryon CPU 最高 5.11GHz，Hexagon NPU 面向智能体重构，端侧可运行 300 亿参数模型；小米 18 Pro 将于 9·24 首发登场。",
      detail: "9 月 22–24 日骁龙峰会（毛伊岛）进行中，高通正式发布第六代骁龙8双旗舰处理器（8 Elite Gen 6 与更高档的 Extreme），官方口径「正式迈入端侧智能体 AI 新时代」。\n规格：2nm 制程；Oryon CPU 最高 5.11GHz；Hexagon NPU 新增 Element Accelerator（元素加速器）与更大共享内存，端侧可运行最高 300 亿参数模型；GPU 性能大幅提升，Extreme 档面向超旗舰机型。\n落地：小米 18 Pro 将于 9 月 24 日首发搭载骁龙8E6 登场；泄露定价约 320 美元，首发机型年底前密集亮相。\n配合此前联发科天玑 9600 Pro（同样宣称 30B 端侧模型），「2nm + 端侧智能体」已成为本轮旗舰 SoC 的共同卖点。",
      tags: ["骁龙8 Elite Gen 6", "2nm", "Hexagon NPU", "端侧智能体"],
      url: "https://news.qq.com/rain/a/20260923A038CO00",
      image: "https://inews.gtimg.com/om_ls/Orkpllb6bRi833C9vvqznHvULMUg3qfyylgzlyfcb1Kb0AA_640330/0",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n20", cat: "端侧Agent", source: "腾讯新闻", date: "2026-09-23",
      title: "手机端侧AI备案新增 3 款：荣耀 YOYO Claw、小米 miclaw、阶跃终端 AI 在列",
      summary: "网信办手机端侧生成式 AI 备案新增 3 款：荣耀 YOYO Claw、小米 miclaw 与阶跃终端 AI——「Claw」系命名密集出现，端侧智能体成为手机厂商的标配产品线。",
      detail: "9 月 23 日消息，手机端侧AI备案名单新增 3 款：荣耀 YOYO Claw、小米 miclaw 与阶跃终端 AI。\n两个信号值得注意：其一，「Claw」式命名在荣耀与小米之间撞名，说明「端侧智能体助手」已成手机厂商的标配产品线，竞争进入命名与定位层面的贴身战；其二，阶跃星辰的终端 AI 榜上有名——与本周其 600B 旗舰 Step 5 Preview 发布形成「云端旗舰 + 终端模型」的两翼布局。\n结合此前首批 7 款手机端侧模型备案（华为小艺、OPPO AndesGPT、vivo 蓝心、Apple 智能、小米、努比亚豆包、三星），名单正快速扩容，端侧生成式 AI 进入规模化合规落地阶段。",
      tags: ["端侧AI备案", "YOYO Claw", "miclaw", "阶跃终端AI"],
      url: "https://news.qq.com/rain/a/20260923A0BOJU00",
      image: "https://inews.gtimg.com/om_ls/Oa689SH8m5hjUH8ytR5dYdoVJwCTyPLgJpOQwPCr09aPwAA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n21", cat: "行业动态", source: "搜狐科技 / MSN", date: "2026-09-23",
      title: "云栖大会 AI 新品密集发布，斑马智行推出全模态端侧大模型 AutoOmni 2.0",
      summary: "云栖大会期间 AI 新品密集：斑马智行发布全模态端侧大模型 AutoOmni 2.0（面向智能座舱），行业观察称 AI 端侧算力「全面爆发」。",
      detail: "9 月 23 日行业动态：云栖大会密集发布 AI 新品，AI 端侧算力被业内评价为「全面爆发」。\n端侧侧亮点是斑马智行（上汽×阿里背景）发布的全模态端侧大模型 AutoOmni 2.0：面向智能座舱场景，主打全模态理解与个性化体验——车载是端侧大模型落地最快的场景之一（云端复杂推理 + 车机小模型的端云协同架构）。\n同期苹果新款 Mac 开始发货（自研芯片 + 端侧 AI 能力同步上量），端侧算力在手机、车机、PC 三条线同步进入密集落地期。",
      tags: ["云栖大会", "AutoOmni 2.0", "智能座舱", "端侧算力"],
      url: "https://www.sohu.com/a/1080020318_122014422",
      image: "https://q4.itc.cn/q_70/images03/20260923/55192c23e0ee4e77930a80888b30c07e.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n22", cat: "AI硬件", source: "新浪财经", date: "2026-09-23",
      title: "豆包做手机、阿里造平板：AI 开始争夺硬件控制权",
      summary: "大模型厂商正从「赋能者」变为「硬件主导者」——字节豆包做手机、阿里将推千问平板与办公 AI 硬件，AI 公司下场争夺终端入口与系统级话语权。",
      detail: "文章核心判断：AI 开始争夺硬件控制权。\n案例：字节跳动以豆包手机（努比亚 NaviX Ultra）切入整机；阿里将推出千问平板，并被曝有千元级办公 AI 硬件在途（见本板块另一条）——大模型厂商不再满足于做系统里的一个 App，而是要定义设备本身。\n逻辑：端侧模型 + 智能体时代，硬件入口意味着数据、场景与话语权；自己做硬件才能端到端优化「模型-芯片-系统」。\n这也解释了本周的另一面：高通把 NPU 面向智能体重构、手机厂商密集备案端侧模型——芯片厂、模型厂、整机厂三方都在向对方的腹地渗透。",
      tags: ["AI硬件", "豆包手机", "千问平板", "终端入口"],
      url: "https://finance.sina.com.cn/wm/2026-09-23/doc-inisvivv6005017.shtml",
      image: "https://n.sinaimg.cn/front20260923ac/776/w788h788/20260923/df4f-ca2049e794c96ff7b188d67464dd3fbc.jpg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n25", cat: "行业动态", source: "腾讯新闻", date: "2026-09-23",
      title: "端侧 AI 加速落地：多厂商密集发布新一代操作系统",
      summary: "端侧 AI 加速落地，多厂商密集发布新一代操作系统，「AI OS」成为系统换代的核心叙事；资金面同步关注端侧 AI 与 AI 应用方向。",
      detail: "9 月 23 日报道：端侧 AI 正加速落地，多个厂商密集发布新一代操作系统，「AI OS」成为新一轮系统换代的核心卖点——智能体调度、端侧模型调用、跨应用执行正在进入系统层。\n与此呼应：荣耀 MagicOS 11、vivo 原系统 7、OPPO ColorOS 17 相继发布（均以 AI 智能体为核心标签），澎湃 OS4 随小米 18 系列落地——操作系统的「AI 原生化」竞赛已经开启。\n二级市场同步反映：端侧 AI 与 AI 应用方向表现活跃。",
      tags: ["AI OS", "系统换代", "智能体调度"],
      url: "https://news.qq.com/rain/a/20260923A05I6700"
    },
    {
      id: "n23", cat: "AI硬件", source: "搜狐科技（独家）", date: "2026-09-21",
      title: "独家：阿里首款千问办公 AI 硬件将推出，售价或在千元级",
      summary: "阿里被曝将推出首款千问办公 AI 硬件（QwenNote），售价千元级——大模型厂商做硬件再下一城，瞄准办公场景的随身 AI 终端。",
      detail: "9 月 21 日独家消息：阿里首款千问办公 AI 硬件将推出，产品线指向 QwenNote，售价或在千元级。\n定位是「随身办公 AI 终端」：依托千问端侧模型 + 云端算力，覆盖会议记录、文档处理、翻译等办公高频场景，与手机形成互补而非替代关系。\n放在本周语境里看：豆包做手机、阿里造平板与办公硬件、康冠携手阶跃出 AI PC——模型厂商的硬件化已经是集体动作，而非个案。",
      tags: ["千问", "QwenNote", "办公AI硬件", "阿里"],
      url: "https://www.sohu.com/a/1079171780_553580",
      image: "https://q7.itc.cn/q_70/images03/20260921/43bc4f6ae13f400699272bf498964ac0.jpeg",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n24", cat: "AI硬件", source: "腾讯新闻", date: "2026-09-16",
      title: "AI 眼镜混战：谁能拿下「下一代端侧 AI 入口」",
      summary: "AI 眼镜成为端侧 AI 硬件最拥挤的赛道：Meta 领跑出货，小米、Rokid、雷鸟、闪极等密集发布；光学方案、端侧模型与交互成为胜负手。",
      detail: "AI 眼镜正在成为端侧 AI 硬件最拥挤的赛道：Meta（Ray-Ban 系列）领跑出货，国内小米、Rokid、雷鸟创新、闪极等玩家密集发布，价格带从千元级到三千元全面铺开。\n竞争集中在三个维度：其一是光学方案（波导 vs Birdbath）与显示能力；其二是端侧模型能力——多模态理解（看懂眼前场景）、主动式 AI 记忆成为差异化卖点；其三是交互形态（语音 + 视觉 + 触控）。\n行业判断：眼镜是天然的全天候传感器位置，但隐私与功耗约束使其比手机更依赖端侧小模型——AI 眼镜被视为「下一代端侧 AI 入口」的有力候选。",
      tags: ["AI眼镜", "端侧入口", "多模态", "Meta"],
      url: "https://news.qq.com/rain/a/20260916A03V6P00",
      image: "https://inews.gtimg.com/news_ls/OunjQ5IAotVEty4QkWMeo142dRbG7CoGWm0_PSgY_u_bQAA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n11", cat: "大模型厂商", source: "36氪 / TechCrunch", date: "2026-09-21",
      title: "「哑巴 AI」Jev 刷屏：不生成文本的「系统一模型」，决策快 200 倍",
      summary: "前 OpenAI 研究员创办的 TypeSafe AI 发布 Jev：不做对话、直接输出类型安全的概率化决策，70ms 级响应、快约 200 倍、便宜约 400 倍；上线 3 天获 Vercel / Cloudflare / LangChain 整合。",
      detail: "Jev 是 TypeSafe AI（前 OpenAI 研究员 Diogo Almeida 创办）9 月 15 日开放早期访问的新模型，被媒体称为「哑巴 AI」：\n它基于 transformer 架构，但不是 LLM——不写文章、不写代码、不陪聊，放弃逐 token 的文本生成，直接输出「类型安全的概率化决策」并内置校准（calibration），对标心理学中快思考的「系统一」能力。因此它高速、轻量，官方与第三方评测称在相关决策任务上比传统 LLM 快约 200 倍、便宜约 400 倍，且从机制上避免幻觉。\n有多轰动：发布 3 天内获 Vercel、Cloudflare、LangChain 等主流平台整合；内测开放不到 36 小时涌入 14 万开发者；同日公司宣布完成 DCVC 领投的 4000 万美元种子轮。TechCrunch 评价其为「一种新型 AI 模型」，Wikipedia 已收录词条。\n36氪追问《Jev 真是新范式吗？》：它在企业自动化（分类、风控、路由等结构化决策）中优势明显，但复杂推理与开放生成仍需与传统 LLM 配合——「快系统 + 慢系统」的组合成为新的工程范式。",
      tags: ["Jev", "TypeSafe AI", "系统一模型", "决策模型"],
      url: "https://www.36kr.com/p/3988372551990276",
      image: "https://img.36krcdn.com/hsossms/20260918/v2_cfa5dfb20fde4be3b974bd19767f8254@000000@ai_oswg679481oswg2304oswg1728_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n12", cat: "端侧Agent", source: "东吴证券（腾讯新闻） / 36氪", date: "2026-09-21",
      title: "系统级 Agent 进入加速期：豆包、荣耀、vivo、OPPO 密集落地",
      summary: "机构报告：豆包手机助手消费者版量产落地，荣耀、vivo、OPPO 系统级智能体密集跟进；开源侧 OpenClaw（「小龙虾」）成为 2026 现象级端侧 Agent，腾讯 WorkBuddy 等衍生适配崛起。",
      detail: "东吴证券 9 月 21 日报告指出：系统级 Agent 进入加速期。\n落地节奏：豆包手机助手消费者版随努比亚 NaviX Ultra 实现量产（本周期内开售）；荣耀、vivo、OPPO 的系统级智能体密集布局，成为下半年最确定的产业主线。\n技术路线：执行框架 Harness 开始系统级商用；GUI（直接操作图形界面）与 A2A（智能体间通信）两条路线并行演进。\n学术侧本周亦有呼应：MCP 式工具调用在单板机上的可靠性基准（论文板块 p6）、车载 SLM 函数调用（p5）指向同一问题——让小模型在端侧可靠地「动手」。",
      tags: ["系统级Agent", "GUI", "A2A", "智能体手机"],
      url: "https://news.qq.com/rain/a/20260921A046EN00",
      image: "https://inews.gtimg.com/om_ls/On-vObCIUNjBT2QmAbIIetUc87uUIwDooLRvnRrAl6QSwAA_640330/0",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n18", cat: "芯片厂商", source: "9to5Google / Tom's Hardware", date: "2026-09-21",
      title: "联发科 Dimensity CX C10 Max 亮相：将驱动谷歌 Googlebook 计划，联想首发",
      summary: "联发科旗舰笔记本 SoC 天玑 CX C10 Max（3nm）正式亮相，将驱动谷歌新推出的 Googlebook 计划，联想首发搭载；规格对标 Kompanio Ultra，主打 Chromebook Plus 级 AI 体验。",
      detail: "据 9to5Google 与 Tom's Hardware 9 月 21 日报道，联发科下一代旗舰笔记本芯片 Dimensity CX C10 Max 正式亮相：3nm 制程，规格与 Kompanio Ultra 相近（NPU 算力面向 Chromebook Plus 级 AI 任务），将驱动谷歌新发起的 Googlebook 产品计划，联想率先推出搭载机型。\n这是联发科在手机旗舰（天玑 9600 Pro）之外，向 PC / ChromeOS 端侧 AI 市场的又一次进攻——与高通骁龙 X、MediaTek/NVIDIA 合作路线形成三方竞逐。\n配合上周发布的天玑 9600 Pro（首款 2nm 手机 SoC、支持 30B 端侧模型），联发科本周在端侧 AI 芯片两端（手机 + 笔记本）全面落子。",
      tags: ["联发科", "Dimensity CX C10 Max", "Googlebook", "AI PC"],
      url: "https://9to5google.com/2026/09/21/mediatek-googlebook-dimensity-cx-c10-max/",
      image: "https://9to5google.com/wp-content/uploads/sites/4/2026/09/mediatek-dimensity-cx-c10-max-2.jpg",
      imageCap: "配图来自原文页面"
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
      detail: "《端侧AI之战正式打响｜巨潮》一文盘点端侧 AI 整机动态：努比亚 NaviX Ultra（豆包手机二代）于 9 月 16 日正式发布并开售，5499 元起（12GB+512GB，16GB+1TB 版 7499 元），由中兴通讯努比亚全链路主导、与字节跳动合作，搭载第五代骁龙8至尊版平台与豆包手机助手消费者版。\n产品核心是把 AI 智能体技术从工程样机推进到规模化量产商用：围绕「听得懂、能干活、记得住、够安全」四大能力，支持全场景自然语义理解，可自主跨应用完成比价下单、行程规划等多步骤任务——手机从「你操作它」变成「它帮你办事」。该机此前在 WAIC 2026 亮相并获 SAIL 卓越人工智能引领者奖。\n同场竞争：苹果 Apple 智能 + 全新 Siri AI 已在 WWDC26 发布；刚上市的小米 18 Fold 内置 Xiaomi 端侧模型。文章判断：跳出耗资巨大的云端大模型军备竞赛、转向端侧模型研发，正成为更多企业深度参与 AI 浪潮的路径。",
      tags: ["豆包", "NaviX Ultra", "AI智能体手机", "努比亚"],
      url: "https://www.sohu.com/a/1077629065_122014422",
      image: "https://q3.itc.cn/q_70/images03/20260918/8e7d8da3bcd743c8b9362d1748862d0b.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n4", cat: "手机厂商", source: "爱范儿（腾讯新闻）", date: "2026-09-17",
      title: "小米 18 Fold 上市：首款搭载 MiMo 端侧模型，自研玄戒 O3 + 澎湃 OS4 集结",
      summary: "小米 18 Fold 本周开售：首发集结自研玄戒 O3 芯片、澎湃 OS4 与端侧大模型三大自研科技；端侧模型内存与带宽占用直降约 30%，是首款搭载 MiMo 端侧模型的手机。",
      detail: "小米 18 Fold 是小米首款「中折叠」形态旗舰：折叠态宽 83.6mm，展开 163.8mm、7.58 吋内屏，重 219g；本周上市，起售价约万元档。\n爱范儿评测《敢卖一万元的小米手机，底气在哪里》给出判断：自研三件套（玄戒 O3 旗舰 SoC、澎湃 OS4、端侧大模型）是真正底气——这也是首款搭载 MiMo 端侧模型的手机；配合长鑫 LPDDR6 国产内存的高带宽，理论上可支撑更大规模端侧模型运行，端侧模型对内存和带宽的占用直降约 30%，精度几乎无损。\n评测同时指出短板：相机快门偏慢、部分系统细节仍需打磨——「一万元买的是自研栈的未来期权，而不是完美成品」。",
      tags: ["小米 18 Fold", "MiMo 端侧模型", "玄戒 O3", "折叠屏"],
      url: "https://news.qq.com/rain/a/20260908A058I900",
      image: "https://inews.gtimg.com/om_ls/Oz34X0_1P_EVn8dpkXPX80UbZBgS-3x0Rit6ZAPdPn4yoAA_640330/0",
      imageCap: "配图来自原文页面"
    }
  ],

  /* ---------------- 板块二：科研前沿 ----------------
   * 收录标准：SCI 二区以上期刊 / CCF-B 以上会议论文（group=published）
   * 近期 arXiv 新作作为预印本收录跟踪（group=recent），录用后转入已发表
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
        intro: "苹果的官方机器学习研究博客，发表 Apple Intelligence 背后的基础模型（AFM 系列）技术报告、端侧优化的第一手细节，以及 ML 团队的论文解读。\n代表作：《Introducing Apple's On-Device and Server Foundation Models》（2024，首次公开 3B 端侧模型的架构与训练后优化）、《Updates to Apple's Foundation Models》（2025）与 AFM 3 第三代报告（2026）。\n适合谁：想了解工业界最强端侧模型如何炼成（后训练、蒸馏、适配器、评测方法）的工程师与研究者。文章全部免费、无需注册。" },
      { group: "厂商官方博客", name: "Qualcomm AI Hub & Blog", type: "厂商研究博客", letter: "Q",
        text: "数百个端侧优化模型一键部署到骁龙平台，量化、编译与异构计算的工程实践大全。",
        url: "https://aihub.qualcomm.com",
        intro: "高通官方的端侧 AI 开发者门户 + 研究博客：AI Hub 收录数百个已在骁龙平台优化（量化/编译/算子调优）的模型，可一键部署到真机；博客侧持续输出 NPU 架构、量化实践与端侧智能体（Agentic AI）的技术文章。\n看点：Hexagon NPU 的编程模型与最佳实践、Snapdragon Summit 后的模型支持更新、端侧 Stable Diffusion / LLM 的官方示例代码。\n适合谁：做安卓端侧部署、需要「模型-芯片」联合调优的移动端工程师。" },
      { group: "厂商官方博客", name: "Google DeepMind / Developers Blog", type: "厂商研究博客", letter: "G",
        text: "Gemini Nano、AICore 与 Android 端侧 AI 的官方进展；AICORE API 与 ML Kit 的端侧能力说明中心。",
        url: "https://blog.google/technology/ai/",
        intro: "Google 官方 AI 博客（DeepMind + Developers 合流），端侧相关内容集中在：Gemini Nano 与 Android AICore 的每次更新、ML Kit / MediaPipe 的端侧能力（Generative AI API 一行代码调用内置小模型）、以及 Gemma 开源系列的发布说明。\n看点：Gemma 系列开源模型的发布与变体（含面向端侧的轻量版）、Chrome / Android 内置 AI 能力路线图。\n适合谁：安卓生态开发者，以及跟踪「系统级内置模型」路线的从业者。" },
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
      { group: "个人博客", name: "Tri Dao", type: "个人博客", letter: "T",
        text: "FlashAttention 作者，专注高效注意力与推理 Kernel；端侧推理框架大量复用他的工作。",
        url: "https://tridao.me",
        intro: "Tri Dao（普林斯顿，FlashAttention / FlashDecoding / Mamba 共同作者）的个人主页与博客，主题是高效深度学习：注意力变体、IO 感知的 Kernel 设计、长上下文推理优化。\n看点：FlashAttention 系列论文与博客讲解——端侧推理框架（llama.cpp、MLC 等）的注意力实现大量建立在他的工作之上；对理解「推理为什么快/慢」的底层逻辑极有价值。\n适合谁：做推理 Kernel 与模型架构优化的工程师与研究者。" },
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
        intro: "老牌半导体产业媒体（微信公众号同名），强项在芯片层：SoC 架构解析、NPU 算力对比、供应链与工艺节点报道，国产端侧芯片厂商（瑞芯微、紫光展锐、全志、海思）的动态跟踪密度远高于泛科技媒体。\n看点：新品发布的技术拆解、工程师社区讨论、供应链数据。\n适合谁：需要看懂「端侧 AI 的算力从哪来」的硬件工程师与产业分析师。" },
      { group: "中文媒体 · 公众号", name: "IT之家", type: "中文媒体 · 微信公众号同名", letter: "I",
        text: "消费科技快讯，手机厂商端侧 AI 功能与新机动态的快速信源。",
        url: "https://www.ithome.com",
        intro: "国内更新最快的消费科技资讯站之一（微信公众号同名），手机厂商的端侧 AI 功能上线、系统更新（ColorOS/原系统/MagicOS 的 AI 特性）、新机曝光与发布第一手快讯多源于此。\n看点：更新频率极高、带官方配图；适合作为 RSS 订阅源做每日扫描（本站 fetch_news.py 已收录其 RSS）。\n适合谁：关注「端侧 AI 功能今天上了什么新」的产品与运营同学。" }
    ]
  }
};
