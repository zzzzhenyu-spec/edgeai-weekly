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
    issue: "2026 · 第 49 期",
    weekRange: "2026.11.20 — 2026.11.26 · 近 7 天",
    updated: "2026-11-26",
    status: "rolling",
    editorsNote: "近 7 天聚焦：百度如期兑现承诺，文心 5.5 Flash Preview 全量开源（280B MoE、Apache 2.0 可商用，HuggingFace 与 ModelScope 同步上架，支持 vLLM/SGLang 部署）——国产旗舰开源权重再添一档。端侧模型「循环架构」落地三连：Inkling 2 Mini（26.4B 循环 MoE、约 20GB 内存笔记本离线跑）、智谱 GLM-5.4 Coding Plan（国内首款 Loop Transformer），「用循环换参数效率」渐成共识。硬件侧：华为 Mate X8（麒麟 9050 Pro 逻辑折叠芯片）、机械革命 RTX Spark 主机（128GB 统一内存本地跑 2500 亿参数）开卖；迈特芯 MEGA188 3D-TPU 回片点亮（3D 堆叠 DRAM 峰值带宽 600GB/s、5W 下跑 Qwen3-8B 达 80 TPS），与群联「智能 SSD」同周——算力正向存储层下沉。特斯拉 FSD V15 开始推送，车机换上世界模型缩小版 Reality View 实景视图；另有谷歌 Genie 4 开发者开放、中汽中心座舱 AI 分级（C1-C5）、Claude 辅助黎曼猜想证明（1700 万行 Lean 代码）、蚂蚁医疗 AI 五连发开源。千问Go「代打电话」全面免费开放（AI 智能体开始承包订餐厅、找快递这类真实通话事务）；辛米尔科技业界首提「端侧超节点」（异构端侧设备组队计算，吞吐量+270% 为厂商口径）。\n今日新增：文心 5.5 全量开源、千问Go 免费代打电话、特斯拉 FSD V15 推送、迈特芯 MEGA188 点亮、端侧超节点首提。",
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
news: [
{
id: "n307", cat: "大模型厂商", source: "百度官方/开源中国", date: "2026-11-25",
      title: "百度如期全量开源文心 5.5 Flash Preview：280B MoE Apache 2.0 可商用，HuggingFace 与 ModelScope 同步上架",
      summary: "百度按 11 月 11 日发布会承诺的期限（11 月 25 日）正式开源文心 5.5 Flash Preview 完整权重——总参数 280B、每 token 激活 14B 的 MoE 架构，上下文 100 万 token，Apache 2.0 协议可免费商用；HuggingFace 与 ModelScope 同步上架（baidu/ERNIE-5.5-Flash-Preview），支持 vLLM/SGLang 部署。这是基于已开源基座 ERNIE 5.5 Flash-Base（33.5 万亿 token 预训练）的首个后训练版本，主打代码生成、工具使用、3D 建模与多模态；开源社区榜单已将其列为第二大开源模型。",
      detail: "开源：11 月 25 日按期兑现 11-11 承诺（当日上线千帆 API，承诺两周期内开放权重）。\n规格：总参数 280B（2800 亿）、每 token 激活 14B——MoE 稀疏架构；上下文 100 万 token。\n基座：ERNIE 5.5 Flash-Base，33.5 万亿 token 从零预训练；本版为其首个后训练版本。\n能力：代码生成、工具使用、3D 建模、知识工作与内容创作；API 限时五折（输入 1-2 元/百万 token）。\n渠道：HuggingFace 与 ModelScope 同步上架 baidu/ERNIE-5.5-Flash-Preview；支持 vLLM/SGLang 主流推理框架，可本地部署与二次开发；开源社区榜单位列第二。\n端侧视角：280B 总参的 MoE 全量开源把「可商用国产旗舰权重」的门槛再抬一档——14B 激活意味着消费级多卡即可跑推理，与 DeepSeek、GLM 系构成国产开源第一梯队；对端侧的直接意义在工具链：vLLM/SGLang 原生支持让「下载即部署」路径继续标准化，而工具调用强化正是端侧智能体最缺的能力拼图，百度的领域微调方向也给社区二创留了口子。",
      tags: ["百度", "文心5.5", "开源", "MoE", "Apache 2.0"],
      url: "https://www.oschina.net/news/503792",
      image: "images/news/n307.jpg",
      imageCap: "ERNIE 5.5 Flash Preview 上架（图源：ModelScope）",
      highlight: true
    },

{
id: "n310", cat: "大模型厂商", source: "雷峰网/IT之家", date: "2026-11-25",
      title: "千问Go 全面开放免费「代打电话」：订餐厅、找快递、寻失物都交给 AI，通话先亮明身份",
      summary: "11 月 25 日，阿里个人智能体千问Go 的「代打电话」服务结束邀测、全面开放且人人免费：告知拨打对象与需求并授权后，由 AI 代为致电，覆盖订餐厅、找快递、寻失物、定时代打等场景，结束后向用户反馈沟通结果。通话中千问会主动表明 AI 助手身份，外呼前有安全防护机制筛查并拦截风险请求。AI 语音智能体第一次以免费全员开放的姿态承包真实生活事务，电话成为智能体的新入口。",
      detail: "开放：11 月 25 日全面开放免费代打电话，不再限邀测范围。\n功能：联系餐厅预订包间、向酒店询问遗失物品、联系快递员查询配送进度、定时代打电话；事后向用户反馈沟通结果。\n流程：用户告知拨打对象与通话需求→授权后执行；通话中主动表明 AI 助手身份。\n安全：外呼安全防护机制，筛查并拦截存在风险的请求。\n端侧视角：电话是比聊天框更高频的真实世界接口——订餐、快递、失物这类任务第一次被 AI 全量承包且零门槛，等于阿里把语音智能体当作千问 App 的习惯养成入口来打；「亮明 AI 身份＋外呼风险拦截」两道合规设计，会是所有厂商把语音智能体推向真实电话网络的标准动作；下一个悬念是这类常驻智能体何时从 App 下沉到系统层，成为通话/助手入口级能力。",
      tags: ["阿里", "千问Go", "AI电话", "智能体", "语音助手"],
      url: "https://www.leiphone.com/category/industrynews/L9rc3Khgc8pFgYtD.html",
      image: "images/news/n310.jpg",
      imageCap: "千问Go 代打电话功能（图源：雷峰网）",
      highlight: true
    },

{
id: "n304", cat: "手机厂商", source: "雷峰网/凤凰科技", date: "2026-11-24",
      title: "华为 Mate X8 发布：12999 元起全系麒麟 9050 Pro「逻辑折叠」芯片，18:08 开启预售，12 月上市",
      summary: "华为 Mate X8 及全场景新品发布会 11 月 24 日 14:30 在上海举行——全系搭载麒麟 9050 Pro「逻辑折叠τ芯片」：逻辑折叠设计让晶体管数量提升 30%，内置 9 核 16 线程灵犀 CPU（多核性能提升 23%）与支持第二代光线追踪的马良 GPU。售价 12999 元起（12GB+256GB），12GB+512GB 为 13999 元，典藏版 16GB+512GB/16GB+1TB 为 15999/16999 元；18:08 全渠道开启预售，12 月正式上市开售。华为终端本月的星芒 O1 Pro、Mate X8、MateBook Fold S 密集发布矩阵就此收官。",
      detail: "发布：11 月 24 日 14:30 上海「Mate X8 及全场景新品发布会」，18:08 开启预售，12 月上市开售（美团闪购同步首发）。\n芯片：全系麒麟 9050 Pro「逻辑折叠τ芯片」——逻辑折叠设计晶体管数量提升 30%；9 核 16 线程灵犀 CPU，多核性能提升 23%；马良 GPU 支持第二代光线追踪。\n定价：12999 元（12+256）/13999 元（12+512）/15999 元（16+512 典藏）/16999 元（16+1TB 典藏）。\n定位：华为史上最强折叠旗舰；与星芒 O1 Pro（11-20）、MateBook Fold S 组成十一月端侧 AI 硬件矩阵收官。\n端侧视角：麒麟 9050 Pro 的「逻辑折叠」是继 9030S 梯队落位后华为先进制程路线的又一次公开亮相——在同一物理面积里以设计换晶体管密度，端侧 AI 的算力底座继续上探；折叠旗舰+阔直板中端+鸿蒙 AI 电脑三线齐发，意味着麒麟新一代平台的产能已足以支撑多形态同时铺货，这是比单机参数更重要的信号。",
      tags: ["华为", "Mate X8", "麒麟9050 Pro", "逻辑折叠", "折叠旗舰"],
      url: "https://www.leiphone.com/category/industrynews/SA56oov1EKhe9sPs.html",
      image: "images/news/n304.jpg",
      imageCap: "Mate X8 发布会（图源：雷峰网）",
      highlight: false
    },

{
id: "n311", cat: "行业关注事件", source: "量子位/机器之心", date: "2026-11-24",
      title: "辛米尔科技业界首提「端侧超节点」：数据中心超节点架构下沉端侧，异构设备组队计算吞吐量提升 270%",
      summary: "端侧原生 AI Infra 公司辛米尔科技提出「端侧超节点」（Edge SuperPOD）——把英伟达「超节点」（大量芯片紧密耦合为单一高速互连域）的数据中心级思路下沉到端侧：让分散在物理场景中、芯片架构各异的相机、机器人、传感器、边缘盒组成统一系统，围绕同一 AI 任务分工协作。方案含感知融合、弹性调度、异构互联三个环节；官方实测口径为相同硬件、相同模型下有效任务吞吐量提升 270%（厂商自述，未见第三方验证）。配套端侧 AI 操作系统 EdgeFlowOS，已适配 200 余种芯片平台与 100 余种模型。",
      detail: "首提：辛米尔科技（端侧原生 AI Infra 公司）提出「端侧超节点」（Edge SuperPOD），量子位 11 月 24 日报道。\n源流：「超节点」（SuperPOD）最早由英伟达提出——将大量计算芯片紧密耦合为单一高速互连域的系统级架构；辛米尔将该思路下沉到端侧异构设备。\n三环节：感知融合（跨模态特征编码+时空关联统一场景表征，节点间交换结构化事件或紧凑多模态 Token，不重复传输原始视频/点云）；弹性调度（任务拆解为计算图，按设备资源、实时负载、数据位置动态分配——低功耗 NPU 做高频感知、CPU 管通信与业务逻辑、GPU 承担多模态理解、高算力节点按需跑大模型推理）；异构互联（统一跨节点通信与数据交换，按任务依赖与网络条件决定计算留本地还是跨节点）。\n口径：有效任务吞吐量提升 270%——相同硬件、相同模型、仅系统层重组任务实现；为厂商实测自述，未见第三方验证与具体测试场景。\n配套：EdgeFlowOS 端侧 AI 操作系统（模型运行、任务编排、跨节点协同）；已适配 200 余种芯片平台、100 余种通用与专用模型；硬件为模块化多梯度算力+视觉/3D/红外/音频感知产品矩阵；暂无开源计划。\n端侧视角：单机路线在内存墙与功耗墙上内卷时，「组队」给出第三条路——不换芯片不换模型，用系统层把已有的异构算力组织起来；对机器人、智能相机、边缘盒这类天然多设备场景是即插即用的增益。要盯两点：270% 的可复现性，与 EdgeFlowOS 的实际装机量——200 多种芯片平台的适配是脏活累活，但恰恰是端侧 Infra 的护城河。",
      tags: ["端侧超节点", "辛米尔科技", "EdgeFlowOS", "异构计算", "端侧AI"],
      url: "https://www.qbitai.com/2026/11/512362.html",
      image: "images/news/n311.jpg",
      imageCap: "「端侧超节点」异构设备协同计算（图源：机器之心）",
      highlight: false
    },

{
id: "n300", cat: "大模型厂商", source: "凤凰科技/智谱社区", date: "2026-11-23",
      title: "智谱 GLM-5.4 上线 Coding Plan：国内首款 Loop Transformer 架构模型，新增视觉能力，GLM-5.5（3 万亿参数）预告 12 月",
      summary: "智谱 GLM-5.4 已上线 Coding Plan 订阅体系——由智谱全球站负责人李子玄在社区宣布（官方正式发布尚待官宣）：模型名 glm-5.4 即可直接调用，为国内首款 Loop Transformer（循环 Transformer）架构模型，官方称「过去三个月同时激进地 Scaling Loop 和模型大小」；新增视觉能力并进一步提升泛 Coding 性能，V2/V3 与团队版用户使用额度提升至 1.5 倍且每周更新。另据多源报道，3 万亿参数旗舰 GLM-5.5 预计 12 月发布；智谱港股盘中涨超 4%。",
      detail: "宣布：11 月 23 日智谱全球站负责人李子玄社区宣布（正式发布会口径待官宣）。\n架构：Loop Transformer——国内首款循环架构模型；「同时激进地 Scaling Loop 和模型大小」。\n能力：新增视觉能力；泛 Coding 性能提升。\n接入：模型名 glm-5.4 直接调用；Coding Plan 订阅体系上线。\n额度：V2/V3/团队版使用额度 1.5 倍（较 GLM-5.3 增 50%），每周更新。\n后续：GLM-5.5（3 万亿参数旗舰）预计 12 月发布；港股（02513）盘中涨超 4%。\n端侧视角：循环架构（同一组层多次复用换深度）正从研究路线变成产品路线——Thinking Machines 的 Inkling 2 Mini 与商汤 Loop-9B 同周落地后，智谱把 Loop Transformer 带进国产旗舰序列，意味着「用循环换参数效率」的共识在扩大：同等显存预算下更深的计算、更小的权重，正是端侧与本地部署最吃的能力方向；Coding Plan 先行也延续了编程订阅这一当前最确定的变现面。",
      tags: ["智谱", "GLM-5.4", "Loop Transformer", "Coding Plan", "视觉能力"],
      url: "https://tech.ifeng.com/c/8yHj18d4QMM",
      image: "images/news/n300.jpg",
      imageCap: "GLM-5.4 上线公告（图源：智谱社区/凤凰科技）",
      highlight: false
    },

{
id: "n301", cat: "大模型厂商", source: "量子位", date: "2026-11-23",
      title: "蚂蚁医疗健康 AI 五连发：LingSante 系列开源+支持本地部署，「阿福同款」医疗大模型让一台电脑解锁专业医疗 AI",
      summary: "蚂蚁集团一次性发布医疗健康 AI 五连发——LingSante 系列五款产品（air-VL/flash/Live/Pulse/MedGuard）全部开源并支持本地部署，覆盖视觉语言、轻量快速、长程实时、脉冲监测与医疗安全防线五类场景；「阿福同款」医疗大模型宣布开源，全球医生用一台电脑即可解锁专业医疗 AI 能力，开源、本地部署与中医「望闻问切」多模态能力全部到位。",
      detail: "发布：11 月 23 日蚂蚁医疗健康 AI 五连发（量子位报道）。\n家族：LingSante 五款——air-VL（视觉语言）/flash（轻量快速）/Live（长程实时）/Pulse（监测）/MedGuard（医疗安全防线）。\n开源：五款全部开源；「阿福同款」医疗大模型（支付宝 AI 健康管家阿福背后的模型）开放权重。\n部署：支持本地部署——「全球医生一台电脑解锁专业医疗 AI」。\n多模态：中医「望闻问切」全流程多模态能力。\n端侧视角：医疗是数据最敏感、最能兑现「本地部署」价值的行业——蚂蚁把五件套全部开源且可本地跑，等于把医院内网场景的基础设施免费铺到位（MedGuard 安全防线单独成件也呼应了医疗合规刚需）；与「阿福同款」开源合看，这是国产大厂迄今最完整的垂直行业开源+端侧部署组合拳，医疗 AI 的普惠门槛被一次性拉到消费级硬件。",
      tags: ["蚂蚁", "医疗AI", "LingSante", "开源", "本地部署"],
      url: "https://www.qbitai.com/2026/11/512017.html",
      image: "images/news/n301.jpg",
      imageCap: "LingSante 系列五款产品（图源：量子位）",
      highlight: false
    },

{
id: "n298", cat: "AI硬件", source: "Tom's Hardware/TechSpot", date: "2026-11-22",
      title: "群联公布内建 NPU 与 64GB 内存的「智能 SSD」设计：PyTorch/vLLM/llama.cpp 直接在盘上跑，数据搬运省百倍",
      summary: "群联电子（Phison）披露计算存储新设计——SSD 内置 NPU 与最高 64GB 高速内存（带宽达 130 GB/s），AI 工作负载直接在硬盘上运行，不依赖主机 CPU/GPU：盘上可直跑 PyTorch、vLLM 与 llama.cpp 等主流框架，官方称数据搬运量最高降低百倍（计算发生在数据所在处）。计算存储正把「端侧 AI」的边界从 SoC 推进到存储介质本身。",
      detail: "披露：群联计算存储设计（Tom's Hardware/TechSpot 11 月 22 日报道）。\n硬件：SSD 内建 NPU+最高 64GB 高速内存（带宽至 130 GB/s）——AI 推理在盘内完成，不占用主机算力。\n软件：盘上直接运行 PyTorch、vLLM、llama.cpp 等主流 AI 框架与推理引擎。\n效率：官方口径数据搬运量最高降低百倍——「数据不动、计算就位」，绕开存储与 CPU/GPU 间的搬运瓶颈。\n第二设计：pSLC 缓存+QLC 容量单控制器合并（分层存储一体化）。\n背景：延续群联 aiDAPTIVCache（Pascari 企业盘降低 AI 训练成本）路线。\n端侧视角：这是「端侧算力颗粒度」的又一次下沉——此前是手机/PC/眼镜，现在连存储介质都开始长出 NPU：对大模型本地部署的意义在于绕开内存墙（权重直接在盘上推理，64GB 缓存已超过多数端侧设备的统一内存），存储厂商正式加入端侧 AI 芯片竞争；同周炬芯存内计算 NPU 量产落地——存算一体正从论文走进货架。",
      tags: ["群联", "计算存储", "NPU", "智能SSD", "存算一体"],
      url: "https://www.techspot.com/news/114653-phison-shows-ssd-design-npu-64gb-memory-runs.html",
      image: "images/news/n298.jpg",
      imageCap: "群联 PCIe Gen6 SSD 样品 E3.S/E1.S 规格（图源：Tom's Hardware）",
      highlight: false
    },

{
id: "n309", cat: "AI硬件", source: "搜狐科技/腾讯新闻", date: "2026-11-21",
      title: "特斯拉 FSD V15 开始推送：车机换上「世界模型缩小版」Reality View 实景视图，马斯克称效果像在玩 GTA",
      summary: "特斯拉开始向首批用户推送 FSD（Supervised）V15，最受关注的新功能是 Tesla Reality View——车机屏幕放弃传统 3D 建模，改为实时生成的实景视图：整合多路模型信号，端到端呈现车辆周围道路环境与 FSD 的规划动作（转弯路线、停车位置），连路面转向箭头、室内停车场顶棚结构都能识别，马斯克形容「像在玩 GTA」。他解释车上跑的是特斯拉近像素级还原世界模型的缩小版，以全新 Universal Vision Encoder 为核心喂给「驾驶者」与「绘图者」两个模型；受 AI4 算力限制主要面向 AI4 硬件车型，预计 12 月扩大推送范围。",
      detail: "推送：FSD（Supervised）V15 向首批用户开放，预计 12 月扩大更新范围。\n新界面：Tesla Reality View——车机不再显示传统 3D 建模，改为实时生成的实景视图，将多路模型信号整合为端到端可视化画面，同步显示 FSD 规划动作（即将转弯的路线、停车位置等）；可识别路面转向箭头、室内停车场顶棚结构等细节，马斯克称效果「像在玩 GTA」。\n技术：特斯拉自去年起拥有接近像素级还原的世界模型（此前主要用于生成合成训练数据），车上 Reality View 跑的是其缩小版；架构以全新 Universal Vision Encoder（UVE）视觉编码器为核心，喂给「驾驶者」与「绘图者」两个 AI 模型，基于当前视频共享对下一步的预测。\n范围：受 AI4 车型算力限制，目前主要推向 AI4 硬件车型。\n其他：测速照相自动减速、自行车架模式（Bike Rack Mode）、全新视觉编码器。\n端侧视角：车机是端侧 AI 最大的屏幕之一，Reality View 的意义不在「炫」而在信任界面——端到端模型不可解释，实时实景渲染等于把世界模型的内部预测「翻译」给乘客看，这是端到端自动驾驶规模化必须补的界面课；同时「AI4 算力不够就吃不上新功能」再次证明端侧算力就是功能边界，世界模型上车的下一步竞争是渲染成本与推理预算的平衡。",
      tags: ["特斯拉", "FSD V15", "世界模型", "车机", "Reality View"],
      url: "https://m.sohu.com/a/110553429_236796",
      image: "images/news/n309.jpg",
      imageCap: "FSD V15 车机 Reality View 实景视图（图源：搜狐科技）",
      highlight: false
    },

{
id: "n302", cat: "大模型厂商", source: "智东西/HuggingFace", date: "2026-11-21",
      title: "穆拉蒂 Thinking Machines 开源 Inkling 2 Mini：26.4B 循环架构 MoE，约 20GB 内存笔记本可离线跑，智能体编码达同级 SOTA",
      summary: "Thinking Machines Lab（前 OpenAI CTO 米拉·穆拉蒂联合创办）开源 Inkling 2 Mini——总参数 26.4B、激活 3.4B 的 MoE+循环 Transformer 混合架构（24 层分四模块、中间两模块每 token 运行三次），内存占用约 20GB，消费级笔记本/台式机可离线运行（有人已在 MacBook Pro 上离线构建飞行模拟器）；NVFP4 精度训练、专家从 384 剪枝至 128。智能体编码能力达同级 SOTA（DeepSWE v1.1 得分 48.2%、Vals Index v2.2 得分 46.5%），超过 Qwen3.8-27B 等同级模型；HuggingFace 开放权重+模型卡，另发布可变循环（1-5 次）研究模型。",
      detail: "发布：11 月 21 日（Thinking Machines Lab，HuggingFace 权重+模型卡公开）。\n架构：总参 26.4B/激活 3.4B，每 token 有 5.4B 权重激活值——MoE+循环 Transformer：24 层分四个模块，中间两个模块每个 token 循环运行三次；注意力残差+门电路机制。\n训练：4 位 NVFP4 精度；专家从 384 剪枝至 128。\n本地：内存占用约 20GB，消费级笔记本/台式机离线可跑；32GB 内存 Mac 可经 Ollama 运行；实测 96GB M5 Ultra Mac Studio 速度优异。\n成绩：DeepSWE v1.1 得分 48.2%、Vals Index v2.2 得分 46.5%——同级 SOTA，超 Qwen3.8-27B；FrontierCode v2.0 领先、Terminal-Bench 4.0 与 Qwen3.8-27B 打平；多轮对话与复杂约束指令跟随弱于对手。\n附发：TML-d24-varloop-research 可变循环（1-5 次）研究模型同步开源。\n端侧视角：「一份权重、可变深度」是循环架构给端侧的最大红利——推理时按任务难度选择循环次数，等于用同一个 20GB 模型覆盖快慢双档，正对应端侧设备算力/电量双预算的现实约束；穆拉蒂团队把旗舰实验室的架构创新直接开源成笔记本可跑的权重，与 llama.cpp 生态（Ollama 一条命令拉起）无缝衔接——「研究前沿」与「本地可用」之间第一次几乎没有时差。",
      tags: ["Thinking Machines", "Inkling 2 Mini", "循环架构", "开源", "本地部署"],
      url: "https://m.sohu.com/a/1104506413_121423427",
      image: "images/news/n302.jpg",
      imageCap: "Inkling 2 Mini 开源（图源：智东西）",
      highlight: true
    },

{
id: "n294", cat: "手机厂商", source: "快科技/界面新闻", date: "2026-11-21",
      title: "华为星芒 O1 Pro 首销战报：16GB 版全平台售罄，国补后 4999 元起，总经理回应定价争议「在便宜和创新之间选创新」",
      summary: "星芒 O1 Pro 于 11 月 20 日 18:08 开售，次日凌晨星芒品牌总经理刘赫公布首销进展：16GB 版本全平台售罄、远超预期，12GB 版仅部分门店与平台伙伴有现货，正全力协调产能。首发价 5499 元起、叠加国补 4999 元起；针对「定价偏高」争议，刘赫回应「在便宜和创新之间选择创新」并称努力贴近 4999 元价位。余承东已换用该机作为主力机。",
      detail: "首销：11 月 20 日 18:08 全渠道开售；11 月 21 日凌晨公布战报。\n战报：16GB 版全平台售罄（远超预期）；12GB 版部分门店/平台现货，产能协调中。\n价格：5499 元起（12+256 首销），叠加国补 4999 元起；四档至 16GB+1TB（16GB 版独占紫色）。\n回应：总经理刘赫谈定价争议——「在便宜和创新之间选择创新」，努力贴近 4999 元价位。\n细节：余承东已换用 O1 Pro 作主力机；「首款为 AI 而生的鸿蒙手机」（16:9.5 阔直板+麒麟 9030S）。\n端侧视角：首销即售罄出现在中端价位档（而非旗舰），是「AI 手机从旗舰叙事走向大众换机理由」的第一个放量信号——阔直板形态+鸿蒙智能体在 5000 元档的接受度得到市场验证；16GB 高配版先售罄也说明端侧 AI 体验对内存档位的敏感，正在转化为消费者的真金白银投票。",
      tags: ["华为", "星芒", "O1 Pro", "首销售罄", "AI手机"],
      url: "https://news.mydrivers.com/1/1167/1167469.htm",
      image: "images/news/n294.jpg",
      imageCap: "星芒 O1 Pro（图源：快科技）",
      highlight: false
    },

{
id: "n296", cat: "大模型厂商", source: "量子位/XDOF", date: "2026-11-21",
      title: "GPT-6.2 Astra 具身评测成功率翻倍：Ember-0 双臂基准 16 项任务 19.6%→41.2%，首破「打结」与「展开 T 恤」",
      summary: "机器人基础设施公司 XDOF 发布双臂操作基准 Ember-0（16 项任务×每项 30 次重复，单日约 480 场实测）：GPT-6.2 Astra 综合成功率 41.2%，较两个月前 GPT-6 Astra 的 19.6% 翻倍；平均预测延迟从 15 秒降至 10.1 秒。「给绳子打结」「展开 T 恤」两项此前无模型成功的任务首次被突破，「用夹子夹起面包」从 10% 跃升至 90%。同日新加坡国立大学团队的 RoboColosseum SO-101 榜上 GPT-6.2 Astra 一天内登顶 Elo 首位，OpenAI 官方账号转发评价。",
      detail: "基准：XDOF Ember-0——双臂机器人 16 项操作任务、每项重复 30 次，单日约 480 场实测，人工标注子步骤/抓取失误/碰撞。\n成绩：综合成功率（16 项等权）19.6%（GPT-6 Astra，9 月）→ 41.2%（GPT-6.2 Astra）；平均预测延迟 15 秒 → 10.1 秒。\n零突破：「给绳子打结」「展开 T 恤」——此前 143 次 T 恤展开测试中无任何模型成功。\n单项：「用夹子夹起面包」10% → 90%；任务覆盖空间推理/双臂协作/工具使用/柔性物体/长程规划。\n旁证：新加坡国立大学 Jiafei Duan 团队 RoboColosseum SO-101 Elo 榜一天内登顶；OpenAI Developers 官方转发、Greg Brockman 发文称赞。\n端侧视角：通用大模型正在以「翻倍/两个月」的斜率吃掉专用具身模型的领先身位——19.6%→41.2% 意味着双臂精细操作从「偶尔成功」进入「可用区间」；XDOF 同时提醒基准或将被能力饱和，具身评测的军备竞赛与模型能力竞赛开始互相追赶。世界模型与实时操控（Genie 4 类模拟器）+ 通用模型操控（Astra 类）两条路线在同一周内都有大动作，具身智能的「模型层」格局正在加速收敛。",
      tags: ["OpenAI", "GPT-6.2 Astra", "具身智能", "Ember-0", "双臂机器人"],
      url: "https://www.qbitai.com/2026/11/511779.html",
      image: "images/news/n296.jpg",
      imageCap: "Ember-0 基准综合成功率对比（图源：XDOF/量子位）",
      highlight: false
    },

{
id: "n292", cat: "大模型厂商", source: "微软开发者博客", date: "2026-11-20",
      title: "微软开始向 Windows 设备推送本机 AI 模型 Aion 1.0 Instruct：接替 Phi Silica，上下文 3.5K 升 32K，GPU 支持在路上",
      summary: "微软按期开始通过 Windows Insider 计划向 Copilot+ PC 推送本机 AI 基础模型 Aion 1.0 Instruct（2.3B）——正式接替 Phi Silica 成为 Windows 本机 AI 底座：上下文长度从 Phi Silica 约 3.5K token 大幅扩至 32K token，面向文本生成、翻译、语言检测等本机 AI 功能；12 月 4 日扩展至更多 Insider Preview 设备并新增 GPU（含 NVIDIA）支持，2027 年 1 月下旬推向符合硬件条件的零售设备。微软 10 月已提供独立测试套件供开发者提前验证兼容性。",
      detail: "推送：11 月 20 日起 Windows Insider → Copilot+ PC（按期兑现，11-16 提前开源模型权重）。\n模型：Aion 1.0 Instruct 2.3B——Windows 本机 AI 基础模型，接替 Phi Silica。\n跃迁：上下文约 3.5K → 32K token（近 10 倍）；文本生成/翻译/语言检测等本机能力。\n路线：12 月 4 日扩至更多 Insider 设备+GPU（含 NVIDIA）支持；2027 年 1 月下旬至零售设备。\n生态：10 月已发独立测试套件；HuggingFace 权重开放（microsoft/Aion-1.0-Instruct-2.3B）。\n端侧视角：操作系统级 AI 底座的换代——Phi Silica 三年多的 NPU-only 路线升级为「NPU+GPU 双通道」，32K 上下文让本机模型从「短语级辅助」进入「文档级任务」；与苹果 AFM3、麒麟 9050 小艺同月，三大平台的 OS 级端侧底座全部完成换代——本机模型正式成为操作系统的标准组件。",
      tags: ["微软", "Aion Instruct", "Windows", "本机AI", "32K上下文"],
      url: "https://devblogs.microsoft.com/foundry-on-windows/aion-instruct-local-ai-windows-gpu",
      image: "images/news/n292.jpg",
      imageCap: "Aion Instruct 推送（图源：iThome/微软）",
      highlight: false
    },

{
id: "n291", cat: "手机厂商", source: "快科技/第一财经", date: "2026-11-20",
      title: "华为星芒 O1 Pro 正式发布：5499 元起的鸿蒙 AI 手机，麒麟 9030S+阔直屏+2 亿像素，星芒品牌首秀",
      summary: "华为星芒（OSTA）品牌发布会今日 14:30 举行，首款机型 O1 Pro 正式发布——5499 元起（12GB+256GB 首销价，四档至 16GB+1TB），定位「年轻人的首台鸿蒙 AI 手机」：16:9.5 比例 1.5K 阔直屏、2 亿像素主摄、麒麟 9030S 处理器，夜空黑/星云白/紫（16GB 独占）三色。余承东亲自发布，阔直板形态向中端价位普及；同场发布鸿蒙智行享界 V8。",
      detail: "发布：11 月 20 日 14:30 星芒品牌发布会（快科技/第一财经多源）。\n定价：5499 元起（12+256 首销，原价 5699）；12+512/16+512/16+1TB 三档，紫色独占 16GB 版。\n配置：16:9.5 阔直屏 1.5K LTPS；2 亿像素主摄；麒麟 9030S。\n定位：年轻人的首台鸿蒙 AI 手机——阔直板形态（Pura X View 同款设计语言）下放。\n简配：爆料口径不支持无线充电与卫星通信（成本取舍）。\n端侧视角：麒麟 9050（旗舰）+9030S（中端）梯队落地首机——端侧 AI 能力（鸿蒙智能体+小艺）随 NPU 档位下探 5000 元档，「AI 手机」从旗舰叙事变成中端标配；与 Mate X8（11-24）构成华为本月中高端双弹，星芒品牌矩阵（手机+享界 V8 同场）意味着华为终端 AI 全价位段布局完成。",
      tags: ["华为", "星芒", "O1 Pro", "麒麟9030S", "鸿蒙AI手机"],
      url: "https://news.mydrivers.com/1/1167/1167296.htm",
      image: "images/news/n291.jpg",
      imageCap: "华为星芒 O1 Pro 发布（图源：快科技）",
      highlight: false
    },

{
id: "n306", cat: "行业关注事件", source: "搜狐汽车/观点网", date: "2026-11-20",
      title: "中汽中心推出国内首个智能座舱 AI 分级评价体系：C1 规则响应到 C5 全域智能五级，覆盖八大能力九大场景",
      summary: "中国汽车技术研究中心发布国内首个汽车智能座舱 AI 能力分级评价体系——把座舱 AI 划分为 C1 规则响应、C2 场景辅助、C3 主动服务、C4 自主协同、C5 全域智能五个等级，评价维度覆盖感知、执行、自主、进化等八大能力和智慧出行、情感陪伴、健康关怀等九大用车场景，把主观的座舱体验转化为可量化指标。调查显示 20 万元以上国产新能源汽车的座舱 AI 搭载率已超 90%，分级体系为消费者购车提供了横向可比的参照。",
      detail: "发布：中汽中心（11 月 20 日多方报道），国内首个智能座舱 AI 能力分级评价体系。\n分级：C1 规则响应座舱（至少具备感知、规划等能力）→ C2 场景辅助 → C3 主动服务 → C4 自主协同 → C5 全域智能。\n维度：感知/执行/自主/进化等八大能力与行为属性；智慧出行/情感陪伴/健康关怀等九大用车场景。\n背景：20 万元以上国产新能源车座舱 AI 搭载率超 90%——分级把主观体验变成可量化、可横向比较的指标。\n端侧视角：座舱是端侧 AI 算力最大的车载出口，但「智能座舱」长期是营销话术——C1-C5 分级第一次给了公共度量衡，直接效果是压缩「贴牌智能」的水分空间；对芯片与模型供应商意味着分级考评将成为车规端侧算力的新标书门槛，与手机端侧跑分类似，评测体系先于用户感知成型。",
      tags: ["中汽中心", "智能座舱", "AI分级", "C1-C5", "评价体系"],
      url: "https://www.sohu.com/a/1103929994_121345914",
      image: "images/news/n306.jpg",
      imageCap: "智能座舱 AI 分级评价体系发布（图源：搜狐汽车）",
      highlight: false
    },

{
id: "n297", cat: "行业关注事件", source: "机器之心/搜狐科技", date: "2026-11-20",
      title: "Anthropic 数学家宣称在 Claude 辅助下证明黎曼猜想：1700 万行 Lean 代码通过形式化验证，陶哲轩称「验证仍需时间」",
      summary: "11 月 20 日，Anthropic 数学家 Levent Alpöge（34 岁）在个人网站发文，宣称在 Claude 帮助下找到黎曼猜想的证明，且方法可推广至广义与扩展黎曼猜想。他没有提交传统论文，而是直接公布整套 Lean 形式化证明——14 个压缩文件、约 1700 万行代码（折合超过 25 万页）另附 4 页说明，据报已通过 Lean 逐步机器验证。陶哲轩初步分析认为证明用到朗兰兹纲领与算术几何成果，但验证仍需时间；「机器验完了，人还没读懂」成为数学界这个黑色星期五的注脚。",
      detail: "宣布：11 月 20 日 Alpöge 个人网站发文（时点在 Anthropic 11 月 19 日上市次日）。\n形式：无传统论文——14 个压缩文件、约 1700 万行 Lean 代码（折合超 25 万页）+4 页说明；声称已通过 Lean 形式化逐步验证。\n范围：黎曼猜想本体，方法声称可推广至广义黎曼猜想（GRH）与扩展黎曼猜想。\n评审：陶哲轩博客初步分析（用到朗兰兹纲领+算术几何），明确「验证仍需时间」；距数学界正式承认还差四步——命题一致性核验、机器独立验证、人类读懂论证、同行广泛审查。\n背景：今年 8 月 Anthropic 内部实验中非数学专业员工让 Claude 直接攻黎曼猜想未成功；本次是数学家与模型协作路线的首个候选成果。\n反应：学界复杂——「人类提供直觉、机器填平天堑」的范式转变论 vs 25 万页超出人类审阅能力的认知困境；多位菲尔兹奖得主发声。\n端侧视角：这场事件有一条被忽视的端侧线——Lean 证明产物完全公开，任何人都可以把这 1700 万行代码下载到自己的笔记本上独立复现验证，形式化验证的「可本地复现性」是它区别于纯口头 AI 突破的关键；生成证明的超长推理链依赖云端旗舰模型，而验证可以在本地完成——「云端生成、本地验证」正在成为 AI 产物的新信任分工。25 万页超出人类审阅能力、机器验证成为唯一可行通路，也预示 Lean 类形式化工具链将在 AI 时代基建化。",
      tags: ["黎曼猜想", "Claude", "Lean", "形式化验证", "Anthropic"],
      url: "https://m.sohu.com/a/1104301381_610300",
      image: "images/news/n297.jpg",
      imageCap: "Alpöge 宣布原文（图源：机器之心）",
      highlight: true
    }
  ],
