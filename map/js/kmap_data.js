/* ============================================================
 * 端侧大模型知识地图 · 数据层（kmap_data.js）
 * ------------------------------------------------------------
 * 本文件是地图的唯一事实来源：页面布局、连线、筛选、详情
 * 全部由这里的数据驱动。加新技术 = 在 nodes 里加一个对象，
 * 不需要碰任何渲染代码（机制见 README.md）。
 *
 * 字段说明（node）：
 *   id        全站唯一短 id（小写英文，hash 路由与关联引用都用它）
 *   domain    所属领域 id（须在 domains 里登记）
 *   title     中文名（卡片与详情标题）
 *   en        英文/术语名（副标题，monospace 展示）
 *   level     "入门" | "进阶"（难度筛选用，只有这两档）
 *   path      建议阅读顺序第几步（1 起编号；不填 = 不参与「知识一览」顺序链）
 *   oneLiner  一句话白话解释（卡片上直观看的那句）
 *   detail    详情正文段落数组（2–3 段，先直觉后术语，关键数字带单位）
 *   keys      关键数字/结论条目（详情面板列表展示，2–4 条）
 *   related   关联边数组：{ to: 目标id, kind: "lead"|"rel", note: 一句说明 }
 *             lead = 实线箭头（前置知识：先懂我再看它）  rel = 虚线（相关互证）
 *             每条边只在 from 一侧登记，渲染层自动去重
 *   refs      延伸阅读：{ name, url }，优先 arXiv abs 页 / 官方文档
 * ============================================================ */

