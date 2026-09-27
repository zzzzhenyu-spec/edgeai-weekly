/* 自动生成: scripts/archive.py (勿手改) · 2026 · 第 40 期 快照（2026.09.20 — 09.27，数据更新于 2026-09-27） */
window.WEEKLY_ARCHIVE = window.WEEKLY_ARCHIVE || {};
WEEKLY_ARCHIVE[40] = {

  meta: {
    issue: "2026 · 第 40 期",
    weekRange: "2026.09.20 — 09.27",
    updated: "2026-09-27",
    editorsNote: "本期只收录最近一周（09.20–09.27）动态：首款 AI 智能体手机撞上现实摩擦——豆包手机助手就《王者荣耀》强制下线事件致歉，端侧 GUI Agent 与 App 反作弊风控的边界之争浮出水面；骁龙峰会收官，高通联合阶跃星辰、无量火、江波龙演示端侧 30B MoE 完整智能体工作流，Snapdragon Sound Elite Gen 2 把端侧 AI 带进「hearables」；苹果首度公布端侧 AI 能力矩阵（iPhone 140 亿参数 → Mac Studio 集群 1.6 万亿），新款 Mac 主打端侧 AI 省 token 费；荣耀 Magic9 定档 9·28（顶配首发第六代骁龙8超级至尊版、搭载 Qwen Intelligence）；微软 12 吋 Surface Pro 换装骁龙 X2 Plus 补上 5G。Meta Connect 上 Muse 全面接入 AI 眼镜、百款眼镜矩阵齐发；Rokid 二代眼镜数贸会首秀、千问 AI 眼镜 N1 亮相云栖（10·13 开售）、阿里「原生智能体电脑」QwenBook 云栖首秀（打通 WPS，年底或明年初发售）；小米 18 Pro 全球首发 2nm 骁龙8E6 发布即开售，18 Fold 首销激活近 8 万台；手机端侧AI备案新增荣耀 YOYO Claw、小米 miclaw、阶跃终端 AI；高通×谷歌首批 Googlebook 落地、联发科 CX C10 Max 跟进；阶跃 600B 旗舰宣布 10 月开源；「哑巴 AI」Jev 刷屏硅谷。用户侧温度（小红书）：AirPods 5 首发潮多篇千赞教程帖，豆包手机口碑两极。学术侧 arXiv 新作集中于端侧 KV 缓存、小音频语言模型、端侧个性化与具身 VLM（理想 ME-VLM 4B 端侧部署）。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
  news: [
    {
      id: "n39", cat: "端侧Agent", source: "新浪财经 / 观察者网", date: "2026-09-27",
      title: "首款 AI 智能体手机撞上反作弊风控：豆包手机助手就《王者荣耀》强制下线致歉",
      summary: "9 月 24 日起，努比亚 NaviX Ultra（豆包手机）用户登录《王者荣耀》时被提示「设备环境异常」强制下线；豆包手机助手 9 月 27 日致歉：全程未对腾讯游戏系统做任何操作、AI 不存在外挂或模拟行为，正与腾讯接洽——端侧 GUI Agent 与 App 风控的首次大规模正面冲突。",
      detail: "9 月 27 日，豆包手机助手在官方社区发文致歉：9 月 24 日晚起陆续收到用户反馈，搭载豆包手机助手的努比亚 NaviX Ultra 在登录《王者荣耀》或匹配对战时出现「设备环境异常」提示、被强制踢下线。\n官方回应要点：经确认全程未对腾讯游戏系统进行任何操作，AI 不存在任何违规点击、外挂或模拟行为；团队正持续与腾讯相关方接洽沟通，暂未收到明确回复；建议用户暂时不要在该机型上反复尝试登录，账号被封可通过游戏客服渠道申诉。\n这不是第一次：2025 年 12 月，第一代工程预览机 M153 就爆发过同系列风控冲突（微信环境异常、阿里系 App 人机验证/闪退），豆包当时收紧了 AI 操作范围——下线金融 App 与竞技游戏场景的 AI 操作能力。但报道指出，该调整只限制了「主动操作」，设备底层的模拟点击能力仍在：哪怕用户没有唤醒豆包下达指令，App 风控也能扫描到系统的自动化特征，将其判为高风险环境。\n为什么重要：NaviX Ultra 是「全球首款 AI 智能体手机」（9 月 16 日发售，已完成大模型备案+工信部入网），其核心卖点恰恰是 GUI Agent 直接操作手机——而《王者荣耀》用户协议明确禁止非腾讯授权的第三方系统。端侧智能体「替用户操作」的权限边界、与存量 App 风控生态的兼容规则，成了智能体手机规模化的下一道坎：豆包在声明中亦呼吁与厂商共同制定清晰、安全的 AI 操作行为准则。",
      tags: ["豆包手机助手", "NaviX Ultra", "GUI Agent", "反作弊风控"],
      url: "https://finance.sina.com.cn/stock/t/2026-09-27/doc-inithcyh0184530.shtml",
      image: "https://n.sinaimg.cn/spider20260927/454/w660h1394/20260927/f934-14c310187440cf3355741c3c0ba919a0.jpg",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n36", cat: "手机厂商", source: "IT之家", date: "2026-09-27",
      title: "荣耀 Magic9 系列定档 9·28：顶配首发第六代骁龙8超级至尊版，搭载 Qwen Intelligence",
      summary: "荣耀 Magic9 系列三款机型定档 9 月 28 日 14:30 发布：Magic9 Pro Max 至高搭载第六代骁龙8超级至尊版（Extreme 档首次上机），全系搭载阿里 Qwen Intelligence 系统级 Agent 架构——继小米 18 Pro 之后，「2nm 旗舰 + 系统级 Agent」的第二波量产机型来了。",
      detail: "IT之家 9 月 27 日配置汇总：荣耀 Magic9 系列定档 9 月 28 日 14:30 发布，共三款机型，是「品牌焕新后的首款作品」，主打外观、影像、AI 三大升级，搭载阿里 Qwen Intelligence 系统级 Agent 架构。\n处理器分布：Magic9 标准版与超能版采用第五代骁龙8至尊版，Pro Max 至高搭载第六代骁龙8超级至尊版——继小米 18 Pro 首发 8E6 之后，「超级至尊版（Extreme 档）」机型首次亮相。\n亮点配置：Pro Max 配 6.8 吋 LTPO 大直屏、8800mAh 电池、100W 有线 + 80W 无线、双 3D 生物识别（3D 人脸 + 3D 超声波）、双实体卡 + 双 eSIM 四卡双待、自研至臻黑钻屏峰值亮度 1 万尼特；超能版配主动散热风扇与 11000mAh 系列最大电池。\n端侧看点：Qwen Intelligence 是阿里云栖大会发布的 Agentic OS（任务规划、跨应用执行、影像创作三大场景），荣耀 Magic9 成为其深度落地的旗舰载体——继小米（澎湃 OS4 + MiMo）之后，「系统级 Agent 架构 + 第三方旗舰整机」的绑定再添一例。",
      tags: ["荣耀 Magic9", "骁龙8超级至尊版", "Qwen Intelligence", "AI手机"],
      url: "https://www.ithome.com/1/007/524.htm"
    },
    {
      id: "n35", cat: "端侧Agent", source: "36氪 / 新浪财经（焦点分析）", date: "2026-09-26",
      title: "从模型上手机到智能体落地：骁龙峰会演示端侧 30B MoE 完整工作流",
      summary: "36氪焦点分析复盘骁龙峰会：高通联合阶跃星辰（模型）、无量火科技（推理调度）、江波龙（存储）演示端侧 30B-MoE 智能体工作链——本地读邮件、提取行程、同步日历、推荐航班酒店并草拟回复，全程无需云端；2024 年端侧上限约 7B，这次被视为一次跨越。",
      detail: "36氪《焦点分析》（9 月 26 日）复盘 2026 骁龙峰会：高通的叙事正在从两年前「证明大模型能装进手机」转向「证明端侧模型能承担完整工作」。\n四方演示：高通（计算平台）×阶跃星辰（模型）×无量火科技（推理与调度优化）×江波龙（存储协同），在参考设计上用端侧 30B-MoE 模型跑通完整办公工作链——本地读取邮件、提取行程信息、同步日历、推荐航班酒店并草拟回复，全程无需云端；AI Hub 平台用于复用优化成果、降低部署门槛，合作已前移至模型设计环节。\n硬件底座：第六代骁龙8双旗舰均为 2nm，超级至尊版频率达 5GHz；双 Micro NPU 架构性能提升 85%、功耗降低 20%，强化 Personal Scribe 与个人知识图谱等本地能力；CPU 管工具调用与任务调度、NPU 管推理、低功耗感知单元处理后台信息。\n节奏判断：CEO 安蒙称智能体 AI「创造了一种全新的终端工作流」；中国区董事长孟樸则提示，跨终端个人智能体可能要到 2027-2028 年才逐步稳定落地——大模型每 3 个月迭代一次，而手机适配后 9-12 个月不动，节奏错配是端侧智能体落地的最大挑战。",
      tags: ["骁龙峰会", "端侧30B MoE", "阶跃星辰", "端侧智能体"],
      url: "https://cj.sina.com.cn/articles/view/5953466437/162dab0450670bdlw2",
      highlight: true
    },
    {
      id: "n34", cat: "行业动态", source: "IT时代网 / IT之家", date: "2026-09-25",
      title: "苹果首度公布端侧 AI 能力矩阵：从 iPhone 140 亿参数到 Mac Studio 集群 1.6 万亿",
      summary: "Jamf 用户大会（JNUC）上，苹果首次系统性公布全系设备端侧 AI 推理能力矩阵：iPhone/iPad 最高 140 亿激活参数、MacBook Pro 1200 亿、Mac Studio 4800 亿，Mac Studio 集群最高 1.6 万亿——统一内存的容量与带宽直接决定端侧模型上限。",
      detail: "9 月 25 日消息，苹果在 Jamf 用户大会（JNUC）的 IT 行业动态环节公布了一张端侧 AI 推理能力对比图表，首次系统展示从 iPhone、iPad 到 Mac 的端侧推理能力分级。\n能力矩阵：iPhone / iPad（16GB 内存、76GB/s 带宽）最高支持 140 亿激活参数，覆盖 Siri、文字润色、图片处理等轻量任务；MacBook Air（32GB、153GB/s）350 亿；Mac mini（64GB、307GB/s）700 亿；MacBook Pro（128GB、614GB/s）1200 亿；Mac Studio（512GB、1.2TB/s）4800 亿；Mac Studio 集群（2TB）最高可跑 1.6 万亿参数，承担超大模型的本地训练与推理。\n苹果的解释是：能力分级依托统一内存架构——内存容量与带宽直接决定可加载模型的参数量。此前已有 iPhone 18 Pro（A20 Pro）实测本地运行 270 亿参数模型的报道。\n行业语境：高通在骁龙峰会宣讲端侧 300 亿参数模型、联发科天玑 9600 Pro 宣称 30B 端侧——苹果用一张矩阵表，把「端侧算力上限」的竞争从 SoC 发布会延伸到了存量设备生态，也为企业 IT 选购「本地 AI 主机」提供了第一份官方参照系。",
      tags: ["苹果", "端侧AI能力矩阵", "统一内存", "本地大模型"],
      url: "https://www.itsdw.cn/news/28606.html",
      image: "https://www.itsdw.cn/wp-content/uploads/2026/09/20260925091125671097.jpg",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n37", cat: "芯片厂商", source: "9to5Google", date: "2026-09-23",
      title: "微软 12 吋 Surface Pro 换装骁龙 X2 Plus：补上 5G，10 月 13 日开售",
      summary: "骁龙峰会期间微软官宣小尺寸 Surface 更新：12 吋 Surface Pro 与 13 吋 Surface Laptop 换装骁龙 X2 Plus，屏幕亮度提升 25%、电池效率提升 30%，Pro 首次提供 5G 版本，内存起步升至 16GB，10 月 13 日开售（1149 美元起）。",
      detail: "据 9to5Google 9 月 23 日报道，微软在骁龙峰会期间确认小尺寸 Surface 产品线更新，10 月 13 日上市。\nSurface Pro 12 吋：换装骁龙 X2 Plus，屏幕亮度提升 25%，电池「效率提升 30%」，并提供可选 5G 版本——微软称这是「呼声最高的新增项」；内存 16GB/24GB（砍掉 8GB 档），存储 256GB/512GB，起售价 1149 美元。\nSurface Laptop 13 吋：同样换装骁龙 X2 Plus、砍掉 8GB 内存档，起售价 1199 美元，除芯片升级与更亮屏幕外与上代基本一致。\n配套发布带触觉反馈、可自定义 Copilot 按键的新 Surface Mouse（79.99 美元）与 Ink Canvas 应用。\n端侧看点：骁龙 X2 Plus 补齐了 Windows on Arm 阵营的小尺寸 + 蜂窝联网形态——「Copilot+ PC + 常时在线」下探到更小机型，与 Googlebook（安卓端侧 AI 笔记本）形成端侧 AI 终端两条路线的对照。",
      tags: ["Surface Pro", "骁龙 X2 Plus", "Copilot+ PC", "Windows on Arm"],
      url: "https://9to5google.com/2026/09/23/microsoft-surface-pro-12-inch-5g-laptop-13-snapdragon-x2/",
      image: "https://9to5google.com/wp-content/uploads/sites/4/2026/09/surface-pro-laptop-x2-oct-refresh.jpg?quality=82&strip=all&resize=1200,628",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n38", cat: "AI硬件", source: "9to5Google", date: "2026-09-23",
      title: "高通发布 Snapdragon Sound Elite Gen 2：面向 AI「hearables」，连带摄像头的耳机都能驱动",
      summary: "高通在骁龙峰会发布面向音频可穿戴（hearables）的 Snapdragon Sound Elite Gen 2：端侧 AI 性能最高翻倍、功耗降低 40%，支持情境化图像识别——可驱动带摄像头的耳机、音频眼镜与未来多模态可穿戴，Wi-Fi 6E 支持端云双路 AI。",
      detail: "据 9to5Google 9 月 23 日报道，高通发布 Snapdragon Sound Elite Gen 2 SoC，专为音频可穿戴（hearables）打造——重点不再是纯音频性能，而是「音频芯片还能做什么」。\nAI 能力：端侧 AI 性能最高提升 2 倍、功耗最高降低 40%；支持情境化图像识别（contextual image recognition），为搭载摄像头的耳机类设备做好准备。\n连接与音频：Wi-Fi 6E 让 OEM 可在端侧/云端 AI 之间灵活取舍；保留 aptX 与 XPAN 连接提升音质与蓝牙范围，ANC 升级到第五代协议并借助 AI 增强。\n形态畅想：高通列举的可驱动形态包括传统耳机/头戴、开放耳 hybrid 声学设计、带摄像头设备、音频眼镜与未来多模态可穿戴；Android XR 设备被视为关键场景——Gemini 需要在本地运行并从真实环境采集信息。\n端侧看点：继 AI 眼镜之后，「AI 耳机 / hearables」正在成为端侧 AI 的下一个入口级品类——芯片先到位，等的是杀手级形态。",
      tags: ["Snapdragon Sound", "hearables", "AI耳机", "多模态可穿戴"],
      url: "https://9to5google.com/2026/09/23/qualcomm-announces-snapdragon-sound-elite-gen-2/",
      image: "https://9to5google.com/wp-content/uploads/sites/4/2026/09/snapdragon-Sound-elite-gen-2-2.jpg?quality=82&strip=all&resize=1200,628",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n32", cat: "AI硬件", source: "站长之家（AIbase）/ 新浪财经", date: "2026-09-24",
      title: "Meta Connect 开幕：智能体 Muse 全面接入 AI 眼镜，硬件矩阵齐发",
      summary: "Meta Connect 2026（当地时间 9·23）开幕：个人智能体 Muse 成为全场核心——接入智能眼镜、拥有自己的邮箱、Mac 端可操作电脑；同场发布无摄像头 Audio 眼镜（$349）、Gen 3（$449）、100g VR 眼镜与独立终端 Muse Charm，年底 AI 眼镜将超 100 款。",
      detail: "Meta Connect 2026 于当地时间 9 月 23 日开幕，站长之家（AIbase）9 月 24 日报道：个人智能体 Muse 贯穿全场，扎克伯格称要让数十亿人用上「超级智能」。\nMuse 生态：「Hey Muse」全面接入智能眼镜；Muse 拥有自己的邮箱（可直接替用户收发处理）；Mac 端 Muse App 可直接操作电脑——从语音助手升级为「全面智能体」。Muse 9 月 8 日推出后已登顶美区 App Store 与 Google Play 免费榜。\n硬件矩阵：Ray-Ban Meta Audio Glasses（无摄像头、43g、12 小时续航 + 充电盒 48 小时，$349）主打隐私形态；Ray-Ban Meta Gen 3（$449，12MP 摄像头、6 麦克风、通话降噪 90%、9 小时续航）；入门线 Meta Adventurer $249 起——2026 年底三大产品线合计将超 100 款 AI 眼镜。\n更远一步：Meta VR Glasses 重量仅 100g（约为 Quest 3 的 1/5），采用「眼镜 + 口袋计算单元」形态，2027 年春上市（$1299）；另公布电子宠物形态的独立 Muse 终端 Muse Charm（内置小屏 / 麦克风 / 扬声器，年底前推出）与眼镜听力增强能力。",
      tags: ["Meta Connect", "Muse", "AI眼镜", "智能体"],
      url: "https://www.chinaz.com/ainews/31346.shtml",
      image: "https://n.sinaimg.cn/spider20260924/155/w660h295/20260924/36e9-20c2ba611e35c3a2649f53d623dc854e.jpg",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n27", cat: "AI硬件", source: "腾讯新闻（AR圈）/ 搜狐科技", date: "2026-09-24",
      title: "第二代乐奇（Rokid）AI 眼镜数贸会首秀：更潮、更强、更舒适",
      summary: "Rokid 第二代乐奇 AI 眼镜 9 月 24 日在杭州数贸会全球首秀，现场体验的三个关键词：更潮、更强、更舒适——设计理念「不减配」：先定框形与佩戴，再让光学与重量去适配。",
      detail: "9 月 24 日，第二代乐奇（Rokid）AI 眼镜在第五届数贸会全球首秀，AR圈在现场体验后给出三个关键词：更潮、更强、更舒适。\n方法论看点是「不减配」：带显示的 AI 眼镜通常先定电子件再包一个壳，二代乐奇把顺序反过来——先定框形与佩戴，再让光学与重量适配，把 AI 眼镜「做回一副眼镜」。\n行业背景：Q2 全球智能眼镜出货同比 +35%（见本板块另一条），Meta Connect 同日发布多款新品——Rokid 代表的中国玩家与 Meta 在「下一代端侧 AI 入口」上正面竞速。",
      tags: ["Rokid", "乐奇二代", "AI眼镜", "数贸会"],
      url: "https://news.qq.com/rain/a/20260924A09SWC00",
      image: "https://inews.gtimg.com/om_ls/Onebi6GvNnxq_zXqA_k_IiUTTp1_N4uR8y_QVPZ6py5E0AA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n26", cat: "手机厂商", source: "腾讯新闻 / 新浪财经", date: "2026-09-23",
      title: "小米 18 Pro 系列正式发布：首发 2nm 骁龙8E6，5999 元起、发布即开售",
      summary: "小米 18 Pro 系列 9 月 23 日晚正式发布：首发 2nm 骁龙8E6（第六代骁龙8至尊版），5999 元起、发布即开售；透明特别版 9999 元起，雷军发文「惊艳亮相」。",
      detail: "小米 18 Pro 系列于 9 月 23 日晚正式发布，全球首发 2nm 制程的骁龙8E6（第六代骁龙8至尊版，8 Elite Gen 6）。\n定价与销售：起售价 5999 元，发布即开售；另推出透明特别版，起售价 9999 元——雷军发文称「惊艳亮相」，卢伟冰登台演讲。\n规格要点：骁龙8E6 此前跑分已显示安卓单核最高分，配合 LPDDR6 内存与澎湃 OS4；影像配双 2 亿像素与防窥屏。\n意义：这是 2nm 制程 + 面向智能体的 Hexagon NPU 首次到达消费者手中——高通本周在骁龙峰会上主讲的「端侧智能体时代」，发布当晚起即可被真实买到。",
      tags: ["小米 18 Pro", "骁龙8E6", "2nm", "发布即开售"],
      url: "https://news.qq.com/rain/a/20260923A0BVK600",
      image: "https://inews.gtimg.com/om_ls/OKuU0fqca7EVcsSxL7UByEwTtbeNlwlhfknP5NhmYcpacAA_640330/0",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n2", cat: "芯片厂商", source: "腾讯新闻 / Qualcomm", date: "2026-09-23",
      title: "高通正式发布第六代骁龙8双旗舰：2nm 制程，端侧可跑 300 亿参数模型",
      summary: "骁龙峰会正式发布 8 Elite Gen 6 双旗舰：2nm 制程、Oryon CPU 最高 5.11GHz，Hexagon NPU 面向智能体重构，端侧可运行 300 亿参数模型；小米 18 Pro 已于 9·23 晚首发登场（发布即开售）。",
      detail: "9 月 22–24 日骁龙峰会（毛伊岛）进行中，高通正式发布第六代骁龙8双旗舰处理器（8 Elite Gen 6 与更高档的 Extreme），官方口径「正式迈入端侧智能体 AI 新时代」。\n规格：2nm 制程；Oryon CPU 最高 5.11GHz；Hexagon NPU 新增 Element Accelerator（元素加速器）与更大共享内存，端侧可运行最高 300 亿参数模型；GPU 性能大幅提升，Extreme 档面向超旗舰机型。\n落地：小米 18 Pro 已于 9 月 23 日晚首发搭载骁龙8E6 登场、发布即开售（见本板块另一条）；泄露定价约 320 美元，后续首发机型年底前密集亮相。\n配合此前联发科天玑 9600 Pro（同样宣称 30B 端侧模型），「2nm + 端侧智能体」已成为本轮旗舰 SoC 的共同卖点。",
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
      id: "n21", cat: "行业动态", source: "央广网（腾讯新闻）/ 搜狐科技", date: "2026-09-24",
      title: "斑马智能发布全模态端侧大模型 AutoOmni 2.0-23B-A3B：座舱任务比肩 10 倍级云模型",
      summary: "云栖大会期间，斑马智能发布新一代全模态端侧大模型 AutoOmni 2.0-23B-A3B（MoE 架构）：智能座舱普通任务处理能力堪比 10 倍参数量级的云模型；AutoClaw 2.0 智舱协作实车方案同步亮相。",
      detail: "央广网 9 月 24 日报道：9 月 23 日云栖大会期间，斑马智能正式发布新一代全模态端侧大模型 AutoOmni 2.0-23B-A3B，AutoClaw 2.0 智舱协作服务实车方案同步亮相。\n技术要点：模型采用 MoE 混合专家架构（命名中的 A3B 即激活参数约 3B 量级的稀疏架构），官方称在智能座舱场景下普通任务处理能力堪比 10 倍参数量级的云模型，复杂任务端云协同处理。\n行业语境：车载是端侧大模型落地最快的场景之一（车规算力 + 私密性强 + 交互高频）；同期云栖大会 AI 新品密集发布，端侧算力被业内评价为「全面爆发」。",
      tags: ["云栖大会", "AutoOmni 2.0", "智能座舱", "MoE"],
      url: "https://news.qq.com/rain/a/20260924A07A9800",
      image: "https://inews.gtimg.com/om_ls/OgUErLUkrqPgOv1hN-ljbN8wvZoECL9qAdZsuHRFHioAYAA_640330/0",
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
      id: "n29", cat: "芯片厂商", source: "腾讯新闻（手机中国）", date: "2026-09-22",
      title: "高通携手谷歌推出首批 Googlebook：骁龙 X Elite 赋能 Gemini Intelligence 笔记本",
      summary: "高通宣布与谷歌合作，将骁龙 X Elite 平台引入首批 Googlebook 笔记本——谷歌今年 5 月推出的高端安卓本品类、定位高于 Chromebook，内置 Gemini Intelligence 主动提供个性化帮助；戴尔、惠普率先开售，联想在首批名单之列。",
      detail: "据腾讯新闻 9 月 22 日报道，高通技术公司宣布与谷歌展开合作，将骁龙 X Elite 平台引入首批 Googlebook 笔记本电脑。\nGooglebook 是谷歌今年 5 月正式推出的全新旗舰级笔记本品类：运行安卓系统、定位高于 Chromebook，类似「安卓版的 MacBook」；产品内置 Gemini Intelligence，可为用户主动提供个性化帮助——这是「系统级端侧 AI」在笔记本上的落地。\n首批机型：戴尔、惠普的骁龙 X Elite 版 Googlebook 率先开售，联想也在首批名单中（首批均定位 1200 美元档高端市场）；另据 Digital Trends，后续低价款 Googlebook 拟采用老款骁龙平台，把价位下探至约 700 美元。\n官方动作同步：高通官方博客同日发布《Qualcomm × Cartesia 联手为骁龙 X 系列的 Googlebook 带来语音 AI》。\n背景：谷歌本周还宣布了联发科 CX C10 Max 驱动 Googlebook 的合作路线（见本板块另一条）——Googlebook 作为「端侧 AI 笔记本」新品类，已形成高通 / 联发科双平台竞逐的格局。",
      tags: ["Googlebook", "骁龙 X Elite", "Gemini Intelligence", "高通×谷歌"],
      url: "https://news.qq.com/rain/a/20260922A03CRB00",
      image: "https://inews.gtimg.com/om_ls/Op9IiQxeF066H1lYzfYWV9vB-FmpNs0cl8PhSiZL_WxH4AA_640330/0",
      imageCap: "配图来自原文页面",
      highlight: true
    },
    {
      id: "n33", cat: "AI硬件", source: "新浪财经 / 富途资讯", date: "2026-09-22",
      title: "阿里千问 AI 眼镜 N1 系列亮相云栖：眼动追踪 + 虹膜支付，10 月 13 日开售",
      summary: "云栖大会期间，阿里推出新一代千问 AI 眼镜 N1 系列，支持眼动追踪与虹膜支付，10 月 13 日开售——大模型厂商做 AI 硬件再下一城。",
      detail: "9 月 22 日消息：阿里在云栖大会期间推出新一代千问 AI 眼镜 N1 系列，10 月 13 日开售。\n差异化能力集中在「眼睛」：眼动追踪交互与虹膜支付——把生物识别与交互都收进眼镜形态，配合千问端侧模型的多模态理解能力。\n放在本周语境里：千问 AI 眼镜 + 此前曝出的千问平板与千元级千问办公硬件——「千问」正从模型品牌变成一条完整的 AI 硬件产品线，与豆包做手机形成大模型厂商硬件化的两条代表路线。",
      tags: ["千问AI眼镜", "N1 系列", "眼动追踪", "虹膜支付"],
      url: "https://finance.sina.com.cn/tech/roll/2026-09-22/doc-inisspzf8887020.shtml",
      image: "https://n.sinaimg.cn/spider20260922/200/w600h400/20260922/1460-c181d25bcbc3c4ba6b6012d0510fc11a.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n40", cat: "AI硬件", source: "IT之家（腾讯新闻）/ 时代周报（新浪财经）", date: "2026-09-22",
      title: "阿里云栖首秀「原生智能体电脑」QwenBook：千问平板形态，打通 WPS、适配高通/英特尔",
      summary: "晚点独家披露 + 云栖现场真机首秀：阿里云无影团队自研 QwenBook——「你的第一台原生智能体电脑」，平板+键盘形态、类 macOS 界面、键盘带千问专属键、摄像头模组内藏圆形小屏；打通 WPS 与支付宝/千问输入法，已适配高通、英特尔、罗技、绿联，正式发布预计年底或明年初。",
      detail: "9 月 22 日，据《晚点 LatePost》独家报道，阿里云旗下无影团队正在研发名为 QwenBook 的 AI 设备，定位「原生智能体电脑」，产品形态更接近一台「千问平板」；IT之家当天即在 2026 云栖大会现场看到了演示真机。\n形态与交互：平板 + 键盘触摸板组合（类似笔记本），系统界面类似 macOS——App 底栏、窗口位置随意可调、随时唤醒千问对话，应用中心含钉钉、阿里云盘；键盘可在 Windows/macOS 双布局间切换并搭载专门的千问按键；A 面硕大的黑色摄像头模组另有玄机——双摄只占一半面积，另一半是一块可显示卡通形象的圆形小屏。\n生态：与金山深度合作打通 WPS（开发中）；时代周报现场消息称，QwenBook 配备 Skill 键盘阵列、全局 AI 按键、语音手写笔等交互入口，面向 7x24 小时执行重度任务，并与开源项目 Omarchy 合作探索面向 Agent 的新一代桌面 OS；已与高通、英特尔、罗技、绿联完成适配，打通支付宝、千问输入法；接入 Qwen3.8-Max / Qwen3.8-Flash 双模型。\n定位与节奏：产品仍处试水阶段，本次展示为演示版本，正式发售预计今年底或明年初；该设备也在骁龙峰会上现身。此前 9 月 21 日搜狐独家曝料的「千问办公 AI 硬件」（见本板块另一条）由此落定首个具体形态——与豆包做手机的「整机路线」不同，阿里选择从「办公平板 + 智能体 OS」切入 AI 终端。（本条线索最早来自小红书用户帖，经晚点/IT之家/时代周报核实收录。）",
      tags: ["QwenBook", "千问平板", "原生智能体电脑", "阿里云"],
      url: "https://news.qq.com/rain/a/20260922A05VOJ00",
      image: "https://inews.gtimg.com/om_ls/O-Av19C3FfX8lkOEEmvGNLm9SzzdUNSs9rOs6ty2bK0H8AA_640330/0",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n11", cat: "大模型厂商", source: "36氪 / TechCrunch", date: "2026-09-24",
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
      detail: "东吴证券 9 月 21 日报告指出：系统级 Agent 进入加速期。\n落地节奏：豆包手机助手消费者版随努比亚 NaviX Ultra 实现量产（本周期内开售）；荣耀、vivo、OPPO 的系统级智能体密集布局，成为下半年最确定的产业主线。\n技术路线：执行框架 Harness 开始系统级商用；GUI（直接操作图形界面）与 A2A（智能体间通信）两条路线并行演进。\n学术侧本周亦有呼应：MCP 式工具调用在单板机上的可靠性基准（论文板块 p10）、车载 SLM 函数调用（p9）指向同一问题——让小模型在端侧可靠地「动手」。",
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
      id: "n30", cat: "行业动态", source: "新浪财经", date: "2026-09-23",
      title: "苹果新款 Mac 发货：主打端侧 AI，帮用户省下 token 费",
      summary: "苹果宣布 M5 系列新款 Mac mini / Mac Studio 开始发货（4499 / 19999 元起），营销主线转向「端侧 AI」：神经网络引擎算力大幅提升、本地直接跑主流大模型，省下云端按 token 计费的开支。",
      detail: "9 月 23 日（周三），苹果宣布搭载 M5 系列芯片的新款 Mac mini 与 Mac Studio 开始发货，起售价分别为 4499 元与 19999 元。\n与以往的性能叙事不同，本轮营销主线是「端侧 AI 算力」：苹果强调新款 Mac 的神经网络引擎算力大幅提升，可在本地直接运行主流大模型，帮用户省下云端推理按 token 计费的开支，并主打本地运行的安全与隐私优势。\n背景：在智能体开发与私有部署需求带动下，「本地 AI 主机」成为新战场——英伟达 DGX Spark、小米 AI Cube（8 月底发布）与新款 Mac 台式机正面竞争，端侧算力形态正从手机 / PC 延伸到桌面。",
      tags: ["苹果 Mac", "M5", "端侧AI", "本地大模型"],
      url: "https://finance.sina.com.cn/roll/2026-09-23/doc-inistvut5489395.shtml",
      image: "https://n.sinaimg.cn/spider20260923/54/w578h276/20260923/704d-66796a662bd6b5a37a13b74a669a6401.png",
      imageCap: "配图来自原文页面"
    },
    {
      id: "n4", cat: "手机厂商", source: "搜狐科技 / 腾讯新闻", date: "2026-09-23",
      title: "小米 18 Fold 首销激活近 8 万台：MiMo 端侧模型机型通过市场验证",
      summary: "小米 18 Fold 首销激活量近 8 万台、同比暴增 300%——这款首款搭载 MiMo 端侧模型与自研玄戒 O3 的万元级折叠旗舰，拿到了「端侧 AI + 自研芯片」的市场正反馈。",
      detail: "9 月 23 日消息：小米 18 Fold 首销激活近 8 万台，同比暴增 300%；该机 9 月 12 日开售当日即约 3.6 万台，小米许斐称首销较上代大折叠增长超三倍。\n产品底色：小米首款「中折叠」旗舰（7.58 吋内屏、219g），起售价 10999 元、小米首款万元机；核心是自研三件套——玄戒 O3 旗舰 SoC、澎湃 OS4 与 MiMo 端侧大模型（首款搭载机型），配合 LPDDR6 高带宽内存，端侧模型内存与带宽占用直降约 30%、精度几乎无损。\n意义：端侧模型手机不再只是发布会概念——首款 MiMo 机型在万元档拿下首销激活 +300%，说明「端侧 AI + 自研芯片」正在成为高端机的真实购买理由。",
      tags: ["小米 18 Fold", "MiMo 端侧模型", "玄戒 O3", "首销激活"],
      url: "https://www.sohu.com/a/1080077450_120073936",
      image: "https://q0.itc.cn/images01/20260923/775d114521c248e1baffe87bef1bb6fd.png",
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
      detail: "研究背景：大型音频语言模型（LALM）的成功推动了数十亿参数的多模态网络，但隐私保护与低时延处理的需求，把焦点转向能在端侧运行的小音频语言模型（SALM）。\n方法与结果：提出面向边缘计算的 SALM 家族 Samsone——核心模型 Samsone-134M 在多个基准上刷新同规模 SOTA；并引入 99M 与 356M 两个尺寸，探索 SALM 的缩放规律。尽管体量紧凑，Samsone 家族的性能可与大一到两个数量级的模型竞争。\n开源配套：全部基于公开数据训练，发布训练代码、模型权重、移动优化 checkpoint，并提供开源安卓应用演示 Samsone 的实时端侧推理。\n与本站资讯板块的呼应：高通本周发布面向 AI hearables 的 Sound Elite Gen 2（端侧 AI 性能翻倍）——端侧音频智能的芯片侧与模型侧正在同步成熟，「语音入口端侧化」是下一阶段值得盯的主线。",
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

  /* ---------------- 板块三：知识分享 ----------------
   * resources 按 group 分区显示: 厂商官方博客 / 个人博客 / 中文媒体 · 公众号
   * intro=点击卡片弹出的简介(段落以 \n 分隔)
   */
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
        intro: "国内更新最快的消费科技资讯站之一（微信公众号同名），手机厂商的端侧 AI 功能上线、系统更新（ColorOS/原系统/MagicOS 的 AI 特性）、新机曝光与发布第一手快讯多源于此。\n看点：更新频率极高、带官方配图；适合作为 RSS 订阅源做每日扫描（本站 fetch_news.py 已收录其 RSS）。\n适合谁：关注「端侧 AI 功能今天上了什么新」的产品与运营同学。" }
    ]
  }
};