papers: [
    {
      id: "p15", group: "recent", cat: "端侧智能体", date: "2026-11-17",
      title: "LMMR: Learned Multigranular Memory Retrieval for Small Language Model Agents",
      authors: "LMMR Team 等",
      venue: "arXiv:2611.22425", level: "预印本",
      summary: "小语言模型智能体的内存预算装不下多跳问题所需的记忆——相关事实散落在记录里，周边文本耗尽宝贵的空间。LMMR 提出可学习的多粒度记忆检索：同时决定「读下一个来源」与「读它多少」——把段落与句子片段链接回原始来源，并为同一缺失证据配对多个视图，让小模型在有限上下文里精准取材。",
      detail: "问题：小模型 Agent 的记忆空间装不下多跳问答所需上下文。\n方法：LMMR——学习「选哪个来源+读多少」的多粒度检索；段落/句子片段链接原始来源；同证据多视图配对。\n端侧视角：记忆检索是端侧智能体的核心瓶颈——与 Memoket（硬件记忆）、智元 LIFE（可塑性记忆）同向但解决的是「读」侧：硬件负责记全、LMMR 负责读准，端侧记忆栈的学术拼图。",
      tags: ["记忆检索", "小模型智能体", "多粒度", "上下文预算"],
      url: "https://arxiv.org/abs/2611.22425"
    },
    {
      id: "p16", group: "recent", cat: "端侧智能体", date: "2026-11-16",
      title: "Building Fully On-Device GUI Agents with Mobile NPUs",
      authors: "NPU GUI Agents Team 等",
      venue: "arXiv:2611.20772", level: "预印本",
      summary: "手机 GUI 智能体大多仍依赖云端模型或远程推理——重复通信延迟、隐私暴露与网络依赖是三大痛点。本文在手机 NPU 上构建完全端侧的 GUI 智能体：现代智能手机 NPU 为全端侧 LLM 推理提供了理想基座，但直接部署常规 GUI 智能体流水线会遇到算子与内存约束——论文给出面向 NPU 的管线重构方案，让「自动操作手机」全程在设备内完成。",
      detail: "问题：GUI 智能体云端依赖——通信延迟/隐私/网络可用性。\n方案：面向手机 NPU 重构 GUI 智能体流水线（算子适配+内存约束下的管线重设计）。\n端侧视角：GUI 智能体是端侧 Super App 级应用——屏幕理解+动作生成双负载对 NPU 利用率的工程答卷；与 WorkBuddy 千万日活、微信小微预告设备端推理同周，端侧智能体的「最后一公里」（本地 GUI 操作）有了学术基线。",
      tags: ["GUI智能体", "手机NPU", "全端侧", "管线重构"],
      url: "https://arxiv.org/abs/2611.20772"
    },
    {
      id: "p14", group: "recent", cat: "推理与系统", date: "2026-11-16",
      title: "Nemotron 3.5 Bolt E4B 4GB: An Open and Efficient Small Language Model for Fast Conversational Agents",
      authors: "NVIDIA Nemotron Team 等",
      venue: "arXiv:2611.20771", level: "预印本",
      summary: "英伟达发布开源小语言模型 Nemotron 3.5 Bolt E4B 4GB——基于 Gemma-4-E4B-it 后训练，针对「每 GB 内存的智能与速度」优化，面向快速对话智能体：继承 Gemma 对话能力并强化多轮工具调用、指令遵循与输入接地，为本地语音/设备助手、交互人设与嵌入式环境设计——与 RTX Spark 生态（本地跑 Nemotron 3 Ultra）形成「PC 大档+小档」双线。",
      detail: "模型：Nemotron 3.5 Bolt E4B 4GB（基于 Gemma-4-E4B-it 后训练，开放权重）。\n优化：每 GB 内存的智能与速度（4GB 内存档）——多轮工具调用/指令遵循/输入 grounding 强化。\n定位：本地语音助手、交互人设、嵌入式设备。\n端侧视角：英伟达的开源端侧双线成型——RTX Spark 跑 Nemotron 3 Ultra（PC 重档）、Bolt E4B 4GB 面向 4GB 内存小档（嵌入式/语音助手），「按内存分档」的产品化思路与 Astra/Sol 的任务分层同一哲学。",
      tags: ["英伟达", "Nemotron", "4GB", "对话智能体", "开源"],
      url: "https://arxiv.org/abs/2611.20771"
    },
    {
      id: "p11", group: "recent", cat: "推理与系统", date: "2026-11-12",
      title: "Metal Sandbox: Isolated Execution and Command Scheduling for GPU Coding Agents on Apple Silicon",
      authors: "Haozhe Wang 等",
      venue: "arXiv:2611.17294", level: "预印本",
      summary: "为 Apple Silicon 生成 Metal GPU 内核的编码智能体需要反复在「模型请求-开发命令-GPU 执行」间切换，GPU 大量时间在空转——Metal Sandbox 构建了跨多台互联 Mac 的智能体基础设施：每实例受限文件访问+原生命令执行+命令级调度，各智能体保留独立工作区与私有开发环境，GPU 空闲档位被命令调度复用，训练与评测效率大幅提升。",
      detail: "问题：Metal 内核生成智能体的会话里 GPU 大部分 rollout 时间闲置。\n方法：受限 per-instance 文件访问+原生命令执行+跨互联 Mac 的命令级调度，多智能体并发且互不干扰。\n端侧视角：端侧推理基建（Metal/苹果芯片）的开发工具链正在 Agent 化——当「给端侧硬件写内核」本身交给智能体并行完成，端侧算子的迭代速度将摆脱人力瓶颈，这篇是基建自动化的底层设施。",
      tags: ["Apple Silicon", "GPU智能体", "Metal", "调度系统"],
      url: "https://arxiv.org/abs/2611.17294"
    },
    {
      id: "p12", group: "recent", cat: "端云协同", date: "2026-11-12",
      title: "Acoustic Respiratory Phase Detection on Mobile Devices",
      authors: "Julian Szymanski 等",
      venue: "arXiv:2611.16710", level: "预印本",
      summary: "呼吸监测依赖接触式传感器或受控环境，本文提出仅用普通手机麦克风声学信号的非侵入呼吸相位检测框架——混合 CNN-Transformer 架构（局部频谱特征+长程时序建模）捕捉呼吸的周期结构，在 Foundation Dataset 上以留一被试（LOSO）协议评测，端侧即可运行，为健康监测与呼吸引导提供零硬件成本的方案。",
      detail: "输入：普通智能手机麦克风录音，无需接触式传感器。\n架构：混合 CNN-Transformer——CNN 提局部频谱特征、Transformer 建模长程时序，捕捉呼吸周期结构。\n评测：留一被试（LOSO）协议跨被试泛化验证。\n端侧视角：手机麦克风是存量最大的健康传感入口——声学+轻量混合架构把呼吸监测的硬件成本降为零，与千问接入动态血糖仪同向：端侧 AI 正在把消费手机变成慢病与状态监测的通用终端。",
      tags: ["声学感知", "呼吸监测", "手机", "混合架构"],
      url: "https://arxiv.org/abs/2611.16710"
    },
    {
      id: "p13", group: "recent", cat: "能效与评测", date: "2026-11-11",
      title: "An Open-Architecture Dual-Core STM32-Based Neural Interface with Low-Latency On-Device AI",
      authors: "Sipeng Liang 等",
      venue: "arXiv:2611.15942", level: "预印本",
      summary: "闭环神经调控需要低延迟的在线解码——本文基于双核 STM32H747 微控制器与 Intan 商用采集/刺激前端，构建开放架构的双向神经接口：支持 128 通道 20kSps 采集与 64 通道刺激，双核处理架构+双流内存层级实现低延迟端侧 AI 推理；机上验证两个神经解码模型——完全片上内存运行的紧凑 MLP，以及更大的时序模型分级驻留。",
      detail: "硬件：STM32H747 双核 MCU+Intan 前端；128 采集通道×20 kSps+64 刺激通道。\n架构：双核分工+双流内存层级，支撑低延迟在线推理。\n模型：紧凑 MLP 全片上内存运行；更大时序模型分级驻留内存。\n端侧视角：植入式/穿戴神经接口是「极致端侧」的终极场景——毫瓦功耗、硬实时延迟约束下跑解码模型，开源架构让神经调控设备的科研迭代速度不再被闭门硬件卡住。",
      tags: ["神经接口", "STM32", "闭环调控", "极致端侧"],
      url: "https://arxiv.org/abs/2611.15942"
    },
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
      id: "p8", group: "recent", cat: "能效与评测", date: "2026-10-30",
      title: "Compression Technique Interactions in Small Language Models: A Factorial Ablation",
      authors: "Compression-Interactions Team 等",
      venue: "arXiv:2611.00464", level: "预印本",
      summary: "量化、剪枝与压缩后恢复技术组合使用时如何相互影响，实践缺乏系统指南——本文对四种 SLM 架构（2.7B-7B 参数）做了 72 种压缩配置的因子消融研究，扩展 48 种组合的次序分析，并在 30 个压缩模型上做基准精度验证与鲁棒性检验。",
      detail: "设计：72 压缩配置×4 架构（2.7B-7B）因子消融+48 配置的施加次序分析+30 模型基准验证。\n发现：压缩技术间的交互效应显著——组合收益非叠加，施加次序影响最终精度。\n端侧视角：给「先量化还是先剪枝」这类日常工程决策提供了首批系统性证据，是端侧压缩落地的操作手册级工作。",
      tags: ["模型压缩", "因子消融", "量化", "剪枝"],
      url: "https://arxiv.org/abs/2611.00464"
    },
  ],

