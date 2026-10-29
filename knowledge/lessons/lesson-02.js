/* ============================================================
 * 知识分享 · 第 2 讲（子项目文件，格式见 knowledge/README.md）
 * 主站 js/data.js 的 knowledge.weekly 只存元数据 + lesson 指针，
 * 正文与配图在本文件维护；本文件随 git 永久保留（历史期回看靠它）。
 * 配图规范：每段一图（开篇总览 + 各段配图，动态概念用 SVG 动画）。
 * ============================================================ */
window.KNOWLEDGE_LESSONS = window.KNOWLEDGE_LESSONS || {};
KNOWLEDGE_LESSONS[2] = {
  no: 2,
  week: "2026.10.26 — 11.01",
  title: "量化入门：从 FP16 到 4-bit——定点表示、对称/非对称、PTQ 与 QAT",
  hook: "同一个数，FP16 用 16 个比特、65,536 种取值来存；4-bit 只给 16 个等距格子。量化就是这场「搬家」——怎么搬、搬到哪个格子、由谁说了算。看懂这一讲，GPTQ、AWQ、Q4_K_M 就不再是黑话。",
  tags: ["量化", "PTQ", "QAT", "INT4", "混合精度"],
  detail: "[fig1]\n开场白：上一讲我们看到，7B 模型按 FP16 存要约 14GB，而 4bit 只要约 3.5GB——体积直接除以 4，这正是端侧能跑大模型的第一前提。「量化」这个词听着玄，做的事却很朴素：用更少的比特存同一个数。本讲把它拆成三个问题讲透——数怎么表示、值怎么对应、参数怎么求。读完它，你就拿到了看懂后面三讲（LLM.int8()/GPTQ/AWQ/GGUF）的最低门票。\n[fig2]\n表示法：先看数的存储。FP16 用 16 个比特：1 位符号、5 位指数、10 位尾数——指数让它在「离零很近」和「离零很远」处都有表示力（动态范围大），代价是绝对间隔不均匀：0.5 附近的精度与 1000 附近完全是两回事。INT4 只有 16 个等距格子（如 −7 到 +8），没有任何「浮动」可言。量化做的事，就是把 FP16 里连续分布的权重，搬进这 16 个格子——每搬一次都会产生「落格误差」，量化算法的全部目标就是让误差伤不到模型能力。\n[fig3]\n映射公式：搬家的规则是一条线性公式：q = round(x / scale) + zero。scale（步长）决定一格代表多大的数；zero（零点）决定 FP 的 0 对齐哪个格子。对称量化 zero = 0，数轴两边对称，适合大体对称分布的权重；非对称量化允许零点偏移，适合「几乎全在正半轴」的分布——经过 ReLU 的激活值天然非负，若强行对称量化，负半轴的格子整段空着，等于白白浪费一半表示力。选对模式，就是让 16 个格子物尽其用。\n[fig4]\n粒度选择：一套 (scale, zero) 给整个张量用，叫 per-tensor——最省事，但范围一旦被极大值撑爆，误差也最大；每个输出通道一套，叫 per-channel，是权重量化的事实默认；再细下去，每 128 个连续值一套，叫 per-group，是 4bit 量化的主流粒度（GGUF 的 k-quants 就属于这一族）。粒度越细，格子与数据贴合越准；额外开销只是每组的 scale 存储——128 个权重共享一个 FP16 scale，约 1.6%，几乎免费。\n[fig5]\nPTQ 路线：参数怎么求？最常用的是 PTQ（训练后量化）：拿训练好的 FP 模型，喂一小批校准样本（典型 128 条到 512 条文本）前向一遍，统计每层权重与激活的数值范围，解出 scale 与零点，直接落格——不需要原始训练集、不需要反向传播，一台笔记本几分钟完成。范围统计有门道：min/max 会被一个 +60 的异常激活撑爆（其余 ±0.5 的正常值全挤进同一格），改用 99.9% 分位截断或 KL 散度（熵校准）往往更稳；GPTQ 则更进一步，用 Hessian 信息「代价敏感」地决定每个权重怎么落格——那是第 3 讲的主角。\n[fig6]\nQAT 路线：对精度要求极高时上 QAT（量化感知训练）：在训练图里插入「伪量化」节点——前向时按 INT4 网格取整再还原（让模型在训练中就体验量化误差），反向时用直通估计器 STE（straight-through estimator）把取整当作不存在、梯度照常回传。模型在训练中主动把权重「搬」到对损失伤害最小的格点附近，量化后精度损失显著小于 PTQ。代价是贵：需要训练数据与算力——开源社区用得少，手机厂商的出厂模型常用（HAQ 甚至把量化方案当作可搜索空间，随硬件反馈一起自动搜索）。\n[fig7]\n误差真相：量化误差并不均匀。Transformer 里极少数隐藏维度的激活幅度可以是其他维度的数十倍——这些「离群值」若被压进 INT4，会把 scale 撑得极大，其余值全部挤进一两个格子。LLM.int8() 的解法（第 3 讲拆解）：把约 0.1% 的高幅度通道单独走 FP16、其余 99.9% 压 INT8，两路矩阵乘完再相加，几乎无损。同理，工程惯例是首层 embedding 与末层输出保 FP16、敏感层保 8bit、安静的中间层压 4bit——这就是「混合精度」。\n[fig8]\n收束成图：拿到一个模型怎么选？能重新训练→QAT（HAQ/LSQ 一路）；不能→PTQ；求稳→8bit per-channel；求小→4bit per-group 加聪明的校准（GPTQ/AWQ/GGUF）；再往下 2bit/1.58bit 就要动结构了。这些「聪明的校准」正是接下来两讲的主角：LLM.int8() 与 GPTQ 如何用 Hessian 决定「谁保精度、谁被压扁」。",
  figures: {
    fig1: { src: "knowledge/assets/02-quant-map.svg", cap: "量化的三个问题全景：精度阶梯 FP16（65,536 种取值）→ INT8（256 种）→ INT4（16 种），下方对应「怎么表示 / 怎么映射 / 参数怎么求」三问（图：本站绘制）" },
    fig2: { src: "knowledge/assets/02-bits-layout.svg", cap: "位布局对比：FP16 = 1 符号 + 5 指数 + 10 尾数（动态范围大、间隔不均匀）；INT4 = 16 个等距格子——量化就是把连续分布的权重搬进格子（图：本站绘制）" },
    fig3: { src: "knowledge/assets/02-scale-map.svg", cap: "对称 vs 非对称量化：权重分布对称用零点对齐（上），ReLU 后全正的激活值用零点右移占满格子（下），金色点动态演示取值落入格子的过程（动图：本站绘制）" },
    fig4: { src: "knowledge/assets/02-granularity.svg", cap: "量化粒度三档：per-tensor 一把尺子量全部 / per-channel 每通道一把 / per-group 每 128 个值一把（4bit 主流，额外开销约 1.6% 几乎免费）（图：本站绘制）" },
    fig5: { src: "knowledge/assets/02-ptq-pipeline.svg", cap: "PTQ 流水线：FP 模型 → 喂 128–512 条校准样本 → 统计每层范围（min/max、99.9% 分位、KL 散度）→ 定 scale 落格 → 产出可部署的量化权重，全程免训练（图：本站绘制）" },
    fig6: { src: "knowledge/assets/02-qat-ste.svg", cap: "QAT 与 STE：训练图插入伪量化节点，前向模拟落格误差、反向直通梯度；右侧动态演示训练推进时权重从散乱逐渐吸附到 INT4 格点（动图：本站绘制）" },
    fig7: { src: "knowledge/assets/02-mixed-precision.svg", cap: "混合精度：层堆叠里首尾层保 FP16、敏感层 INT8、安静中间层 INT4；右侧为 LLM.int8() 的发现——个别隐藏维度激活是其他维度的数十倍，离群通道单独走 FP16（图：本站绘制）" },
    fig8: { src: "knowledge/assets/02-decision-tree.svg", cap: "量化选择决策树：能重训练走 QAT（HAQ/LSQ），不能则 PTQ——求稳 8bit per-channel，求小 4bit per-group（GPTQ/AWQ/GGUF），更低位需动结构（图：本站绘制）" }
  },
  refs: [
    { t: "A Survey of Quantization Methods for Efficient Neural Network Inference（2021，量化方法综述「白皮书」，本讲框架的主要参照）", u: "https://arxiv.org/abs/2103.13630" },
    { t: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale（离群值分解量化，第 3 讲主角）", u: "https://arxiv.org/abs/2208.07339" },
    { t: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers（Hessian 逐列量化，第 3 讲主角）", u: "https://arxiv.org/abs/2210.17323" },
    { t: "HAQ: Hardware-Aware Automated Quantization（CVPR 2019，可微搜索量化方案）", u: "https://arxiv.org/abs/1811.08886" },
    { t: "LSQ: Learnable Step Size Quantization（CVPR 2020，把 scale 当作参数学习）", u: "https://arxiv.org/abs/1902.08153" }
  ],
  next: "第 3 讲 · 经典量化算法 I：LLM.int8() 与 GPTQ——离群值与 Hessian 量化"
};
