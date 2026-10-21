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
    issue: "2026 · 第 44 期",
    weekRange: "2026.10.15 — 10.21 · 近 7 天",
    updated: "2026-10-21",
    status: "rolling",
    editorsNote: "近 7 天聚焦：监管为端侧智能体定调——工信部确认 AI 手机电脑旗舰已具备端侧自主执行任务能力，超百款终端达 L3 辅助级，AI 终端从「被动响应」转向「主动服务」；Meta 开放 Muse Spark Open（816B 总参/42B 激活，两台 Mac Studio 本地可跑），DeepSeek V4.1 Flash 以 KV 缓存压至 1/4 的架构大幅降低 Agent 成本并全开源推理框架 DeepInfer（单集群日吞吐 155 万亿 token、每卡时收入 38 美元），岩芯矩阵开源固定内存推理的 EdgeRock-4B（KV Cache 固定 72MiB、单卡 512 路并发），PrismML 三元权重 Ternary Bonsai 2 在 iPhone 18 Pro Max 跑到 120 token/s，腾讯混元 Hy Memory 2.0 开源；Apple Intelligence 携千问/万相获批月底入华测试；A2A 智能体互联一周双落地——Rokid 眼镜原生打车、微信鸿蒙版语音操作微信；首个全流程合规智能体手机开售即遭超百款 App 拒绝操控，豆包发起 SAEP 声明协议 30 天公示；Meta 官方确认雷朋眼镜「未唤醒也录音」Bug 并已修复；讯飞 AI 录音环发布（1299 元，无感常驻新形态），跃然第三代 AI 玩具开售，达摩院发布 ASIL-B+D 双认证的玄铁 E908A 车规 CPU，黄仁勋为 OpenClaw 配 OpenShell 零信任容器，社区让 PS5 原生跑 27B 模型。学术侧新作覆盖端云路由与协同推理（HyCo/PriorityFEC）、WebGPU 边缘内核与 TEE 模型保护。今日新增：工信部定调端侧自主执行任务能力、讯飞 AI 录音环发布、DeepSeek 全开源推理框架 DeepInfer。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
  news: [
    {
      id: "n103", cat: "大模型厂商", source: "智东西", date: "2026-10-20",
      title: "DeepSeek 全开源大规模推理框架 DeepInfer：单集群日吞吐 155 万亿 token，公布每卡每小时收入 38 美元",
      summary: "DeepSeek 开源内部大规模推理框架 DeepInfer 与 Token 编解码组件 deepseek-recipe——V4.1 Flash 的高吞吐、低延迟服务即由其承载，单一集群服务吞吐达 155 万亿 token/天；同步公布经营数据：每卡每小时收入 38 美元（约合 254 元）、单卡月收入或超 18 万元——继权重与算子之后，「整机调度层」（推理调度/算力编排/编解码）首次完整公开，社区评价「毫无保留」。",
      detail: "发布要点：10 月 20 日 DeepSeek 宣布全面开源内部大规模推理框架 DeepInfer，并同步开源 Token 编解码组件 deepseek-recipe；DeepSeek V4.1 Flash 的高吞吐、低延迟大规模推理服务即基于该框架实现。\n规模数据：单一集群服务吞吐 155 万亿 token/天；开源内容覆盖大模型推理调度、算力编排与编解码——这是继模型权重与算子库之后，其「整机调度层」首次公开。\n经营数据：公布每卡每小时收入 38 美元（约合 254 元人民币），单卡月收入或超 18 万元；此前 V3/R1 时代曾披露推理系统理论日利润 346 万元、成本利润率 545%——把 API 生意的水位线摊开给了全行业。\n端侧视角：DeepSeek 的历次开源件（权重/算子/缓存技术）最终都汇入本地部署生态——vLLM、SGLang 与 llama.cpp 社区是其最快的下游，调度与编排层开源意味着边缘盒子与私有化部署可直接复用生产级 serving 经验；对端侧更现实的意义在成本锚点——38 美元/卡时的云端价格，正是本地推理价值主张要对标的基准线。\n事件线：与 DeepSeek V4.1 Flash（CSA2 KV 压缩）、岩芯 EdgeRock-4B（固定内存 KV）同属推理成本主线。",
      tags: ["DeepSeek", "DeepInfer", "推理框架", "开源"],
      url: "https://news.qq.com/rain/a/20261020A0DA3W00",
      image: "https://inews.gtimg.com/om_ls/OGldSSeEv6VrHbOpsuC3LGht_UDHTtuvlh2UqSxv6sV70AA_640330/0",
      imageCap: "DeepInfer 开源（图：智东西）",
      highlight: true
    },
    {
      id: "n101", cat: "行业动态", source: "新浪科技", date: "2026-10-20",
      title: "工信部定调：AI 手机电脑旗舰已具备端侧自主执行任务能力，超百款终端达 L3、AI 终端从「被动响应」转向「主动服务」",
      summary: "国新办发布会上，工信部新闻发言人谢存介绍前三季度工业和信息化情况：人工智能手机和电脑旗舰产品已具备端侧自主执行任务能力，AI 终端正从「被动响应」转向「主动服务」——依据《人工智能终端智能化分级》国家标准，超百款覆盖手机、电脑、电视、眼镜、汽车座舱、耳机的 AI 终端产品符合 L3 辅助级能力要求；三季度超 20 款 AI 手机和电脑新品集中发布。",
      detail: "官方表态：10 月 20 日国新办发布会介绍 2026 年前三季度工业和信息化发展情况，工信部新闻发言人、信息通信管理局局长谢存表示——人工智能手机和电脑旗舰产品已具备端侧自主执行任务能力，AI 终端从「被动响应」转向「主动服务」，L3 产品能够理解复杂意图、主动服务用户。\n分级标准：依据《人工智能终端智能化分级》系列国家标准，超百款 AI 终端产品符合 L3 辅助级能力要求，覆盖手机、电脑、电视、眼镜、汽车座舱、耳机等品类；贯标工作稳步推进，标准牵引效应持续显现。\n节奏数据：三季度超 20 款人工智能手机和电脑新品集中发布；电子信息制造业前三季度增加值同比增长 15.8%，1—8 月行业营收 12.8 万亿元、利润总额同比增长 109.9%。\n端侧视角：这是监管层首次以「已具备端侧自主执行任务能力」为旗舰 AI 终端定调——阶跃通过 AI 终端 L3 认证、荣耀过首批智能体手机认证等产业动作，已被国家标准体系吸纳为可度量的分级；「主动服务」的官方表述意味着端侧智能体从厂商叙事变成行业基线，后续新品竞争将围绕 L3/L4 分级展开。",
      tags: ["工信部", "L3标准", "AI终端", "主动服务"],
      url: "https://finance.sina.com.cn/tech/roll/2026-10-20/doc-inivwitp6542897.shtml",
      image: "https://n.sinaimg.cn/spider20261020/600/w800h600/20261020/39e4-a82e6f0fad3ddab6b9b5e2393b34769d.jpg",
      imageCap: "国新办发布会（图：新浪科技）",
      highlight: false
    },
    {
      id: "n102", cat: "AI硬件", source: "中关村在线", date: "2026-10-20",
      title: "讯飞 AI 录音环发布：4+1 麦克风阵列的无感常驻录音设备 1299 元，2 小时录音 10 秒传完、终身不限量转写",
      summary: "科大讯飞进军随身 AI 硬件发布 AI 录音环——4 麦全向 + 1 麦指向的阵列设计自动识别场景并切换录音模式，WiFi 6 传输让 2 小时录音 10 秒传完、2 分钟极速转写；支持 200+ 语言在线识别转写（准确率 98.6%）、说话人分离与 AI 自动提炼，可接入办公助手；标准价 1299 元、会员价 1099 元，含终身不限量转写——继录音卡、录音豆之后 AI 录音硬件再添「无感常驻」新形态。",
      detail: "产品要点：讯飞 AI 录音环为环形可穿戴形态，主打「无感常驻、随时好录」的一整天佩戴录音体验，已上架讯飞官方商城。\n声学设计：4+1 麦克风阵列——4 个全向麦克风负责 360 度覆盖现场声源、1 个指向麦克风专注对话声，自动识别场景并切换录音模式，配合多档专业降噪。\n传输与转写：WiFi 6 超速传输，2 小时录音 10 秒传完；2 分钟极速转写，支持 200+ 语言在线识别转写（准确率 98.6%）、说话人分离、关键词高亮与 AI 自动提炼关键信息，可接入办公助手生态。\n价格权益：标准价 1299 元、会员价 1099 元，附终身不限量转写权益。\n端侧视角：AI 录音硬件的形态谱系一个月内集齐「卡（讯飞 iFLYCard/钉钉 A1）—豆（安克）—环（讯飞）」——环形把采集端做到无感常驻，录音采集在端侧、转写依托云端大模型；「随身记录入口 → 办公智能体的上下文管道」正是大厂密集下注这一品类的原因。",
      tags: ["讯飞", "AI录音环", "录音硬件", "随身AI"],
      url: "https://news.zol.com.cn/1262/12627470.html",
      image: "https://doc-fd.zol-img.com.cn/t_s2000x2000/g8/M00/00/0C/ChMkLWrW1FiIeKClAAOyJPiw4toAAKCRAGyZeQAA7I8213.jpg",
      imageCap: "讯飞 AI 录音环（图：中关村在线）",
      highlight: false
    },
    {
      id: "n98", cat: "行业关注事件", source: "Mashable（编译）", date: "2026-10-19",
      title: "Meta 官方确认雷朋眼镜「未唤醒也录音」的 Bug 并称已修复：睡眠模式无声录音引爆隐私争议",
      summary: "多位用户反映 Ray-Ban Meta 智能眼镜在未说唤醒词、未按键的「睡眠」状态下仍在录音，Meta 官方确认该 Bug 并表示已通过固件修复——继 8 月「指示灯被遮挡即拒录」更新后再度触碰 AI 眼镜最敏感的隐私神经，外媒称「AI 眼镜最大的恐惧成真」；同一周 HTC 披露 Vive Eagle 眼镜隐私设计，主打本地加密存储与语音停止录制，隐私正成为 AI 眼镜第二战场。",
      detail: "事件要点：用户上报 Ray-Ban Meta 眼镜处于待机/睡眠状态时仍在采集音频——没有「Hey Meta」唤醒词、也没有按下录制键；Meta 确认存在该缺陷并称已修复。\n背景线：今年 8 月 Meta 刚推送「指示灯被遮挡即停止录制」的防偷拍更新；本月雷朋眼镜已在欧洲遭遇零售停售（荷兰连锁 Hans Anders）与立法动议（挪威拟公共场所临时禁用），此次事故为监管方提供了新论据。\n同周对照：HTC 披露 Vive Eagle 智能眼镜的隐私设计——本地加密存储与语音停止录制，功能对标 Meta 但主打隐私保护。\n端侧视角：AI 眼镜的社会接受度取决于「可信的物理开关 + 指示灯」这一端侧执行机制——连续两次信任事件都出在录制边界的执行层而非模型层；当佩戴者与非佩戴者的信任都依赖厂商固件自律，硬件级录制开关与本地加密正在从卖点变为行业底线。",
      tags: ["Meta", "雷朋眼镜", "隐私安全", "AI眼镜"],
      url: "https://mashable.com/tech/meta-confirms-smart-glasses-recording-without-being-activated",
      image: "https://helios-i.mashable.com/imagery/articles/00qxpKzBOY9swwOt1U66td9/hero-image.fill.size_1200x675.v1792097187.jpg",
      imageCap: "Ray-Ban Meta 智能眼镜（图：Mashable）",
      highlight: true
    },
    {
      id: "n99", cat: "大模型厂商", source: "量子位", date: "2026-10-19",
      title: "岩芯矩阵开源 EdgeRock-4B：RMA 记忆岩锚把 KV Cache 固定在 72MiB，单卡 80GB 跑 512 路并发、吞吐 6.42 倍于源模型",
      summary: "岩山科技旗下岩芯矩阵联合港科大与 CMU 开源 EdgeRock-4B——由 Qwen3.5-4B 分阶段改造，KV Cache 在 256K 上下文固定为 72MiB（较源模型下降 99.1%）；单卡 80GB Hopper 以 512 路并发跑出 12,124 tokens/s（源模型批 64 时 1,889 tokens/s 的 6.42 倍）；AIME 三年平均 pass@1 保留 96.3%，支持文本与图像输入，权重与代码开源、可商用。",
      detail: "发布要点：岩芯矩阵（Rock Matrix）联合港科大、CMU 开源 EdgeRock-4B——从 Qwen3.5-4B 分阶段改造而来（保留 24 层 Gated DeltaNet 线性注意力，8 层全注意力改为 1024 token 滑窗并叠加 RMA），无需从零预训练；支持文本与图像输入，权重与代码开源、可商用。\n性能数据：KV Cache 在 256K 上下文固定为 72 MiB、较源模型下降 99.1%（批量状态 97.76 MiB/路）；单卡 80GB Hopper 批 512 并发长流推理输出 12,124 tokens/s，为源模型的 6.42 倍，平均 4.94 倍于 Qwen3.5-4B、7.18 倍于 LFM2.5-2.6B。\nRMA 记忆岩锚：维护循环状态 + 1024 token 局部窗口 + 岩锚库（从候选中保留评分最高的 1024 个、分 4 组 KV），使全注意力「近似完整保留」；消融实验显示关掉 RMA 后长文问答准确率从 94.1% 跌至 0.4%。\n能力保留：AIME 2024-2026 平均 pass@1 达 82.9%（保留源模型 96.3%）、MATH-500 保留 97.5%；29 项文本基准中 8 项反超源模型（MMLU-Pro/HumanEval/MBPP），6 项视觉基准平均保留 95.3%；128K→128K 长流推理全程稳定 233.7 tokens/s，每 token 算力恒定。\n端侧视角：继 DeepSeek CSA2 跨层 KV 复用之后，「固定内存循环状态 + 可检索岩锚」给出 KV 压缩的第三条路线——显存不再随上下文增长，对机器人数小时级感知规划等超长智能体流尤其关键；4B 量级叠加开源可商用，把固定内存推理的部署门槛降到了消费级显卡与高端终端可及的范围。",
      tags: ["EdgeRock-4B", "KV缓存", "RMA记忆岩锚", "开源模型"],
      url: "https://finance.sina.com.cn/wm/2026-10-19/doc-inivueuh0952341.shtml",
      image: "https://n.sinaimg.cn/front20261019ac/479/w898h381/20261019/9da8-d2429ff623cec1bb87137503058a34be.jpg",
      imageCap: "EdgeRock-4B 架构（图：新浪财经/量子位）",
      highlight: false
    },
    {
      id: "n100", cat: "芯片厂商", source: "IT之家", date: "2026-10-19",
      title: "达摩院发布首款 ASIL-B+ASIL-D 双认证 RISC-V 车规 CPU 玄铁 E908A，首发自动驾驶与具身智能路线图",
      summary: "RISC-V 中国峰会（深圳）上，阿里达摩院发布车规增强处理器玄铁 E908A——首款同时达到 ASIL-B 与 ASIL-D 功能安全标准的 RISC-V CPU IP，单点安全度量（SPFM）业内首次超过 90%，面向安全岛、域控与车载网关；同场首发自动驾驶与具身智能路线图，下一代 C950A 目标性能为现有 RISC-V 车规产品 5 倍，C950 运行 Qwen3.8-Flash-Next 达 43 token/s。",
      detail: "发布要点：10 月 19 日 RISC-V 中国峰会在深圳举行，达摩院发布玄铁 E908A——首款同时达到 ASIL-B 与 ASIL-D 功能安全标准的 RISC-V CPU IP，单点安全度量（SPFM）业内首次超过 90%，为安全岛、域控、车载网关等场景提供安全可靠的实时计算底座。\n路线图：首次发布自动驾驶与具身智能产品路线图，下一代 C950A 目标性能达现有 RISC-V 车规产品的 5 倍；XT-LINK 多核互联支撑 C950 多核性能线性扩展。\nAI 能力：今年 3 月发布、曾刷新全球 RISC-V 性能纪录的 C950，在四类 Agentic 工作负载上较主流传统架构处理器提升 10% 以上，运行 Qwen3.8-Flash-Next 推理速度达 43 token/s，运行云端 MoE 与端侧 Dense 模型的性能进一步提升。\n行业背景：达摩院孟建熠称 RISC-V 处理器年出货量保持 50% 增长，2030 年市占率预计约 25%——车规功能安全认证曾是 Arm 的护城河，E908A 双认证补上 RISC-V 最大的短板。\n端侧视角：车规是端侧 AI 最苛刻的场景（功能安全 + 实时性双约束）——RISC-V 拿下 ASIL-D 双认证意味着智驾域控与安全岛多出一条非 Arm 供应链选择；43 token/s 的模型运行能力则把「车端跑大模型」的选项从 SoC 厂商延伸到 CPU IP 层。",
      tags: ["玄铁", "RISC-V", "车规芯片", "达摩院"],
      url: "https://www.ithome.com/1/014/960.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/5b0e9162-6a24-4b8a-ad1d-a8ed6e790e35.jpg",
      imageCap: "玄铁 E908A（图源：IT之家）",
      highlight: false
    },
    {
      id: "n95", cat: "行业关注事件", source: "央视新闻", date: "2026-10-18",
      title: "超百款 App 集体拒绝豆包手机助手操控：首个全流程合规智能体手机开售撞上生态墙，豆包发起 SAEP 声明协议",
      summary: "央视新闻报道：我国首个完成「大模型备案—终端入网」完整合规流程的 AI 智能体手机开售，其核心交互是 AI 读懂屏幕、模拟点击——但豆包手机助手被超百款应用集体拒绝操控（不是禁用，而是拒绝被调度）；应用方顾虑安全责任难划清、用户关系与数据主导权让渡。豆包提出「屏幕自动化操作声明协议」SAEP 并启动 30 天规则公示，应用可自主声明允许或拒绝 AI 的操作边界——业界期待其成为智能体时代的「Robots 协议」。",
      detail: "事件要点：央视新闻报道，我国首个走完「大模型备案—终端入网」完整合规流程的 AI 智能体手机开售；其核心交互是屏幕自动化——AI 读懂屏幕内容、模拟人的点击与滑动来完成任务，但豆包手机助手被超百款应用集体拒绝——不是无法使用，而是禁止豆包助手操控应用。\n抵触原因：应用方一怕安全责任——智能体被植入恶意软件或泄露隐私时责任如何划定没有先例；二怕商业生态——用户关系、核心数据、流量入口的主导权，不愿交由手机厂商的 AI 统一调度。\n路线之争：与「读屏幕」相对的是定向 API 接口路线，只开放有限操作入口；历史上早期搜索引擎抓取数据同样遭集体抵制，最终以 Robots 协议划定边界，SAEP 被寄望复刻这一路径。\nSAEP 要点：第三方应用可自主声明操作边界，明确允许或拒绝 AI 助手的屏幕自动化操作，明确拒绝的应用将不再被自动化执行；规则公示期 30 天。\n专家观点：中科院软件所高级工程师郑森文认为，SAEP 有望解决三个痛点——风控一刀切会误伤授权智能体、冲突从事后博弈变事前协商、标准化声明降低数百万款应用的协商成本；但要成为行业标准仍需各方博弈与主管部门规范。\n端侧视角：智能体手机的成败不只在模型与系统，更在应用生态的调度权分配——继阶跃 Step AOS 重构系统、微信 A2A 开放操作之后，本周端侧智能体主线第三次撞上「生态博弈」；SAEP 若立得住，将是端侧智能体拿到应用生态通行证的关键一步。",
      tags: ["豆包", "智能体手机", "SAEP", "应用生态"],
      url: "https://www.chinanews.com.cn/sh/2026/10-18/10716588.shtml",
      image: "",
      imageCap: "",
      highlight: true
    },
    {
      id: "n91", cat: "端侧Agent", source: "IT之家", date: "2026-10-17",
      title: "微信鸿蒙版测试接入 A2A：语音唤醒小艺即可操作微信发消息、打电话",
      summary: "鸿蒙微信移动版 8.0.22 更新接入 A2A 能力——语音唤醒小艺发送指令操作微信，当前支持向好友发送文字消息（不支持表情）、发起语音或视频通话；暂不支持群聊消息与微信分身，需小艺 11.7.8.303 以上版本。继 Rokid 眼镜原生打车之后，A2A 智能体互联协议一周内第二次落地——国民应用微信成为被智能体操作的首个超级 App。",
      detail: "IT之家 10 月 17 日报道：微信鸿蒙版 App 现已支持使用小艺发送微信——据博主 @伤心萨摩耶Ciuciu 透露，鸿蒙微信移动版 8.0.22 更新接入 A2A 能力，支持语音唤醒小艺发送指令操作微信。\n能力边界：当前支持向好友发送文字消息（不支持发送表情）、发起语音或视频通话；暂不支持操作微信向群聊发送消息或发起通话，也不支持操作微信分身；小艺版本需更新至 11.7.8.303。\n端侧视角：这是 A2A（Agent-to-Agent）协议一周内第二次公开落地——上一例是 Rokid 眼镜经 A2A 调用腾讯出行打车，这次是鸿蒙系统智能体小艺经 A2A 操作微信；超级 App 开放智能体操作入口，意味着「智能体接管应用」从演示走进普通用户手机，语音发微信只是第一步。",
      tags: ["微信", "鸿蒙", "A2A协议", "小艺"],
      url: "https://www.ithome.com/1/014/331.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/46e1790f-ecca-4dc5-8d98-4d5dc9253c84.jpg",
      imageCap: "微信鸿蒙版（图源：IT之家）",
      highlight: false
    },
    {
      id: "n92", cat: "大模型厂商", source: "IT之家", date: "2026-10-17",
      title: "DeepSeek V4.1 Flash：552B MoE 将 KV 缓存压至 1/4（SSD 1/8），1017 版帕累托改进，权重 MIT 开放",
      summary: "DeepSeek 全新架构系列最小尺寸模型 V4.1 Flash——Causal-Encoder-Decoder 不对称结构的 552B MoE（输入激活 8B/输出 16B，原生多模态），KV Cache 压缩使 HBM 需求降至上一代 1/4、SSD 降至 1/8，基准超越 V4 Pro；10 月 17 日的 1017 版本再实现性能-成本帕累托改进并承接「许愿式」编程，权重延续 MIT 许可开放。",
      detail: "模型背景（官方公告）：V4.1 Flash 于 9 月 10 日发布，是 DeepSeek 全新模型结构系列中的最小尺寸模型——Causal-Encoder-Decoder 不对称结构（输入激活 8B、输出激活 16B）的 552B MoE，具备原生多模态视觉理解；基准测试超越包括 DeepSeek V4 Pro 在内的旗舰模型，官方已计划下线 V4 Pro 并将其请求路由至 V4.1 Flash。\n缓存架构：新一代结构大幅压缩 KV Cache——对 HBM（显存）的需求降至上一代的 1/4、对 SSD 降至 1/8；配套 arXiv 论文披露采用 CSA2（Compressed Sparse Attention 2）跨层 KV 复用，全局 KV 约 890 B/token 并支持 100 万 token 上下文。Agent 场景缓存命中费用占比高，KV 压缩直接大幅降低长时程智能体任务成本。\n1017 更新：各基准能力较上一版明显提升，任务运行时间与输出长度缩短——多个 Harness 下达到新的性能-费用帕累托最优；基于自反馈强化学习增强从零构建完整项目的能力（游戏开发、3D 建模），可承接提示极简的「许愿式」编程；针对 DeepSeek Harness、腾讯 CodeBuddy 与 WorkBuddy 适配优化。\n生态与开源：权重延续 MIT 许可在 HuggingFace 与 ModelScope 开放；腾讯 WorkBuddy/CodeBuddy 与 OpenCode 作为官方合作伙伴全量接入；定价采用峰谷模式（闲时为高峰一半）。\n端侧视角：KV 缓存是长上下文与 Agent 的第一内存瓶颈——「显存 1/4」的架构级压缩意味着同等硬件可承载 4 倍并发或 4 倍长度的上下文，与论文板块的 PriorityFEC 缓存交接、精度调度同题；MIT 权重让本地部署与蒸馏路线完全开放。",
      tags: ["DeepSeek", "V4.1 Flash", "KV缓存", "CSA2", "MIT开源"],
      url: "https://www.ithome.com/1/014/328.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/ca365e64-d286-4a9b-842d-37162dbd5fe2.jpg",
      imageCap: "DeepSeek V4.1-Flash-1017（图源：IT之家）",
      highlight: false
    },
    {
      id: "n93", cat: "AI硬件", source: "IT之家", date: "2026-10-17",
      title: "社区让 PS5 变成本地 AI 服务器：Vulkan 原生跑 Qwen3.8-27B 达 20.9 token/s，局域网开放 API",
      summary: "开发者基于 llama.cpp 的 PS5 移植项目推出 PS5LM Plus——通过移植 Mesa 的 AMD RADV 驱动与 Vulkan 计算接口实现原生 GPU 运行，可用内存从 6GB 提升到 11.4GB，高度量化的 Qwen3.8-27B 生成速度达 20.9 token/s（PS5 内存带宽 448GB/s）；内置网页聊天界面并经局域网 8081 端口提供 API，兼容 OpenAI/Anthropic 接口格式，opencode、Codex、Claude Code 等工具可直接调用——游戏主机变本地推理盒子（需越狱，有封号风险）。",
      detail: "IT之家 10 月 17 日报道（Wccftech）：开发者 abhi245y 基于资深 AI 工程师 Mert Cobanov 的 PS5LM（llama.cpp 移植项目）开发原生 GPU 应用 PS5LM Plus，让越狱后的 PS5 在本地运行 Qwen3.8-27B 等大模型。\n技术路径：早期版本靠 CPU 运行 27B 模型约 1 token/分钟；新版移植 Mesa 开源项目的 AMD RADV 驱动并通过 Vulkan 计算接口让 llama.cpp 原生运行——可用内存从约 6GB 提升至 11.4GB。\n性能：依托 PS5 的 448GB/s 内存带宽，Qwen3.8-27B（高度量化）生成速度 20.9 token/s，GPU 占用 100%、CPU 仅 2%；更小模型更快——Gemma 4 E4B 约 61 token/s、Llama 3.2 3B 达 124 token/s。\n生态玩法：内置网页聊天界面，局域网 8081 端口提供 API 服务，兼容 OpenAI 与 Anthropic API 格式，opencode、Codex、Claude Code 等工具可直接调用 PS5 上的模型。\n端侧视角：这证明了游戏主机的统一内存架构天然适合本地推理——448GB/s 带宽超过多数桌面独显；不过 16GB 统一内存仍限制模型规模，且越狱有封号风险，属社区样本而非推荐玩法。",
      tags: ["PS5", "本地推理", "llama.cpp", "Vulkan"],
      url: "https://www.ithome.com/1/014/372.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/643504c8-98d7-469d-8baf-64185024da7e.png",
      imageCap: "PS5LM Plus（图源：IT之家）",
      highlight: false
    },
    {
      id: "n90", cat: "大模型厂商", source: "智东西", date: "2026-10-16",
      title: "Meta 开放权重模型 Muse Spark Open：816B 总参 / 42B 激活，两台 M5 Ultra Mac Studio 组 1TB 统一内存本地跑，苹果 CEO 回应「拓展端侧 AI 边界」",
      summary: "Meta 发布迄今最强的美国开放权重模型 Muse Spark Open——总参数 8160 亿、每 token 激活 420 亿（稀疏 MoE），100 万 token 上下文、原生多模态，主攻编程与智能体长程任务；权重已在 Hugging Face 开放下载。官方主打本地部署：借助最新 MLX 框架，两台 M5 Ultra Mac Studio（合计约 1TB 统一内存）即可本地运行，扎克伯格公开感谢与苹果新 CEO 特努斯团队的合作，特努斯回应「Mac Studio 正持续拓展端侧 AI 边界」。",
      detail: "发布要点：总参数 8160 亿、每次推理激活 420 亿（稀疏 MoE 架构），上下文窗口 100 万 token；原生多模态（文本/图像/视频/音频输入）；主打编程与智能体工作流——长周期任务、复杂软件工程与多步推理；权重已在 Hugging Face 开放下载，官方支持 SGLang / vLLM / MLX 三条部署路径，并针对 AMD、苹果、英特尔与英伟达芯片优化；API 经 Baseten、Groq、OpenRouter、Together AI 等平台提供。\n本地部署：官方演示「前沿模型搬上桌面」——两台 M5 Ultra Mac Studio 经最新版 MLX 框架协同（单机最高 512GB 统一内存、两台合计约 1TB，内存带宽 1.2TB/s），现场演示本地修改 iOS 开源客户端代码与操作 DaVinci Resolve 剪辑视频；扎克伯格特别感谢与苹果新 CEO 约翰·特努斯及苹果团队的合作，特努斯在评论区回应「Mac Studio 正持续拓展端侧 AI 边界」。\n端侧视角：816B 本身不是端侧量级，但端侧意义在两头——开放权重是端侧小模型的「水源」（蒸馏母体与量化对象），而 Meta×Apple 围绕 MLX 的本地化合作，把「前沿模型本地跑」从玩家圈推向工作站主流，是开放权重生态与端侧部署工具链合流的标志性一步。\n事件线：本条为「Meta Muse 生态」线的开放权重落子——10-13 发布云端前沿模型 Muse Wonder 后，三天内补齐开源侧。\n合作背景（据 CNBC、Axios、TechCrunch 报道补核）：Apple 与 Meta 达成合作，共同使 Muse Spark Open 更易于在 M5 Ultra Mac Studio（含集群配置）上本地运行——本地部署带来安全与隐私优势并节省云成本；Axios 评价这是两家长期不和的公司「为 AI 尽释前嫌」。",
      url: "https://zhidx.com/p/601572.html",
      image: "https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/268742_Mac_Studio_AKrales_0025.jpg?quality=90&strip=all",
      imageCap: "Mac Studio 本地跑前沿模型（图：The Verge）",
      tags: ["Meta", "Muse Spark Open", "开放权重", "MLX", "Mac Studio"],
      highlight: true
    },
    {
      id: "n105", cat: "大模型厂商", source: "腾讯新闻（亿欧网）", date: "2026-10-16",
      title: "Gemini 4 Argon 具身推理 87% 领跑前沿模型：单张照片生成数千仿真回合，谷歌、OpenAI、DeepSeek 同月入局具身大脑",
      summary: "谷歌 10 月上旬发布 Gemini 4 Argon 的机器人能力——在具身推理基准 ERQA 纯推理得分 87%，超过所有其他前沿模型；Real2Sim 流水线从单张桌面照片合成数十个任务、数千个仿真回合，把下游 VLA 真机成功率从 56% 提升到 75%、完成时间从 35 秒压缩到 24 秒。同期 OpenAI 向全量 ChatGPT 用户推送 GPT-6 Sol/Luna，Physical Intelligence 开放 Pi API Beta，DeepSeek 以约 1.4 亿元参与宇树科创板战略配售——具身大脑赛道挤满巨头。",
      detail: "谷歌侧（另据腾讯新闻 10 月 14 日 Argon 发布报道交叉核验）：Gemini 4 Argon 定位「通用物理推理模型」，具身推理基准 ERQA 纯推理得分 87%；演示链路为「视频生成 MuJoCo 仿真孪生—人手遥操作转移到双臂人形—真机复现」；Real2Sim 从单张桌面照片生成数十个任务、数千个仿真回合，下游 VLA 真机成功率 56%→75%、完成时间 35 秒→24 秒，合成 4500+ 域随机化剧集；抓取放置任务自我改进，首次 58.9 秒、第 3 次迭代 17.4 秒。\n行业格局：OpenAI 于 10 月 7 日向全量用户推送 GPT-6 Sol/Luna（Intelligent UI）；Physical Intelligence 10 月 13 日开放 Pi API Beta（上传数据—托管微调—云端推理—真机执行）；DeepSeek 以约 1.4 亿元参与宇树科创板 IPO 战略配售（锁定 36 个月）；宇树王兴兴在工博会表示具身拐点「快则一两年」。亿欧分析点名四类「最先承压」的公司：套壳方案商、传统示教集成商、单任务垂直 VLA 初创与低质仿真建模商。\n端侧视角：具身智能当前主流是「云端大脑 + 端侧小脑」分层——旗舰模型负责规划与仿真训练，机器人本体上的端侧控制器负责实时执行；Argon 的 Real2Sim 合成流水线同时也是端侧 VLA 小模型的训练数据水源（数千仿真回合可直接用于蒸馏），云端旗舰每一次升级都在抬高本体端侧控制器的对齐目标。\n收录依据：云端旗舰重大发布与格局级事件，按收录标准判例 A 的重要云端资讯例外（v2.13）以端侧视角收录。",
      url: "https://news.qq.com/rain/a/20261016A0EHO000",
      image: "https://inews.gtimg.com/om_ls/Oxy-e5rt3p5ARbTThUkaoJ_MKKTth5gwsTBIRKSt6uDaoAA_640330/0",
      imageCap: "Gemini 4 Argon 具身能力引发行业震动（图：腾讯新闻）",
      tags: ["Google", "Gemini 4 Argon", "具身智能", "VLA"],
      highlight: false
    },
    {
      id: "n87", cat: "大模型厂商", source: "IT之家", date: "2026-10-16",
      title: "腾讯混元开源记忆框架 Hy Memory 2.0：3B 激活专用模型跑赢 Opus 5，MemHub 让 10 种 AI 工具共享一份本地记忆",
      summary: "腾讯混元推出智能体记忆框架 Hy Memory 2.0 并开源三层能力（专用模型+记忆框架+MemHub 应用）——业界首个提出工作记忆与代码记忆的记忆框架，四套基准全面领先 Mem0/MemOS 等开源框架；专用模型 Hy-Memory-30A3B 约 3B 激活参数，宏观平均 55.49% 超过 Claude Opus 5 的 54.62%；MemHub 本地记忆应用支持一键接入 WorkBuddy、Cursor、Codex 等 10 种 AI 工具，跨工具沉淀同一份记忆。",
      detail: "IT之家 10 月 16 日报道：腾讯混元宣布推出智能体记忆框架 Hy Memory 2.0，开源专用模型、记忆框架与 MemHub 应用三层能力——可独立使用也可组合成完整 Memory 方案；已在腾讯内部金融、资讯、知识管理、办公 Agent、社交娱乐与游戏等业务落地。\n框架层：负责聊天、工作、代码三类记忆的存储、更新与进化，SDK 接入 Agent——业界首个提出工作记忆与代码记忆的记忆框架；四套基准上对比 Mem0、MemOS、EverOS 等开源框架均第一：工作记忆平均分 55.31%（领先次优 10.2 个百分点），代码问答准确率 64.2%，聊天记忆准确率 72.6% 且每题 Token 减少 39.3%。\n记忆设计：聊天记忆从零散事实升级为完整事件脉络（合并重复、剥离冲突）；工作记忆以多维度记录任务目标、已确定做法与阶段结果，复用经验前先判断适用条件；长程任务每次续开前自动找回相关决定与仍然适用的经验。\n模型层：Hy-Memory-30A3B 专为记忆场景训练（约 3B 激活参数）——在四套评测框架宏观平均 55.49%，高于 Claude Opus 5 的 54.62%、DeepSeek V4.1 Flash 的 53.64% 与 Qwen3-30B-A3B 的 44.37%。\n端侧视角：记忆是智能体的「外置海马体」——3B 激活的专用模型规模可端侧部署；MemHub 把记忆放回本地并以插件打通 10 种 AI 工具（WorkBuddy、Cursor、Codex、Qwen Code、DeepSeek Harness 等），与此前开源的 TeamAI 同构成腾讯的智能体基础设施拼图。",
      tags: ["腾讯混元", "Hy Memory", "智能体记忆", "开源"],
      url: "https://www.ithome.com/1/014/108.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/aed8144f-1191-4985-9350-654f5c1f29bd.png",
      imageCap: "Hy Memory 2.0（图源：IT之家）",
      highlight: true
    },
    {
      id: "n88", cat: "AI硬件", source: "IT之家", date: "2026-10-16",
      title: "Rokid 携手腾讯出行上线行业首个 AI 眼镜原生打车：A2A 协议智能体直连，全程只动口不动手",
      summary: "乐奇 Rokid 与腾讯出行服务合作上线行业首个 AI 眼镜原生打车——说出目的地即可完成识别需求、发起叫车、选择下单、支付车费全流程，车辆信息与到达时间持续显示在视野中；双方通过 A2A（Agent-to-Agent）标准协议实现智能体直连，腾讯出行把地点推荐、比价、下单、免密支付等能力封装为标准化服务供眼镜端调用——支付与异常处理仍保留手机后备入口。",
      detail: "IT之家 10 月 16 日报道：乐奇 Rokid 宣布与腾讯出行服务合作，上线行业首个 AI 眼镜原生打车服务——接入腾讯出行服务 Agent 后，用户只需说出目的地，眼镜即可完成从识别需求、发起叫车，到选择下单、支付车费的打车全流程，并提示车辆信息与预计到达时间。\n协作架构：乐奇眼镜 Agent 负责理解需求与感知交互，腾讯出行服务 Agent 提供覆盖全流程的 AI 打车——双方通过 A2A（Agent-to-Agent）标准协议实现智能体直连。\n能力封装：腾讯出行把地点推荐、上下车点选择、附近车辆查询、预估价格与多车型比价、一键下单、订单状态实时同步、免密支付等能力封装为面向智能穿戴设备的标准化服务，眼镜端按需调用。\n边界诚实：涉及支付、改目的地与取消订单时，手机仍是更稳妥的后备入口——Rokid 称理想形态是眼镜负责发起需求、实时提醒与环境交互，手机负责复杂确认与异常处理；语音叫车同时降低老人、儿童等群体的使用门槛。\n端侧视角：这是 A2A 智能体互联协议的首个消费级落地样本——AI 眼镜的竞争从硬件参数转向「谁能把服务生态接进视野」，与千问眼镜的虹膜支付、鸿蒙座舱的车载自动化同属「智能体接管服务入口」这条主线。",
      tags: ["Rokid", "腾讯出行", "AI眼镜", "A2A协议"],
      url: "https://www.ithome.com/1/013/964.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/94ab9317-6d25-4d64-a334-5e730ae61024.jpg",
      imageCap: "AI 眼镜原生打车（图源：IT之家）",
      highlight: false
    },
    {
      id: "n89", cat: "AI硬件", source: "IT之家", date: "2026-10-16",
      title: "XREAL One Pro Plus 发布：1200 尼特峰值亮度 + AI HDR，599 美元",
      summary: "XREAL 海外发布 AR 眼镜 One Pro Plus——双 0.55 英寸索尼 Micro-OLED 峰值亮度提至 1200 尼特（前代 700 尼特），新增 AI HDR 改善画面对比度与标准/电影/阅读三种显示模式；重新设计鼻托结构改善贴合，Real 3D 引擎的 2D 转 3D 处理帧率提至 60 FPS；仍搭载自研 X1 空间计算芯片、57 度视场角，定价 599 美元（约 4015 元）。",
      detail: "IT之家 10 月 16 日报道：XREAL 在海外发布新款 AR 眼镜 One Pro Plus，定价 599 美元（约合 4015 元）——主打面板亮度与人体工程学升级。\n显示：双 0.55 英寸索尼 Micro-OLED 面板，峰值亮度最高 1200 尼特（前代 700 尼特）；新增 AI HDR 功能借助 AI 改善画面对比度，并提供标准、电影、阅读三种显示模式。\n结构与引擎：重新设计的鼻托结构改善长时间佩戴舒适性；改进的 Real 3D 引擎可将普通 2D 内容转换为空间感 3D 画面，处理帧率最高 60 FPS；仍搭载自研 X1 空间计算芯片，视场角维持 57 度。\n端侧视角：显示素质（亮度/HDR/3D 转换）是 AI 眼镜「信息呈现层」的硬指标——X1 芯片承担空间计算与 3D 转换的端侧负载；XREAL 在 AURA（Android XR 全场景）之外以 One 系列迭代显示旗舰线，双线并进对撞 Meta。",
      tags: ["XREAL", "AR眼镜", "AI HDR", "Micro-OLED"],
      url: "https://www.ithome.com/1/014/137.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/c35c3078-9523-40c5-af87-f27f51e613a4.png",
      imageCap: "XREAL One Pro Plus（图源：IT之家）",
      highlight: false
    },
    {
      id: "n84", cat: "行业动态", source: "IT之家", date: "2026-10-15",
      title: "库克确认：Apple Intelligence 携阿里千问/万相获批，月底在华发布测试版（不含 Siri AI）",
      summary: "苹果董事会执行主席库克在上海接受采访确认——Apple Intelligence 及相关阿里千问大模型已获批准，将于 10 月晚些时候面向中国用户发布测试版本，首批功能包括实时翻译、书写工具、照片清除等，但 Siri AI 不在此次范围；彭博社称 12 月将随 iOS 27.3 正式推送。获批模型为通义千问（语言）与通义万相（图像/视频生成）——端侧 AI 的中美合规样本落地。",
      detail: "IT之家 10 月 15 日报道：苹果董事会执行主席库克在上海接受澎湃新闻、界面新闻等媒体采访时确认，苹果智能（Apple Intelligence）及相关阿里千问大模型已获得批准，将于 10 月晚些时候面向中国用户发布测试版本。\n功能范围：首批上线实时翻译、书写工具、照片清除工具等，但 Siri AI 不在此次发布范围之内；库克称「很高兴首批核心的苹果智能功能可以慢慢上线」。\n模型侧：此次获批涉及的阿里系模型包括通义千问（大语言模型）与通义万相（图像及视频生成）；彭博社古尔曼此前报道，苹果计划 12 月随 iOS 27.3 为中国用户正式推送，首批功能与 2024 年海外首发版基本一致。\n背景：同日商务部部长王文涛会见库克，就中美经贸关系、人工智能发展等议题交流；国行 iPhone 备案信息此前已新增 Apple 智能、通义千问、通义万相三个大模型编号。\n端侧视角：Apple Intelligence 入华采用「本地+合规云端模型」组合——端侧推理叠加获批的国产大模型，为跨国端侧 AI 的数据合规提供了首个大型样本；Siri AI 缺席首批也说明深度智能体能力仍卡在合规与能力双重门槛上。",
      tags: ["Apple Intelligence", "库克", "通义千问", "入华"],
      url: "https://www.ithome.com/1/013/478.htm",
      image: "",
      imageCap: "",
      highlight: true
    },
    {
      id: "n85", cat: "端侧Agent", source: "IT之家", date: "2026-10-15",
      title: "黄仁勋谈 OpenClaw：首个真正可信的智能体运行框架，英伟达为之开发 OpenShell 零信任容器",
      summary: "英伟达 CEO 黄仁勋在伦敦 Build a Claw 活动上称 OpenClaw 是「迄今最重要的模型之一」与「首个真正可信的智能体运行框架」——像为 LLM 提供外骨骼与实时运行框架；针对智能体安全，他类比早期互联网的容器隔离思路，透露英伟达开发了 OpenShell 系统：默认任何对象不可信、仅授予最低权限（「让自主系统煎蛋，没必要给它电锯」），并对越权行为持续监控告警。",
      detail: "IT之家 10 月 15 日报道（TechRadar）：英伟达 CEO 黄仁勋在伦敦 Build a Claw 活动上表示，OpenClaw 是迄今最重要的模型之一，将推动机器人等多个行业进步——「人工智能迎来转折点，开始变得实用」。\n定位：黄仁勋称 OpenClaw 是「首个真正可信的智能体运行框架」，像外骨骼的大语言模型——本质是为 LLM 提供实时运行框架，「电机、关节、车轮和机械臂都只是工具，最终要由电脑运行的智能体操控」。\n安全设计：他类比互联网早期——网页可获得硬件完全控制权，最直接的解法是容器隔离（操作系统内再运行一个 OS），为此英伟达开发了 OpenShell 系统：开发自主系统时首先假设任何对象不可信、仅授予最低权限。\n权限管控：「让一个自主系统做煎蛋，就没必要给它电锯，它只需要一口煎锅」；英伟达会持续监控自主系统，机器人违反规则或越权即告警，「我们可以决定是否让它闭嘴」。\n端侧视角：OpenShell 与 Windows 的 Execution Containers、OpenClaw 的企业级权限治理同题——智能体运行框架的竞争已经从「能跑」进入「可信隔离+最小权限」阶段，零信任容器正成为端侧智能体的标配底座。",
      tags: ["黄仁勋", "OpenClaw", "OpenShell", "零信任", "智能体安全"],
      url: "https://www.ithome.com/1/013/610.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/bd325a6f-8b9d-4ffb-8dba-b86d624b61fe.jpg",
      imageCap: "黄仁勋谈 OpenClaw（图源：IT之家）",
      highlight: false
    },
    {
      id: "n96", cat: "大模型厂商", source: "IT之家", date: "2026-10-15",
      title: "PrismML 开源 Ternary Bonsai 2：三元权重把 2B 模型压到 0.43GB，iPhone 18 Pro Max 本地跑出 120 token/s",
      summary: "美国初创 PrismML 发布 Ternary Bonsai 2 系列 2B/4B/9B 三个规格——基于阿里 Qwen3.5 底座，参数仅用 -1/0/+1 三种数值编码，存储占用分别约 0.43GB、0.95GB 与 2GB；iPhone 18 Pro Max 上 2B 最高 120 token/s、9B 最高 34 token/s，官方称相较全精度模型最高 5 倍吞吐与 3 倍能效；Apache 2.0 开源，经 llama.cpp 与 MLX 双通道部署，与此前 27B（压缩至 3.9GB、保留 98.2% 综合性能）组成完整端侧产品线。",
      detail: "发布要点：PrismML 于 10 月 15 日发布博文推出 Ternary Bonsai 2 系列 2B/4B/9B 三个规格，底座为阿里 Qwen3.5，支持文本与图片输入；权重以 Apache 2.0 许可开放。\n三元权重：模型参数仅用 -1、0、+1 三种数值编码，配合 FP16 分组缩放（等效约 1.76 bit）——2B/4B/9B 的存储占用分别约 0.43GB、0.95GB 与 2GB，一部手机即可装下覆盖轻量任务到复杂工作流的完整模型线。\n实测性能：iPhone 18 Pro Max 本地推理 2B 模型最高 120 token/s、9B 模型最高 34 token/s；官方称在 RTX 4090 与 M5 Pro 等硬件上相较对应全精度模型可实现最高 5 倍吞吐量与 3 倍能效。\n部署与产品线：经 llama.cpp 在 NVIDIA GPU 运行、经 MLX 在 Mac/iPhone/iPad 部署；与 9 月发布的 Bonsai 2 27B（1-bit 量化压缩至 3.9GB、保留 98.2% 综合基准性能）组成 2B—27B 完整端侧产品线。\n端侧视角：继苹果端侧模型 14GB 占用争议、华为 30B MoE 上机之后，三元/1-bit 极限压缩成为端侧模型的第三条路线——「近无损压缩 + 手机级吞吐」若经第三方复现，Agent 常驻手机的存储门槛将被大幅拉低；另据 36 氪报道苹果已接触 PrismML（未获官方证实）。",
      tags: ["PrismML", "Ternary Bonsai 2", "三元权重", "端侧模型"],
      url: "https://www.ithome.com/1/013/894.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/5097a109-353a-4c05-8d0c-c9d262e1fe3c.png",
      imageCap: "Ternary Bonsai 2（图源：IT之家）",
      highlight: false
    },
    {
      id: "n97", cat: "AI硬件", source: "凤凰网科技", date: "2026-10-15",
      title: "跃然第三代 AI 玩具「光之召唤」开售：奥特曼 AI 互动对话器 599 元，可佩戴形态支持远距离组队对讲",
      summary: "跃然创新第三代 AI 玩具「光之召唤」奥特曼 AI 互动对话器 10 月 15 日众筹收官并正式开售，官方零售价 599 元——把 AI 角色互动、实时通信、多人社交与家庭管理整合进一台可佩戴的「奥特曼彩色计时器」：按压触发与自由实时对话两种模式，具备角色设定、知识内容与长期记忆；支持 4G/Wi-Fi 远距离组队对讲与 AI 互动剧场；基于 2.0 技术平台与自研虚拟操作系统，以边缘节点通信架构支撑设备间实时连接。",
      detail: "产品要点：从 BubblePal 到 CocoMate 再到「光之召唤」，跃然创新的第三代 AI 玩具以奥特曼 IP 为载体、可佩戴彩色计时器形态——能量光效、实体按键与受力自动断开的安全挂绳；官方零售价 599 元，首发赠流量卡与迪迦 NFC 主题币。\n交互能力：按压触发与自由实时对话两种模式；角色设定、知识内容与长期记忆能力让对话可持续积累；好友可经 4G 或 Wi-Fi 远距离组队对讲，AI 互动剧场与 NFC 主题内容扩展玩法。\n技术底座：基于跃然 2.0 技术平台，自研虚拟操作系统降低内容适配难度，边缘节点通信架构支撑设备间实时连接，支持持续更新；配套 App 提供内容推送、设备管理与使用管理。\n端侧视角：AI 玩具是端侧智能体在儿童场景的先落地产物——长期记忆 + 角色设定 + 实时通信的组合本质是「陪伴型 Personal Agent」；跃然之外，字节「显眼包」（内测不对外售卖）、珞博芙崽等已形成赛道，大模型厂商的儿童端入口之争正在展开。",
      tags: ["跃然创新", "AI玩具", "光之召唤", "陪伴智能体"],
      url: "https://sz.ifeng.com/c/8xDX2OH7dM9",
      image: "https://q0.itc.cn/q_70/images03/20261016/b3c4a9adb1654be8a869b02033b0a085.png",
      imageCap: "光之召唤奥特曼 AI 互动对话器（图：搜狐科技）",
      highlight: false
    },
    {
      id: "n104", cat: "行业关注事件", source: "腾讯新闻（全天候科技）", date: "2026-10-15",
      title: "OpenAI 反诉指控前员工带走逾百份 AI 设备机密文件回苹果：法官称「极有可能」发禁令，但拒绝全面检查代码库",
      summary: "苹果 7 月起诉 OpenAI 挖角并窃取商业秘密后，OpenAI 10 月中旬提交反诉文件：指控一名前员工（在 OpenAI 任职约六个月后重返苹果）离职当日将逾百份涉密文件发至个人账户——包含未发布设备的详细图像与高度机密的工程制造数据，并曾向苹果高管演示相关产品计划；苹果否认，称「未发现任何支持 OpenAI 指控的证据」。联邦法官 Davila 表示「极有可能」支持对仍在 OpenAI 任职的前苹果员工发出禁令，但称全面检查设备与代码库是「极其苛刻的要求」，苹果随后将检查范围缩小至少数离职员工。",
      detail: "事件脉络：苹果 7 月先行起诉，指 OpenAI 系统性挖角并窃取商业秘密；OpenAI 反诉文件指控前员工离职当日转移逾百份涉密文件（未发布设备详细图像、高度机密工程与制造数据），并警告苹果工程师或将据此影响其即将推出的产品；苹果回应称有严格政策防止新员工滥用前雇主保密信息，未发现支持指控的证据，并指 OpenAI 意在转移诉讼焦点。\n硬件背景：OpenAI 首款硬件据报道为「无屏幕的小型智能音箱」，设计职能由收购的前苹果设计师 Jonny Ive 团队（io 公司）接管——设备尚未发布即爆发机密之争，凸显 AI 硬件工程的稀缺性。\n端侧视角：此案争夺的核心资产正是「AI 设备团队与工程机密」——OpenAI 的无屏智能音箱是其押注端侧硬件的首作，诉讼结果将直接影响端侧 AI 设备赛道的竞争格局；对端侧读者，这是观察大模型厂商「从云到端」卡位战的标志性诉讼。\n收录依据：涉及端侧核心玩家的重大冲突与行业震动，按收录标准判例 A 的重要云端资讯例外（v2.13）以端侧视角收录。",
      url: "https://news.qq.com/rain/a/20261015A02U0X00",
      image: "https://inews.gtimg.com/news_ls/O8_URXmiGb-vn1SMocFN8L7z6TDGj8L7WLvKEQawiy0asAA_640330/0",
      imageCap: "OpenAI 与苹果商业秘密纠纷升级（图：腾讯新闻）",
      tags: ["OpenAI", "苹果", "商业秘密", "AI硬件"],
      highlight: false
    }

  ],