knowledge: {
    /* 每周一个知识点（KNOWLEDGE_PLAN.md 16 讲周更，2026-10-25 首期）：weekly 只放元数据+lesson 指针，
       正文与配图在 knowledge/ 子项目（lessons/lesson-NN.js + assets/），点开卡片按需加载 */
    weekly: { no: 4, lesson: 4,
      week: "2026.11.17 — 11.22",
      title: "经典量化算法 II：AWQ 与 SmoothQuant——不切维度，把激活的难题搬给权重",
      hook: "切 0.5% 维度出去养 FP16，终究不优雅——这对论文发现了矩阵乘里一对「互逆旋钮」：激活除以 s、权重乘上 s，输出分毫不变，量化难度却从激活搬进了权重。SmoothQuant 搬完两头全压整数（W8A8），AWQ 用激活幅度护住 1% 命门通道（W4A16）。",
      next: "第 5 讲 · GGUF 与 k-quants：Q4_K_M 们是什么；FP4/FP8 低比特前沿"
    },
    plan: [
      { no: 1, title: "大模型是怎么装进手机的：一次端侧推理的完整旅程", week: "已完结 · 10.16—10.25" },
      { no: 2, title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT", week: "已完结 · 10.26—11.01" },
      { no: 3, title: "经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化", week: "已完结 · 11.03—11.09" },
      { no: 4, title: "经典量化算法 II：AWQ 与 SmoothQuant——激活感知的权重缩放", week: "本周 · 11.17 上线（原排 11.15，快照夜顺延）" },
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
      { group: "端侧工具链官方", name: "端侧工具链 Release 雷达", type: "Release 聚合 · 每日跟踪", letter: "R",
        text: "14 个核心端侧项目的官方版本发布动态：本地推理/量化、移动端运行时、CV 框架、离线语音。",
        url: "https://github.com/topics/on-device",
        intro: "聚合端侧开源工具链的官方 Release Notes：本地推理与量化（llama.cpp、Ollama、MLX）、移动端运行时（ExecuTorch、LiteRT、MediaPipe、coremltools）、推理格式与引擎（ONNX、ONNX Runtime、OpenVINO）、国产 CV 框架（ncnn、MNN）、离线语音（whisper.cpp、sherpa-onnx）。\n看点：重要版本的第一时间信号——新硬件后端支持、量化格式演进、新模型能力接入；其中 llama.cpp 为日更构建，日常小版本仅留痕、里程碑版本才进资讯板块。\n适合谁：想一眼看全「端侧工具链这周谁发了什么版」的工程师。" }
    ]
  }
};
