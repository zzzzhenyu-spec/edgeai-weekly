/* ============================================================
 * 知识分享 · 第 3 讲（子项目文件，格式见 knowledge/README.md）
 * 主站 js/data.js 的 knowledge.weekly 只存元数据 + lesson 指针，
 * 正文与配图在本文件维护；本文件随 git 永久保留（历史期回看靠它）。
 * 配图规范：每段一图（开篇总览 + 各段配图，动态概念用 SVG 动画）。
 * ============================================================ */
window.KNOWLEDGE_LESSONS = window.KNOWLEDGE_LESSONS || {};
KNOWLEDGE_LESSONS[3] = {
  no: 3,
  week: "2026.11.03 — 11.09",
  title: "经典量化算法 I：LLM.int8() 与 GPTQ——异常值与 Hessian 量化",
  hook: "13B 以上模型一压 INT8 就「失智」——病根不是权重，是激活里几个大到离谱的值：一个 100 倍的离群值就能绑架整条量化刻度。一篇论文把 0.5% 的刺头拎出去用 FP16 养；另一篇让每一列的量化误差都记账补偿。端侧 4-bit 的直系祖先，就是这两篇。",
  tags: ["LLM.int8()", "GPTQ", "异常值", "Hessian", "4bit"],
  detail: "[fig1]\n开场白：上一讲留了个尾巴——按理说 INT8 体积减半、速度还快，可实践里 13B 以上的模型一压 INT8 就翻车。2022 年下半年，两篇论文前后脚把问题拆成两条线：8 月的 LLM.int8() 找到病根在「激活里的异常值」，10 月的 GPTQ 则把权重压到 4bit 还能近乎无损。一个管「算得准」（W8A8），一个管「存得小」（W4A16），两招正交、可以叠着用——它们是今天端侧 4-bit 生态的直系祖先。\n[fig2]\n异常现场：先看病根。把某一层的激活值画成热图：绝大多数值都在 ±3 以内晃，但总有几列——固定的几个特征维度——冒出几十倍甚至上百倍的大值。更麻烦的是它们不是噪声：换个输入，还是那几列大；换一层，高度一致。LLM.int8() 论文统计，这种「涌现异常值」约从 6.7B 参数起系统性出现，模型越大越严重。值大本身不可怕，可怕的是它们会把量化的「尺子」撑坏。\n[fig3]\n刻度失灵：第 2 讲讲过，对称量化的 scale（尺长）由最大绝对值决定。一条数轴上若混进一个 100 倍的离群值，尺子就被它一个人绑架：INT8 的 256 个格子间隔被撑大百倍，原本 0.2 与 2.4 这些各不相同的正常值，全被挤进第 0-1 个格子——量化成同一个数，信息直接抹平。而且离群维度是「整列皆大」，per-channel（每列一把尺）也救不了。\n[fig4]\n分而治之：LLM.int8() 的解法朴素得漂亮：既然大值只占约 0.5% 的特征维度，那就把矩阵乘拆成两路——离群维度单独拎出来用 FP16 算（量少，算得起，保住大值精度）；其余 99.5% 的维度没有离群捣乱，尺子恢复正常，安心压成 INT8 做矩阵乘；最后两路相加。维度集合离线统计一次即可（跨输入稳定），分解在矩阵乘内部自动完成，模型代码一行不用改。\n[fig5]\n规模账本：效果说话。朴素 INT8 从 13B 起困惑度明显恶化、175B 完全不可用；LLM.int8() 在 6.7B 到 175B 全尺寸恢复 FP16 精度，175B 批推理还提速约 1.9 倍。离群维度占比随规模上升，但到 175B 也只有约 0.5%——始终是零头，「少数服从少数、多数享受量化」，这笔账一直划算。代价只是挑维度与两路相加的少量额外开销。\n[fig6]\n逐列补偿：LLM.int8() 救的是激活；GPTQ 管另一条线——把权重本身压到 4bit。它的直觉像个记账游戏：权重矩阵一列一列处理，把当前列压到 4-bit 格子上，落格必然产生舍入误差 e（第 2 讲的老朋友）；GPTQ 不认命，立即把 e 折算成对后面未量化列的修正量，让它们「预支」这份误差再量化。于是误差不再是各自为政的噪声，而被整条流水线持续对冲。\n[fig7]\n二阶信息：误差摊给谁、摊多少？GPTQ 用 Hessian（二阶导数矩阵，实践中约等于 2·XᵀX，拿约 128 条校准数据逐层现算）当「重要性权重」：对角元大的列牵一发动全身，少动它；不重要的列多担误差。工程上三招——128 列分块、Cholesky 批更新、顺序解耦——让千亿模型跑得又稳又快：175B 压到 3-4bit 约 4 个 GPU 时；再配合 act-order（按重要性降序处理列），2-bit 都能从「完全崩」救到「能用」。4bit 平均掉点通常在 1% 以内，一次量化、处处运行。\n[fig8]\n收束成图：两招正交——LLM.int8() 是 W8A8（权重激活都 8bit，保精度），GPTQ 是 W4A16（权重 4bit，压体积），叠加就是端侧最经典的组合：4-bit 权重省内存、8-bit/16-bit 激活保精度。GPTQ 的 4-bit 格式至今流淌在 llama.cpp、ExLlama 等推理框架的血统里。但它也留了尾巴：切 0.5% 维度出去总归「不优雅」，想全 INT8 化（W4A8）依然过不了异常值关——这正是下一讲 AWQ 与 SmoothQuant 的入场券：不切维度，把激活的难题搬给权重。",
  figures: {
    fig1: { src: "knowledge/assets/03-outlier-map.svg", cap: "两篇论文分工总览：LLM.int8() 救激活（W8A8「算得准」），GPTQ 压权重（W4A16「存得小」），底部叠加是端侧 4-bit 标配（图：本站绘制）" },
    fig2: { src: "knowledge/assets/03-activation-heatmap.svg", cap: "激活热图示意：离群只发生在少数固定维度（金色列），跨 token、跨层稳定；约 6.7B 参数起涌现（图：本站绘制）" },
    fig3: { src: "knowledge/assets/03-scale-broken.svg", cap: "一个 100 倍离群值把 INT8 刻度撑爆：正常值全挤进 0-1 格；离群维度「整列皆大」，per-channel 也救不了（图：本站绘制）" },
    fig4: { src: "knowledge/assets/03-int8-decompose.svg", cap: "LLM.int8() 混合精度分解：约 0.5% 离群维度走 FP16，其余 99.5% 走 INT8 矩阵乘，两路相加（动图：本站绘制）" },
    fig5: { src: "knowledge/assets/03-scale-vs-quality.svg", cap: "左：离群维度占比随规模上升；右：朴素 INT8 从 13B 起困惑度恶化，LLM.int8() 全尺寸贴住 FP16 基线，175B 批推理提速约 1.9 倍（图：本站绘制）" },
    fig6: { src: "knowledge/assets/03-gptq-column.svg", cap: "GPTQ 逐列量化：量化一列产生误差 e，立即摊给未量化列补偿——误差被流水线持续对冲（动图：本站绘制）" },
    fig7: { src: "knowledge/assets/03-hessian-pipeline.svg", cap: "Hessian 定重要性 + 工程三招（分块/顺序解耦/任意比特宽）+ act-order：175B 约 4 个 GPU 时压到 3-4bit（图：本站绘制）" },
    fig8: { src: "knowledge/assets/03-orthogonal-stack.svg", cap: "正交叠加：W8A8 × W4A16 是端侧 4-bit 标配；GPTQ 血统延续到 llama.cpp/ExLlama，遗留的异常值难题交给下一讲 AWQ/SmoothQuant（图：本站绘制）" }
  },
  refs: [
    { t: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale（NeurIPS 2022，本讲主角色一：异常值发现与混合精度分解）", u: "https://arxiv.org/abs/2208.07339" },
    { t: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers（ICLR 2023，本讲主角色二：Hessian 逐列量化）", u: "https://arxiv.org/abs/2210.17323" },
    { t: "Optimal Brain Compression（NeurIPS 2022，GPTQ 的理论前作：OBQ 最优脑量化）", u: "https://arxiv.org/abs/2208.11580" },
    { t: "A Survey of Quantization Methods for Efficient Neural Network Inference（2021，量化「白皮书」，第 2 讲已引的背景参照）", u: "https://arxiv.org/abs/2103.13630" },
    { t: "bitsandbytes：LLM.int8() 的官方实现（8-bit 权重/优化器工具库）", u: "https://github.com/TimDettmers/bitsandbytes" }
  ],
  next: "第 4 讲 · 经典量化算法 II：AWQ 与 SmoothQuant——不切维度，把激活的难题搬给权重"
};