papers: [
    {
      id: "p1", group: "recent", cat: "安全与隐私", date: "2026-10-15",
      title: "BiShield-TEE: On the (In-)Security of Unilateral Weight Obfuscation",
      authors: "Zhiyuan Wang 等",
      venue: "arXiv:2610.21565", level: "预印本",
      summary: "揭示端侧 TEE 参数混淆的单边变换漏洞——混淆密钥被「解的唯一性」暴露，代表性方案 GroupCover 与 ArrowCloak 的保护可被击穿；提出双边混淆框架 BiShield-TEE，通过输入与输出维度联合混淆诱导「解的歧义性」重建保护。",
      detail: "背景：端侧部署 LLM 越来越普遍（时延与隐私），但专有模型面临逆向与窃取风险；TEE 提供硬件隔离推理，但多数 TEE 参数混淆依赖单边矩阵变换（仅混淆输出侧）。\n漏洞：识别出「解的唯一性」（SDP）缺陷——混淆密钥被唯一确定，暴露真实密钥结构；攻击下 GroupCover 与 ArrowCloak 的保护降至可忽略，攻击准确率超过全屏蔽黑盒基线 2.4 倍并恢复接近完整的模型功能。\n方案：BiShield-TEE 双边框架，联合混淆输入与输出维度诱导歧义解，配合硬件保护重建有效的权重保密。",
      tags: ["TEE", "模型保护", "参数混淆", "端侧安全"],
      url: "https://arxiv.org/abs/2610.21565"
    },
    {
      id: "p2", group: "recent", cat: "推理与系统", date: "2026-10-15",
      title: "PriorityFEC: Deadline-Aware Streaming FEC for KV-Cache Handoff",
      authors: "Han Shen 等",
      venue: "arXiv:2610.21390", level: "预印本",
      summary: "面向边缘多智能体系统的 KV 缓存交接——上游已预填的上下文跨智能体传递时，在严格首 token 时延与不可靠边缘链路下按效用优先传输：效用感知源流把高价值 KV 块排在传输前端，并结合传输层 FEC 保护，让接收方在有限预算内拿到最有价值的 KV 状态。",
      detail: "问题：多智能体 LLM 系统部署在边缘，任务上下文跨智能体传递时上游已算好的 KV 缓存若能复用可省去重复预填——但完整 KV 缓存需在网络传输后才能开始生成，TTFT 截止与不可靠链路下传不完。\n方法：PriorityFEC 联合模型侧 KV 重要性（效用）与传输侧可靠性——构建效用感知源流（高效用 KV 块先传），并用流式前向纠错保护关键块。",
      tags: ["KV缓存", "多智能体", "边缘传输", "FEC"],
      url: "https://arxiv.org/abs/2610.21390"
    },
    {
      id: "p3", group: "recent", cat: "端云协同", date: "2026-10-15",
      title: "Disagreement-Guided Weak-to-Strong Routing",
      authors: "Sima Noorani 等",
      venue: "arXiv:2610.22245", level: "预印本",
      summary: "重审弱到强路由的基础：路由决策可以不依赖真值监督——通过本地推理生成多个弱模型响应，刻画最优弱到强路由策略，并提出基于「模型间分歧」的原则性近似——分歧信号可直接从模型生成响应中测得，无需真值标注即可决定何时把弱模型响应升级给强模型。",
      detail: "背景：小模型部署在边缘与机器人满足成本时延约束，但能力有限需要强模型兜底；开放任务中路由信号通常依赖响应正确性判断，而真值监督难以规模化。\n方法：允许本地推理生成多个弱模型响应并刻画最优路由策略；基于模型间比较推导原则性近似——引入可直接从模型响应测得的「模型分歧」概念。",
      tags: ["弱到强路由", "模型分歧", "端云协同", "无监督信号"],
      url: "https://arxiv.org/abs/2610.22245"
    },
    {
      id: "p4", group: "recent", cat: "端云协同", date: "2026-10-15",
      title: "HyCo: Hybrid Drafting for Cost-Efficient Mobile-Cloud Speculative Decoding",
      authors: "Hanbin Bae 等",
      venue: "arXiv:2610.21436", level: "预印本",
      summary: "设备-云混合投机解码：把服务器模型原生多 token 预测（MTP）头放到设备端执行、把候选分支交给单次 SLM 前传——服务器只返回 MTP 头所需的隐藏状态与 KV；Galaxy S26 Ultra 经 LTE/5G 实测，相对服务器侧 MTP 自投机每 token 的服务器 GPU 时间减少 38.6%。",
      detail: "问题：设备-云投机解码能省服务器算力，但用小模型在手机 NPU 上逐层长草稿树需要反复前传，开销大。\n方法：HyCo 把「深度」交给服务器模型的原生 MTP 头（在设备端执行）、「分支」交给单次 SLM 前传——服务器返回隐藏状态、输入嵌入与 KV 条目而非自己逐步执行；量化、受限词表与 1K token 窗口把两个草稿器都装进 NPU，ε 阈值规则放宽对验证器采样分布的精确保持。\n实测：Galaxy S26 Ultra 单客户端 LTE/5G——Spec-Bench 上每 token 服务器 GPU 时间较服务器侧 MTP 自投机降 38.6%，32K token 摘要任务降 29.2%；较纯 SLM 草稿器多省 9.0 个百分点且投递快 1.9 倍。",
      tags: ["投机解码", "移动端", "MTP", "端云协同"],
      url: "https://arxiv.org/abs/2610.21436"
    },
    {
      id: "p5", group: "recent", cat: "推理与系统", date: "2026-10-13",
      title: "Verification Turns Capability Gaps into Routing Decisions: Small Language Models for Clinical Documentation",
      authors: "Nina Fatehi 等",
      venue: "arXiv:2610.19169", level: "预印本",
      summary: "在幻觉零容忍的临床笔记生成任务上，用固定四评估器验证栈+修正策略，仅更换生成器：4B 参数模型（QLoRA）达到 0.984 的声明级事实蕴含（前沿基线 0.992）、完整度差 3.3 分——全程端侧生成；其缺陷集中在跨节结构保真而非临床理解，且作为显式验证器决策可转化为路由策略：默认跑小模型、验证器否决的再升级。",
      detail: "设定：医生-患者对话生成临床笔记——量大且幻觉零容忍（编造一个化验值就是患者安全风险）；问题是「智能体化验证架构」能否替代生成器规模让小模型可用。\n结果：固定四评估器验证栈与修正策略，仅换生成器——4B+QLoRA 达 0.984 声明级事实蕴含（前沿基线 0.992），完整度差 3.3 分，完全在设备上生成。\n路由价值：小模型的缺陷集中在跨节结构保真（编排而非理解），且是显式验证器决策而非隐性质量差异——可直接变成路由策略：小模型默认、被否决的升级。",
      tags: ["验证架构", "临床笔记", "小模型路由", "端侧生成"],
      url: "https://arxiv.org/abs/2610.19169"
    },
    {
      id: "p6", group: "recent", cat: "推理与系统", date: "2026-10-12",
      title: "GPU Goldmines: Tunable WebGPU Kernels for Edge LLM Inference",
      authors: "Rithik Sharma 等",
      venue: "arXiv:2610.17321", level: "预印本",
      summary: "为 WebGPU 边缘 LLM 推理打造可调内核框架 GPU Goldmines——覆盖矩阵乘、矩阵-向量乘与 Flash Attention 三大构件，跨设备/形状/浏览器建立性能数据库加速后续自动调优；矩阵乘内核几何平均超 ONNX Runtime WebGPU 7.0 倍、超 llama.cpp WebGPU 1.41 倍，并为 llama.cpp 聊天负载带来 1.48 倍的预填阶段端到端提升。",
      detail: "背景：WebGPU 提供跨平台可移植与浏览器可达性，但同一实现在不同环境性能差异大——需要系统化的内核调优。\n方法：GPU Goldmines 框架用于指定、执行与调优 WebGPU 内核；实例化 LLM 三大核心构件（matmul/matvec/flash attention），跨设备、形状与浏览器刻画性能并建立数据库，加速后续自动调优与配置选择。",
      tags: ["WebGPU", "内核调优", "浏览器推理", "Flash Attention"],
      url: "https://arxiv.org/abs/2610.17321"
    },
    {
      id: "p7", group: "recent", cat: "能效与评测", date: "2026-10-11",
      title: "Context-Aware Precision Scheduling for Small Language Models",
      authors: "Mukund Athmaram 等",
      venue: "arXiv:2610.15640", level: "预印本",
      summary: "端侧小模型的上下文感知精度调度：按张量大小与敏感度分配混合精度的最优配置随上下文长度变化——用实测校准的时序模型（而非仅看权重字节数）在时延/精度预算下选配置，KV 缓存变大挤压权重算力时自动降精度，调度可在执行前备好且保留会话 KV 缓存。",
      detail: "问题：端侧 Agent 的上下文持续增长，短上下文选定的混合精度配置在长上下文下不再最优；且「位数少不等于跑得快」。\n方法：在不同精度与上下文长度上校准计时模型，结合张量敏感度在时延或精度预算下选择配置——预测器按校准后的执行成本估计时延；时延预算下读取更大 KV 缓存会压缩权重运算时间，促使分配器选择更低精度。\n工程性：给出可在执行前准备好的张量精度变更调度，运行时跟随调度并保留会话 KV 缓存。",
      tags: ["混合精度", "精度调度", "KV缓存", "时延预算"],
      url: "https://arxiv.org/abs/2610.15640"
    },
    {
      id: "p8", group: "recent", cat: "端侧智能体", date: "2026-10-10",
      title: "PEAM: On-device Communication Agent for Personalized, Efficient and Autonomous Mobile Network Configuration",
      authors: "Haowen Wan 等",
      venue: "arXiv:2610.14855", level: "预印本",
      summary: "端侧 LLM 通信智能体 PEAM：用真实用户标注数据微调端侧模型注入通信知识，空闲时段（如夜间）批量分析历史网络配置记录并跨批反思，沉淀出可在毫秒内执行的个性化网络配置规则——把「切换应用/网络变化时的毫秒级决策」交给本地智能体。",
      detail: "背景：手机上的紧凑 LLM 正在催生自主端侧决策（如 GUI 智能体），但网络配置这类决策有严格时延约束。\n方法：两阶段——规则生成阶段在设备空闲时批量分析历史配置记录并跨批反思，巩固一致证据、降低局部偏置、沉淀稳健配置规则；执行阶段毫秒级应用规则。\n数据与微调：基于人工标注的真实用户数据微调端侧 LLM，把通信知识注入本地模型。",
      tags: ["端侧智能体", "网络配置", "规则生成", "个性化"],
      url: "https://arxiv.org/abs/2610.14855"
    },
    {
      id: "p9", group: "recent", cat: "能效与评测", date: "2026-10-10",
      title: "「Is Low Power Enough?」Rethinking Energy Efficiency in High-Fidelity Sensing",
      authors: "Chae Young Lee 等",
      venue: "arXiv:2610.14714", level: "预印本",
      summary: "重新审视高保真传感节点的选型：要拍图像/录音频，低功耗 MCU 反而更耗能——更强的 STM32N6（带神经加速器）虽功耗 1.9 倍，但完成一次观测（采集+存储+端侧检测+LoRa 传输）快 9.9 倍，总能耗反而低 5.2 倍，推理能耗低 3.2~11.4 倍——「race to sleep」原则在高保真数据与端侧 AI 时代重新成立。",
      detail: "论点：二十年来长寿命传感节点都用最低功耗器件（标量读数毫秒级完成）；但科学家要图像/音频等高保真数据时，低功耗 MCU 需要醒着数秒——低功率不再等于低能量。\n方法：重访传感网早期的「race to sleep」与「talk less」两原则，用带神经加速器的 STM32N6 对比低功耗 Apollo4 Plus。\n结果：STM32N6 功耗高 1.9 倍但观测快 9.9 倍——总能耗低 5.2 倍；同一模型推理能耗低 3.2~11.4 倍，并可塞下精度高 23 点以上的模型。",
      tags: ["能耗", "传感节点", "race-to-sleep", "MCU选型"],
      url: "https://arxiv.org/abs/2610.14714"
    },
    {
      id: "p10", group: "recent", cat: "推理与系统", date: "2026-10-10",
      title: "Linear-Time Non-Local Codec Placement for Machine Learning Model Compression",
      authors: "Matteo Spallanzani",
      venue: "arXiv:2610.14703", level: "预印本",
      summary: "压缩表示需要在计算图里放置编解码算子，但朴素局部放置会抵消压缩收益——本文提出线性时间的非局部放置算法：通过「绝对支配节点」为每个子图找到唯一观察点放置参数化编解码器，四个模型上建模 operand 流量再降 24%~44%。",
      detail: "背景：端侧推理受存储与 operand 流量约束，压缩表示需要编解码算子；朴素放置可能抵消压缩收益。\n方法：给图边着色使每个导出子图弱连通且存在同时支配全部输出、后支配全部输入的「绝对支配节点」——该点即观察子图流量、学习参数化编解码算子的自然位置；算法时间复杂度与图规模线性。\n效果：较朴素局部放置，四个模型上建模 operand 流量降 24%~44%（SigLIP 降 24%、SmolLM2 降 34%）。",
      tags: ["编解码放置", "计算图", "operand流量", "压缩推理"],
      url: "https://arxiv.org/abs/2610.14703"
    },
  ],

  /* ------------- 板块三：知识分享 ------------- */
    knowledge: {
    /* 每周一个知识点（KNOWLEDGE_PLAN.md 16 讲周更，2026-10-25 首期）：weekly 只放元数据+lesson 指针，
       正文与配图在 knowledge/ 子项目（lessons/lesson-NN.js + assets/），点开卡片按需加载 */
    weekly: { no: 1, lesson: 1,
      week: "2026.10.16 — 10.26",
      title: "大模型是怎么装进手机的：一次端侧推理的完整旅程",
      hook: "一台 12GB 内存的手机，凭什么跑得动一个「原始体积上百 GB」的大模型？答案是一条环环相扣的流水线：压缩、分阶段计算、缓存复用、专用芯片——本讲把它从头到尾走一遍。",
      next: "第 2 讲 · 量化入门：从 FP16 到 4-bit，模型体积是怎么压到四分之一的"
    },
    plan: [
      { no: 1, title: "大模型是怎么装进手机的：一次端侧推理的完整旅程", week: "10.25 上线" },
      { no: 2, title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT", week: "11.01" },
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
