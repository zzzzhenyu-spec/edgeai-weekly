/* ============================================================
 * 知识分享 · 第 4 讲（子项目文件，格式见 knowledge/README.md）
 * 主站 js/data.js 的 knowledge.weekly 只存元数据 + lesson 指针，
 * 正文与配图在本文件维护；本文件随 git 永久保留（历史期回看靠它）。
 * 配图规范：每段一图（开篇总览 + 各段配图，动态概念用 SVG 动画）。
 * 排期注：原排 11-15 核结上线，快照夜顺延至 11-17 补上，周期按实际展示窗标注。
 * ============================================================ */
window.KNOWLEDGE_LESSONS = window.KNOWLEDGE_LESSONS || {};
KNOWLEDGE_LESSONS[4] = {
  no: 4,
  week: "2026.11.17 — 11.22",
  title: "经典量化算法 II：AWQ 与 SmoothQuant——不切维度，把激活的难题搬给权重",
  hook: "切 0.5% 维度出去养 FP16，终究不优雅——这对论文发现了矩阵乘里一对「互逆旋钮」：激活除以 s、权重乘上 s，输出分毫不变，量化难度却从激活搬进了权重。SmoothQuant 搬完两头全压整数（W8A8），AWQ 用激活幅度护住 1% 命门通道（W4A16）。",
  tags: ["SmoothQuant", "AWQ", "等价变换", "W8A8", "量化缩放"],
  detail: "[fig1]\n开场白：上一讲留了两个尾巴——LLM.int8() 把 0.5% 离群维度切出去走 FP16，矩阵乘内部拆成两路，硬件上终究「不优雅」；想再进一步把激活也压到 8bit（W4A8），异常值那关依然过不去。2022 年 11 月挂出的 SmoothQuant（ICML 2023）与 2023 年 6 月的 AWQ（MLSys 2024 最佳论文）给出了同一个洞察的两条路径：不切维度、不重训练——矩阵乘里本来就有等价变换的自由度，把激活的量化难度「搬」给权重就行。\n[fig2]\n谁强谁弱：SmoothQuant 的开篇观察是「难度不对称」。权重直方图安分守己：范围窄、无离群，压到 8bit 几乎无感；激活却背着第 3 讲说的离群值包袱——大模型里出现大值的通道成片存在（远多于「极端特征维度 0.5%」的口径），最大值可达中位数的百倍。一边是软柿子一边是硬骨头，那能不能让硬的变软、软的扛一点？\n[fig3]\n数学钥匙：矩阵乘对逐通道缩放天生免疫——把激活的第 j 个通道除以 s_j，同时把权重的第 j 列乘上 s_j，乘积逐元素不变。这对「互逆旋钮」在浮点下输出一个 bit 都不差，却改变了两边的量化处境：激活被压平（离群值缩小），权重被撑开（原本平缓的分布变大）。注意搬家不是消灭难度，是把它挪到扛得住的一边。\n[fig4]\n搬多少是门手艺：SmoothQuant 给每个通道定缩放 s_j = max|X_j|^α / max|W_j|^(1−α)，指数 α 就是「搬迁强度」——α=0 完全不搬，α=1 全搬给权重。搬太少，激活还是难量化；搬太多，权重自己被撑爆。多数模型在 0.5 上下找到平衡点，离群凶猛的模型按需上调。s 只在校准集上统计一次，推理时不再变。\n[fig5]\n工程点睛：缩放因子不新增任何算子——激活侧的除法直接「融」进前一层的权重里（前一层输出本来就要乘权重，把 s_j 乘进去即可），推理图零开销。搬家后激活离群被抹平、权重被放大但仍在可控范围，于是两边一起压 INT8：W8A8 纯整数矩阵乘让 OPT-175B 级模型近乎无损地跑起来，对比 FP16 提速至多约 1.56 倍、内存省一半，530B 模型塞进单节点——LLM.int8() 时代的「异常值魔咒」就此解开。\n[fig6]\n另一扇门：AWQ 从权重一侧进门。它先做了个对照实验——把权重里约 1% 的「命门通道」保护起来跳过不量化，4-bit 误差骤降；而这些通道既不是权值最大的、也不是随机的，是由激活幅度标记的：激活大的通道，权重抖一下、输出就抖很大。但若照 LLM.int8() 的老路把 1% 切出去走 FP16，又是混精度、硬件不友好。AWQ 的答案：不切，用缩放保护。\n[fig7]\n同一件外衣：具体做法就是第 3 段的等价变换——把命门通道的权重列放大 s 倍、激活同除 s（输出不变），该列量化的相对误差随之变小——给命门上了保险，权重矩阵却保持「纯 4-bit」的统一格式。s 不训练、不反向传播：拿 512 条校准文本，对每层以激活幅度为底、指数在 0–1 之间做约 20 档网格搜索，选输出差异最小的一档。W4A16 部署端到端较 FP16 提速约 2.2 倍（TinyChat 引擎），量化内核也比 GPTQ 快约 1.45 倍；AutoAWQ、vLLM 等推理栈原生支持，成了开源圈最常见的 4-bit 权重格式之一。\n[fig8]\n收束成图：四篇论文拼成一张完整地图——LLM.int8() 切维度保精度（W8A8 混合精度）、GPTQ 逐列记账压权重（W4A16）、SmoothQuant 等价缩放搬难度（W8A8 全整数）、AWQ 激活感知护命门（W4A16 统一格式）。等价缩放与逐列补偿彼此正交，主流工具链里常被组合使用。但端侧玩家更熟悉的名字还在后面：llama.cpp 里的 Q4_K_M、GGUF 文件——第 5 讲就讲这套「方言」怎么把 4-bit 又往前推了一步。",
  figures: {
    fig1: { src: "knowledge/assets/04-move-overview.svg", cap: "搬家总览：同一洞察两条路——等价缩放把激活的量化难度搬进权重；SmoothQuant 搬完两头全压整数（W8A8），AWQ 只压权重但护住命门通道（W4A16）（图：本站绘制）" },
    fig2: { src: "knowledge/assets/04-difficulty-asymmetry.svg", cap: "难度不对称：权重分布平缓（软柿子），激活带成片离群通道（硬骨头）—— SmoothQuant 的开篇观察（图：本站绘制）" },
    fig3: { src: "knowledge/assets/04-equivalent-transform.svg", cap: "数学钥匙：激活通道除以 s_j、权重列乘以 s_j，输出逐元素不变——量化难度却换了一边（动图：本站绘制）" },
    fig4: { src: "knowledge/assets/04-smooth-alpha.svg", cap: "SmoothQuant 缩放公式与 α 搬迁强度：α=0 不搬 / α=1 全搬，多数模型 0.5 上下找平衡（图：本站绘制）" },
    fig5: { src: "knowledge/assets/04-smooth-fuse-w8a8.svg", cap: "缩放融进上一层权重（零新增算子）后全整数 W8A8：OPT-175B 级近乎无损，至多约 1.56× 提速、内存省一半（图：本站绘制）" },
    fig6: { src: "knowledge/assets/04-awq-observe.svg", cap: "AWQ 对照实验：只保护约 1% 命门通道（激活幅度标记），4-bit 误差骤降；混精度切分硬件不友好，改用缩放（图：本站绘制）" },
    fig7: { src: "knowledge/assets/04-awq-search.svg", cap: "AWQ 离线搜索：512 条校准样本、约 20 档缩放网格，选输出差异最小档；零反向传播零回归（图：本站绘制）" },
    fig8: { src: "knowledge/assets/04-family-map.svg", cap: "四算法族谱：LLM.int8()（切维度 W8A8 混精）/ GPTQ（逐列 W4A16）/ SmoothQuant（缩放 W8A8 全整数）/ AWQ（缩放 W4A16 统一格式）；下一站 GGUF 与 k-quants（图：本站绘制）" }
  },
  refs: [
    { t: "SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models（ICML 2023，本讲主角色一：等价缩放搬难度、W8A8 全整数）", u: "https://arxiv.org/abs/2211.10438" },
    { t: "AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration（MLSys 2024 最佳论文，本讲主角色二：激活感知护命门、W4A16）", u: "https://arxiv.org/abs/2306.00978" },
    { t: "mit-han-lab/smoothquant（SmoothQuant 官方实现与逐模型 α 配置）", u: "https://github.com/mit-han-lab/smoothquant" },
    { t: "mit-han-lab/llm-awq（AWQ 官方实现，含 TinyChat 端侧部署）", u: "https://github.com/mit-han-lab/llm-awq" },
    { t: "casper-hansen/AutoAWQ（AWQ 的社区维护工具链，vLLM/TGI 等推理栈的 4-bit 后端）", u: "https://github.com/casper-hansen/AutoAWQ" }
  ],
  next: "第 5 讲 · GGUF 与 k-quants：Q4_K_M 们是什么；FP4/FP8 低比特前沿"
};
