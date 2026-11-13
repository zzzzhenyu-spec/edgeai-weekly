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
    issue: "2026 · 第 47 期",
    weekRange: "2026.11.07 — 2026.11.13 · 近 7 天",
    updated: "2026-11-13",
    status: "rolling",
    editorsNote: "近 7 天聚焦：格局震动与政策供给同周落地——英伟达黄仁勋辞任 CEO（Colette Kress 临时接任，机器人端侧 Jetson Thor 与 AI PC 端侧 RTX Spark 双线前景生变），北京发布具身智能三年行动方案（20 万台年产能+5 万 P 专项算力，「本地化轻量部署」与 RISC-V 智算芯片写入攻关清单）。AI 眼镜进入商业落地密度期：三星 Intelligent Eyewear 395 美元开启预售（12 月 10 日韩美上市）、苹果供应链首证 AI 眼镜与摄像头 AirPods 双项目、京东酷派把百元档打进场。端侧基座竞赛白热化：文心 5.5 Flash（2800 亿 MoE）预告 11 月 25 日开源、面壁 35B 跑进手机、麒麟 9050 端侧 30B、Qwen4 预览上线、曦选创智 5 亿天使轮对标 Thor；联发科×英伟达 RTX Spark 以最高 128GB 统一内存重定义 AI PC，Tether 开源 0.8B 端侧智能体模型 QVAC BotPsy。\n今日新增：北京具身智能三年行动方案、英伟达 CEO 交接、Gemini 4 Hydrogen、三星 AI 眼镜预售、联发科 RTX Spark 超级芯片、Tether QVAC BotPsy 开源、苹果 AI 眼镜供应链首证（快克智能）。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