window.KMAP = {
  version: "0.1.0",
  updated: "2026-10-30",

  /* ---------------- 领域（分区列） ----------------
   * 加新领域 = 在此追加一条；列宽自适应，无需配置坐标。 */
  domains: [
    {
      id: "basics",
      name: "基础概念",
      icon: "🧩",
      accent: "#22d3ee",
      desc: "大模型在手机上到底是个什么东西"
    },
    {
      id: "quant",
      name: "压缩量化",
      icon: "🗜️",
      accent: "#a78bfa",
      desc: "把大模型塞进有限内存的必修课"
    },
    {
      id: "runtime",
      name: "推理与硬件",
      icon: "⚙️",
      accent: "#fb923c",
      desc: "真正跑起来的引擎与芯片"
    }
  ],

  /* ---------------- 概念节点 ---------------- */
  nodes: [
    /* ========== 领域一：基础概念 ========== */
    {
      id: "token",
      domain: "basics",
      title: "Token（词元）",
      en: "Token / Tokenization",
      level: "入门",
      path: 1,
      oneLiner: "模型眼里没有字只有编号——文字先切成小块，再查表变成数字",
      detail: [
        "大模型读到的不是文字，而是一串数字。把文字切成小块的过程叫「分词」（tokenization），每一块就是一个「token」：切完拿去词表查编号，「猫」可能变成 12345，「machine」可能是 678。模型的一切计算都发生在这串编号之上。",
        "一个 token 未必等于一个字或一个词：英文里 1 个 token 约合 0.75 个单词，常见词独占一个 token，生僻词会被拆碎；中文一般 1 个字占 0.6–1 个 token，词表不友好时甚至超过 1——同一个模型，不同语言「费 token」的程度不一样。",
        "为什么要在意它？因为模型的度量衡全是 token：上下文长度（一次能记多少话）、生成速度（每秒蹦几个 token）、云端计费（按百万 token 收钱）。看懂 token，才算拿到端侧大模型的第一把尺子。"
      ],
      keys: [
        "英文 1 token ≈ 0.75 个单词",
        "中文 1 个字 ≈ 0.6–1 个 token",
        "上下文长度 / 生成速度 / 计费，单位全是 token"
      ],
      related: [
        { to: "prefill", kind: "rel", note: "decode 阶段一次只生成一个 token" }
      ],
      refs: [
        { name: "Hugging Face · Tokenizer Summary（官方文档）", url: "https://huggingface.co/docs/transformers/tokenizer_summary" },
        { name: "Andrej Karpathy · Let's build the GPT Tokenizer（视频）", url: "https://www.youtube.com/watch?v=zduSFxRajkE" }
      ]
    },
    {
      id: "size",
      domain: "basics",
      title: "参数量与权重大小",
      en: "Parameters & Model Size",
      level: "入门",
      path: 2,
      oneLiner: "模型本体就是几十亿个数字的文件——参数量 × 每个数字的字节数 = 占用内存",
      detail: [
        "常听说的「7B」「3B」指参数量：7B = 70 亿个数字（权重）。模型文件不是神奇黑盒，而是把这 70 亿个数字按顺序存下来的一份文件——所谓「把模型装进手机」，就是把这个文件放进内存。",
        "体积可以口算：每个数字用 16 bit（FP16）存就是 2 字节，7B × 2 字节 ≈ 14GB。这就是为什么 7B 模型原始格式动辄十几 GB，而手机可用内存往往只有 8–12GB——不压缩根本放不下。",
        "所以端侧选型的第一道闸门是「内存账」：模型权重 + KV 缓存 + 系统占用，三样加起来要塞进可用内存。这道账正是「量化」要解的头号题。"
      ],
      keys: [
        "7B × 2 字节（FP16）≈ 14GB",
        "每参数字节：FP16=2 / INT8=1 / INT4=0.5",
        "内存账 = 权重 + KV 缓存 + 系统占用"
      ],
      related: [
        { to: "quant", kind: "lead", note: "内存装不下 → 必须量化" },
        { to: "npu", kind: "rel", note: "内存带宽决定读一遍权重有多快" },
        { to: "kv", kind: "rel", note: "KV 缓存另占一块内存，与权重一起记账" }
      ],
      refs: [
        { name: "Apple · Foundation Models 技术报告（3B 端侧模型的内存取舍）", url: "https://machinelearning.apple.com/papers/apple_intelligence_foundation_language_models.pdf" },
        { name: "llama.cpp（各量化档位的实际文件体积）", url: "https://github.com/ggml-org/llama.cpp" }
      ]
    },
    {
      id: "prefill",
      domain: "basics",
      title: "prefill 与 decode 两阶段",
      en: "Prefill & Decode",
      level: "入门",
      path: 3,
      oneLiner: "为什么 AI「想了半天才开口，开口后越说越顺」——先通读一遍，再一个词一个词往外蹦",
      detail: [
        "一次完整推理分两段：「prefill（预填充）」把你输入的全部内容一次性并行读完，顺手产出第一份 KV 缓存；「decode（解码）」随后逐个 token 生成回答，每生成一个都要带着全部历史。",
        "两段性子完全不同：prefill 是算力活（一次并行算完），决定「首字延迟」——按下回车到第一个字出现的等待；decode 是带宽活（每步只算一个 token，却要把权重和缓存都扫一遍），决定「逐字速度」。这就是为什么长提问开头等得久、回答开始后反而流畅。",
        "端侧优化经常分开下药：压缩提示词、给 prefill 限速省电（苹果 AFM 报告的做法）、给 decode 用量化权重减少搬运量——同一个模型，两段各有各的瓶颈。"
      ],
      keys: [
        "prefill 决定首字延迟（算力瓶颈）",
        "decode 决定逐字速度（带宽瓶颈）",
        "AFM 对 prefill / decode 分别设功耗预算"
      ],
      related: [
        { to: "kv", kind: "lead", note: "prefill 产出的缓存正是 decode 要复用的" },
        { to: "tps", kind: "rel", note: "两阶段分别对应 token/s 与首字延迟" }
      ],
      refs: [
        { name: "Apple · Foundation Models 技术报告（prefill/decode 功耗预算章节）", url: "https://machinelearning.apple.com/papers/apple_intelligence_foundation_language_models.pdf" },
        { name: "FlashAttention（arXiv:2205.14135，prefill 侧经典优化）", url: "https://arxiv.org/abs/2205.14135" }
      ]
    },
    {
      id: "kv",
      domain: "basics",
      title: "KV 缓存",
      en: "KV Cache",
      level: "入门",
      path: 4,
      oneLiner: "模型的「短期记忆便签」——对话越长便签越厚，内存不够对话就断了",
      detail: [
        "如果每生成一个新 token 都把前面全部内容重算一遍，对话会越聊越慢。所以推理时把已算过的中间结果（键 Key、值 Value）存下来复用——这份缓存就是「KV 缓存」，模型对话时的短期记忆。",
        "它随上下文长度线性膨胀：7B 级模型聊到几万 token，缓存能吃掉数 GB。端侧内存本来就紧，所以「长对话聊着聊着变慢甚至报错」，十有八九是缓存把内存挤爆了——权重大小之外的第二本内存账。",
        "应对手段是一个完整的研究方向：GQA（分组查询注意力）从结构上缩小缓存；KV 量化（如 KIVI）把缓存也压到 2–4 bit；再往下还有把冷数据挪去闪存的玩法。"
      ],
      keys: [
        "缓存大小 ∝ 上下文长度（线性增长）",
        "GQA / MLA：从模型结构给缓存瘦身",
        "KIVI：KV 缓存压到 2–4 bit"
      ],
      related: [
        { to: "size", kind: "rel", note: "权重与缓存一起算端侧内存账" }
      ],
      refs: [
        { name: "KIVI（arXiv:2402.02750，KV 缓存 2-bit 量化）", url: "https://arxiv.org/abs/2402.02750" },
        { name: "vLLM / PagedAttention（arXiv:2309.06180，缓存的分页管理）", url: "https://arxiv.org/abs/2309.06180" }
      ]
    },

    /* ========== 领域二：压缩量化 ========== */
    {
      id: "quant",
      domain: "quant",
      title: "量化（Quantization）",
      en: "Quantization",
      level: "入门",
      path: 5,
      oneLiner: "把每个数字从 16 bit 改成 4 bit 存——体积压到约四分之一，模型还是那个模型",
      detail: [
        "思路很朴素：原来每个参数用 16 bit 高精度小数存，现在改用 4 bit 的低精度刻度存，再配一个缩放系数把刻度还原回原范围。相当于用毫米刻度尺代替精密游标卡尺——大部分场景够用，还省了一大半空间。",
        "效果立竿见影：7B 模型从 FP16 的约 14GB 压到 4 bit 的约 4GB，一部 8GB 内存的手机就能装下。代价是精度损失：主流 4 bit 方案在评测里接近无损，2 bit 则明显掉点，仍是当前研究前线。",
        "什么时候量化、怎么量化分两大流派：训练后量化（PTQ）与量化感知训练（QAT），见「PTQ vs QAT」；端侧最常用的落地格式是 GGUF 的 Q4_K_M 档，见「llama.cpp 与 GGUF」。"
      ],
      keys: [
        "FP16 → 4 bit：体积约 1/4，7B 约 14GB → 4GB",
        "4 bit 接近无损，2 bit 是研究前线",
        "Q4_K_M：端侧最常用的平衡档位"
      ],
      related: [
        { to: "ptq", kind: "lead", note: "量化怎么落地：两大流派" },
        { to: "gguf", kind: "rel", note: "GGUF 的 Q4_K_M 就是量化后的单文件" },
        { to: "cloud", kind: "rel", note: "量化是模型能留在端侧的前提" }
      ],
      refs: [
        { name: "A White Paper on Neural Network Quantization（arXiv:2103.13630）", url: "https://arxiv.org/abs/2103.13630" },
        { name: "llama.cpp · quantization 文档", url: "https://github.com/ggml-org/llama.cpp/blob/master/docs/development/quantization.md" }
      ]
    },
    {
      id: "ptq",
      domain: "quant",
      title: "PTQ vs QAT",
      en: "Post-Training vs QAT",
      level: "进阶",
      path: 6,
      oneLiner: "量化时机两流派：训完再压（PTQ，端侧主流）还是训练时就学会适应低精度（QAT，更准但要重训）",
      detail: [
        "PTQ（训练后量化）：拿现成模型，用几百条「校准数据」跑一遍，统计每层数值分布，据此定下量化刻度。不用重新训练，一台笔记本几分钟能压完一个模型——端侧落地最常用的路线。",
        "QAT（量化感知训练）：在训练 / 微调阶段就让模型「知道」自己将来会被量化，主动学着在低精度下保持效果。精度通常更好，但需要训练资源与数据，成本高一个量级。",
        "端侧的典型分工：模型厂商发布时已经 PTQ 好（Hugging Face 上各种 GGUF 量化档位），应用工程师下载即用；只有追求 2–3 bit 极限压缩时，才值得上 QAT。"
      ],
      keys: [
        "PTQ：几百条校准样本，分钟级完成",
        "QAT：精度更优，但要训练资源",
        "端侧生态以 PTQ 为主"
      ],
      related: [
        { to: "quant", kind: "rel", note: "两大流派解决的都是「怎么量化」" }
      ],
      refs: [
        { name: "HAQ（arXiv:1811.08886，自动化量化参数搜索）", url: "https://arxiv.org/abs/1811.08886" },
        { name: "Integer-Arithmetic-Only Inference（arXiv:1712.05877，QAT 经典）", url: "https://arxiv.org/abs/1712.05877" }
      ]
    },

    /* ========== 领域三：推理与硬件 ========== */
    {
      id: "gguf",
      domain: "runtime",
      title: "llama.cpp 与 GGUF",
      en: "llama.cpp & GGUF",
      level: "入门",
      path: 7,
      oneLiner: "端侧跑大模型的事实标准：一个 C++ 推理引擎 + 一种「模型打包成单文件」的格式",
      detail: [
        "llama.cpp 是社区最流行的本地推理引擎：纯 C/C++ 实现、无重依赖，CPU、GPU、苹果芯片都能跑，手机也行。Ollama、LM Studio 等一众工具的底层都是它。",
        "配套的模型格式叫 GGUF：把量化后的权重、词表、对话模板等元数据打包成单个文件，下载即用。文件名里的 Q4_K_M、Q8_0 就是量化档位——数字越小体积越小、精度越低。",
        "对新手最友好的路径：从 Hugging Face 下一个 GGUF 文件（比如 Q4_K_M 档），装个 llama.cpp 或 Ollama，就能在自己设备上跑起来——这是理解端侧推理成本最低的实验场。"
      ],
      keys: [
        "llama.cpp：C/C++ 实现，纯 CPU 也能跑",
        "GGUF：权重 + 词表 + 模板打包成单文件",
        "Q4_K_M ≈ 体积 / 精度的常用平衡点"
      ],
      related: [
        { to: "tps", kind: "rel", note: "llama-bench 实测设备的 token/s" }
      ],
      refs: [
        { name: "llama.cpp（GitHub 仓库）", url: "https://github.com/ggml-org/llama.cpp" },
        { name: "Ollama（基于 llama.cpp 的一键运行工具）", url: "https://ollama.com" }
      ]
    },
    {
      id: "npu",
      domain: "runtime",
      title: "NPU 与内存带宽",
      en: "NPU & Memory Bandwidth",
      level: "进阶",
      path: 8,
      oneLiner: "跑得快不只看 TOPS 算力——每秒能从内存搬多少数据，常常才是真瓶颈",
      detail: [
        "NPU（神经网络处理器）是手机 SoC 里专为矩阵运算设计的单元，能效比远高于 CPU / GPU——每瓦算力高好几倍，这正是端侧必须靠它的原因。旗舰 SoC 的 NPU 算力已到几十 TOPS 量级。",
        "但 decode 阶段每生成一个 token 都要把整个权重扫一遍，此时瓶颈往往不是算力而是「内存带宽」（每秒能搬多少 GB）。算力再高、数据供不上，NPU 只能空转——这就是常说的「内存墙」。",
        "所以看端侧芯片要盯两个数：NPU 峰值算力（TOPS，决定 prefill 快慢）与内存带宽（GB/s，决定 decode 快慢）。统一内存架构（苹果 M 系、手机 SoC）让 CPU/GPU/NPU 共享一池内存，是端侧跑大模型的重要前提。"
      ],
      keys: [
        "旗舰 NPU：几十 TOPS 量级",
        "decode 瓶颈 = 内存带宽（GB/s），即「内存墙」",
        "统一内存：CPU / GPU / NPU 共享一池"
      ],
      related: [
        { to: "tps", kind: "rel", note: "算力与带宽分别决定两段的速度" },
        { to: "cloud", kind: "rel", note: "端侧算力边界决定哪些活要交给云端" }
      ],
      refs: [
        { name: "Apple · Foundation Models 技术报告（统一内存上的端侧推理）", url: "https://machinelearning.apple.com/papers/apple_intelligence_foundation_language_models.pdf" },
        { name: "Qualcomm AI Hub（各 SoC 的 NPU 实测数据）", url: "https://aihub.qualcomm.com" }
      ]
    },
    {
      id: "tps",
      domain: "runtime",
      title: "token/s 与首字延迟",
      en: "Tokens per Second & TTFT",
      level: "入门",
      path: 9,
      oneLiner: "衡量「跑得好不好」的两个数：每秒蹦几个字（流畅）、多久蹦出第一个字（响应）",
      detail: [
        "「token/s」衡量解码速度，决定读起来的流畅感；「首字延迟」（TTFT，Time To First Token）衡量从提问到第一个字出现的等待，决定「卡不卡」的体感。两者分别对应 decode 与 prefill 两阶段。",
        "给自己一个参照系：人的阅读速度约每秒 5–7 个字；旗舰手机跑 7B-4bit 模型普遍能做到每秒 10 个 token 以上——已快过阅读速度，体感是顺滑；掉到 3–5 token/s 就能明显感到逐字蹦。",
        "实测就用 llama.cpp 自带的 llama-bench：换量化档位、换上下文长度、开/关 GPU 各跑一遍，几张表就能看清自己设备的天花板，比参数表直观得多。"
      ],
      keys: [
        "阅读速度 ≈ 每秒 5–7 字",
        "旗舰手机 7B-4bit：常见 10+ token/s",
        "TTFT 由 prefill 决定，token/s 由 decode 决定"
      ],
      related: [
        { to: "prefill", kind: "rel", note: "两个指标分别对应两阶段" }
      ],
      refs: [
        { name: "llama.cpp · benchmark 工具（llama-bench）", url: "https://github.com/ggml-org/llama.cpp/blob/master/tools/llama-bench/README.md" },
        { name: "MLPerf Mobile（移动端推理标准测试）", url: "https://mlcommons.org/benchmarks/inference-mobile/" }
      ]
    },
    {
      id: "cloud",
      domain: "runtime",
      title: "端云协同",
      en: "On-Device + Cloud",
      level: "入门",
      path: 10,
      oneLiner: "不是所有活都端侧干：简单、隐私的留在手机上，难的交给云端，路由决定体验与成本",
      detail: [
        "端侧模型受内存与算力约束，规模有限；云端模型强但有时延、要联网、数据出域。主流做法是分工：日常问答、摘要、输入法联想这类高频低难度任务放端侧；复杂推理、长文档分析交给云端。",
        "端侧的不可替代价值有四样：隐私（数据不出设备）、离线可用、低延迟、零调用成本。苹果是典型路线——3B 级小模型常驻设备，够难的任务再上云，云端还用「私有云计算」保证不留痕。",
        "「路由」是协同的大脑：判断每个请求交给谁。判断维度包括任务难度、隐私等级、网络状况与电量——做不好就会出现「该快的不快、该省的不省」。"
      ],
      keys: [
        "端侧强项：隐私 / 离线 / 低时延 / 零成本",
        "苹果路线：3B 常驻端侧 + 云端兜底",
        "路由维度：难度 / 隐私 / 网络 / 电量"
      ],
      related: [
        { to: "quant", kind: "rel", note: "量化决定端侧能常驻多大的模型" }
      ],
      refs: [
        { name: "Apple · Private Cloud Compute（端云边界的官方博客）", url: "https://security.apple.com/blog/private-cloud-compute/" },
        { name: "RouteLLM（arXiv:2406.18665，学习给大/小模型分流请求）", url: "https://arxiv.org/abs/2406.18665" }
      ]
    }
  ]
};
