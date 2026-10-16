/* ============================================================
 * 知识分享 · 第 1 讲（子项目文件，格式见 knowledge/README.md）
 * 主站 js/data.js 的 knowledge.weekly 只存元数据 + lesson 指针，
 * 正文与配图在本文件维护；本文件随 git 永久保留（历史期回看靠它）。
 * 配图规范：每段一图（开篇总览 + 各段配图，动态概念用 SVG 动画）。
 * ============================================================ */
window.KNOWLEDGE_LESSONS = window.KNOWLEDGE_LESSONS || {};
KNOWLEDGE_LESSONS[1] = {
  no: 1,
  week: "2026.10.16 — 10.26",
  title: "大模型是怎么装进手机的：一次端侧推理的完整旅程",
  hook: "一台 12GB 内存的手机，凭什么跑得动一个「原始体积上百 GB」的大模型？答案是一条环环相扣的流水线：压缩、分阶段计算、缓存复用、专用芯片——本讲把它从头到尾走一遍。",
  tags: ["量化", "KV缓存", "NPU", "llama.cpp", "端侧推理"],
  detail: "[fig1]\n起点：模型文件就是一堆数字。一个 7B（70 亿参数）模型本质是数万个权重矩阵——每个参数以 FP16（16bit、2 字节）存盘，仅权重就要约 14GB，比多数手机的整机内存还大。所以「大模型上手机」的第一关不是算得快，而是装得下：压缩。\n[fig4]\n第一刀：量化。把权重从 16bit 压到 4bit，体积约缩至四分之一（14GB→约 3.5GB），乘加运算也从高精度浮点变成低精度整数，内存带宽压力同步骤降。现代量化算法（GPTQ、AWQ、GGUF 的 Q4_K_M 等）已能把能力损失控制在很小的范围——「量化」正是本栏目接下来三讲的主角，此处先记住结论：没有量化，就没有端侧大模型。\n[fig2]\n第二段：推理分两步走。prefill（预填充）把你输入的整段提示词一次性并行读入、算出注意力中间结果，吃的是算力（compute-bound）；decode（解码）逐 token 生成，每吐一个字都要把全部权重从内存读一遍，吃的是内存带宽（memory-bound）。端侧体验里「首字慢」多卡在 prefill，「越聊越慢」多卡在 decode——两者的瓶颈不同，优化手段也不同。\n[fig3]\n第三步：KV 缓存是草稿纸。为避免每生成一个 token 都重算全部历史，推理引擎会把每层的中间结果缓存下来（KV 缓存）；它随上下文长度线性膨胀——32K 上下文下，一个 7B 模型的 FP16 缓存就能吃掉数 GB，与权重争抢同一块内存。KV 量化、滑动窗口、闪存 offload 都是为它而生的技术线（第 8 讲专门拆）。\n[fig5]\n第四步：谁来算——NPU 与统一内存。手机 SoC 里 CPU 通用但慢、GPU 快但费电，NPU（神经网络处理器）是为矩阵乘法定制的电路，单位功耗算力高一个量级，旗舰 NPU 已破 100 TOPS。但模型要跑满 NPU，还须先经编译器（QNN、CoreML、MLC 等）翻译成它能执行的算子——「模型转换后掉性能」多半卡在这一步。另一个关键词是统一内存：CPU/GPU/NPU 共享同一块内存、权重只放一份，是苹果 Apple silicon 与新一代手机平台的共同卖点。\n[fig6]\n第五步：工具链把流水线接通。llama.cpp 负责「读 GGUF 量化模型→调度 CPU/GPU/NPU→管理 KV 缓存→吐 token」全流程，是端侧推理的事实标准；Ollama 在其上补模型管理与易用性；MLX 面向苹果统一内存重新设计了数值计算库；ExecuTorch、MNN、ncnn 则服务 App 内嵌部署。你在手机上每一次「本地跑大模型」，背后都是这条流水线在转。\n[fig7]\n收束：三条曲线正在交汇。模型侧，35B 级 MoE 模型以约 3GB 内存占用跑进 iPhone（面壁 MiniCPM-V 4.7，13+ token/s）；芯片侧，高通已给出 2028 年移动平台本地运行 100B 模型的路线图；工具侧，量化与编译链一年数迭代。端侧大模型已过「能不能」的阶段，正处在「好不好」的竞赛中——本栏目将沿这条流水线每周拆一个知识点，把每一环讲透。\n[fig8]",
  figures: {
    fig1: { src: "knowledge/assets/01-pipeline.svg", cap: "端侧推理流水线全景：权重文件 → 量化 → 统一内存（与 KV 缓存共处）→ prefill/decode 两阶段 → token 输出，底部是贯穿全程的工具链（图：本站绘制）" },
    fig4: { src: "knowledge/assets/01-weights-matrix.svg", cap: "模型就是一堆数字：数万个权重矩阵，每个参数 FP16 占 2 字节——7B 参数仅权重约 14GB，比多数手机整机内存还大（图：本站绘制）" },
    fig2: { src: "knowledge/assets/01-quant-size.svg", cap: "7B 模型量化前后：FP16 约 14GB → 4bit 约 3.5GB，体积约四分之一、带宽压力同步下降（图：本站绘制）" },
    fig3: { src: "knowledge/assets/01-prefill-decode.svg", cap: "prefill 与 decode 的动态对比：上方提示 token 同步点亮（并行、算力瓶颈），下方输出 token 依次点亮（串行、带宽瓶颈、每步读全部权重）（动图：本站绘制）" },
    fig5: { src: "knowledge/assets/01-kv-cache.svg", cap: "KV 缓存随对话变长而膨胀的动态示意：金色块从 0.2GB 一路长到数 GB，与固定不变的权重（青色块）争抢同一块内存（动图：本站绘制）" },
    fig6: { src: "knowledge/assets/01-soc-uma.svg", cap: "SoC 里的三兄弟与统一内存：CPU 通用、GPU 快但费电、NPU 为矩阵乘法定制；三者共享一块内存，权重零拷贝只放一份（图：本站绘制）" },
    fig7: { src: "knowledge/assets/01-toolchain.svg", cap: "端侧工具链分层：llama.cpp 是事实标准底座（读模型→调度→管缓存→吐 token），Ollama/MLX/ExecuTorch/MNN 各据一层入口（图：本站绘制）" },
    fig8: { src: "knowledge/assets/01-curves.svg", cap: "模型压得小、芯片算得动、工具串得起——三条曲线在 2026 交汇，端侧大模型从「能不能」进入「好不好」的竞赛（图：本站绘制）" }
  },
  refs: [
    { t: "Apple：Introducing Apple's On-Device and Server Foundation Models（2024，工业界端侧模型公开标杆报告）", u: "https://machinelearning.apple.com/research/introducing-apple-foundation-models" },
    { t: "llama.cpp（GitHub，端侧推理事实标准引擎）", u: "https://github.com/ggml-org/llama.cpp" },
    { t: "FlashAttention: Fast and Memory-Efficient Exact Attention（NeurIPS 2022，arXiv:2205.14135）", u: "https://arxiv.org/abs/2205.14135" },
    { t: "面壁 MiniCPM-V 4.7 发布报道（本站「近 7 天资讯」收录，2026-10）", u: "https://www.ithome.com/1/012/483.htm" }
  ],
  next: "第 2 讲 · 量化入门：从 FP16 到 4-bit，模型体积是怎么压到四分之一的"
};