news: [
{
id: "n243", cat: "行业关注事件", source: "北京市经信局", date: "2026-11-13",
      title: "北京发布具身智能机器人三年行动方案：2028 年 20 万台年产能、5 万 P 专项算力，「本地化轻量部署」与 RISC-V 智算芯片写入攻关清单",
      summary: "《北京市具身智能机器人产业高质量发展行动方案（2026—2028 年）》正式公开（11 月 11 日印发、13 日经信局官网发布，共六大工程十九条）。目标到 2028 年培育不少于 5 家国际一流、10 家国内领先的人形机器人整机企业，在京形成 20 万台/年整机生产能力（京津冀整机产能占全国 25%），新增总规模超 50000PFlops 具身智能专用算力集群，并在 100 个真实场景采集超 100 万小时高质量数据。",
      detail: "政策：《行动方案》11 月 11 日印发、11 月 12 日起媒体披露、11 月 13 日经信局官网发布，有效期至 2028 年 12 月 31 日。\n目标：国际一流人形整机企业不少于 5 家、国内领先 10 家；京津冀整机产能占全国 25%、关键零部件配套率超 60%。\n产能与算力：在京形成 20 万台/年整机生产能力；新增超 50000PFlops 专用算力集群；不少于 100 个真实场景采集超 100 万小时数据；整机额定负载达自重 40% 以上、平均无故障工作时间超 2000 小时。\n技术路线：支持 VLA（视觉语言动作）、世界模型、强化学习多路线融合；攻关长时记忆、「本地化轻量部署」与模型可解释性；基于 RISC-V 的系统级智算芯片与超低功耗智算芯片列入「应布局尽布局」清单。\n配套：紧缺人才进京落户、子女教育、住房、就医支持；具身智能机器人「一机一码」全生命周期管理体系。\n端侧视角：「本地化轻量部署」与 RISC-V 智算芯片首次被省级行动方案点名——机器人本体侧的模型轻量化、本地推理与自主芯片被同时纳入政策供给，与本周曦选创智（对标英伟达 Thor 的国产具身芯片）落子同一方向，北京把「大脑模型+端侧芯片」整条链路写进了三年施工图。",
      tags: ["北京", "具身智能", "行动方案", "20万台", "本地化部署"],
      url: "https://jxj.beijing.gov.cn/jxdt/zwyw/202611/t20261113_4944755.html",
      image: "images/news/n243.jpg",
      imageCap: "人形机器人运动会拳击赛现场（图源：北京市经信局官网）",
      highlight: false
    },

{
id: "n248", cat: "大模型厂商", source: "Google 官方博客", date: "2026-11-12",
      title: "谷歌发布 Gemini 4 Hydrogen：主打智能体快速执行的高效率档，多项基准反超自家旗舰 Argon",
      summary: "谷歌 11 月 12 日发布 Gemini 4 家族新成员 Hydrogen——定位「日常驱动」的高效率执行型模型，专注日常编码与智能体工作流，与负责深度长程推理的 Carbon/Argon 形成分层。Artificial Analysis 智能指数 high 档 51 分反超 Argon（50 分），xhigh 档达 54 分；Terminal-Bench 4.1 达 57%（上代 3.8 Flash 为 18.2%）且任务速度快 2.5 倍；支持 100 万 token 输入与最多 100 万 token 输出，全上下文统一价每百万输入 1.50 美元、输出 7.50 美元。",
      detail: "发布：11 月 12 日官方博客；AI Studio、Gemini API、Google Search 全球、Sheets 与 Antigravity 同步可用。\n定位：Gemini 4 家族分层——Carbon、Argon 负责深度长程推理，Hydrogen 主打「快速执行」日常档；四档思考模式（low/medium/high/新增 xhigh）。\n基准：AAI 智能指数 high 档 51 分（Argon 为 50）、xhigh 档 54 分；Terminal-Bench 4.1 达 57%（3.8 Flash 为 18.2%）、任务速度快 2.5 倍；HLE-Diamond 58.8%；Agents' Last Exam 71.6%。\n安全：智能体任务越权行为减少最多 81%，幻觉声明减少 5 倍以上，思维链可读性保留 99.9%。\n定价：100 万 token 上下文统一价——每百万输入 1.50 美元、每百万输出 7.50 美元。\n端侧视角：Hydrogen 是云端执行档，官方未发布端侧版本——谷歌把「深度推理」与「快速执行」拆成两条云端产品线，端侧 Nano 档仍未登场；对端云协同应用而言，1.50/7.50 美元的百万 token 定价为「云端腿」成本再定锚，Antigravity 智能体入口是它的主战场。",
      tags: ["谷歌", "Gemini 4", "Hydrogen", "智能体", "模型分层"],
      url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/",
      image: "images/news/n248.jpg",
      imageCap: "Gemini 4 Hydrogen 发布（图源：Google 官方博客）",
      highlight: false
    },

{
id: "n244", cat: "AI硬件", source: "三星官方新闻室", date: "2026-11-12",
      title: "三星首款 AI 眼镜 Intelligent Eyewear 开启预售：395 美元起、41 克无屏设计，12 月 10 日韩美上市",
      summary: "三星官方宣布首款 AI 眼镜 Intelligent Eyewear 于 11 月 12 日开启预售——395 美元起、整机 41 克的无屏音频设计，搭载骁龙 AR1 Gen1 芯片与 Android XR 系统、接入 Gemini 助手，12 月 10 日在韩国与美国正式上市；镜框由 Gentle Monster 与 Warby Parker 参与设计，共 30 款型号组合，带显示屏的 Ultra 版后续推出。",
      detail: "预售：11 月 12 日开启，395 美元起（三星官方新闻室宣布 12 月发布安排）。\n设计：41 克无屏音频眼镜；Gentle Monster、Warby Parker 参与镜框设计，30 款型号组合。\n规格：骁龙 AR1 Gen1 芯片；Android XR 系统；Gemini 语音交互+摄像头视觉输入；支持实时翻译、导航与消息摘要。\n上市：12 月 10 日韩国、美国首发；中国市场暂不在首批；带屏 Ultra 版后续推出。\n端侧视角：Android XR 阵营首款消费级眼镜进入「定价-预售-上市」通道——395 美元卡位在 Meta Glasses（299 美元）与带屏高端眼镜之间，41 克是「全天佩戴」的门槛参数；无屏+语音+摄像头的形态把端侧算力需求压缩到 AR1 级别，是谷歌生态对 Meta 轻量路线的正面应答，也是 Gemini 向眼镜端侧下沉的第一块大规模阵地。",
      tags: ["三星", "Intelligent Eyewear", "Android XR", "AI眼镜", "Gemini"],
      url: "https://news.samsung.com/global/samsung-announces-december-release-for-intelligent-eyewear-bringing-a-smarter-way-to-see-the-world",
      image: "images/news/n244.jpg",
      imageCap: "三星 Intelligent Eyewear（图源：三星官方新闻室）",
      highlight: false
    },

{
id: "n242", cat: "行业关注事件", source: "英伟达官方/智东西", date: "2026-11-12",
      title: "黄仁勋辞任英伟达 CEO：CFO Colette Kress 出任临时 CEO，3.8 万亿美元巨头突发掌门人交接",
      summary: "英伟达 11 月 12 日官方宣布 CEO 交接——黄仁勋辞去总裁、CEO 及董事会成员职务，立即生效；CFO 兼执行副总裁 Colette Kress 出任临时 CEO，公司同时寻找正式继任者。此前 11 月 10 日英伟达独立董事会成员先行发布声明，多家媒体报道指交接与个人行为争议有关（指控口径）；消息当日英伟达股价跌超 6%，AI 产业链集体波动。",
      detail: "公告：11 月 12 日官方新闻稿宣布 CEO Transition；11 月 10 日独立董事会成员声明在前。\n人事：黄仁勋卸任总裁/CEO/董事（立即生效）；Colette Kress（原 CFO 兼执行副总裁）任临时 CEO；正式继任者遴选中。\n背景：TechCrunch 等报道指与个人行为争议有关（媒体报道的指控口径，未经司法认定）。\n市场：消息当日英伟达跌超 6%、AMD 大涨；英伟达与 Anthropic 的百亿美元投资关联在后者上市前夕受到市场审视。\n端侧视角：英伟达是机器人端侧（Jetson Thor）与 AI PC 端侧（RTX Spark，见联发科合作条目）两条端侧供给线的核心——掌舵人突发离任给 Rubin/Thor 产品节奏及车企、机器人厂商的合作确定性蒙上阴影；恰逢曦选创智「对标 Thor」的国产具身芯片完成融资，端侧算力格局的变量在一夜之间放大。",
      tags: ["英伟达", "黄仁勋", "CEO交接", "Colette Kress", "行业震动"],
      url: "https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition",
      image: "images/news/n242.jpg",
      imageCap: "英伟达 CEO 交接公告（图源：英伟达官方新闻室）",
      highlight: true
    },

{
id: "n239", cat: "行业关注事件", source: "凤凰网", date: "2026-11-12",
      title: "百度世界 2026：李彦宏首提「智能组织」——AI 下一幕，文心闪电深度思考+文心一镜微表情双模型发布",
      summary: "百度世界 2026 在北京开幕，李彦宏年度演讲首提「智能组织」——「如果说人工智能是新电能，智能组织就是 AI 时代的新厂房」，并给出组织进化三原则（打破岗位边界、沉淀隐性知识、设计流程闭环）；披露百度内部日活跃智能体数一年内增至 3.7 万个（涨 6 倍多）。大会同步发布两款文心应用模型：文心闪电深度思考模型（推理成本降 30%）与文心一镜微表情大模型（视频生成 1:1 实时），已上线千帆平台开放 API，李彦宏称将坚持「模体并行」策略。",
      detail: "大会：11 月 12 日北京国家会议中心二期，第二十一届，1 主论坛+12 分论坛+30 余项活动。\n主题：智能组织（Intelligent Organizations）——AI 下一幕；组织进化三原则：打破岗位边界/沉淀隐性知识/设计流程闭环；「岗位不会消失但会收敛为两类」。\n数据：百度内部日活智能体 3.7 万个，一年增 6 倍多。\n发布：文心闪电（深度思考，推理成本降 30%）+文心一镜（微表情大模型，1:1 实时视频生成）——千帆平台 API 同步开放。\n策略：模体并行（模型与智能体并行）；会前组织调整为「基础设施+智能体」两层阵型。\n端侧视角：一镜的 1:1 实时生成与微表情能力指向数字人交互的实时层——微表情正是情感带宽的关键载体，与 Boson Higgs 数字人输出同周出现；3.7 万日活智能体是迄今最硬的企业智能体渗透率公开数据，为智能组织叙事提供锚点。",
      tags: ["百度世界", "智能组织", "文心闪电", "文心一镜", "李彦宏"],
      url: "https://i.ifeng.com/c/8xzM4d8Y2gq",
      image: "images/news/n239.jpg",
      imageCap: "百度世界 2026 李彦宏演讲（图源：红星新闻）",
      highlight: true
    },

{
id: "n236", cat: "芯片厂商", source: "同花顺财经", date: "2026-11-12",
      title: "优必选×沐曦合资芯片公司曦选创智完成 5 亿元天使轮：估值 40 亿元，首颗芯片对标英伟达 Thor、2028 年量产",
      summary: "由优必选与沐曦股份联合发起（锋龙股份参投）的具身智能端侧芯片公司曦选创智宣布完成 5 亿元人民币天使轮融资，投后估值 40 亿元——纪源资本与经纬创投联合领投，和利资本、鼎晖等跟投。首颗自研芯片直接对标英伟达 Thor（车规级/机器人端侧芯片），资金用于核心芯片研发与软件工具链建设，机器人芯片预计 2028 年量产。",
      detail: "融资：11 月 12 日官宣，5 亿元天使轮、投后估值 40 亿元；GGV 纪源资本+经纬创投联合领投。\n股东：优必选（本体厂）×沐曦股份（国产 GPU 底座）×锋龙股份——机器人×算力×制造的合资结构。\n目标：首颗自研芯片对标英伟达 Thor；机器人端侧+车规级场景；2028 年量产。\n端侧视角：人形机器人厂商亲自下场造芯是本周具身智能的第三条主线（前两条：智元模型三连发、苹果 HALO）——机器人大脑芯片此前被英伟达 Thor 垄断叙事，国产「本体厂×GPU 厂」合资把需求方与供给方绑在同一张桌上，40 亿估值对应的是 Thor 替代窗口期的卡位价值。",
      tags: ["优必选", "沐曦", "曦选创智", "机器人芯片", "对标Thor"],
      url: "http://news.10jqka.com.cn/20261112/c681759273.shtml",
      image: "images/news/n236.jpg",
      imageCap: "国产 GPU 底座×机器人场景生态（图源：搜狐财经）",
      highlight: false
    },

{
id: "n246", cat: "端侧Agent", source: "钜亨网/BlockBeats", date: "2026-11-11",
      title: "Tether 开源 0.8B 端侧智能体模型 QVAC BotPsy：基于 Qwen3.5 架构、手机本地运行，工具调用胜 2.5B 级",
      summary: "稳定币巨头 Tether 的 AI 研究部门发布开放权重模型 QVAC BotPsy——8 亿参数、基于 Qwen3.5-0.8B 架构训练，Apache 2.0 许可开源，专为手机、电脑等个人设备本地运行设计；官方称其工具调用能力超过 2.5B 级模型，定位设备端 AI 智能体底座。",
      detail: "发布：11 月 11 日（Tether AI Research，多家媒体跟进报道）。\n规格：8 亿参数；基于 Qwen3.5-0.8B 架构训练；Apache 2.0 开放权重。\n能力：设备端工具调用，无需云端；官方基准称超越 2.5B 级模型的工具调用表现。\n战略：QVAC（Quantum Versatile Compute）体系的端侧落子——今年 4 月 Tether 已开源 QVAC SDK 跨设备智能体框架，BotPsy 补上模型层。\n端侧视角：非 AI 巨头跨界端侧模型的又一样本——0.8B+Apache 2.0 把「手机本地智能体」的门槛拉到极低，与 DeepSeek Harness 插件体系同指「端侧智能体底座开源化」赛道；「大厂出基座、跨界玩家做微调与应用」的分工正在成形，QVAC 全家桶（SDK+模型）是目前最完整的一套非巨头开源方案。",
      tags: ["Tether", "QVAC BotPsy", "0.8B", "开源", "端侧智能体"],
      url: "https://m.cnyes.com/news/id/6659587",
      image: "images/news/n246.jpg",
      imageCap: "QVAC 手机端智能体界面（图源：Tether/Wired）",
      highlight: false
    },

{
id: "n245", cat: "芯片厂商", source: "新浪科技", date: "2026-11-11",
      title: "联发科×英伟达 RTX Spark 超级芯片登陆 Windows 11 PC：Blackwell GPU+Grace CPU，最高 128GB 统一内存本地跑智能体",
      summary: "联发科与英伟达联合打造的 RTX Spark 超级芯片正式登陆 Windows 11 PC——整合英伟达 Blackwell RTX GPU 与 Grace CPU，联发科设计专有内存控制器与一致性系统互连，最高支持 128GB 统一内存；首批整机覆盖华硕、戴尔、惠普、联想、微软、微星六大品牌，2026 年秋季大规模上市，主打本地 AI 智能体常驻运行——让 AI PC 从「能跑模型」迈向「能替人干活」。",
      detail: "芯片：Blackwell RTX GPU+Grace CPU 超级芯片；联发科设计专有内存控制器与一致性系统互连架构。\n内存：24GB—128GB 统一内存配置可选，直击本地大模型的显存瓶颈。\n整机：华硕、戴尔、惠普、联想、微软、微星六大品牌首批；2026 年秋季大规模上市。\n定位：本地 AI 智能体（AI Agent）常驻运行，Windows 11 原生支持。\n端侧视角：128GB 统一内存把「本地常驻智能体」的内存天花板抬到桌面级——联发科（手机 SoC 大厂）×英伟达（AI 计算霸主）的组合拳，把 AI PC 竞争从 NPU 算力参数战升级为「统一内存+智能体生态」战，对高通骁龙 X 阵营形成正面压力；英伟达 CEO 交接同周落地，供应链绑定反而成了双方确定性的锚。",
      tags: ["联发科", "英伟达", "RTX Spark", "AI PC", "统一内存"],
      url: "https://finance.sina.com.cn/tech/roll/2026-11-12/doc-iniymsip3963100.shtml",
      image: "images/news/n245.jpg",
      imageCap: "RTX Spark AI PC 芯片平台（图源：英伟达官网）",
      highlight: false
    },

{
id: "n240", cat: "大模型厂商", source: "凤凰科技", date: "2026-11-11",
      title: "文心 5.5 Flash Preview 发布：总参 2800 亿 MoE 激活仅 140 亿、100 万 token 上下文，官宣 11 月 25 日开源",
      summary: "百度发布文心 5.5 Flash Preview——总参数量 2800 亿的 MoE 架构（每 token 仅激活 140 亿参数），33.5 万亿 token 从零预训练、支持 100 万 token 推理上下文，在复杂编程、知识工作、3D 建模、视频创作四大能力上对标旗舰级表现；API 已上线千帆平台，官宣 11 月 25 日面向全球开源社区发布权重。",
      detail: "发布：11 月 11 日（凤凰科技/网易/搜狐多源）。\n规模：总参数量 2800 亿 MoE、激活 140 亿——Flash 系迄今最大；33.5 万亿 token 从零预训练；100 万 token 推理上下文。\n能力：复杂编程/知识工作/3D 建模/视频创作四线对标旗舰，保持极致解码速度。\n开源：API 已上线千帆；权重 11 月 25 日面向全球开源社区发布。\n端侧视角：2800 亿总参+140 亿激活的稀疏比（1/20）与面壁 35B-A3B（约 1/12）、麒麟 9050 端侧 30B 同属「大总参小激活」路线——14B 激活已在旗舰手机可承载区间边缘，11-25 开源日若放出量化端侧档或蒸馏小尺寸版，将直接加入 11 月端侧基座竞赛。",
      tags: ["百度", "文心5.5", "2800亿", "开源", "Flash"],
      url: "https://tech.ifeng.com/c/8xxwDIS2DX4",
      image: "images/news/n240.jpg",
      imageCap: "文心 5.5 Flash Preview 发布（图源：智东西）",
      highlight: false
    },

{
id: "n235", cat: "大模型厂商", source: "智东西", date: "2026-11-11",
      title: "北大系创企开源 aiXcompact-4B 上下文压缩模型：编程 Agent 推理成本降 78%、API 费用降 97%，单卡 A100 可私有部署",
      summary: "孵化自北大软件工程研究所的硅心科技（aiXcoder）开源上下文压缩专用模型 aiXcompact-4B——面向编程 Agent 长程任务：对历史轨迹做结构化处理（保留关键信息/精简工具返回/删除冗余+生成任务摘要），历史上下文平均压缩至原长度的 25.89%；接入 OpenCode 后 Terminal-Bench 准确率与 DeepSeek-V4-Pro 持平，单次 GPU 推理成本降 78%、单次 API 压缩请求约 0.019 元（较主流旗舰降约 97%）。",
      detail: "开源：11 月 11 日（GitHub 开放权重）。\n背景：SWE-bench Verified 实测单个编程 Agent 任务平均消耗约 417 万 token（单轮推理的 3500 倍），输入 token 占绝大部分——上下文压缩是 Agent 成本控制关键。\n方法：结构化判别三类决策（保留核心需求与决策/精简文件读取与测试输出/删除失效记录）+结构化任务摘要；教师模型蒸馏+4B 学生 LoRA 微调，真实研发轨迹训练。\n成绩：压缩评测综合分 0.7012 接近 DeepSeek-V4-Pro 的 0.7332；平均保留率 25.89%；单张 A100-40GB 私有部署。\n端侧视角：上下文压缩是长程 Agent 的「内存管理器」——4B 专用小模型接管高频压缩、大模型专注决策，大小模型分工把 Agent 运行成本砍掉一个数量级；专用小模型家族（aiXapply-4B/aiXpruner-4B）正是端侧化思路在云端 Agent 内部的复刻。",
      tags: ["上下文压缩", "编程Agent", "aiXcoder", "开源", "成本优化"],
      url: "https://zhidx.com/p/609168.html",
      image: "images/news/n235.png",
      imageCap: "aiXcompact-4B 成本对比（图源：智东西）",
      highlight: false
    },

{
id: "n234", cat: "端侧Agent", source: "36氪", date: "2026-11-11",
      title: "AI 巨头桌面端开战：Claude 推 Whiteboards 等 AI 办公全家桶直挑微软，谷歌同日上线 Gemini 新旗舰+复刻 OpenCode 桌面应用",
      summary: "Anthropic 端出 Claude AI 办公全家桶——Claude Whiteboards 数字白板可在会议中与团队共同头脑风暴、把想法转化为带时间线/责任人/日期的看板，直接挑战微软 Office，消息当日微软股价大跌；同日谷歌 Gemini 新旗舰全面上线，并「一夜复刻」类 OpenCode 桌面应用（Google AI Ultra 订阅用户可在 Antigravity、Gemini 应用与搜索 AI 模式使用）。AI 御三家的竞争焦点正式从模型层转向桌面端产品。",
      detail: "Anthropic：Claude Whiteboards（白板→看板：时间线/责任人/日期）等办公全家桶，直击 Office 核心场景；当日微软股价应声下跌。\n谷歌：Gemini 新旗舰全面上线+类 OpenCode 桌面应用，Ultra 订阅三入口（Antigravity/Gemini 应用/搜索 AI 模式）。\n格局：OpenAI（Codex）×谷歌（补课）×Anthropic（狂飙）桌面端正式开打，国内模型专注编码与一站式追赶。\n端侧视角：桌面是端侧 Agent 的主战场——白板/表格/看板类办公工件全部在本地生成与协作，巨头把模型能力包装成桌面生产力套件的路线收敛；与千问办公 2.0 的 Team Agent 同属 Agent 产品化浪潮的不同切片。",
      tags: ["Claude", "AI办公", "桌面Agent", "谷歌", "Whiteboards"],
      url: "https://m.36kr.com/p/4064780118463617",
      image: "images/news/n234.jpg",
      imageCap: "Claude Whiteboards/Sheets/Data 发布（图源：36氪）",
      highlight: false
    },

{
id: "n233", cat: "大模型厂商", source: "每日经济新闻", date: "2026-11-11",
      title: "面壁智能 35B 模型跑进手机：MiniCPM-V 4.7 35B-A3B 以 3GB 内存实现端侧多模态，iPhone 18 Pro Max 实测即问即答",
      summary: "面壁智能 MiniCPM-V 4.7 35B-A3B 端侧多模态模型密集演示落地——350 亿总参数 MoE 架构每次推理仅激活 30 亿参数，约 3GB 运行内存即可在手机/平板完成推理；在 iPhone 18 Pro Max 上的实测演示实现即问即答无需等待，是首个可在端侧无损流畅运行的开源 MoE 模型。行业观察同时指出旗舰手机可用内存仍是 35B 级模型落地的现实约束。",
      detail: "模型：MiniCPM-V 4.7 35B-A3B（10 月中开源），11 月 5 日 iPhone 18 Pro Max 实测演示、11 月 11 日起多源密集报道。\n架构：35B 总参数 MoE、激活 3B——首个端侧无损流畅运行的开源 MoE。\n门槛：约 3GB 运行内存完成手机/平板推理。\n生态：面壁与三星手机端侧 AI 合作、冲刺上市。\n端侧视角：端侧模型的参数天花板之争从 4B 直跳 35B MoE——激活 3B 的稀疏化路线让「大总参小激活」跨过手机内存红线；与麒麟 9050 官宣 30B 端侧（2.5GB 占用）同周出现，30B 级端侧模型从芯片侧与模型侧完成会师。",
      tags: ["面壁智能", "MiniCPM", "35B端侧", "MoE", "多模态"],
      url: "https://news.qq.com/rain/a/20261111A058XQ00",
      image: "images/news/n233.png",
      imageCap: "MiniCPM-V 4.7 端侧演示（图源：OpenBMB）",
      highlight: false
    },

{
id: "n228", cat: "手机厂商", source: "IT之家", date: "2026-11-11",
      title: "苹果子公司 Claris 暗测 Harbor 应用：Mac 变身本地 AI 服务器，雷雳 5 串联多机集群跑大模型",
      summary: "苹果全资子公司 Claris 正在测试 Harbor 应用——将苹果芯片 Mac 变成本地 AI 服务器：单台可跑，也可用雷雳 5 接口连接多台 Mac 组集群运行更大规模 AI 模型；macOS Tahoe 26.2 已加入雷雳 5 RDMA（远程直接内存访问）支持提速集群传输。应用可自动检测设备、浏览并下载开放权重模型，零手动配置即获得端侧 AI 能力。目前处于早期体验阶段、尚未公开。",
      detail: "曝光：11 月 11 日多源报道（IT之家/9to5Mac，候选池 3 簇此前未过目）。\n形态：单 Mac 或雷雳 5 多机集群——把闲置端侧算力拼成「桌面级 AI 机房」。\n系统：macOS Tahoe 26.2 已内置雷雳 5 RDMA 支持，集群数据传输提速。\n易用：自动检测雷雳 5 设备；浏览、下载开放权重模型；无需手动配置。\n状态：早期体验未向公众开放，App Store 页面曾短暂出现后下架。\n端侧视角：苹果首次官方系动作把「端侧算力组网」做成产品——Harbor 的意义不在单机跑模型（llama.cpp/Ollama 早就能做），而在雷雳 5 RDMA 让多台 Mac 的统一内存像一台机器一样被调度；若走向公开发布，Mac 集群将成为家庭与小团队跑开源大模型的最低门槛路径，也是苹果端侧优先路线在生产力侧的补全。",
      tags: ["苹果", "Claris", "Harbor", "本地AI服务器", "雷雳5"],
      url: "https://www.ithome.com/1/025/225.htm",
      image: "images/news/n228.jpg",
      imageCap: "Claris Harbor 应用（图源：IT之家）",
      highlight: true
    },

{
id: "n223", cat: "大模型厂商", source: "IT之家", date: "2026-11-11",
      title: "阿里 Qwen4 预览版上线千问平台：新一代旗舰主打编程、Agent 与复杂任务，正式版即将发布",
      summary: "阿里新一代大模型 Qwen4 预览版已首发上线千问 AI 平台——重点提升编程、Agent 智能体与复杂任务处理能力，官方宣布 Qwen4 即将正式发布。按 Qwen 系历代的发布惯例，旗舰之后通常伴随全系开源（含 0.5B-4B 端侧小尺寸版本）。",
      detail: "上线：11 月 11 日预览版首发千问平台（凤凰网/IT之家多源，候选库 dom=2 rep=3）。\n能力：编程、Agent、复杂任务处理为重点增强方向。\n节奏：Qwen4 系列正式发布在即（11 月初已有「一门四豪杰」多型号预热）。\n端侧视角：Qwen4 换代对端侧的意义在下一站——历代 Qwen 旗舰发布后数周内开放全系权重（Qwen3 曾带 0.6B-4B 端侧档），若 Qwen4 延续开源传统，端侧模型阵营将迎来新一轮基座换血；国行 Apple 智能已接入千问，Qwen4 端侧档也可能成为国行 Siri 的下一级引擎。",
      tags: ["阿里", "Qwen4", "千问", "旗舰模型", "预览版"],
      url: "https://www.ithome.com/1/025/301.htm",
      image: "images/news/n224.png",
      imageCap: "Qwen4 预览版上线（图源：IT之家）",
      highlight: false
    },

{
id: "n222", cat: "芯片厂商", source: "凤凰网", date: "2026-11-11",
      title: "华为官方详解麒麟 9050 系列：新一代达芬奇 NPU 性能提升 140%，30B MoE 全模态大模型端侧离线运行仅占 2.5GB 内存",
      summary: "华为麒麟官方详解麒麟 9050 系列——首款「逻辑折叠」τ（韬）芯片，晶体管密度提升 53.5%；新一代达芬奇架构 NPU 性能提升 140%、功耗降低 66%，支持 30B MoE 全模态大模型在手机端离线运行、新增内存占用仅 2.5GB——断网也能完成复杂任务规划、智能修图与多模态感知。首发搭载华为 Mate 9 系列、Mate XT2 非凡大师，搭配 HarmonyOS 7。",
      detail: "详解：11 月 11 日麒麟官方公众号发布（凤凰网/新浪/IT之家多源，候选库 dom=2 rep=3）。\n工艺：首款「逻辑折叠」技术 τ 芯片，晶体管密度提升 53.5%。\nNPU：新一代达芬奇架构——性能提升 140%、功耗降低 66%（华为实验室数据）。\n端侧模型：30B MoE 全模态大模型手机端离线运行，新增内存占用仅 2.5GB；断网可用复杂任务规划、智能修图、多模态感知。\nCPU（9050 Pro）：多核性能提升 23%，大核能效提升 41%。\n搭载：Mate 9 系列、Mate XT2 非凡大师+HarmonyOS 7。\n端侧视角：手机芯片首次把「30B MoE 端侧离线」写进量产官方规格——2.5GB 内存占用意味着 12GB 机型可以常驻模型而不挤压多任务，逻辑折叠工艺的密度红利被直接兑换成端侧模型算力；配合鸿蒙终端本月破亿，端侧 30B 时代的设备底盘已经就位。",
      tags: ["麒麟9050", "达芬奇NPU", "30B端侧", "逻辑折叠", "华为"],
      url: "https://original.ifeng.com/c/8xxkY6ktCXa",
      image: "images/news/n222.png",
      imageCap: "麒麟 9050 系列官方详解（图源：凤凰网）",
      highlight: true
    },

{
id: "n247", cat: "AI硬件", source: "腾讯新闻/财联社", date: "2026-11-10",
      title: "苹果 AI 眼镜供应链首度浮出水面：快克智能业绩会确认参与 AI 眼镜及带摄像头 AirPods 项目",
      summary: "快克智能在 11 月 10 日三季度业绩说明会上确认，公司已参与苹果 AI 眼镜及新款智能耳机项目（新款耳机或为传闻中的带摄像头 AirPods），将拉动精密焊接装联与机器视觉检测业务。这是苹果 AI 眼镜供应链环节首次有上市公司公开确认参与，此前爆料显示苹果首款 AI 眼镜最快 2027 年亮相。",
      detail: "确认：11 月 10 日快克智能 2026 年第三季度业绩说明会，公司层面口径（财联社、腾讯新闻等多源报道）。\n业务：精密焊接装联+机器视觉检测设备——眼镜与耳机的微小型化组装正是其工艺强项。\n时间线：苹果首款 AI 眼镜最快 2027 年亮相（此前分析师爆料口径）；带摄像头 AirPods 传闻已久，本次供应链确认是迄今最硬的证据。\n端侧视角：苹果 AI 硬件路线图首次在供应链层获得实名背书——眼镜+摄像头耳机双线并进意味着苹果端侧 AI 的载体战略是「多穿戴品类矩阵」而非单点产品；与华为星芒新品牌、三星眼镜预售同周，AI 眼镜正在从「发布预期」进入「供应链备货」阶段，2027 年将迎来三巨头同场。",
      tags: ["苹果", "AI眼镜", "快克智能", "AirPods", "供应链"],
      url: "https://news.qq.com/rain/a/20261110A09WK500",
      image: "images/news/n247.jpg",
      imageCap: "苹果 AirPods 产品线（图源：Apple 官网，非传闻产品渲染）",
      highlight: false
    },

{
id: "n241", cat: "手机厂商", source: "Google 官方", date: "2026-11-10",
      title: "谷歌 2026 年 11 月 Pixel Drop：Gemini Intelligence 扩展至 Pixel 10、新品类 Pixel Tag 追踪器，随 Android 17 推送",
      summary: "谷歌发布 2026 年 11 月 Pixel 功能更新（Feature Drop）——Gemini Intelligence 智能能力扩展至 Pixel 10 系列（Pixel 11 新增 Gemini Call Screen 来电筛选），推出新品类 Pixel Tag 蓝牙追踪器，新增 Create My Widget 自定义小组件、Pixel Solver 与 Google Messages 的 HiLight 等功能，整体随 Android 17 系统推送。",
      detail: "更新：11 月 10 日官方博客发布（Google Blog/Ars Technica 多源）。\n智能：Gemini Intelligence 扩展至 Pixel 10 家族；Pixel 11 增加 Gemini Call Screen 来电智能筛选。\n硬件：Pixel Tag——谷歌自有品牌蓝牙追踪器新品类。\n其他：Create My Widget 自定义小组件、Pixel Solver、HiLight for Google Messages、主屏图标样式扩展；随 Android 17 推送。\n端侧视角：Gemini Intelligence 按机型分层下放（10 代全量、11 代独占 Call Screen）是谷歌端侧 AI 的机型梯度策略——Pixel 作为 Android 端侧 AI 的第一试验田，其功能分层直接预告了 Android 生态的后续节奏。",
      tags: ["谷歌", "Pixel", "Gemini Intelligence", "Pixel Tag", "Android 17"],
      url: "https://blog.google/products-and-platforms/devices/pixel/november-2026-pixel-drop",
      image: "images/news/n241.jpg",
      imageCap: "2026 年 11 月 Pixel Drop（图源：Google 官方博客）",
      highlight: false
    },

{
id: "n232", cat: "AI硬件", source: "亚马逊官方", date: "2026-11-10",
      title: "亚马逊 Ring 成立机器人部门并发布两款 AI 安防设备：249.99 美元家用飞行监控无人机 Drone Cam 与商用巡逻机器人 Rover Cam",
      summary: "亚马逊 Ring 宣布成立 Ring Robotics 机器人业务部门，并发布两款 AI 安防设备——Drone Cam 家用室内飞行监控无人机（249.99 美元，警报触发后自动飞往现场查看，已向 FCC 申请批准、预计 2026 年 1 月下旬发货，系六年研发两度推迟后终于落地）与 Rover Cam 面向商店、仓库与办公场所的自主巡逻安防机器人。",
      detail: "发布：11 月 10 日亚马逊官方公告（IT之家/凤凰网等多源）。\nDrone Cam：室内飞行监控无人机，249.99 美元；警报触发自动飞临现场查看；FCC 审批中，预计 2026 年 1 月下旬发货——六年研发、多次推迟后的量产落地，让家庭无需布满固定摄像头。\nRover Cam：商用自主巡逻安防机器人，面向商店/仓库/办公场景。\n格局：Ring 正式进军 AI 机器人赛道，与悬浮飞行家庭机器人 Halo H-1（10 月上市）等初创产品同场竞技。\n端侧视角：家用安防是飞行机器人第一个真量产场景——「按需飞到现场看一眼」对算力、避障与续航的要求全部压在端侧；Ring 背靠亚马逊的 AI 视觉栈与出货渠道，Drone Cam 若 1 月顺利交付，将成为家庭机器人渗透率的关键试金石。",
      tags: ["亚马逊", "Ring", "无人机安防", "巡逻机器人", "家庭机器人"],
      url: "https://www.aboutamazon.com/news/devices/ring-drone-cam-rover-cam-security-robot",
      image: "images/news/n232.png",
      imageCap: "Ring Drone Cam 与 Rover Cam（图源：亚马逊官方）",
      highlight: false
    },

{
id: "n231", cat: "行业动态", source: "IT之家", date: "2026-11-10",
      title: "首个「自下而上」的 AI PC 操作系统 KORA OS 发布：底层融入智能体工作流，骁龙 X2 Elite 有望成首发平台",
      summary: "KORA Systems 发布全新操作系统 KORA OS——宣称首个专为 AI PC「自下而上」设计的操作系统：智能体工作流、上下文记忆与本地 AI 推理直接融入系统底层，目标让电脑从「打开应用完成操作」转向「表达意图、由 AI 协助完成」。基于 NixOS 构建，自研 Cortex 推理引擎调度 CPU/GPU/NPU 本地运行开放权重模型，内置 Wine/Proton 的 Windows 应用兼容层；正与高通合作，骁龙 X2 Elite 有望成为首款支持平台。",
      detail: "发布：11 月 10 日公告、11 月 11 日多源报道。\n理念：AI 原生而非 AI 叠加——「神经工作区」按任务目标组织空间，系统围绕意图、上下文与记忆管理文件；传统文件夹与桌面应用保留但不再是核心。\n引擎：自研 Cortex 推理引擎调度 CPU/GPU/NPU；内置基于 llama.cpp 的 Lemma 引擎；系统自动判断任务云端处理还是留在本地。\n隐私：工作流记忆与上下文留在本机不出设备；每个工作区隔离沙箱运行，应用与 AI 智能体独立权限。\n兼容：Wine/Proton 转换层跑 Windows 应用，本地 AI 协助配置；骁龙 X2 Elite 首发平台，后续 AMD/Intel x86 与更多 Arm。\n团队：约 20 名工程师，创始成员来自 Cyanogen、Android 与 GameOS；企业版 HUMAIN OS 预计 2027 年发布。\n端侧视角：继鸿蒙 PC、ChromeOS 之后第三个向 Windows 发起形态级挑战的系统——KORA 把「本地跑开放权重+端云分流+沙箱化智能体」整套端侧 AI 栈做成 OS 的第一性设计；与骁龙 X2 Elite 绑定意味着 Arm on PC 战线又多一个盟友，值得跟踪其对 NPU 的调度深度是否超过 Windows 的 AI API 层。",
      tags: ["KORA OS", "AI PC", "操作系统", "骁龙X2", "本地推理"],
      url: "https://www.ithome.com/1/025/226.htm",
      image: "images/news/n231.png",
      imageCap: "KORA OS 界面（图源：IT之家）",
      highlight: false
    },

{
id: "n230", cat: "大模型厂商", source: "DeepMind 官方", date: "2026-11-10",
      title: "谷歌发布 Gemini Robotics 2.5：最强视觉-语言-动作模型，奔驰产线实测 96% 成功率，ASIMOV-Jailbreak 安全基准同步开源",
      summary: "Google DeepMind 发布迄今最强视觉-语言-动作模型（VLA）Gemini Robotics 2.5——200 余项任务评测成功率较前代提升 30-100%、完成速度快 20-30%；在奔驰匈牙利与德国产线的真实验证中，Apptronik Apollo 2 人形机器人自主完成汽车零件分拣上料、成功率 96%。同步引入推理时物理安全引导（障碍物场景安全完成率 +33%、人员近旁 +43%），并开源抗越狱基准 ASIMOV-Jailbreak（Gemini 4 Argon 越狱抵抗率 99.5%）。",
      detail: "发布：11 月 10 日 DeepMind 官方博客。\n能力：灵巧性（工具使用/柔性物体操作）、可靠性、安全性三线跃升；200+ 项任务评测（夹食物/打礼盒蝴蝶结/移液等）。\n实测：奔驰 Kecskemét 与 Sindelfingen 产线，Apollo 2（22 自由度五指 SharpaWave 手）自主 kitting 分拣，96% 成功率；Gemini Robotics ER 管流程+2.5 管手臂数据。\n安全：推理时危险规避引导；ASIMOV-Jailbreak 开源基准——数百条伪装危险指令×数十场景，Argon 抵抗率 99.5%（前代 ER2 为 82%）。\n加速器：Gemini 4 Argon 充当仿真引擎——从真实相机场景生成数千变体演练+数字孪生+失败归因，大幅压缩训练周期。\n端侧视角：VLA 头部模型首次把「产线级 96%」写进官方口径——具身智能从演示视频走到值班工位；ASIMOV-Jailbreak 把机器人安全评测标准化，与国内同期的 HALO/LIFE 形成中美具身安全研究的第一轮正面呼应。",
      tags: ["谷歌", "Gemini Robotics", "VLA", "人形机器人", "具身安全"],
      url: "https://deepmind.google/blog/gemini-robotics-2-5-accelerates-real-world-physical-intelligence/",
      image: "images/news/n230.webp",
      imageCap: "Apollo 2 在奔驰产线执行分拣（图源：Google DeepMind）",
      highlight: true
    },

{
id: "n229", cat: "行业动态", source: "腾讯新闻", date: "2026-11-10",
      title: "小米联合北大发布《物联网设备模型技术白皮书》：11.6 亿台 AIoT 设备实践经验开放，定义 AI 原生物联网标准",
      summary: "中国计算机学会泛在操作系统开放社区牵头、小米与北京大学联合编制的《物联网设备模型技术白皮书》正式发布——基于小米超过 11.6 亿台 AIoT 设备、200 多个品类、10000 多家合作伙伴的规模化实践，提出四层物模型架构与 Dynamic Service 动态服务机制（支持设备新功能自动发现与场景自适应），定义智能设备的「数字化通用语言」，向全行业开放共建 AI 原生物联网标准。",
      detail: "发布：11 月 10 日（腾讯新闻/搜狐/ZOL/凤凰网多源）。\n编制：CCF 泛在操作系统开放社区牵头，小米+北京大学联合。\n底盘：小米 11.6 亿台 AIoT 设备实践、200+ 品类、10000+ 合作伙伴——卢伟冰：「把 11.6 亿台设备上验证过的技术和经验，正式开放给全行业」。\n核心：四层物模型架构+Dynamic Service 动态服务机制——突破静态物模型描述局限，设备新增功能自动发现、场景自适应调整；AI 融合与可信安全并列为三大突破。\n端侧视角：物模型是设备侧的「数字孪生底座」——当 11.6 亿台设备的描述语言统一并支持动态服务，智能体跨设备调用的成本从逐品牌适配降到读标准；这份白皮书实质是把小米澎湃生态的设备抽象层开放为行业公共品，为端侧智能体的万物互联铺路。",
      tags: ["小米", "物联网", "白皮书", "AIoT", "物模型"],
      url: "https://news.qq.com/rain/a/20261110A098L200",
      image: "images/news/n229.jpg",
      imageCap: "《物联网设备模型技术白皮书》发布（图源：腾讯新闻）",
      highlight: false
    },

{
id: "n221", cat: "AI硬件", source: "IT之家", date: "2026-11-10",
      title: "华为 MateBook Fold S 鸿蒙小折叠电脑三色公布：全新背屏设计+Live 小方屏，11 月 14 日开启预订",
      summary: "华为公布 MateBook Fold S 鸿蒙小折叠电脑三色外观——全新背屏设计搭载 Live 小方屏，11 月 14 日开启预订。继首款鸿蒙台式机擎云 HM650 与 MateBook 鸿蒙版之后，鸿蒙 PC 产品线再落一子，折叠形态与外副屏交互进入鸿蒙生态。",
      detail: "官宣：11 月 10 日三色外观公布（余承东预告预热序列）。\n节点：11 月 14 日开启预订。\n形态：小折叠电脑+背屏 Live 小方屏——外副屏承载息屏显示、通知与助手入口类交互。\n序列：华为 PC 线本周期密集落子——擎云 HM650 首款鸿蒙台式机（麒麟 X90）、MateBook 鸿蒙版、MateBook Fold S 折叠新形态。\n端侧视角：Live 小方屏是鸿蒙 PC 的端侧 AI 新交互面——外副屏天然适合常显智能体状态与提醒（手机灵动胶囊的 PC 化）；折叠+副屏组合若配合小艺智能体，将定义鸿蒙 PC 区别于 Windows AI PC 的交互身份。",
      tags: ["华为", "MateBook Fold S", "鸿蒙PC", "折叠电脑", "副屏"],
      url: "https://www.ithome.com/1/024/600.htm",
      image: "images/news/n221.jpg",
      imageCap: "MateBook Fold S 三色外观（图源：IT之家）",
 highlight: false
    },

{
id: "n220", cat: "AI硬件", source: "IT之家", date: "2026-11-10",
      title: "影目召回 4701 副 INMO AIR3 智能眼镜并提供 OTA 免费升级：此前已在美国召回，曾称国内用户不受影响",
      summary: "影目科技宣布召回 4701 副 INMO AIR3 智能眼镜并进行 OTA 免费升级——此前该产品已在美国市场召回，官方曾表示国内用户不受影响，本次国内召回完成跨国售后闭环。这是 AI 眼镜品类进入大规模交付期后的首批千人级召回之一，质量与售后体系开始成为品类竞争变量。",
      detail: "召回：11 月 10 日宣布，涉及 4701 副 INMO AIR3，OTA 免费升级方式（候选库 dom=2）。\n前情：此前已在美国召回同款，官方曾称国内用户不受影响——本次国内召回使跨国售后口径回归一致。\n端侧视角：AI 眼镜从首发抢跑进入交付质量竞争——眼镜是全天佩戴设备，OTA 修复能力（而非返厂）决定召回成本；百镜大战的下一轮分化变量将从参数转向质量体系与售后响应，首批千人级召回为全行业上了合规课。",
      tags: ["影目", "INMO AIR3", "AI眼镜", "召回", "OTA升级"],
      url: "https://www.ithome.com/1/024/893.htm",
      image: "images/news/n220.jpg",
      imageCap: "影目 INMO AIR3 召回（图源：IT之家）",
      highlight: false
    },

{
id: "n219", cat: "大模型厂商", source: "IT之家", date: "2026-11-10",
      title: "蚂蚁灵波开源 LingBot-Touch 触觉基础模型：为通用大脑接入「手感」，26 项真机任务成功率提升 14-26 个百分点",
      summary: "蚂蚁灵波开源具身触觉基础模型 LingBot-Touch——从「一脑多机」走向「一脑多手」，让机器人通用大脑获得可跨硬件复用的触觉「手感」：26 项真机测试任务成功率提升 14 至 26 个百分点。灵波 CEO 朱兴同日谈 Anthropic Fable 5.2：交互大模型与触觉基础模型两类协同将加速具身产业成熟。",
      detail: "开源：11 月 10 日（IT之家/量子位/36 氪多源）。\n能力：触觉基础模型——为通用大脑接入「手感」；跨硬件复用（一脑多手）；26 项真机任务成功率提升 14-26 个百分点。\n背景：蚂蚁灵波 10 月底携机器人通用大脑亮相乌镇（一脑多机），触觉是通用大脑的最后几块感知拼图之一。\n呼应：智元同日发布 WITA-Omni 交互大模型——具身「交互大脑」与「触觉手感」同日双发。\n端侧视角：视觉模型可以云端生成、触觉必须端侧闭环——指尖力控与材质感知的延迟容忍是毫秒级，LingBot-Touch 开源等于把具身最难本地化的感知通道做成公共组件；机器人技术栈「VLM 层+触觉层」的分层生态正在成形。",
      tags: ["蚂蚁灵波", "LingBot-Touch", "触觉模型", "具身智能", "开源"],
      url: "https://www.ithome.com/1/024/701.htm",
      image: "images/news/n219.png",
      imageCap: "LingBot-Touch 触觉基础模型（图源：IT之家）",
      highlight: false
    },

{
id: "n218", cat: "大模型厂商", source: "IT之家", date: "2026-11-10",
      title: "智元发布 WITA-Omni 全模态大模型正式版：行业首个具身全模态端到端交互模型，触觉+本体状态输入、免唤醒词全双工",
      summary: "智元正式发布 WITA-Omni（硅光动语全模态大模型）——行业首个具身全模态端到端交互大模型：基于机器人本体感知数据深度训练，在音视频之外新增触觉、本体状态等输入与动作、表情等输出；流式全双工架构实现边听、边想、边应、边动、边做表情，交互响应最快约 400 毫秒、平均约 600 毫秒（较业内平均快近 3 倍）；全模态拒识让机器人免唤醒词自然对话，支持上百种语言方言免切换交流与流式同传。",
      detail: "发布：11 月 10 日晚间智元公众号官宣（IT之家 19:24 首发报道）。\n模态：音视频+触觉+本体状态输入；动作+表情输出——为物理世界而生的「交互大脑」。\n全双工：流式架构边听边想边应边动边做表情；最快约 400ms、平均约 600ms 响应，快业内近 3 倍。\n拒识：结合朝向/视频/音频/声纹/唇动/姿态/语义/上下文决策是否回应——多人交谈与环境广播下大幅降低误触发，全程免唤醒词。\n表现：几十种情绪按不同强度呈现；复杂内容在面部屏幕实时可视化；主动互动（迎宾握手/点赞回应/挥手相送）。\n前史：7 月 Preview 以 85.21 分登顶 DailyOmni 全模态理解榜（超千问/Gemini/豆包/英伟达），八项细分指标六项第一。\n端侧视角：具身交互的「全双工+免唤醒词」组合把机器人从指令式应答推进到在场式社交——400ms 响应与多模态拒识必须在本体侧闭环完成，云端链路做不到；与蚂蚁灵波触觉模型同日开源，具身智能的感知-交互栈正被中国公司分层补齐。",
      tags: ["智元", "WITA-Omni", "具身智能", "全模态", "全双工"],
      url: "https://www.ithome.com/1/025/122.htm",
      image: "images/news/n218.jpg",
      imageCap: "智元 WITA-Omni 发布（图源：IT之家）",
      highlight: true
    },

{
id: "n227", cat: "大模型厂商", source: "凤凰科技", date: "2026-11-09",
      title: "Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2 双旗舰：智能体编码基准 49.1% 超 GPT-6 Astra，API 降价 20%",
      summary: "Anthropic 发布 Claude Fable 5.2 与 Claude Mythos 5.2 双旗舰——官方称在测试过的几乎所有能力上比 Opus 5.5 强一档：智能体编码基准 FrontierCode 2.0 得分 49.1%（GPT-6 Astra 为 42.8%），第三方对比显示共有基准全面领先且单价更低；输出速度较 5.1 提升最多 30%。API 价格下调 20%（输入 8 美元/百万 token、输出 40 美元），可选双倍价格开启 2.5 倍速输出。",
      detail: "发布：11 月 9 日（凤凰科技/Datacamp/IT之家多源，候选库 dom=2）。\n性能：几乎所有能力较 Opus 5.5 强一档；FrontierCode 2.0 智能体编码 49.1% vs GPT-6 Astra 42.8%；Datacamp 对比共有基准全面领先且单 token 价格更低。\n速度：输出较 5.1 最多提升 30%。\n价格：API 下调 20%——输入 8 美元/百万 token、输出 40 美元；双倍价（16/80 美元）开 2.5 倍速输出；实测提醒：模型变聪明后单任务 token 消耗可能上升，实际成本未必更省。\n订阅：Max/Ultra 赠 Fable reset，Pro 发布当周可用。\n端侧视角：榜首易主+降价 20% 是云端 Agent 战争白热化的信号——编码智能体基准的大幅领先会直接抬高「云端执行+端侧编排」混合架构中云端的承接份额；对端侧的反向压力在于：当云端旗舰每 token 更便宜更聪明，端侧模型的价值锚点必须继续压在隐私、离线与延迟上，而非单纯算力性价比。",
      tags: ["Anthropic", "Claude Fable", "Mythos", "智能体编码", "旗舰模型"],
      url: "https://tech.ifeng.com/c/8xwEBlk190G",
      image: "images/news/n227.jpg",
      imageCap: "Claude Fable 5.2 发布（图源：凤凰科技）",
      highlight: false
    },

{
id: "n226", cat: "大模型厂商", source: "TechCrunch", date: "2026-11-09",
      title: "Meta 开源发布 Muse Ember：迄今最小多模态模型专攻 Agent 执行，1M 上下文、每百万输入 Token 仅 0.1 美元",
      summary: "Meta 超级智能实验室发布 Muse Ember——迄今最小、最省成本的多模态模型，专为高吞吐 Agent 工作流执行设计（编码子任务、工具调用、文档摘要）：100 万 token 上下文窗口，定价每百万输入 token 仅 0.1 美元（约合每任务 0.14 美元），Apache 开源协议。与 Muse Glimmer 30B（端侧智能体）、Muse Spark 1.1（多模态推理）构成 Muse 家族三档。",
      detail: "发布：11 月 9 日（TechCrunch/MarkTechPost 多源，候选库 dom=2）。\n定位：Meta 最小多模态模型——高吞吐 agent 执行（编码子任务/工具调用/文档摘要），非推理主力。\n指标：1M token 上下文；Artificial Analysis 36 分；约 0.14 美元/任务。\n价格：0.1 美元/百万输入 token——迄今最省。\n协议：Apache 开源。\n家族：Muse Glimmer 30B（端侧智能体、即将上智能眼镜）+Muse Spark 1.1（推理）+Ember（执行）三档成型。\n端侧视角：Muse 家族完成了「端侧 Glimmer-云端 Spark-廉价执行 Ember」的全栈分工——Ember 的超低价+开源把 Agent 执行层的边际成本压到可忽略，为端侧 Agent 的「本地编排+云端执行」混合架构提供了经济底座；若 Ember 尺寸后续下放到端侧可跑档位，将成为端侧 Agent 执行引擎的直接候选。",
      tags: ["Meta", "Muse Ember", "Agent模型", "开源", "轻量化"],
      url: "https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution",
      image: "images/news/n226.png",
      imageCap: "Meta Muse Ember（图源：TechCrunch）",
      highlight: false
    },

{
id: "n216", cat: "AI硬件", source: "Gentle Monster 官网", date: "2026-11-09",
      title: "Gentle Monster 首款 AI 眼镜定档：携手谷歌与三星、搭载 Gemini，11 月 12 日美国开启预订",
      summary: "时尚眼镜巨头 Gentle Monster 首款 AI 智能眼镜定档——由 Gentle Monster 携手 Google 与 Samsung 打造，基于 Android XR 平台并搭载 Gemini：支持语音与文字实时翻译、智能导航、语音助手、环境感知与视觉信息识别及拍照抓拍，兼容 Android 与 iOS 设备。11 月 12 日在美国开启预订、12 月正式发售。",
      detail: "定档：官网 Intelligent Eyewear 页面确认 11 月 12 日美国预订、12 月发售（多源报道，候选库 rep=2）。\n配置：Android XR 平台+Google Gemini；实时翻译（语音/文字）、智能导航、语音助手、环境感知辅助、视觉识别、拍照抓拍。\n兼容：Android 与 iOS 双生态。\n格局：与三星 Intelligent Eyewear、Warby Parker 首款眼镜同在 11 月 12 日开订——Android XR 生态第一波三款眼镜集体登陆美国市场。\n端侧视角：Android XR 首波采用「科技巨头出平台、时尚品牌出形态」的分工——Gentle Monster 把 AI 眼镜做进潮流光学渠道，与三星电子渠道、Warby Parker 眼镜直销渠道三线并进；12 月假日季交付意味着 Gemini 眼镜侧分发正式与 Meta 系正面争夺百镜大战的生态位。",
      tags: ["Gentle Monster", "AI眼镜", "Android XR", "Gemini", "谷歌"],
      url: "https://www.gentlemonster.com/int/zh-CN/intelligent-eyewear",
      image: "images/news/n216.jpg",
      imageCap: "Gentle Monster Intelligent Eyewear（图源：官网）",
      highlight: false
    },

{
id: "n215", cat: "行业动态", source: "IT之家", date: "2026-11-09",
      title: "微信鸿蒙版安装量超 9000 万次：HarmonyOS 终端用户本月预计突破 1 亿大关",
      summary: "微信鸿蒙版 App 安装量已超过 9000 万次，华为 HarmonyOS 终端用户数预计本月突破 1 亿大关——鸿蒙生态完成国民级应用全量迁移后进入亿级用户规模区间，纯血鸿蒙的端侧 AI 服务（小艺智能体、系统级 AI 能力）随之获得亿级设备底座。",
      detail: "数据：11 月 9 日报道（IT之家，华为官方口径）——微信鸿蒙版安装量超 9000 万次；HarmonyOS 终端用户数预计本月突破 1 亿。\n节点：鸿蒙 5 发布约一年完成国民应用全量原生迁移，终端规模站上亿级门槛。\n端侧视角：亿级终端是端侧 AI 分发的规模分水岭——系统级智能体（小艺）与第三方应用的端侧 AI 能力从此拥有与 iOS/安卓第三极对等的设备基数；配合本月华为 Mate X8（麒麟 9050 Pro 端侧大模型）预热，鸿蒙的端侧 AI 叙事从「生态补课」转入「规模兑现」。",
      tags: ["鸿蒙", "微信", "HarmonyOS", "终端生态", "亿级用户"],
      url: "https://www.ithome.com/1/024/099.htm",
      image: "images/news/n215.jpg",
      imageCap: "微信鸿蒙版安装量突破 9000 万（图源：IT之家）",
      highlight: false
    },

{
id: "n214", cat: "端侧Agent", source: "量子位", date: "2026-11-09",
      title: "阿里发布千问办公 2.0：从个人助手升级 Team Agent，首个支持多人与 Agent 协作",
      summary: "阿里巴巴发布千问办公 2.0——定位从个人 AI 助手升级为面向个人与组织协作的 Team Agent，上线首个支持多人与 Agent 协作的「协作」功能：数字员工（Agent）可带入工作群，实时关联钉钉群聊、听记、表格与文档作为协作上下文，支持多会话并行与任务指派。同步上线人机共创、主动自动任务、资料空间与三端互联等能力。",
      detail: "发布：11 月 9 日官方公众号 14:22 发文《主动与协同，迈向 Team Agent 时代》（量子位/凤凰科技/IT之家多源，候选库 dom=2 rep=6）。\n协作：数字员工小Q 入群，多人+多 Agent 在共同上下文工作——群聊、听记、表格、文档实时关联；多会话并行、任务指派。\n升级：人机共创、自动任务（Agent 主动执行）、资料空间、三端互联。\n背景：千问办公 8 月上线 1.0 打磨个人 Agent 能力；企业需求从「告诉我怎么做」转向「帮我把它做完」。\n端侧视角：Agent 产品竞争从单兵效率转向团队协作上下文——谁能把组织知识流（群聊/文档/表格）接进 Agent 工作记忆，谁就拿到办公场景的入口；与 Kimi Hosted Agents（云端托管）同周看，「团队级 Agent」正在成为国产 Agent 产品的集体下一站。",
      tags: ["千问办公", "Team Agent", "智能体协作", "阿里巴巴", "数字员工"],
      url: "https://www.qbitai.com/2026/11/508694.html",
      image: "images/news/n214.png",
      imageCap: "千问办公 2.0 官方发布原文（图源：千问办公公众号）",
      highlight: true
    },

{
id: "n199", cat: "行业动态", source: "凤凰汽车", date: "2026-11-08",
      title: "2026 款奔驰长轴距 E 级上市 42.38 万元起：奔驰中国首次独立开发 AI 座舱，深度融合豆包大模型",
      summary: "2026 款奔驰长轴距 E 级上市，售价 42.38 万元起——首次搭载奔驰中国研发团队主导、独立开发的全新 AI 智能座舱，虚拟助手深度融合字节跳动豆包大模型：语音最快 0.25 秒响应、多音区识别准确率 98%、最多存储 6 位用户声纹、支持全场景「可见即可说」；全系标配华为 HiCar，支持季度级 OTA 大版本升级。",
      detail: "上市：2026 款长轴距 E 级 42.38 万元起（凤凰汽车/搜狐汽车）。\n座舱：奔驰中国团队首次主导独立开发——虚拟助手深度融合豆包大模型及相关交互技术。\n指标：语音最快 0.25 秒响应；多音区识别准确率 98%；6 位用户声纹个性化账户；全场景可见即可说。\n生态：全系标配华为 HiCar；高德车载导航帧率提升；季度性大版本 OTA，后续覆盖更多燃油与纯电车型。\n端侧视角：豆包大模型首次规模化上车豪华品牌——奔驰选择「本土大模型+本土生态（HiCar/高德）」组合而非自研模型，传统豪华品牌的 AI 座舱竞赛焦点从算力堆叠转向模型选型与本土化整合。",
      tags: ["奔驰", "豆包大模型", "AI座舱", "智能汽车", "豆包上车"],
      url: "https://auto.ifeng.com/c/8xm3Ojm10u8",
      image: "images/news/n199.jpg",
      imageCap: "2026 款长轴距 E 级（图源：凤凰汽车）",
      highlight: false
    },

{
id: "n198", cat: "AI硬件", source: "IT之家", date: "2026-11-08",
      title: "物理智能开源平台 Hitch Open 进博会全球发布：双机自主对打乒乓球 142 拍刷新世界纪录，0.3 秒完成感知决策",
      summary: "物理智能开源平台 Hitch Open 在进博会举行全球发布会——现场挑战环节两台机器人在无人工遥控下自主感知、决策、挥拍，连续对打 142 拍刷新该项目世界纪录。纪录由上海交通大学—上海创智学院高岳教授团队基于开源底座训练模型，与 Hitch Open 平台提供的统一本体联合创造，机器人需在 0.3 秒内完成感知与决策。",
      detail: "发布：进博会现场全球发布（IT之家/上观新闻/中新经纬多源）。\n纪录：两台机器人无人遥控连续对打 142 拍，为此前 129 拍世界纪录的又一次刷新。\n分工：高岳教授团队基于开源底座训练模型；Hitch Open 提供统一本体；青瞳视觉高精度动捕提供支撑，双方宣布全球战略合作。\n实时性：每次击球需在 0.3 秒内完成感知与决策——具身智能的端侧实时推理极限压力测试。\n端侧视角：142 拍背后是「统一本体+开源底座」的物理智能训练栈——Hitch Open 把仿真训练到真机部署的全链路开源化，任何团队都能在同一套本体上复现和超越，具身智能从各家闭门调参进入开源共建时代。",
      tags: ["Hitch Open", "物理智能", "具身智能", "开源平台", "进博会"],
      url: "https://www.ithome.com/1/023/920.htm",
      image: "images/news/n198.jpg",
      imageCap: "Hitch Open 展台机器人乒乓对打（图源：中新经纬）",
      highlight: false
    },

{
id: "n190", cat: "行业动态", source: "IT之家", date: "2026-11-08",
      title: "中国移动×智谱签署合作协议：GLM 系列模型接入移动云 MaaS 平台，国产算力到大模型服务全链合作",
      summary: "中国移动云公司与智谱签署合作协议——双方围绕国产算力、大模型服务和 AI 商业化展开深度合作，智谱 GLM 系列模型将接入移动云 MaaS 平台，合作涵盖 Token 技术创新、模型服务、产品打造、行业方案等，覆盖从底层算力供给、模型服务到商业化分发的完整产业链。",
      detail: "合作：11 月 6 日签约、11 月 8 日多源披露（IT之家/凤凰/证券之星）。\n内容：GLM 系列模型接入移动云 MaaS 平台；Token 技术创新、模型服务、产品打造、行业方案。\n链路：从国产算力供给到模型服务到商业化分发——运营商×国产大模型的系统性合作。\n端侧视角：运营商的算力网络+国产模型的组合正在打通「云端 Token 工厂」的国家级分发通道——移动云 MaaS 平台接入 GLM 后，端侧设备的端云协同推理将获得运营商级的 SLA 保障，这与趋境×智谱×摩尔线程的 Token 工厂方案形成「国家级+创业级」两层国产推理基建。",
      tags: ["中国移动", "智谱", "GLM", "移动云", "国产算力"],
      url: "https://www.ithome.com/1/023/937.htm",
      image: "images/news/n190.png",
      imageCap: "中国移动×智谱合作（图源：IT之家）",
      highlight: false
    },

{
id: "n237", cat: "大模型厂商", source: "CSDN", date: "2026-11-07",
      title: "李沐 Boson AI 发布 Higgs Realtime Duplex 全双工多模态模型：160ms 流式处理，边听边说、边看边想+数字人输出",
      summary: "李沐与 Alex Smola 联合创立的 Boson AI 发布全双工实时多模态交互模型 Higgs Realtime Duplex 研究预览——以 160 毫秒为单位处理连续输入输出流，像真人一样边听边说、边看边想：支持主动附和、识别用户打断、根据语音与视觉上下文判断回应时机，并可一边聊天一边干活；同系 Higgs Realtime 端到端模型已开放 API 并支持数字人输出。OpenAI 同期开放全双工语音模型 GPT-Live-1 API，行业正从轮次式语音转向持续双向交互。",
      detail: "发布：研究预览版（11 月 7 日前后，CSDN/知乎/李沐 B 站技术讲解《边听边说、边看边想、还有一张脸的全双工模型》）。\n机制：160ms 为单位处理连续输入输出流——主动附和、打断识别、语音+视觉上下文判断回应时机。\n产品线：Higgs Realtime（端到端，已开放 API+数字人输出）/Higgs Realtime Duplex（全双工，候补名单）。\n底座：Higgs Audio V2 开源音频基座（Llama-3.2-3B、预训练超 1000 万小时音频）。\n对垒：OpenAI 同期开放 GPT-Live-1 全双工 API。\n端侧视角：全双工是语音交互的技术上限方向——160ms 粒度的流式决策必须贴近用户完成，端侧或近端推理是体验底座；与智元 WITA-Omni（具身全双工 400ms）同期出现，「持续在场式交互」正在手机助手与机器人两端同时落地。",
      tags: ["李沐", "Boson AI", "Higgs", "全双工", "语音交互"],
      url: "https://www.cnblogs.com/rtedev/p/23578685",
      image: "images/news/n237.png",
      imageCap: "Higgs Realtime 数字人演示（图源：CSDN）",
      highlight: false
    },

{
id: "n197", cat: "行业动态", source: "凤凰网", date: "2026-11-07",
      title: "京东×酷派把品牌 AI 眼镜打到 322 元：C2M 定制+国补首批进入百元档，光波导眼镜销量同比增 3 倍",
      summary: "双 11 期间京东与酷派联合推出 AI 智能眼镜——原价 699 元叠加国补后到手 322 元，成为首批进入百元价位的品牌 AI 眼镜：800 万像素第一人称拍摄、音视频通话、在线翻译、AI 语音助手与会议记录。采用东莞产业带 C2M 反向定制+京东包销模式；京东双 11 光波导智能眼镜销售同比增长超 3 倍。",
      detail: "事件：双 11 期间京东×酷派定制包销（凤凰网/网易/搜狐多源）。\n产品：酷派 AI 智能眼镜 699 元、国补后 322 元；800 万像素摄像头第一人称拍摄；音视频通话/在线翻译/AI 语音助手/会议记录。\n模式：C2M 反向定制+京东包销，产自东莞酷派研发生产基地。\n行业：雷鸟 iO 双 11 到手 1911 元、入门音频 AI 眼镜杀入千元以内；京东光波导智能眼镜销售同比增超 3 倍，雷鸟 iO 单品销量第一。\n隐忧：低价产品退货率、隐私争议与体验瓶颈仍在——行业尚未走出尝鲜怪圈。\n端侧视角：AI 眼镜价格带被产业带制造+平台包销直接砸穿到 300 元档——尝鲜门槛降到冲动消费区间，是 AI 眼镜从极客单品转向国民级消费电子的拐点信号；百元档与两千元档（雷鸟/Rokid）的分层市场正在同时成型。",
      tags: ["AI眼镜", "京东", "酷派", "C2M", "价格战"],
      url: "https://feng.ifeng.com/c/8xqtFAaroQ8",
      image: "images/news/n197.jpg",
      imageCap: "京东×酷派 AI 智能眼镜（图源：凤凰网）",
      highlight: false
    },
  ],
