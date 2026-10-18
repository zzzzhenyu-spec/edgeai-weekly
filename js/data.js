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
    weekRange: "2026.10.12 — 10.18 · 近 7 天",
    updated: "2026-10-18",
    status: "rolling",
    editorsNote: "近 7 天聚焦：智能体终端三箭齐发——阶跃 STEPX Neo 开启大模型原生智能体手机品类，千问 AI 眼镜/耳机全家桶开售，面壁 MiniCPM-V 4.7 成为首个端侧无损运行的开源 MoE；A2A 智能体互联协议一周双落地——Rokid 眼镜原生打车、微信鸿蒙版语音操作微信；Meta 开放 Muse Spark Open（816B 总参/42B 激活），DeepSeek V4.1 Flash 以 KV 缓存压至 1/4 的架构大幅降低 Agent 成本（1017 版再帕累托改进、MIT 开源），腾讯混元 Hy Memory 2.0 开源（3B 激活跑赢 Opus 5）；Apple Intelligence 月底入华测试；高通安蒙披露 2028 年 100B 端侧路线，爱芯元智 AX8860 半价对标 DGX Spark，黄仁勋为 OpenClaw 配 OpenShell 零信任容器；社区让 PS5 原生跑 27B 模型。学术侧新作覆盖端云路由与协同推理（HyCo/PriorityFEC）、WebGPU 边缘内核与 TEE 模型保护。"
  },

  /* ---------------- 板块一：本周资讯（仅最近一周） ---------------- */
  news: [
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
      id: "n83", cat: "行业动态", source: "IT之家", date: "2026-10-14",
      title: "鸿蒙座舱「智慧场景」详解：条件+动作的车载自动化规则，MoLA 2.0 小艺智能体支持口语化模糊定位",
      summary: "华为车 BU 乾崑答网友问第 17 期详解鸿蒙座舱「智慧场景」——一套「条件+动作」的车载自动化规则：主驾入座、挂入 D 挡、副驾入座等条件触发后，车辆自动执行播报日程、启动导航、调节空调、播放音乐等系列操作；基于 MoLA 2.0 架构的小艺智能体还支持超模糊地址搜索——「能拍到小蛮腰的那个广场」这类口语化描述即可精准定位。",
      detail: "IT之家 10 月 14 日报道：华为智能汽车解决方案 BU 发布乾崑答网友问第 17 期，集中解答鸿蒙座舱「智慧场景」与 MoLA 2.0 小艺智能体的能力边界。\n智慧场景：一套「条件+动作」的车载自动化规则——触发条件包括主驾入座、挂入 D 挡、到达设定时间、副驾入座等；条件满足后自动执行播报日程、启动导航、调节空调、播放专属音乐、开启座椅功能等操作。\n场景示例：下班放松场景（挂入 D 挡→自动播放舒缓音乐+启动回家导航）；仪式感惊喜场景（副驾入座并系安全带→座椅按摩+生日祝福播报+生日歌）。\n智能体侧：基于 MoLA 2.0 架构的小艺智能体涵盖导航、人车交互、影音、畅聊、点餐等多款智能体；核心的超模糊地址搜索支持仅凭场景特征、相对位置、出行目的的口语化描述定位目的地。\n端侧视角：座舱是端侧智能体少有的「高确定性」落地场景——条件触发+多设备执行的自动化规则正是 GUI Agent 的车载形态，MoLA 2.0 多智能体架构则把任务拆解为可组合的专用智能体。",
      tags: ["鸿蒙座舱", "智慧场景", "小艺智能体", "车载自动化"],
      url: "https://www.ithome.com/1/012/979.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/0cbed7a7-e45e-466b-acb2-846f25b71fe5.jpg",
      imageCap: "鸿蒙座舱智慧场景（图源：IT之家）",
      highlight: false
    },
    {
      id: "n70", cat: "AI硬件", source: "搜狐科技", date: "2026-10-13",
      title: "三星首款智能眼镜参数齐备：约 41 克 + 骁龙 AR1 Gen1，预计 11 月上市",
      summary: "三星 Galaxy Glasses 曝光最终形态参数：整机约 41 克、搭载骁龙 AR1 Gen1 眼镜专用端侧芯片，预计 11 月上市——继通过 FCC 认证后规格基本齐备，直接对标 Meta 雷朋眼镜的轻量无屏音频 AI 路线。",
      detail: "曝光要点：整机约 41 克，为同类 AI 眼镜最轻一档；搭载高通骁龙 AR1 Gen1（眼镜专用端侧芯片），运行 Android XR 并集成谷歌 Gemini；预计 11 月上市，与此前 FCC 认证信息一致。\n端侧视角：AR1 Gen1 是高通为眼镜单独开辟的端侧芯片线——41 克机身内完成拍照、翻译与助手推理，轻量化 + 专用芯片已成为 AI 眼镜收敛后的共识形态；上市后将形成 Meta、三星与安卓系三方对垒。\n事件线：本条为「三星 Galaxy 眼镜」线的参数落定进展（此前已过 FCC 认证）。",
      url: "https://www.sohu.com/a/1086993778_114760",
      image: "https://q4.itc.cn/q_70/images03/20261013/a62f702de1394c888d172b90185a6f2f.jpeg", imageCap: "三星首款智能眼镜（图：搜狐科技）",
      tags: ["三星", "Galaxy Glasses", "AI眼镜", "骁龙 AR1"]
    },
    {
      id: "n71", cat: "行业关注事件", source: "腾讯新闻", date: "2026-10-13",
      title: "Meta 发布前沿模型 Muse Wonder：部分评测对标 Claude Opus 5.5 与 GPT-6，扎克伯格称已追上第一梯队",
      summary: "Meta 发布 Muse Wonder 系列前沿模型：主打长期记忆与代理任务，部分基准测试超越 Anthropic 与 OpenAI 同档模型；扎克伯格称 Meta 已在 AI 前沿追上竞争对手——Muse 智能体生态补齐自研模型底座。",
      detail: "发布要点：Muse Wonder 主打长期记忆（Active Memory）与代理任务执行，多家评测显示部分基准超越 Claude Opus 5.5 与 GPT-6 Astra；输出 API 定价每百万 token 20 美元；扎克伯格同时表示模型迭代速度将明显加快。\n端侧视角：Muse 线此前以智能体（应用层）见长、模型层依赖开源系，Wonder 补上了自研前沿底座——「智能体 × 前沿模型」闭环后，其眼镜侧端云协同的想象空间被打开。\n事件线：本条为「Meta Muse 生态」线的模型层重大进展。",
      url: "https://news.qq.com/rain/a/20261013A03H7Q00",
      image: "https://inews.gtimg.com/om_ls/OXUNwzgxePLjd2e8ZzKetm8elNq1W7VNavVuOPzY", imageCap: "Muse Wonder 发布（图：腾讯新闻）",
      tags: ["Meta", "Muse Wonder", "前沿模型", "智能体"],
      highlight: true
    },
    {
      id: "n79", cat: "手机厂商", source: "IT之家", date: "2026-10-13",
      title: "首款大模型原生智能体手机落地：阶跃 STEPX Neo 先行版发布，软硬模三位一体全栈 3999 元",
      summary: "阶跃终端今晚发布首款大模型原生智能体手机 STEPX Neo 先行版——骁龙 8 系芯片、16GB+256GB，软硬模三位一体全栈定价 3999 元（含手机本体、Step AOS 与 Step 系列模型）；智能体原生系统 Step AOS 1.0 把长期记忆、任务调度与安全机制融入系统底层，系统原子能力可被个人智能体「阶跃 Amoo」直接调用。今日预售、10 月 16 日首销，随机附 12 个月每月百亿 Token 的使用额度。",
      detail: "IT之家 10 月 13 日报道：阶跃终端首款大模型原生智能体手机 STEPX Neo 先行版正式发布——搭载骁龙 8 系芯片，16GB+256GB 规格，碳黑/硅银两色；「软硬模三位一体」全栈价 3999 元（包含手机本体、StepAOS+Step Studio 与 Step 系列模型）。今日开启预售，10 月 16 日首销；先行版用户享连续 12 个月、每月百亿 Token 额度的 STEPX Token Plan。\n系统侧：Step AOS 1.0 宣称从零为智能体打造——长期记忆、任务调度、安全机制融入系统底层；双入口界面让用户与智能体互相可达，大量系统原子能力可被个人智能体「阶跃 Amoo」直接调用，能记住用户、更能替用户完成任务。\n硬件侧：智能体听觉增强系统由六麦克风阵列、低功耗音频感知芯片与 Whisper 1.0 拾音算法组成——复杂声场中准确识人，低功耗芯片独立运行 24 小时耗电仅 1.2%；双屏联动系统主动支持人机互动共享，背屏提供智能体专属表达。\n生态侧：Step 5 Preview 正式接入腾讯 WorkBuddy，把更强推理与 Agent 能力带入真实办公场景（深度研究、数据分析、PPT 生成等），10 月 25 日前限时免费；另推「阶跃 Amoo 成长计划」，前 1 万名达标用户获「星辰船票」，未来五年可 0 元置换任意 STEPX 新终端。\n端侧视角：区别于「手机外挂 AI 助手」的既有路线，STEPX Neo 把模型、系统、硬件三层按智能体重构——这是智能体手机从概念到商品的关键一步，其 Step AOS 与 Amoo 的实际任务完成度将是行业检验「原生」成色的第一块试金石。\n端侧模型（据凤凰评测与发布会报道补核）：搭载阶跃自研端侧基座模型 Step Edge——为终端硬件定制，本地 tool call 延迟低至 0.1 秒，支持多模态本地处理（无网可执行系统设置等简单指令）；Step-GUI Edge（前身 Gelab-Zero，4B 参数）为首款真正部署到手机的 GUI 模型，配合 GUI-MCP 协议可跨 200 多个 App 执行操作。\n架构与云端：采用「端侧快反应、云侧深思考」的端云协同——复杂任务交由云端 Step 5 等旗舰模型（Step Pro 旗舰推理模型参数量超 1.5 万亿）；芯片为骁龙 8 Gen 5，6260mAh 电池 + 80W 快充，6.36 英寸 1.5K 120Hz OLED。",
      tags: ["阶跃星辰", "STEPX Neo", "智能体手机", "Step AOS"],
      url: "https://www.ithome.com/1/012/556.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/16a74b51-3eb5-4a14-9608-ed9bb0803f1c.jpg",
      imageCap: "STEPX Neo 先行版（图源：IT之家）",
      highlight: true
    },
    {
      id: "n80", cat: "AI硬件", source: "IT之家", date: "2026-10-13",
      title: "千问 AI 硬件全家桶开售：N1 眼镜可换电池 2899 元起，Pro 版眼动交互/虹膜支付/全天候健康监测，AI 耳机 1099 元",
      summary: "千问 AI 硬件 2026 新品发布会上，N1/Pro 系列 AI 眼镜与 AI 耳夹式耳机同日落地——两款眼镜全系三芯异构算力、5000 万像素超感影像与双电池可换电设计（N1 续航 9 小时/Pro 8 小时）；N1 Pro 新增高精度眼动交互、金融级虹膜核验支付与全天候健康监测（心率/血氧/皮肤温度+AI 健康解读）；AI 耳机 Bose 调音、到手 1099 元，支持 89 种语言翻译与 92 语种转写纪要——个人智能体（Personal Agent）硬件化成色初显。",
      detail: "IT之家 10 月 13 日报道：千问 AI 硬件 2026 新品发布会推出 N1/Pro 系列 AI 眼镜，核心围绕个人智能体理念——让 AI 从被动等待转向主动服务。N1 标准版 2899 元起，提供影像、主动感知、更换电池等核心能力，主打第一视角记录。\nPro 版创新：N1 Pro 在标准版之上新增高精度眼动交互、金融级虹膜核验支付（看一眼即可付款）、全天候健康监测——可采集心率、血氧、皮肤温度，提供主任医师级 AI 健康解读与 AI 情绪疗愈。\n硬件底座：全系三芯异构算力平台；5000 万像素超感影像系统支持 4K 录像、实况照片与多重防抖；全天候主动感知可自动会议记录、出行提醒；双电池可换电设计——N1 综合续航 9 小时、N1 Pro 8 小时，随时更换镜腿电池。\n同日开售的千问 AI 耳夹式耳机到手 1099 元：Bose 大师调音、0.5mm 记忆钛丝耳夹形态，IP55 防护；支持录音实时转写、离线本地录音、92 语种转写纪要与 89 种语言 AI 翻译（面对面/通话模式），耳机续航 9 小时、配合充电仓 40 小时。\n端侧视角：眼镜「看得见的交互」（眼动/虹膜）+ 耳机「听得懂的翻译」（89 语种）+ 主动感知，千问把 Personal Agent 拆进三类穿戴硬件——眼镜承担身份与支付、耳机承担语言与记录，与手机端智能体互为入口，AI 硬件的「智能体下半场」竞争正式开局。\n开售价格（华尔街见闻）：叠加国补与限时优惠后，N1 标准套装到手 2218 元起、超级续航套装 2446 元起；N1 Pro 标准套装到手 2600 元起、超级续航套装 2827 元起。",
      tags: ["千问", "AI眼镜", "AI耳机", "个人智能体"],
      url: "https://www.ithome.com/1/012/400.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/2ed58d28-7886-48f9-aff3-dce1c8a8069f.png",
      imageCap: "千问 N1 系列 AI 眼镜（图源：IT之家）",
      highlight: true
    },
    {
      id: "n75", cat: "大模型厂商", source: "IT之家", date: "2026-10-13",
      title: "面壁 MiniCPM-V 4.7 发布：首个端侧无损流畅运行的开源 MoE，iPhone 上 3GB 内存跑出 13+ token/s",
      summary: "面壁智能发布新一代端侧多模态大模型 MiniCPM-V 4.7，提供 35B-A3B（系列首个 MoE）与 1B 两种规格——基于 LES 前瞻专家调度推理加速，35B-A3B 成为首个支持端侧无损流畅运行的开源 MoE 模型，在 iPhone 17 Pro Max 上以仅 3GB 内存实现 13+ token/s 解码；支持 iOS/安卓/鸿蒙并适配 Intel、AMD、Arm、瑞芯微、后摩等芯片平台，同步开源 SRFT 微调方案。",
      detail: "IT之家 10 月 13 日报道：面壁智能推出新一代端侧多模态大模型 MiniCPM-V 4.7——35B-A3B 与 1B 两种规格，其中 35B-A3B 是 MiniCPM-V 系列首个 MoE 模型。\n加速技术：基于最新 LES（前瞻专家调度）推理加速——35B-A3B 版本是首个支持端侧无损流畅运行的开源 MoE 模型，在 iPhone 17 Pro Max 上以仅 3GB 内存达到 13+ token/s 的解码速度。\n生态适配：同时支持 iOS、安卓和鸿蒙，并适配 Intel、AMD、Arm、瑞芯微、后摩等芯片平台，覆盖更多移动设备与本地计算场景；同步开源 Self-Replay Fine-Tuning（SRFT）微调方案，帮助开发者低成本扩展模型能力、减少灾难性遗忘。\n跑分对照：35B-A3B 在 Instruct 模式下以更短推理时间取得比 Qwen3.6 35B-A3B 更高的综合得分；1B 版本相对 MiniCPM-V 4.6 持续提升，综合得分与推理效率均显著领先 Qwen3.5 0.8B。\n端侧视角：「35B 级 MoE 无损进手机」把端侧多模态的规模上限又推高一档——3GB 内存的占用意味着中端机也能跑；瑞芯微、后摩等国产芯片平台进入官方适配清单，端侧模型与国产算力的组合拳正在成型。",
      tags: ["面壁智能", "MiniCPM-V", "端侧MoE", "LES加速"],
      url: "https://www.ithome.com/1/012/483.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/2c50c051-fc36-4558-bbd8-81e026a34460.png",
      imageCap: "MiniCPM-V 4.7（图源：IT之家）",
      highlight: false
    },
    {
      id: "n81", cat: "AI硬件", source: "IT之家", date: "2026-10-13",
      title: "苹果 HomeView 发布：A18 芯片+Apple Intelligence 的 Siri 进家门，智能家居中枢 299 美元、11 月 13 日开售",
      summary: "苹果推出首款智能家居中枢 HomeView——A18 芯片、7 英寸方形屏、1200 万像素摄像头，整合音乐、FaceTime、家庭监控与智能家居控制，搭载基于 Apple Intelligence 的 Siri；支持识别 6 位家庭成员并按人切换个性化内容，个人内容互不可见。标准版与壁挂版均 299 美元，11 月 13 日开售——端侧 AI 的「第三块屏幕」正式入场。",
      detail: "IT之家 10 月 13 日报道：苹果发布 Apple HomeView 智能家居管理设备，标准版与壁挂版定价均为 299 美元（约合 2005 元）；首批 6 国当日预购，11 月 13 日正式开售。\n硬件：A18 芯片；7 英寸 Liquid Retina 方形屏（1088×1088、220ppi、0.3~500nits 自动亮度）；1200 万像素摄像头（f/2.4）；Wi-Fi 6E、蓝牙 6.0、Thread；需搭配 iOS/iPadOS 27.2 以上设备使用。\n智能与隐私：搭载基于 Apple Intelligence 的 Siri；面部识别最多 6 位家庭成员、按人切换信息/FaceTime/日历/提醒事项/查找的个人内容，苹果强调个人内容不会向其他家庭成员开放；配套 Schneider Home 壁挂支架 59.95~129.95 美元。\n设计：铝合金机身+不锈钢铰链连接半球形扬声器底座；表盘式个性化界面（支持人像景深的照片、随动作响应的流动界面、史努比动画界面），可作全家共享电子相框。\n端侧视角：继手机、PC 之后，苹果把 Apple Intelligence 的本地推理落进家庭中枢——A18 承载的 Siri 成为家庭场景的常驻智能体入口，「识别到谁就为谁服务」的多用户隔离正是端侧个性化推理的样板间。",
      tags: ["苹果", "HomeView", "智能家居中枢", "Apple Intelligence"],
      url: "https://www.ithome.com/1/012/566.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/d80467b3-e134-48d1-abd0-d08b89dba809.jpg",
      imageCap: "Apple HomeView（图源：IT之家）",
      highlight: false
    },
    {
      id: "n82", cat: "芯片厂商", source: "IT之家", date: "2026-10-13",
      title: "爱芯元智 AX8860 发布：256 TOPS 边缘算力对标 DGX Spark，Qwen 27B 推理快 25%~30%，整机价格约一半",
      summary: "爱芯元智在工博会发布 AX8860 系列大算力 AI 芯片——16 核 A55+自研 NPU、256 TOPS 混合精度（原生 FP4）、最高 128GB LPDDR5X（273 GB/s）、6nm 工艺；Qwen 27B 上 prefill 比 DGX Spark 快 25%、decode 快 30%，Sipeed 整机定价约为 DGX Spark 的一半；支持四芯级联至 1024 TOPS，路线图还有 500 TOPS 的 8950 与 700+ TOPS 的 8970。",
      detail: "IT之家 10 月 13 日报道：爱芯元智在 2026 中国国际工业博览会发布 AX8860 系列大算力 AI 芯片，定位大模型在边缘与端侧落地的算力底座。\n规格：16 核 Arm Cortex-A55 CPU+自研 NPU，256 TOPS 混合精度算力（原生 FP4、无稀疏性）；最高 128GB LPDDR5X、256-bit 位宽 273 GB/s 带宽；6nm 制程，支持 PCIe 5.0。\n形态与扩展：覆盖 40W 专用模块、单槽 PCIe 卡与单槽四芯方案，并规划 Mini PC/口袋 PC；支持 256 Gbps 网络接口——双芯级联 512 TOPS、四芯 1024 TOPS，扩展效率约 80%。\n生态：支持 vLLM、SGLang、PyTorch 主流推理框架与 ONNX、Hugging Face 格式开箱即用，兼容 OpenAI API 接口，配套量化/转换/编译/调试完整工具链；同步发布元曦模组 A256S 并展出推理卡与推理服务器。\n性能与价格：Qwen 27B 模型上 prefill 比 NVIDIA DGX Spark 快 25%、decode 快 30%；Sipeed 宣称整机定价接近 DGX Spark 的一半（DGX Spark 64GB 版 4999 美元起）。路线图：Axera 8950（500 TOPS）与 8970（700+ TOPS）。",
      tags: ["爱芯元智", "AX8860", "边缘算力", "FP4"],
      url: "https://www.ithome.com/1/012/551.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/23a83269-d2f5-49f8-ac2c-650dd47ce39b.png",
      imageCap: "AX8860 发布（图源：IT之家）",
      highlight: false
    },
    {
      id: "n86", cat: "端侧Agent", source: "量子位", date: "2026-10-13",
      title: "APUS 开源 Reflex Agent：决策模型驱动 Harness，实测响应最快达 Claude Code 3 倍",
      summary: "APUS AI 开源 Personal Agent 产品 Reflex Agent——基于自研开源决策模型 Reflex 构建 Harness 并结合 Continuum 记忆引擎，模型路由、技能选择、结果审查与执行监督均由决策模型承担，以「决策—执行—反馈—再决策」的 Loop Working 循环推进长周期任务；实验室实测响应速度最快达 Claude Code、Codex 等主流 Agent 的 3 倍，MIT 协议开源。",
      detail: "量子位 10 月 13 日报道：APUS AI（麒麟合盛网络技术股份有限公司）宣布开源 Personal Agent 产品 Reflex Agent——基于自研开源决策模型 Reflex 构建 Harness，结合 Continuum 记忆引擎，由模型驱动 Harness 核心控制逻辑。\n架构差异：与主要依赖代码和提示词组织 Harness 的传统方案不同，Reflex Agent 由决策模型承担模型路由、技能选择、结果审查和执行监督，通过「决策—执行—反馈—再决策」循环推动任务持续向前——APUS 称之为 Loop Working：Agent 不只回答问题，更要围绕用户目标持续行动。\n记忆机制：Continuum 记忆引擎提供无限记忆（持续积累任务信息）、无损记忆（保留原始内容及关联）与无损输入（历史信息以原始内容参与决策）；「无限上下文」并非突破单次模型调用的输入长度限制，而是让记忆与任务周期不再受限于单次窗口。\n性能与开源：实验室实测相关测试场景响应速度最快达 Claude Code、Codex 等主流 Agent 的 3 倍；MIT 协议开源，提供桌面端、Web 与 SDK。\n端侧视角：决策模型接管 Harness 是「快系统」思想向智能体框架的延伸——路由与审查交给小而快的决策模型，恰与 Jev 路线、EmbeddingGemma 零样本路由同场竞技；开源桌面端形态也让个人 Agent 的本地部署多了一个可复现样本。",
      tags: ["APUS", "Reflex Agent", "决策模型", "开源Agent"],
      url: "https://www.qbitai.com/2026/10/503165.html",
      image: "https://i.qbitai.com/wp-content/uploads/2026/10/d1a31ac10b6da805f34d746e2d4d7d8f.png",
      imageCap: "Reflex Agent（图源：量子位）",
      highlight: false
    },
    {
      id: "n72", cat: "手机厂商", source: "腾讯新闻", date: "2026-10-12",
      title: "华为公布小艺 AI 快捷栏推送时间：10 月底分批上线，智能体常驻桌面底栏",
      summary: "华为鸿蒙 HarmonyOS 7 的小艺 AI 快捷栏上线时间公布：预计 10 月底分批推送——小艺以常驻桌面底栏形态提供跨应用服务与主动推荐，系统级智能体从「唤起式」走向「常驻式」。",
      detail: "功能要点：小艺 AI 快捷栏常驻桌面底部，支持跨应用拖拽、主动服务推荐与任务直达，10 月底起分批推送至鸿蒙 7 设备。\n端侧视角：与 Mate 90 端侧 30B MoE 大模型是同一条能力主线——端侧推理支撑常驻入口，智能体从「被唤起」变为「始终在场」，是系统级 Agent 交互形态的关键一步。\n事件线：本条为「华为小艺」线的系统层进展。",
      url: "https://news.qq.com/rain/a/20261012A0AW7B00",
      image: "https://inews.gtimg.com/om_ls/OQoVukSf-71Z753J8WHxPujfz3910cq64_2Azx04", imageCap: "小艺 AI 快捷栏（图：腾讯新闻）",
      tags: ["华为", "小艺智能体", "HarmonyOS", "系统级智能体"]
    },
    {
      id: "n73", cat: "AI硬件", source: "新浪科技", date: "2026-10-12",
      title: "安克 AI 会议耳机飞书版开售：线上线下全场景录音转写，1799 元",
      summary: "安克 AI 会议耳机飞书版开售，1799 元：支持线上线下全场景录音、转写内容接入飞书生态——AI 耳机从翻译场景延伸到会议生产力，hearables 办公化路线成型。",
      detail: "产品要点：支持线上会议与线下面对面谈话的全场景录音转写，内容沉淀进飞书文档生态；售价 1799 元。\n端侧视角：AI 耳机赛道此前以翻译与降噪为主，此款把「录音-转写-办公生态」打通，是 hearables 向生产力工具进阶的代表案例；配件大厂入场也验证了 AI 耳机的需求确定性。\n边界说明：AI 配件以功能含端侧 AI（转写/翻译/降噪）为收录标准，无 AI 的纯配件不收。",
      url: "https://finance.sina.com.cn/tech/digi/2026-10-12/doc-iniuypex5250689.shtml",
      image: "https://n.sinaimg.cn/spider20261012/74/w820h1654/20261012/d37f-18eda77204c38", imageCap: "安克 AI 会议耳机飞书版（图：新浪科技）",
      tags: ["安克", "AI耳机", "hearables", "会议转写"]
    },
    {
      id: "n74", cat: "芯片厂商", source: "搜狐科技", date: "2026-10-12",
      title: "三星扩大 z NAND 产品线：三款定制 AI 内存在研，端侧大模型存储底座提速",
      summary: "三星披露存储路线：超 400 层 V-NAND 与扩展的 z NAND 产品线，三款面向 AI 设备的定制内存在研——端侧大模型带动存储定制化，内存容量与带宽成为 AI 终端新瓶颈。",
      detail: "路线要点：三星计划将 V-NAND 堆叠层数推过 400 层，并扩大低延迟 z NAND 产品线，其中三款定制 AI 内存面向智能体设备在研。\n端侧视角：端侧跑大模型的瓶颈正从算力转向内存——苹果 14GB 端侧模型占用的争议、高通 100B 端侧路线图，都指向存储定制化；三星此役是把「AI 内存」做成独立品类。\n事件线：本条为「端侧算力供应链」线的存储侧进展。",
      url: "https://www.sohu.com/a/1086612801_166680",
      image: "https://q9.itc.cn/q_70/images03/20261012/d1cccf72156046858c48945e17c6", imageCap: "三星存储路线（图：搜狐科技）",
      tags: ["三星", "z NAND", "AI内存", "端侧存储"]
    },
    {
      id: "n78", cat: "芯片厂商", source: "IT之家", date: "2026-10-12",
      title: "高通 CEO 安蒙：AI 企业已要求 2028 年推出支持 100B 模型本地运行的移动平台，智能体将引爆换机「超级周期」",
      summary: "高通总裁兼 CEO 安蒙在骁龙峰会采访中披露：已有 AI 企业要求高通在 2028 年推出支持 100B 参数模型本地运行的智能手机移动平台——若实现，本地模型体验与多智能体协同将显著提升；他判断 AI 智能体将推动下一轮智能手机「超级周期」，并看好智能眼镜为可穿戴 AI 主形态，6G 有望在 2028 年洛杉矶奥运会演示。",
      detail: "IT之家 10 月 12 日报道：高通总裁兼首席执行官安蒙（Cristiano Amon）上月骁龙峰会期间接受采访表示，已有人工智能企业要求高通在 2028 年推出支持 100B 参数模型本地运行的智能手机移动平台。\n端侧意义：若 100B 模型端侧运行成为现实，本地模型体验与多智能体协同的效果都将显著提升——当前旗舰端侧模型仍在 30B 量级（华为 Mate 90 已落地端侧 30B MoE），2028 年 100B 目标意味着三代左右的代际跃迁。\n市场判断：安蒙认为 AI 智能体将推动下一轮智能手机「超级周期」，吸收因价格飙升而迟滞的换机需求；智能眼镜是他最看好的可穿戴 AI 设备；低功耗领域的技术积累则是高通面向数据中心的宝贵财富。\n通信侧：6G 预计在 2028 年洛杉矶奥运会有望演示新一代无线通信技术，早期部署 2029~2030 年启动——高清视频持续上传让每个人都能为 AI 提供实时的现实世界数据。",
      tags: ["高通", "安蒙", "100B端侧", "智能体手机"],
      url: "https://www.ithome.com/1/011/991.htm",
      image: "https://img.ithome.com/newsuploadfiles/2026/10/4da85392-ef76-4d5f-a7f4-78a8a55b943b.jpg",
      imageCap: "高通 CEO 安蒙（图源：IT之家）",
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
