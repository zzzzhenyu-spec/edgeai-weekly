/* ============================================================
 * 端侧AI每周情报站 · 数据文件（滚动窗口 · 以运行日为终点的近 7 天 · 周日快照为第 41 期）
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
    issue: "2026 · 第 42 期",
    weekRange: "2026.10.02 — 10.08 · 近 7 天",
    updated: "2026-10-08",
    status: "rolling",
    editorsNote: "近 7 天聚焦：AI PC 战线重开——微软联手英伟达发布 RTX Spark 芯片的 Surface Laptop Ultra 与开发者工作站，Windows 11 将向全员开放「Execution Containers」智能体沙箱；苹果则因 Apple Intelligence 最高占用 14GB 存储、机构用户拒购新 Mac 而面临「官方可卸载」压力。AI 眼镜监管与扩张对撞——挪威拟立法公共场所临时禁用、荷兰连锁停售 Meta 眼镜，而 XREAL AURA 以 1279 美元起售价定档 Android XR 阵营第二发。Jev 线维持高热——TypeSafe AI 估值 100 亿美元、日处理破万亿 token；高通获得华为「逻辑折叠」芯片技术专利许可；腾讯 WorkBuddy 为桌面智能体补上本地文件直改能力，Muse 生态扩张至 iPad。今日新增：XREAL AURA 定价；腾讯 WorkBuddy 独立文件浏览器；微软 RTX Spark AI PC 与智能体沙箱；苹果 Apple Intelligence 卸载压力；Muse 登陆 iPad。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
  news: [
    {
      id: "n65", cat: "AI硬件", source: "IT之家", date: "2026-10-08",
      title: "XREAL AURA 定价 1279 美元起：骁龙 Reality Elite 芯片 + Android XR + Gemini，不足 95g 的空间计算眼镜",
      summary: "XREAL 确认 Android XR 眼镜 AURA 两档定价——12GB+256GB 版 1279 美元、16GB+512GB 版 1499 美元；本体不足 95g，搭载骁龙 Reality Elite 计算单元与 X1S 空间协处理器，索尼 FHD 120Hz microOLED、6DoF 追踪、Bose 调音声学，集成谷歌 Gemini——继三星 Galaxy Glasses 之后 Android XR 阵营的第二发正式定档。",
      detail: "IT之家 10 月 8 日报道：XREAL 在 10 月 7 日的新闻稿中确认 Android XR 眼镜 AURA 提供两档配置——12GB+256GB 定价 1279 美元、16GB+512GB 定价 1499 美元。\n硬件规格：本体质量不到 95g，搭载 X1S 空间协处理器；索尼 FHD 120Hz microOLED 显示面板（100% sRGB、峰值亮度 1050nits）；集成 Bose 调音声学系统与 4 麦克风阵列，支持 6DoF 追踪与 5 档电致变色。\n计算单元基于高通骁龙 Reality Elite 芯片，支持 Google Gemini，配备 34.8Whr 电池与 Wi-Fi 6、蓝牙 5.3。\n端侧视角：Reality Elite 是高通面向 XR 眼镜的新一代端侧计算平台——XREAL 与三星前后脚定档，Android XR 阵营（谷歌系统 + 高通芯片 + 各家硬件）正以「轻本体 + 端侧算力单元 + 云端 Gemini」的组合对撞 Meta 的一体化路线，年末 AI 眼镜货架将首次真正拥挤。",
      tags: ["XREAL", "AURA", "Android XR", "骁龙 Reality Elite"],
      url: "https://www.ithome.com/1/010/564.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/4f343202-ef87-42ee-8610-8d717697019e.jpg",
      imageCap: "XREAL AURA（图源：IT之家）",
      highlight: false
    },
    {
      id: "n66", cat: "端侧Agent", source: "IT之家", date: "2026-10-08",
      title: "腾讯 WorkBuddy 上线独立文件浏览器：右键即唤 AI，本地 Word/Excel/PPT 修改直接写回",
      summary: "腾讯 AI 办公产品 WorkBuddy 正式上线独立文件浏览器——在文件资源管理器/Finder 中右键即可用 WorkBuddy 打开 Word、Excel、PPT、PDF、Markdown、HTML 等文件，在独立窗口查看编辑并随时调用 AI 分析、改写；修改通过保存直接写回本地文件，多文件标签页各自挂独立的 AI 对话。",
      detail: "IT之家 10 月 8 日报道：腾讯宣布 AI 办公产品 WorkBuddy 上线独立文件浏览器——用户在文件资源管理器或 Finder 中找到文件后右键选择 WorkBuddy 打开，即可在独立窗口查看文件并直接调用 AI 分析、修改或继续处理。\n能力细节：支持 Word、Excel、PPT、PDF、Markdown、HTML 等格式；多文件标签页切换，每份文件都有独立的 Buddy 对话；可选中正文段落让 AI 针对性改写、润色或补充，结果直接落到文档对应位置。\n本地闭环：修改完成后 Ctrl/Command+S 直接写回本地文件，Markdown 自动保存，HTML 退出编辑时自动保存；还支持跨格式产出，例如打开 Excel 直接说「按这份数据，帮我做一个网页版汇报」。\n端侧视角：桌面智能体最难的一步是「敢让它动本地文件」——WorkBuddy 把文件浏览、编辑与 AI 对话合并进一个窗口并保留用户亲手修改权，是国产大厂在 GUI Agent 本地文件能力上的一次实打实落地。",
      tags: ["腾讯", "WorkBuddy", "桌面智能体", "本地文件"],
      url: "https://www.ithome.com/1/010/562.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/31723ed3-0461-4ff4-8e30-dd92a8c22cd7.png",
      imageCap: "WorkBuddy 文件浏览器（图源：IT之家）",
      highlight: false
    },
    {
      id: "n62", cat: "行业动态", source: "TechCrunch（编译）", date: "2026-10-07",
      title: "微软发布 RTX Spark 芯片 AI PC：Surface Laptop Ultra 2600 美元起，Windows 11 全员迎来「Execution Containers」智能体沙箱",
      summary: "微软在旧金山 Tech Week 活动上发布基于英伟达 RTX Spark 芯片的 Surface Laptop Ultra（2600/3700 美元两档，顶配 5900 美元）与 6000 美元的 Surface RTX Spark Dev Box 开发者工作站——为本地免费运行 AI 模型改造 CPU/GPU/统一内存与散热；更关键的是改版 Windows 11 引入「Execution Containers」智能体沙箱，并将向所有 Windows 11 用户开放。纳德拉称 Windows 平台的未来就是「为任何人的智能体服务」。",
      detail: "TechCrunch 10 月 7 日报道：微软在旧金山 Tech Week 期间的活动上公布了 Surface Laptop Ultra 的规格与价格——两档基础型号分别 2600 美元与 3700 美元起（更强芯片），选配更高内存/存储可达 5900 美元，最高配已售罄；同场发布搭载 RTX Spark 芯片的开发者工作站 Surface RTX Spark Dev Box，6000 美元起，预装 VS Code、GitHub Copilot CLI、WSL 与 PowerShell 7。\n设计定位：两款设备均为本地免费运行 AI 模型而设计——CPU、GPU、统一内存及散热等硬件均为此改造；同时也胜任内容创作、视频处理与游戏。\n系统侧才是重点：改版 Windows 11 引入「Execution Containers」，让 AI 智能体的沙箱隔离变得更简单，且该功能将面向所有 Windows 11 用户开放。\n纳德拉的表态：「过去三四年我们意识到，光有模型做不成任何事——你真正需要的是编排，是模型之外的内存，是能整合多模型、上下文、记忆与行动空间的 harness 层」；微软要把这套能力「不仅给自家应用，也给任何人的智能体——这就是 Windows 平台未来的意义」。背景：英伟达今年 6 月已与微软及一批 PC 厂商达成基于 RTX Spark 芯片打造 AI 与智能体就绪 Windows PC 的协议。\n端侧视角：Execution Containers 下放全部 Win11 用户，意味着 Windows 正在把自己改造成「智能体操作系统」——沙箱、编排、记忆成为平台级原语；RTX Spark 上 PC 则给端侧模型提供了新的硬件底座，AI PC 竞争从营销标签（Copilot+ 已退役）转入真刀真枪的智能体基础设施。",
      tags: ["微软", "英伟达", "RTX Spark", "Surface Laptop Ultra", "智能体沙箱"],
      url: "https://techcrunch.com/2026/10/07/microsoft-releases-new-nvidia-chip-ai-pcs-with-revamped-windows-11/",
      image: "https://techcrunch.com/wp-content/uploads/2026/10/Microsoft-Surface-Laptop-Ultra.png",
      imageCap: "Surface Laptop Ultra（图源：TechCrunch）",
      highlight: true
    },
    {
      id: "n63", cat: "行业动态", source: "9to5Mac（编译）", date: "2026-10-07",
      title: "Apple Intelligence 卸载压力升级：最高占用 14GB 存储，机构用户因「不可移除」拒购新 Mac",
      summary: "macOS 27 的 Apple Intelligence 模型最高占用 14GB 存储，对 256GB 机型构成实质挤压；继社区工具 RemoveMacAI 提供非官方移除方案后，John Gruber 指出部分机构因规定禁装 AI 工具、在 Apple Intelligence 无法移除的情况下直接拒绝采购仅能运行 Golden Gate 的新 Mac——苹果或被迫提供官方卸载支持以保住硬件销量。",
      detail: "9to5Mac 10 月 7 日报道：最新 Apple Intelligence 模型最高需要 14GB 存储空间，对 256GB 机型的用户构成显著占用；独立开发者 Om Lahore 为此开发了移除工具 RemoveMacAI。\n风险与争议：9to5Mac 提醒深度移除有风险——Apple Intelligence 与 macOS 27 深度耦合，强行移除可能影响基本功能；但有观点认为苹果将不得不提供官方移除途径。\nDaring Fireball 的 John Gruber 指出真正的压力来自机构用户：一些组织规定禁装 AI 工具，「在 Apple Intelligence 可被移除之前完全不允许 Golden Gate 系统」——这意味着不买只预装 Golden Gate 的新 Mac 硬件。\n端侧视角：端侧 AI 的「不可卸载」正在从个人吐槽变成采购阻力——存储占用 + 合规要求双重挤压下，「官方可移除」或将成为端侧 AI 的合规底线，与挪威对 AI 眼镜的监管动议同属端侧 AI 治理大潮的两面。",
      tags: ["Apple Intelligence", "macOS 27", "可卸载性", "RemoveMacAI"],
      url: "https://9to5mac.com/2026/10/07/apple-may-have-to-officially-support-apple-intelligence-removal-on-macs-to-protect-sales/",
      image: "https://9to5mac.com/wp-content/uploads/sites/6/2024/10/macbook-air-apple-intelligence.jpg",
      imageCap: "Apple Intelligence 存储（图源：9to5Mac）",
      highlight: false
    },
    {
      id: "n64", cat: "行业关注事件", source: "9to5Mac（编译）", date: "2026-10-07",
      title: "Muse 登陆 iPad：连续数周蝉联 iPhone 下载榜首后，Meta 智能体补齐大屏形态",
      summary: "Meta 智能体应用 Muse 发布 iPad 版本并新增更多连接器——继 9 月 iPhone 首发、数日后登陆 Mac 之后，三周内完成手机/电脑/平板三端布局；Muse 是 Meta 大部分功能免费的主动式智能体工具，与 Grok Bot、ChatGPT Dots、OpenClaw 同场竞技，上线以来连续数周位居 iPhone 应用下载榜首。",
      detail: "9to5Mac 10 月 7 日报道：Meta 的主动式智能体应用 Muse 推出 iPad 版更新，同时新增多项连接器——此前该应用已连续数周占据 iPhone 应用下载榜首位。\n产品线节奏：Muse 于 9 月首发 iPhone 版，数日后即推出 Mac 版，如今补齐 iPad——三周内完成手机、电脑、平板三端覆盖。\n竞争位势：9to5Mac 将 Muse 定位为与 Grok Bot、ChatGPT Dots、OpenClaw 竞争的主动式智能体工具，iPhone/iPad 版免费上架 App Store。\n端侧视角：在隐私争议（未经授权同步 Mac 短信库、硬件化 Muse Charm）与监管审视之外，Muse 的生态扩张速度并未放缓——多端覆盖 + 连接器扩张是智能体产品抢占「默认入口」的标准打法。",
      tags: ["Meta Muse", "iPad", "智能体应用"],
      url: "https://9to5mac.com/2026/10/07/meta-launches-muse-for-ipad-following-weeks-as-the-top-iphone-app/",
      image: "https://9to5mac.com/wp-content/uploads/sites/6/2026/09/Muse-by-Meta.webp",
      imageCap: "Muse for iPad（图源：9to5Mac）",
      highlight: false
    },
    {
      id: "n60", cat: "行业关注事件", source: "The Guardian（编译）", date: "2026-10-05",
      title: "挪威拟立法在公共场所临时禁用 AI 眼镜：全球首个国家级动议，隐私监管从场馆走向立法",
      summary: "挪威政府宣布将尽快向议会提交法案，在公园、海滩、博物馆、购物中心、学校、幼儿园、医疗机构、健身房与公共活动场所临时禁用带摄像头的智能眼镜（私人使用不受限）——成为首个提出国家级 AI 眼镜禁令的主要国家；数字事务大臣表示「不想要一个人们担心被不知情记录的社会」，同时专家小组将起草长期监管方案。",
      detail: "卫报 10 月 5 日报道：挪威政府计划提交法案，在公园、海滩、博物馆、购物中心、学校、幼儿园、医疗机构、健身房与公共活动等场所临时禁用带摄像头的智能眼镜，私人使用仍然允许——这使其成为首个提出国家级 AI 眼镜临时禁令的主要国家。\n官方表态：数字事务大臣 Torgeir Micaelsen 称「新的强大技术正在进入社会，人们面临在不知情时被拍照、摄像或录音的风险」，「我们不想要一个人们在习惯不被监视的场所里还要担心被记录的社会」。工党少数派政府需争取其他党派支持，同时已责成专家小组起草长期监管方案。\n对照背景：英美已出现零散限制——法院、酒吧、影院与部分餐厅禁用或限制智能眼镜；Meta 自 2023 年初以来售出至少 900 万副雷朋智能眼镜。就在两天前，荷兰眼镜连锁 Hans Anders 刚宣布停售 Meta 雷朋眼镜。\n端侧视角：AI 眼镜隐私议题完成三级跳——场馆禁拍、零售渠道停售、如今是国家立法动议；「临时禁令 + 长期规则并行」的挪威路径若通过，将成为其他欧洲国家的监管模板，硬件侧的隐私设计（指示灯、物理遮挡、无摄像头版本）将从产品差异点变为合规底线。",
      tags: ["挪威", "AI眼镜", "隐私监管", "临时禁令"],
      url: "https://www.theguardian.com/world/2026/oct/05/norway-temporary-ban-smart-glasses-public-places",
      image: "https://i.guim.co.uk/img/media/40af5768117abd5443d47eba0a698ad852dd88a1/451_0_4085_3270/master/4085.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&precrop=40:21,offset-x50,offset-y0&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=7b05d2c122a783977bd623fb1520c5d1",
      imageCap: "挪威拟临时禁用 AI 智能眼镜（图源：卫报）",
      highlight: true
    },
    {
      id: "n58", cat: "芯片厂商", source: "IT之家（彭博社报道）", date: "2026-10-05",
      title: "高通获得华为「逻辑折叠」芯片技术专利许可：先进封装路线赢得头部芯片公司背书",
      summary: "彭博社报道，高通已获得支撑华为新型「逻辑折叠」（LogicFolding）芯片制造技术的专利许可——该技术着重提升数据传输速度、弥补光刻机不足，协议有助于验证华为的芯片制造能力、帮助缩小与台积电的差距。同日双方宣布达成涵盖 5G/计算/AI/网络的广泛专利交叉许可，华为全部专利许可累计总金额预计超 69 亿美元。",
      detail: "IT之家 10 月 5 日报道（彭博社）：高通已获得支撑华为新型「逻辑折叠」（LogicFolding）芯片制造技术的专利许可，彭博社称这对华为及其在海外 AI 市场的推动力是一笔胜利。首款采用该技术的芯片为华为海思麒麟 9050 Pro——双裸片垂直堆叠，晶体管密度显著提升而面积小于前代。\n报道解读：与高通的协议有助于验证华为的芯片制造能力；华为视新架构为提升半导体性能的突破，帮助缩小与台积电等行业领导者的差距——该方法着重于提升数据传输速度，弥补光刻机方面的不足。\n更大背景：华为与高通同日宣布达成长期、广泛的专利许可协议，包含双方在 5G、计算、人工智能、网络等领域的专利组合交叉许可，高通还将收购华为在计算、AI、网络等领域的部分美国专利；华为称交易完成后其全部专利许可协议累计总金额预计将超过 69 亿美元。\n端侧视角：继麒麟 τ 家族随 Mate 90 齐发后，逻辑折叠架构再获高通许可与交叉授权背书——在光刻受限的环境下，先进封装正成为国产端侧芯片算力提升的关键增量，该架构也进入对外技术输出阶段。",
      tags: ["华为", "高通", "逻辑折叠", "专利授权"],
      url: "https://www.ithome.com/1/009/852.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/028e7003-f16a-4adc-b600-fb6f4a27537d.png",
      imageCap: "高通×华为专利许可（图源：IT之家）",
      highlight: true
    },
    {
      id: "n59", cat: "AI硬件", source: "IT之家", date: "2026-10-05",
      title: "AI 眼镜隐私抵制蔓延到零售渠道：荷兰连锁 Hans Anders 暂停销售 Meta 雷朋智能眼镜",
      summary: "荷兰大型眼镜连锁企业 Hans Anders 宣布暂停在荷兰与比利时两地销售 Meta 雷朋智能眼镜，成为较早采取停售行动的零售商之一；随着隐私抗议升温、监管警示与诉讼压力增加，智能眼镜正面临更广泛的抵制浪潮——隐私问题开始直接影响 AI 眼镜的渠道准入。",
      detail: "IT之家 10 月 5 日报道：荷兰大型眼镜连锁企业 Hans Anders 宣布暂停在荷兰与比利时销售 Meta 雷朋智能眼镜，成为较早采取此类行动的零售商之一。\n背景：随着隐私抗议升温、监管警示及诉讼压力增加，智能眼镜正面临更广泛的抵制浪潮；此前多起酒吧、演出场所的禁拍事件均集中于带摄像头的眼镜产品。\n端侧视角：AI 眼镜的隐私问题正从舆论争议走向渠道抵制——继场馆禁拍、应用商店下架风波之后，抵制首次蔓延到眼镜零售渠道；硬件侧的隐私设计（录制指示灯、物理遮挡、无摄像头版本）正从可选项变成渠道准入项。",
      tags: ["Meta", "雷朋智能眼镜", "隐私", "AI眼镜"],
      url: "https://www.ithome.com/1/009/798.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/8/373f8d53-b946-46bd-9bc3-694c7e7017dc.jpg",
      imageCap: "Meta 雷朋智能眼镜（图源：IT之家）",
      highlight: false
    },
    {
      id: "n55", cat: "行业关注事件", source: "量子位", date: "2026-10-03",
      title: "Jev 开发商 TypeSafe AI 估值 100 亿美元：日处理破万亿 token，创始人详解「系统一」路线",
      summary: "Jev 开发商 TypeSafe AI 估值站上 100 亿美元：Jev 日处理量突破 1 万亿 token、夜间流量持续走高（大量调用来自机器自动化），JevBench 综合榜排名第一；创始人 Diogo Almeida 首次系统阐述「系统一」路线——choice/null/score 三原语 + RLCD 训练，并称「就算给十亿美元也不会从零预训练大模型」。",
      detail: "量子位 10 月 3 日报道：Jev 开发商 TypeSafe AI 估值站上 100 亿美元；创始人 Diogo Almeida（前 OpenAI 工程师）做客 Latent Space 播客（swyx 主持），首次系统回应技术路线与商业化问题。\n规模数据：Jev 日处理量突破 1 万亿 token，夜间流量持续走高——说明大量调用来自机器自动化而非人类对话；发布视频 6 天浏览量 3870 万；第三方 JevBench v1.2.1 综合榜上，Jev 1.13.0 以 75.3 分排名第一。\n命名与路线：Jev 源于「杰文斯悖论」——效率提升反而放大总消耗，产品追求极致性价比；「系统一」定位为机器原生、大型可编程模型，核心是 choice（枚举）、null（二值判断）、score（排序阈值）三原语；训练采用 RLCD（以程序闭环验证为目标），区别于 RLHF 与 RLVR。\n端侧视角：级联是 Jev 的典型用法——置信度高直接采纳，中间区间调用更强模型二次校验；小体量决策模型 + 级联 + 端侧部署正是低成本常驻智能体的工程解，TypeSafe 的五年目标是拉动全要素生产率增长 3%。",
      tags: ["Jev", "TypeSafe AI", "系统一模型", "估值"],
      url: "https://www.qbitai.com/2026/10/500148.html",
      image: "https://i.qbitai.com/wp-content/uploads/2026/09/e9f0f52b82bb7d241981dbb6ab6fbfd6.webp",
      imageCap: "Diogo Almeida 访谈（图源：量子位）",
      highlight: true
    },
    {
      id: "n56", cat: "行业动态", source: "量子位", date: "2026-10-02",
      title: "openJiuwen X-Router 自演进模型路由技术首发：昇腾亲和，实测降低 50%+ Token 消耗",
      summary: "openJiuwen 项目首发 X-Router 自演进模型路由技术——「让每一次请求选对模型，让每一次反馈都成为下一次更优、更省的选择」：昇腾亲和，面向 Agent 工作流实测减少 50% 以上 Token 消耗，Agent 越跑越省。",
      detail: "量子位 10 月 2 日报道：openJiuwen 项目首发 X-Router 自演进模型路由技术，口号是「让每一次请求选对模型，让每一次反馈都成为下一次更优、更省的选择」。\n核心特性：昇腾亲和；面向 Agent 工作流的模型路由实测减少 50% 以上的 Token 消耗；路由策略基于反馈自演进，Agent 用得越多、路由越准、成本越低。\n端侧视角：模型路由是端云分层的调度中枢——按请求难度在大小模型、端云之间动态分配算力，直接决定常驻智能体的成本上限；昇腾亲和的开源实现也为国产算力栈补上了一块路由层参考。",
      tags: ["模型路由", "昇腾", "Agent", "推理优化"],
      url: "https://www.qbitai.com/2026/10/500098.html",
      image: "https://i.qbitai.com/wp-content/uploads/2026/10/e8e637667f6fc01ccf8a7d61d231532a.png",
      imageCap: "X-Router 架构（图源：量子位）",
      highlight: false
    },
    {
      id: "n57", cat: "AI硬件", source: "Tom's Hardware（编译）", date: "2026-10-02",
      title: "Nvidia 推出 64GB 版 DGX Spark：内存涨价潮下的本地 AI「生路」，4999 美元起",
      summary: "Nvidia 为 DGX Spark（GB10 平台）推出 64GB 统一内存配置，在内存涨价的「RAMpocalypse」浪潮中为本地 AI 用户提供更低的入门价——新配置 4999 美元起；此前本地 AI 统一内存平台（Strix Halo/GB10/Apple M 系）以 128GB+ 配置为主流。",
      detail: "Tom's Hardware 10 月 2 日报道：Nvidia 推出 64GB 版 DGX Spark，在内存价格暴涨的「RAMpocalypse」中给本地 AI 用户一条生路——新 GB10 配置 4999 美元起，面向「能用更少内存工作」的用户。\n背景：本地 AI 的统一内存配置此前以 128GB 以上为主流——AMD Strix Halo、Nvidia GB10、Apple M 系列芯片都可配到大内存；内存涨价后，64GB 档成为拉低门槛的现实选择。\n端侧视角：统一内存容量直接决定本地能跑的模型规模上限——64GB 档把「本地跑中型模型」的入门价打到 5000 美元内；在内存涨价潮下，厂商正在重新切分本地 AI 设备的产品档位。",
      tags: ["Nvidia", "DGX Spark", "本地AI", "统一内存"],
      url: "https://www.tomshardware.com/pc-components/gpus/nvidia-introduces-64gb-dgx-spark-to-throw-local-ai-fans-a-lifeline-amid-the-rampocalypse-new-gb10-config-starts-at-usd4999-for-those-who-can-work-with-less",
      image: "https://cdn.mos.cms.futurecdn.net/D4D8sJFKUe4PFUpqUAPSfB-2560-80.jpg",
      imageCap: "DGX Spark（图源：Tom's Hardware）",
      highlight: false
    },

  ],

  /* ------------- 板块二：论文（沿用上期，周日核结时刷新） ------------- */
  papers: [
    {
      id: "p1", group: "recent", cat: "端侧智能体", date: "2026-09-21",
      title: "ME-VLM: A Unified VLM for Embodied Cognition and Agent Coordination",
      authors: "理想汽车基础模型团队（Foundation Model, Li Auto Inc）",
      venue: "arXiv:2609.24526", level: "预印本",
      summary: "理想汽车发布统一视觉语言模型 ME-VLM（4B 与 35B-A3B 双版本）：融合具身认知与多模态智能体能力；4B 版经视觉 token 压缩、W4A8 量化与软硬件协同优化，在 M100 上实现端侧推理，prefill 时延从 400ms 降至 188ms。",
      detail: "研究背景：Physical AI 要求模型把视觉-语言理解落到真实环境，同时考虑环境约束与执行反馈。本文提出 MachEmbodied-VLM（ME-VLM），提供 4B 与 35B-A3B 两个版本，把具身认知与多模态智能体能力统一进同一个模型。\n方法：强调物理感知与时空推理，覆盖数字与物理环境中的规划、交互与结果评估；训练数据横跨具身与多模态智能体任务，包含执行观察与反馈以支持结果评估与决策修正；训练管线包括具身能力注入、具身/多模态智能体两个专家的分别强化学习、以及多教师 on-policy 蒸馏。\n端侧部署：面向边缘部署做了视觉 token 压缩、W4A8 量化与软硬件协同优化，使 4B 版本可在 M100 上端侧推理，prefill 时延从 400ms 降到 188ms。\n评测：在具身与智能体两类基准、自动驾驶与具身导航任务上均取得有竞争力的表现。项目页与代码已开源（machembodied.com）。",
      tags: ["具身智能", "VLM", "车端部署", "量化"],
      url: "https://arxiv.org/abs/2609.24526"
    },
    {
      id: "p2", group: "recent", cat: "端云协同", date: "2026-09-21",
      title: "LoRA-generating hypernetworks for efficient on-device LLM generative personalization",
      authors: "Sean Augenstein, Li Ding, Jihwan Lee 等（Google）",
      venue: "arXiv:2609.24979", level: "预印本",
      summary: "用超网络在端侧「现场生成」个性化 LoRA：把用户上下文 token 映射为适配该用户的低秩适配器——兼得上下文学习的端侧可行性与参数微调的权重级定制，设备上只做前向传播、个性化数据不出端。",
      detail: "研究背景：手机上的端侧 LLM 受限于算力，模型规模与质量天花板明显，任何可行的质量增益都弥足珍贵；同时端侧模型与特定用户深度耦合、使用模式可预测——天然适合个性化，但现有两条路线各有短板：上下文学习（ICL）端侧可行，却要延长输入序列带来时延等代价；参数高效微调（PEFT）改权重无额外时延，但端侧训练在算力上不可行。\n方法：训练一个超网络（hypernetwork），把用户的上下文 token 映射为适合该用户的 LoRA 低秩适配器；训练好的公共产物下发到设备后，每台设备完全在端侧用超网络「合成」自己的个性化 LoRA——合成阶段只涉及神经网络前向传播（如 ICL 般轻量），又像 PEFT 一样通过权重修改基础模型（不延长输入序列）。\n适配场景：该思路尤其契合移动设备的算力约束——个性化在设备上完成，用户数据无需上传。\n定位：这是 Google 团队提出的端侧 LLM 生成式个性化新范式，把「个性化」从微调问题转化为生成问题。",
      tags: ["个性化", "LoRA", "超网络", "端侧部署"],
      url: "https://arxiv.org/abs/2609.24979"
    },
    {
      id: "p3", group: "recent", cat: "推理与系统", date: "2026-09-18",
      title: "TierKV: Long-Context On-Device LLMs via Predictive Multi-Tier KV Caching",
      authors: "Zhihao Shu, Md Musfiqur Rahman Sanim, Jie Hu 等",
      venue: "arXiv:2609.21172", level: "预印本",
      summary: "预测式多层 KV 缓存（PMCO）：解码开始前用 prefill 隐状态预测未来缓存需求，把 token 联合分配到精确/低秩/闪存卸载三层；在 3 款移动 SoC、8 个模型上 prefill 吞吐最高提升 17.6×，RAM 常驻 KV 缓存减少 12.5–34%。",
      detail: "研究背景：LLM 正走向手机并处理文本、图像、视频、音频的多样化负载，长上下文让 KV 缓存成为最大内存瓶颈——它随序列长度线性增长、且每个解码步都要访问。已有工作用低秩压缩、token 驱逐或闪存卸载减小足迹，但重建开销、不可逆的 token 损失或 I/O 停顿可能抵消省下的内存收益。\n方法：提出基于「预测式多层缓存优化（PMCO）」的移动端推理框架 TierKV——在解码开始前，用 prefill 隐状态预测未来缓存需求，在设备内存与精度预算下把 token 联合分配到精确层、低秩层与闪存卸载层三个层级。该形式化保留对完整上下文的访问、消除反应式驱逐的循环依赖，并存在闭式求解器在运行时选择分层边界与每层秩。\n结果：跨 3 款移动 SoC、8 个文本/视觉/音频模型评估，TierKV 相比现有移动 LLM 框架 prefill 吞吐最高提升 17.6×，RAM 常驻 KV 缓存减少 12.5–34%，同等内存预算下支持显著更长的上下文，精度损失轻微。",
      tags: ["KV缓存", "长上下文", "移动推理框架"],
      url: "https://arxiv.org/abs/2609.21172"
    },
    {
      id: "p4", group: "recent", cat: "能效与评测", date: "2026-09-18",
      title: "Samsone: A Family of Open Small Audio Language Models for On-Device Inference",
      authors: "Piotr Masztalski, Michał K. Grzeszczyk, Olaf Sikorski",
      venue: "arXiv:2609.21666", level: "预印本",
      summary: "开源小音频语言模型家族 Samsone（99M/134M/356M）：134M 在同量级多个基准上刷新 SOTA，全部基于公开数据训练，发布训练代码、模型权重、移动优化 checkpoint 与开源安卓应用，演示实时端侧音频推理。",
      detail: "研究背景：大型音频语言模型（LALM）的成功推动了数十亿参数的多模态网络，但隐私保护与低时延处理的需求，把焦点转向能在端侧运行的小音频语言模型（SALM）。\n方法与结果：提出面向边缘计算的 SALM 家族 Samsone——核心模型 Samsone-134M 在多个基准上刷新同规模 SOTA；并引入 99M 与 356M 两个尺寸，探索 SALM 的缩放规律。尽管体量紧凑，Samsone 家族的性能可与大一到两个数量级的模型竞争。\n开源配套：全部基于公开数据训练，发布训练代码、模型权重、移动优化 checkpoint，并提供开源安卓应用演示 Samsone 的实时端侧推理。\n与本站资讯板块的呼应：高通日前发布面向 AI hearables 的 Sound Elite Gen 2（端侧 AI 性能翻倍）——端侧音频智能的芯片侧与模型侧正在同步成熟，「语音入口端侧化」是下一阶段值得盯的主线。",
      tags: ["音频语言模型", "开源", "安卓端侧推理"],
      url: "https://arxiv.org/abs/2609.21666"
    },
    {
      id: "p5", group: "recent", cat: "推理与系统", date: "2026-09-15",
      title: "End-to-End Latency-Minimizing and Load-Balanced Request Scheduling for Edge LLM Inference in Agentic AI Services",
      authors: "Zhen Li, Jun Cai, Haoran Gao 等",
      venue: "arXiv:2609.17193", level: "预印本",
      summary: "提出 LYREO 在线调度框架：跨时隙建模传输、prefill、迭代解码与 KV 缓存演化，用 Lyapunov 优化联合最小化端到端时延并均衡异构边缘服务器负载。",
      detail: "研究背景：LLM 驱动的智能体（Agentic）AI 服务对推理时延极其敏感，推动 LLM 部署到分布式边缘服务器。但边缘环境里通信与计算能力异构、推理状态动态演化，使得「每个请求选哪台服务器」变成一个随时间变化、且跨时隙相互耦合的决策问题。本文研究在线请求调度，目标是联合最小化长期平均端到端时延、并均衡异构服务器间的负载分布。\n两大挑战：其一，传统时延模型无法准确刻画多阶段 LLM 执行的细粒度动态（传输、预填充、逐 token 解码、KV 缓存增长各有特性）；其二，调度决策的时延后果要等请求完成后才能观测，无法即时评估决策好坏。\n方法：作者构建跨时隙（cross-slot）推理模型，为每个请求刻画传输、prefill、迭代级解码与 KV 缓存演化，并用「KV 缓存内存-时间消耗」度量服务器负载；在此基础上提出 LYREO：用 Lyapunov 优化把长期负载均衡约束转化为可在线求解的形式，并用奖励重分配（reward redistribution）+ 基于序列的回报预测，把延迟观测的「迟到反馈」转成及时的学习信号，支持更早的调度决策。\n结果：在多种配置的仿真中，LYREO 一致取得比代表性学习类与启发式基线更低的时延与更均衡的负载分布。",
      tags: ["边缘推理", "请求调度", "Lyapunov 优化"],
      url: "https://arxiv.org/abs/2609.17193"
    },
    {
      id: "p6", group: "recent", cat: "端云协同", date: "2026-09-14",
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
      id: "p7", group: "recent", cat: "安全与隐私", date: "2026-09-09",
      title: "Understanding the Security Boundary of Obfuscation-based On-Device LLM Protection",
      authors: "Hanyi Zhou, Chenyang Li, Yuanzhe Pang 等（清华）",
      venue: "arXiv:2609.10117", level: "预印本",
      summary: "形式化 TEE 端侧 LLM 保护的「混淆原语」并刻画安全边界，新攻击 Collapse 击穿 USENIX Sec'25 / IEEE S&P'25 / NeurIPS'25 多个已发表方案，再以新原语扩展边界。",
      detail: "研究背景：TEE（可信执行环境）是保护端侧 LLM 知识产权（模型权重）的有前途机制，但 TEE 算力有限。主流做法是「TEE-Shielded LLM Partition（TSLP）」：对计算密集的层施加混淆（obfuscation）变换后卸载到外部 GPU，只把轻量运算留在 TEE 内。然而这类防御大多是启发式设计，已有多个方案被针对性攻击攻破。\n核心问题：能否建立统一的原语（primitives），形式化刻画这类方法的安全边界，并系统性地扩展它？\n方法：作者把「混淆原语」形式化为满足特定代数性质的线性计算二元组，证明代表性 TSLP 框架的矩阵级权重变换都可以表达为这些原语的复合；其典范形式 O_prior 由此刻画了整个原语家族的结构性安全边界。\n攻击：提出原语指导的新攻击 Collapse，利用该结构边界暴露的漏洞，成功攻破多个已发表于顶会的 TSLP 方案——ArrowCloak（USENIX Security'25）、TSQP（IEEE S&P'25）、LoRO（NeurIPS'25），说明「启发式混淆」存在共性弱点。\n防御推进：进一步提出两种新的混淆原语，与既有构造组合成 O_ext，把安全边界向外扩展，为下一代 TEE 端侧 LLM 防护给出设计空间。",
      tags: ["TEE", "模型知识产权", "混淆原语"],
      url: "https://arxiv.org/abs/2609.10117", highlight: true
    },
    {
      id: "p8", group: "recent", cat: "能效与评测", date: "2026-09-09",
      title: "PELM: Power Efficient On-Device LLM Inference with Speculative Decoding and Dynamic Voltage Frequency Scaling",
      authors: "Weisi Yang, Stephen Xia（Northwestern / imec）",
      venue: "arXiv:2609.09662", level: "预印本",
      summary: "把投机解码与「可变验证深度」作为 DVFS 调频之外的两个新旋钮，实现更省电的端侧 LLM 推理：最多 23.1% 加速、52.4% 能耗降低，代码已开源。",
      detail: "研究背景：把 LLM 直接部署到手机等移动平台有隐私、个性化、低时延等收益，但 LLM 计算需求远超资源受限平台的承受力；更麻烦的是移动设备外形紧凑、没有风扇等散热手段，高处理器占用率极易过热降频（throttling），进一步拖慢推理。\n现有工作的缺口：面向移动 LLM 的 DVFS（动态电压频率调节）功耗治理方法大多只优化硬件参数与处理器频率，在部分热受限场景下失效。\n关键洞察：并非所有 token 都需要「全深度推理」才能保持高质量生成——这打开了算法层（投机解码）与系统层（频率调节）联合优化的空间。\n方法（PELM）：在传统 DVFS 频率调节之上，增加两个负载相关的调节旋钮——投机解码（speculative decoding）与可变验证深度（variable verification depth），把优化空间从一维扩展到多维，动态权衡速度、能耗与生成质量。\n结果：跨多个硬件平台与数据集的评估显示，PELM 相比最先进的功耗治理方法最多提速 23.1%、降低能耗 52.4%，同时任务表现相当。源代码开源（github.com/imec-nu/PELM）。",
      tags: ["投机解码", "DVFS", "能耗优化"],
      url: "https://arxiv.org/abs/2609.09662"
    },
    {
      id: "p9", group: "recent", cat: "端侧智能体", date: "2026-09-09",
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
      id: "p10", group: "recent", cat: "端侧智能体", date: "2026-09-07",
      title: "Beyond Fluent Generation: A CPU Reliability Benchmark for MCP-Style Tool Calling in Sub-2B Small Language Models for Edge Deployment",
      authors: "Abrar Shahriar, Qurat-Ul-Ain Mastoi",
      venue: "arXiv:2609.07370", level: "预印本",
      summary: "在树莓派 / Jetson Nano 等单板机上评测 5 款 <2B 模型的 MCP 式工具调用：Qwen2.5-1.5B 最佳（75–79%），1000 条原始回复仅 5 条可直接解析为 JSON——端侧 Agent 高度依赖输出恢复。",
      detail: "研究背景：树莓派、NVIDIA Jetson Nano、Arduino UNO Q、Orange Pi、LattePanda 等资源受限单板机，催生了减少云依赖、改善数据本地性、容忍断连的端侧 SLM 智能体。而 MCP 式工具调用对模型的要求远高于「生成流畅文本」：必须输出机器可读 JSON、选对工具、补全所有必填参数、避免误动作。\n基准设计：在 100 条提示（天气检索、网页搜索、计算、邮件撰写、任务创建）上，对五款 2B 以下开源模型（Phi-1.5、Pythia-1.4B、TinyLlama-1.1B-Chat、Qwen2.5-0.5B/1.5B）做贪心与核采样两种解码评测；评分维度包括可解析性、工具名正确性、参数完整性与取值一致性，并设计了一个恢复解析器（剥离 Markdown 围栏、抽取花括号子串）。\n核心结果：严格的事后审计发现 1000 条原始回复中只有 5 条能直接解析为 JSON；经恢复解析器后 Qwen2.5-1.5B 达 75%（贪心）/79%（采样），Qwen2.5-0.5B 贪心 72% 但采样下降到 32%，Phi-1.5 为 0%，Pythia 与 TinyLlama 最多 7%——端侧 Agent 高度依赖输出恢复层。\n资源侧：CPU 探针显示 Qwen2.5-1.5B 需 7,960MiB 内存、平均 30.8s 延迟；Qwen2.5-0.5B 为 3,637MiB、10.6s，揭示可靠性-资源权衡。作者建议安全部署需要 schema 校验、受限生成、最小权限执行与后果性操作的人工升级通道。",
      tags: ["MCP", "工具调用", "单板机"],
      url: "https://arxiv.org/abs/2609.07370"
    }
  ],

  /* ------------- 板块三：知识分享 ------------- */
    knowledge: {
    concepts: [
      { t: "NPU", d: "神经网络处理器：SoC 里专门跑矩阵运算的单元，算力以 TOPS 计量，端侧 AI 的物理底座。" },
      { t: "TOPS", d: "每秒万亿次运算：NPU 算力单位，旗舰手机已破百 TOPS；但算力≠体验，内存带宽同样关键。" },
      { t: "量化 Quantization", d: "把模型权重从 16bit 压到 4/8bit（如 GGUF Q4），体积与能耗大降、精度小损——大模型上端侧的第一步。" },
      { t: "端侧模型 SLM", d: "3B~30B 级小语言模型：靠蒸馏与剪枝继承大模型能力，离线可跑、隐私不出设备。" },
      { t: "MoE / A3B", d: "混合专家架构：总参数大、每次只激活一小部分（如 23B 总参、3B 激活），让端侧也能「背」下大模型。" },
      { t: "投机解码", d: "小模型先草拟、大模型并行验证，一次前向产出多个 token——端侧推理提速的标配技术。" },
      { t: "KV 缓存", d: "大模型逐 token 生成的「记忆账本」；长上下文下它比模型本体更吃内存，端侧系统研究的核心战场。" },
      { t: "端云协同", d: "简单任务端侧跑、复杂任务上云：在时延、成本与隐私之间分工，当前手机 AI 的主流架构。" },
      { t: "GUI Agent", d: "智能体直接「看屏幕、点按钮」替你操作 App——豆包手机助手与游戏反作弊风控的冲突正源于此。" },
      { t: "MCP", d: "模型上下文协议：让模型以标准方式调用外部工具与设备，端侧智能体的「USB 接口」。" },
      { t: "AI OS", d: "操作系统原生集成智能体调度与端侧模型调用（澎湃 OS4、Qwen Intelligence 等）：AI 从 App 升级为系统能力。" },
      { t: "统一内存", d: "CPU/GPU/NPU 共享同一块内存（苹果的核心卖点）：容量与带宽直接决定端侧能跑多大的模型。" },
      { t: "TEE", d: "可信执行环境：硬件级安全飞地，保护端侧模型权重与生物特征不被窃取。" },
      { t: "Hearables", d: "AI 耳机等「可听可戴」设备：继 AI 眼镜之后的下一个端侧入口候选。" }
    ],
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