papers: [
    {
      id: "p1", group: "recent", cat: "推理与系统", date: "2026-11-10",
      title: "EngineAgent: Agentizing On-Device LLM Inference Engines with Inference Stack Hierarchy Awareness and Hardware Abilities",
      authors: "Zhengxiang Huang 等",
      venue: "arXiv:2611.14356", level: "预印本",
      summary: "新模型架构与异构移动硬件让端侧推理引擎的适配成为反复出现的高成本系统工程——EngineAgent 把编码智能体引入推理引擎开发：以推理栈层次感知（转换/图构建/算子/硬件后端的跨层依赖）与硬件能力感知为核心，自动诊断跨主机-设备执行路径的失败，大幅降低新模型上端侧引擎的适配成本。",
      detail: "问题：每支持一个新模型需要协调转换、图构建、算子与硬件后端的跨层改动，现有编码智能体看不到这些跨层依赖，也难以诊断主机-设备执行路径上的失败。\n方法：推理栈层次感知+硬件能力感知的智能体系统，自动完成引擎适配与失败定位。\n端侧视角：端侧引擎的「新模型支持速度」是生态瓶颈——把引擎适配本身 Agent 化，等于给端侧推理基建装上自动扩容能力。",
      tags: ["推理引擎", "编码智能体", "端侧部署", "系统工程"],
      url: "https://arxiv.org/abs/2611.14356"
    },
    {
      id: "p2", group: "recent", cat: "端侧智能体", date: "2026-11-10",
      title: "Mobile AI Factory: Building Specialized Language Models for Your Mobile Devices",
      authors: "Mobile AI Factory Team 等",
      venue: "arXiv:2611.13509", level: "预印本",
      summary: "小模型只有为目标任务微调并按目标机型裁剪尺寸才能在手机上跑好，而这今天依赖反复的专家调参——Mobile AI Factory 是一个智能体系统：给定任务描述与目标手机，编排 LLM 自动选择基座、生成训练数据、执行微调与量化、按设备内存约束裁剪，产出一个可直接部署的专用 SLM，全流程无需专家介入。",
      detail: "输入：任务规格+目标手机型号。\n流程：编排 LLM 选基座→数据合成→微调→量化→按设备内存约束定尺寸，产出即部署的专用小模型。\n端侧视角：「每个 App 一个专用小模型」的工厂化流水线——把端侧模型定制的边际成本从专家周级压到自动小时级，是 App 级端侧 AI 经济性成立的关键一步。",
      tags: ["小模型工厂", "自动微调", "量化", "移动端"],
      url: "https://arxiv.org/abs/2611.13509"
    },
    {
      id: "p3", group: "recent", cat: "端侧智能体", date: "2026-11-10",
      title: "HandsOnAid: Building and Evaluating an Offline First-Aid Assistant",
      authors: "HandsOnAid Team 等",
      venue: "arXiv:2611.14059", level: "预印本",
      summary: "无信号、无救护车的紧急场景下，手机上的小语言模型可以救命，但建议必须安全准确——HandsOnAid 用 5550 对急救问答（FirstAidQA）以 QLoRA 微调 4-bit Gemma 2B 构建离线急救助手，对比 7 种配置（基座/4-bit/8-bit/长度下限/安全护栏等），系统评测安全性与准确性的平衡。",
      detail: "模型：4-bit Gemma 2B+QLoRA 微调，数据集 FirstAidQA 5550 对。\n评测：7 种配置对比——基础模型、4-bit 与 8-bit 微调、长度下限与安全护栏变体。\n端侧视角：离线可用是端侧模型不可替代的价值场景——急救建议的「安全优先」约束（拒答优于错答）为所有端侧高风险助手树立了评测范式。",
      tags: ["离线助手", "急救", "QLoRA", "安全评测"],
      url: "https://arxiv.org/abs/2611.14059"
    },
    {
      id: "p4", group: "recent", cat: "能效与评测", date: "2026-11-08",
      title: "Compute Regeneration through Re-Productization: Reorganizing Retired Edge AI Hardware",
      authors: "GEdgeBot Team 等",
      venue: "arXiv:2611.11698", level: "预印本",
      summary: "失去产品支持但算力仍可观的边缘硬件如何再利用——本文把「算力再生」当作系统设计问题：保留计算模组、重设计周边产品组织。案例 GEdgeBot 是一台基于退役 32GB Jetson AGX Xavier 的多语言服务机器人，盘点显示仅该模组即可支撑全部推理，整机暴露五个可复用能力面。",
      detail: "方法：再产品化（re-productization）——保留计算核心、重构产品形态与系统组织。\n案例：32GB Jetson AGX Xavier 驱动的多语言服务机器人 GEdgeBot，源码级盘点算力与能力面。\n端侧视角：端侧算力的生命周期管理——退役不等于报废，为边缘硬件的循环利用提供了系统方法论。",
      tags: ["硬件再利用", "Jetson", "服务机器人", "可持续计算"],
      url: "https://arxiv.org/abs/2611.11698"
    },
    {
      id: "p5", group: "recent", cat: "推理与系统", date: "2026-11-03",
      title: "UMLoad: Fast On-Demand Model Loading on Unified Memory Architecture",
      authors: "UMLoad Team 等",
      venue: "arXiv:2611.04253", level: "预印本",
      summary: "按需模型加载主导着交互式端侧 AI 的响应延迟——统一内存架构（UMA）本应让加载近乎免费（权重放在 GPU 已可见的内存），但现有框架仍沿用分立 GPU 时代的加载流程。UMLoad 在系统层解耦框架逻辑分配与物理放置，将统一内存上的模型加载显著加速。",
      detail: "问题：交互式端侧 AI 首响延迟被按需加载权重主导；UMA 设备（手机 SoC/统一内存 PC）上框架仍走分立 GPU 加载路径，效率浪费巨大。\n方法：系统级加载加速器——解耦逻辑分配与物理放置，面向 UMA 重构加载流。\n端侧视角：多模型常驻切换（手机助手+Agent 工作流）时代，加载速度就是冷启动体验——UMLoad 补上了统一内存架构缺失的系统层。",
      tags: ["统一内存", "模型加载", "延迟优化", "系统层"],
      url: "https://arxiv.org/abs/2611.04253"
    },
    {
      id: "p6", group: "recent", cat: "能效与评测", date: "2026-11-01",
      title: "MedPsy: State-of-the-Art Small Medical Language Models for Efficient Edge Deployment",
      authors: "MedPsy Team 等",
      venue: "arXiv:2611.02011", level: "预印本",
      summary: "最强开源医疗 LLM 太大无法私有部署到边缘设备，紧凑医疗模型在知识密集任务上又差距明显——MedPsy 构建了边缘内存预算内的小型医疗模型系列，并直面推理模型长思维链带来的串行解码、端到端延迟、能耗与 KV 缓存压力问题，在同尺寸取得领先。",
      detail: "矛盾：推理型小模型产出长思维链，串行解码拖高延迟与能耗、KV 缓存挤占内存——边缘部署的双重约束。\n贡献：边缘内存预算内同尺寸最优的医疗小模型系列。\n端侧视角：医疗是端侧隐私的最强动机场景——「推理预算」与「内存预算」同时受限下的模型设计，为所有端侧推理模型提供了样板。",
      tags: ["医疗小模型", "边缘部署", "KV缓存", "推理预算"],
      url: "https://arxiv.org/abs/2611.02011"
    },
    {
      id: "p7", group: "recent", cat: "端云协同", date: "2026-10-31",
      title: "Communication-Efficient Model-Distributed Inference for CBRS Radar Detection",
      authors: "CBRS-MDI Team 等",
      venue: "arXiv:2611.00625", level: "预印本",
      summary: "CBRS 共享频段（3550-3700 MHz）要求准确及时检测在役雷达——频谱图 YOLO 检测器在资源受限边缘设备上运行困难，本文用模型分布式推理（MDI）把模型切分到多台边缘设备协同执行，系统优化切分点与通信量，提升受限设备群的检测吞吐。",
      detail: "场景：3550-3700 MHz 频段的雷达-蜂窝共存检测，YOLO 频谱图检测算力需求超出单台边缘设备。\n方法：模型分布式推理（MDI）——跨边缘设备切分模型，通信高效的切分策略。\n端侧视角：单设备算力不够时「多设备拼算力」是端侧推理的另一条扩展轴——与 Claris Harbor 的 Mac 集群思路在无线侧同构。",
      tags: ["频谱感知", "模型切分", "分布式推理", "边缘设备群"],
      url: "https://arxiv.org/abs/2611.00625"
    },
    {
      id: "p8", group: "recent", cat: "能效与评测", date: "2026-10-30",
      title: "Compression Technique Interactions in Small Language Models: A Factorial Ablation",
      authors: "Compression-Interactions Team 等",
      venue: "arXiv:2611.00464", level: "预印本",
      summary: "量化、剪枝与压缩后恢复技术组合使用时如何相互影响，实践缺乏系统指南——本文对四种 SLM 架构（2.7B-7B 参数）做了 72 种压缩配置的因子消融研究，扩展 48 种组合的次序分析，并在 30 个压缩模型上做基准精度验证与鲁棒性检验。",
      detail: "设计：72 压缩配置×4 架构（2.7B-7B）因子消融+48 配置的施加次序分析+30 模型基准验证。\n发现：压缩技术间的交互效应显著——组合收益非叠加，施加次序影响最终精度。\n端侧视角：给「先量化还是先剪枝」这类日常工程决策提供了首批系统性证据，是端侧压缩落地的操作手册级工作。",
      tags: ["模型压缩", "因子消融", "量化", "剪枝"],
      url: "https://arxiv.org/abs/2611.00464"
    },
    {
      id: "p9", group: "recent", cat: "端侧智能体", date: "2026-10-30",
      title: "Latent-Lens: Visual Perception in Small Language Models Through Latent Communication",
      authors: "Latent-Lens Team 等",
      venue: "arXiv:2610.41751", level: "预印本",
      summary: "多智能体系统中独立 VLM 与小语言模型（SLM）以离散文本交换信息，构成空间与细粒度细节的损失瓶颈——SLM 容量有限尤其依赖输入信号质量。Latent-Lens 借鉴语言模型间潜空间通信方法，让 VLM 的视觉状态以潜变量形式注入 SLM，绕过文本瓶颈传递视觉感知。",
      detail: "问题：VLM→SLM 文本转述丢失空间/细粒度信息，对小容量 SLM 伤害最大。\n方法：潜空间通信——视觉状态以潜变量直通注入 SLM。\n端侧视角：端侧多智能体（本机 VLM+本机 SLM）之间同样存在文本接口瓶颈——潜变量直连让「小模型组合」逼近大模型感知质量，是端侧模型乐高化的关键材料。",
      tags: ["潜空间通信", "多智能体", "视觉感知", "小模型"],
      url: "https://arxiv.org/abs/2610.41751"
    },
    {
      id: "p10", group: "recent", cat: "推理与系统", date: "2026-10-29",
      title: "MulClip: A table-free activation function for reservoir computing on microcontrollers",
      authors: "MulClip Team 等",
      venue: "arXiv:2610.39343", level: "预印本",
      summary: "MCU 上储备池计算的状态更新里，仅 tanh 求值就占 Cortex-M4 上 75% 的耗时——MulClip 提出无查表的轻量激活函数：只用比较、绝对值、乘法与减法引入曲率，并把裁剪阈值置于响应中段，在环形储备池上以极低开销逼近 tanh 的非线性表达。",
      detail: "动机：Cortex-M4 实测 tanh 占状态更新 75% 耗时；查表法占 RAM。\n设计：比较+绝对值+乘法+减法四运算构造单调+折叠响应，阈值置于中段。\n端侧视角：把 MCU 级毫瓦算力上的激活函数成本再砍一刀——极限边缘（传感器节点/穿戴）上算子级优化仍是性价比最高的 AI 落地手段。",
      tags: ["MCU", "激活函数", "储备池计算", "极致边缘"],
      url: "https://arxiv.org/abs/2610.39343"
    },

  ],

knowledge: {
    /* 每周一个知识点（KNOWLEDGE_PLAN.md 16 讲周更，2026-10-25 首期）：weekly 只放元数据+lesson 指针，
       正文与配图在 knowledge/ 子项目（lessons/lesson-NN.js + assets/），点开卡片按需加载 */
    weekly: { no: 3, lesson: 3,
      week: "2026.11.03 — 11.09",
      title: "经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化",
      hook: "13B 以上模型一压 INT8 就「失智」——病根不是权重，是激活里几个大到离谱的值：一个 100 倍的离群值就能绑架整条量化刻度。一篇论文把 0.5% 的刺头拎出去用 FP16 养；另一篇让每一列的量化误差都记账补偿。端侧 4-bit 的直系祖先，就是这两篇。",
      next: "第 4 讲 · 经典量化算法 II：AWQ 与 SmoothQuant——不切维度，把激活的难题搬给权重"
    },
    plan: [
      { no: 1, title: "大模型是怎么装进手机的：一次端侧推理的完整旅程", week: "已完结 · 10.16—10.25" },
      { no: 2, title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT", week: "已完结 · 10.26—11.01" },
      { no: 3, title: "经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化", week: "本周 · 11.08 上线" },
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
