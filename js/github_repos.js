/* 自动生成: scripts/fetch_github.py (勿手改) · 端侧框架精选(curated, 星标实时) + 近120天高星新仓库 */
window.GH_FRAMEWORKS = {
  "updated": "2026-10-18",
  "frameworks": [
    {
      "repo": "alibaba/MNN",
      "name": "MNN",
      "tags": [
        "推理引擎",
        "阿里"
      ],
      "one": "阿里轻量级端侧推理引擎，CV 与 LLM 通吃",
      "intro": "阿里开源的深度学习推理引擎，覆盖手机、嵌入式与 IoT 全场景，自带模型转换、量化与训练压缩工具链。\n端侧视角：既能跑传统 CV 模型也支持端侧大模型推理（MNN-LLM），安卓/iOS/离线场景一把梭，是国产端侧部署的头部选择。\n适合想在国内移动生态做本地推理的工程团队。",
      "url": "https://github.com/alibaba/MNN",
      "stars": 16238,
      "lang": "C++",
      "pushed": "2026-10-16",
      "updates": [
        {
          "v": "3.6.1",
          "d": "2026-07-23",
          "notes": [
            "3.6.1 正式版上线 PyPI（pip install mnn==3.6.1），3.6 系列稳定迭代",
            "GitHub Release 说明较简，工程动态以主干提交为主"
          ]
        },
        {
          "v": "3.6.0",
          "d": "2026-06-16",
          "notes": [
            "MNN 3.6.0 版本发布说明",
            "发布日期: 2026年6月",
            "📦 安装: pip install mnn==3.6.0 ｜ PyPI"
          ]
        }
      ]
    },
    {
      "repo": "Tencent/ncnn",
      "name": "ncnn",
      "tags": [
        "CV推理",
        "腾讯"
      ],
      "one": "手机端 CV 推理事实标准之一，无第三方依赖",
      "intro": "腾讯优图开源的手机端前向推理框架，零第三方依赖、包体小，CPU 指令级优化极深。\n端侧视角：移动端 CV 模型部署（检测/分割/超分）的老牌事实标准，与 MNN 同为国产端侧双雄；对 LLM 支持弱，定位偏传统 CV。\n适合对包体与 CPU 兼容性敏感的移动端 CV 项目。",
      "url": "https://github.com/Tencent/ncnn",
      "stars": 23972,
      "lang": "C++",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "20260526",
          "d": "2026-05-26",
          "notes": [
            "预编译包更新：默认配置全平台构建——Android NDK r29、鸿蒙 SDK 5.0.3、Xcode 16.4、VS2015–2022、Ubuntu 22.04/24.04"
          ]
        },
        {
          "v": "20260113",
          "d": "2026-01-13",
          "notes": [
            "编译版本，默认配置，android-ndk-r29，xcode 16.4，ubuntu-22.04，ubuntu-24.04，vs2015，vs2017，vs2019，vs2022…",
            "新增sdpa layer和pnnx torch.scaled_dot_product_attention的转换，支持gqa合并",
            "新增rotaryembed layer"
          ]
        }
      ]
    },
    {
      "repo": "Tencent/TNN",
      "name": "TNN",
      "tags": [
        "推理引擎",
        "腾讯"
      ],
      "one": "统一调度 CPU/GPU/NPU 的移动推理框架",
      "intro": "腾讯新一代推理框架，一套接口统一调用移动端 CPU、GPU 与 NPU，通过算子融合与半精度量化压延迟。\n端侧视角：承接 ncnn 之后的异构加速路线，是手机 NPU 时代国产部署的重要选项之一。\n适合需要在同一 App 内适配多档机型异构算力的团队。",
      "url": "https://github.com/Tencent/TNN",
      "stars": 4659,
      "lang": "C++",
      "pushed": "2025-05-09",
      "updates": [
        {
          "v": "v0.3.0",
          "d": "2021-04-26",
          "notes": [
            "最近一次正式 Release 较早（2021）：支持 Intel x86 与 NVIDIA GPU，补齐 LSTM/BERT 等 NLP 算子",
            "此后项目以主干维护为主，无新正式版号"
          ]
        }
      ]
    },
    {
      "repo": "PaddlePaddle/Paddle-Lite",
      "name": "Paddle Lite",
      "tags": [
        "推理引擎",
        "百度"
      ],
      "one": "飞桨端侧引擎，ARM/NPU 后端齐备",
      "intro": "百度飞桨的轻量化端侧推理引擎，支持 ARM CPU、Mali/Adreno GPU 与 NPU（含瑞芯微/华为等），配套 x2paddle 模型转换。\n端侧视角：飞桨体系模型的端侧出口，工业质检、移动端部署案例多；模型来自飞桨训练时链路最顺。\n适合已经在飞桨生态内的端侧落地项目。",
      "url": "https://github.com/PaddlePaddle/Paddle-Lite",
      "stars": 7289,
      "lang": "C++",
      "pushed": "2026-04-27",
      "updates": [
        {
          "v": "v2.14-rc",
          "d": "2024-07-19",
          "notes": [
            "适配 PaddleX 套件 4 场景、8 个 Paddle 3.0 beta 模型，端侧 Arm CPU 与 OpenCL GPU 可推理（PP-LCNet、MobileNetV3 等）",
            "此后以 v2.14 系列/nightly 为主，无新正式版号"
          ]
        },
        {
          "v": "v2.13-rc",
          "d": "2023-03-27",
          "notes": [
            "易用性提升: Windows、Linux、macOS 新增支持 Python 3.9/3.10，提供 x86 平台 Python 3.7/3.8/3.9/3.10 wheel 包，…",
            "性能优化：优化 Transformer 类模型在 Arm CPU 的性能，ERNIE 3.0-Medium，ERNIE 3.0-Mini，ERNIE 3.0-Micro，ERNIE…",
            "新硬件支持：MTK APU 新增支持 MT8188 芯片，适配 Picodet 与 TinyPose FP32 模型。"
          ]
        }
      ]
    },
    {
      "repo": "mindspore-ai/mindspore",
      "name": "MindSpore",
      "tags": [
        "全栈框架",
        "华为昇腾"
      ],
      "one": "华为昇思，Lite 子模块覆盖端侧与 NPU 亲和",
      "intro": "华为开源的深度学习框架，MindSpore Lite 子模块负责端侧推理，对麒麟 NPU 与昇腾硬件亲和最好。\n端侧视角：鸿蒙/麒麟设备上做本地推理的首选链路，训练-压缩-端侧部署一体化；小艺等系统级能力的工程底座之一。\n适合面向华为/鸿蒙生态的端侧 AI 团队。",
      "url": "https://github.com/mindspore-ai/mindspore",
      "stars": 4714,
      "lang": "C++",
      "pushed": "2024-07-29",
      "updates": []
    },
    {
      "repo": "google-ai-edge/LiteRT",
      "name": "LiteRT",
      "tags": [
        "端侧运行时",
        "谷歌"
      ],
      "one": "原 TensorFlow Lite，安卓端侧部署事实标准",
      "intro": "Google 的端侧推理运行时（原 TensorFlow Lite），支持 NNAPI/GPU/加速器委托，安卓装机量最大的端侧推理框架。\n端侧视角：安卓系统级 AI 能力（ML Kit、AICore 之外的自研路径）绕不开的基础设施；模型经 TFLite Converter 转换与量化。\n适合安卓端任何轻量级本地模型部署。",
      "url": "https://github.com/google-ai-edge/LiteRT",
      "stars": 3500,
      "lang": "C++",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "v2.3.0",
          "d": "2026-10-07",
          "notes": [
            "官方称为「端侧 AI 效率的跨越」版本：大模型端侧推理效率显著提升，含 API 与平台层更新"
          ]
        },
        {
          "v": "v2.2.0",
          "d": "2026-08-13",
          "notes": [
            "API 与平台层例行更新"
          ]
        }
      ]
    },
    {
      "repo": "pytorch/executorch",
      "name": "ExecuTorch",
      "tags": [
        "端侧运行时",
        "PyTorch"
      ],
      "one": "PyTorch 官方端侧运行时，torch.export 直达设备",
      "intro": "PyTorch 官方的端侧部署运行时：torch.export 导出模型，经 Ahead-of-Time 编译落到移动/嵌入式设备，与 Qualcomm QNN、Core ML 等后端委托打通。\n端侧视角：研究侧 PyTorch 模型「原样」上端侧的最短路径，量化与算子下沉持续演进。\n适合模型在 PyTorch 训练、要下到手机/可穿戴的团队。",
      "url": "https://github.com/pytorch/executorch",
      "stars": 5104,
      "lang": "Python",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "v1.5.1",
          "d": "2026-09-23",
          "notes": [
            "CMSIS-NN 升至 v8.0.0 并对齐 Arm runner 依赖；新增 get_thread_count() 公开 API"
          ]
        },
        {
          "v": "v1.5.0",
          "d": "2026-09-16",
          "notes": [
            "Python wheels 扩展为 C++ SDK：CUDA / Core ML / MLX / OpenVINO / Qualcomm 委托提供可链接库，并打包 TorchAO"
          ]
        }
      ]
    },
    {
      "repo": "ml-explore/mlx",
      "name": "MLX",
      "tags": [
        "数组框架",
        "苹果"
      ],
      "one": "苹果官方 Apple silicon 本地推理框架",
      "intro": "苹果机器学习团队开源的数组计算框架与 LLM 推理栈，为统一内存架构设计，CPU/GPU 可混用同一块内存。\n端侧视角：Mac 本地大模型生态的事实基建之一（mlx-lm 之上长出 LM Studio 等产品），Apple silicon 跑大模型的「官方答案」。\n适合在 Mac 生态做本地推理与模型移植的工程师。",
      "url": "https://github.com/ml-explore/mlx",
      "stars": 28836,
      "lang": "C++",
      "pushed": "2026-10-16",
      "updates": [
        {
          "v": "v0.32.4",
          "d": "2026-10-14",
          "notes": [
            "为缩放点积注意力补充 VJP（向量-雅可比积）支持",
            "Python 侧新增数组 __pos__ 支持，并新增 Python 3.15/3.15t 支持"
          ]
        },
        {
          "v": "v0.32.3",
          "d": "2026-09-29",
          "notes": [
            "修复零尺寸轴上的 scan/sort；std/var 新增修正参数（例行修复版）"
          ]
        }
      ]
    },
    {
      "repo": "microsoft/onnxruntime",
      "name": "ONNX Runtime",
      "tags": [
        "推理引擎",
        "微软"
      ],
      "one": "跨平台推理引擎，端侧中间格式事实标准",
      "intro": "微软维护的高性能跨平台推理引擎，配合 ONNX 交换格式成为「各框架训练、统一部署」的中间层事实标准，提供 Mobile/Web/直连各 NPU 的执行提供者。\n端侧视角：模型跨端迁移（训练框架无关）的默认答案；Windows AI 与不少手机厂商部署链路里都有它。\n适合多框架来源模型、多目标平台的部署团队。",
      "url": "https://github.com/microsoft/onnxruntime",
      "stars": 22113,
      "lang": "C++",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "v1.31.0",
          "d": "2026-10-09",
          "notes": [
            "model-package 与 EPContext 数据回调转正为稳定 C/C++ API；CPU 模型加载提速"
          ]
        },
        {
          "v": "plugin-ep-cuda/v0.3.0",
          "d": "2026-10-09",
          "notes": [
            "CUDA 插件执行引擎引入稀疏注意力与打包连续批处理，新增 INT2 与混合精度",
            "decode kernel 调优与可靠性修复，扩展分页投机解码与可选 MatMul 自动调优"
          ]
        }
      ]
    },
    {
      "repo": "openvinotoolkit/openvino",
      "name": "OpenVINO",
      "tags": [
        "推理引擎",
        "英特尔"
      ],
      "one": "Intel 端侧引擎，CPU/iGPU/NPU 一套 API",
      "intro": "Intel 的端侧推理与优化工具套件，一套 API 调度 x86 CPU、核显与 NPU，模型优化器负责转换与量化。\n端侧视角：AI PC（酷睿 Ultra NPU）与边缘盒子的官方路线，Windows/Linux 本地部署英特尔多核场景几乎默认选它。\n适合面向 AI PC 与 Intel 边缘硬件的应用。",
      "url": "https://github.com/openvinotoolkit/openvino",
      "stars": 11018,
      "lang": "C++",
      "pushed": "2026-10-17",
      "updates": [
        {
          "v": "2026.4.1",
          "d": "2026-10-01",
          "notes": [
            "ONNX 前向的大模型 GroupQueryAttention 支持增强：补齐因果注意力与部分旋转位置编码，扩大可跑模型范围"
          ]
        },
        {
          "v": "2026.4.0",
          "d": "2026-09-16",
          "notes": [
            "扩大 GenAI 能力覆盖与框架集成，减少用户代码改动",
            "CPU 侧新增 Gemma-3n 等模型支持"
          ]
        }
      ]
    },
    {
      "repo": "ggml-org/llama.cpp",
      "name": "llama.cpp",
      "tags": [
        "本地LLM",
        "GGUF"
      ],
      "one": "本地 LLM 推理事实标准，GGUF 量化生态源头",
      "intro": "Georgi Gerganov 发起的纯 C/C++ 大模型推理引擎，GGML/GGUF 量化格式的源头，CPU 也能跑大模型，日常小版本日更。\n端侧视角：本地大模型开源生态的地基——Ollama 等主流本地运行时底层都用它；新模型社区支持几乎第一时间到位。\n适合一切想离线跑 LLM 的设备与场景。",
      "url": "https://github.com/ggml-org/llama.cpp",
      "stars": 131587,
      "lang": "C++",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "b11719",
          "d": "2026-10-18",
          "notes": [
            "CUDA flash attention 内核优化：k_VKQ_max 条件满足时跳过越界检查",
            "官网 llama.app 上线"
          ]
        },
        {
          "v": "b11718",
          "d": "2026-10-18",
          "notes": [
            "恢复 FFN 路径上的 ESIMD 内核（Intel 贡献）"
          ]
        }
      ]
    },
    {
      "repo": "apache/tvm",
      "name": "Apache TVM",
      "tags": [
        "编译器",
        "端侧部署"
      ],
      "one": "深度学习编译器，模型编译到各类端侧硬件",
      "intro": "Apache 顶级的深度学习编译器框架，把模型编译优化到 CPU/GPU/NPU 等各类硬件后端。\n端侧视角：编译器路线的端侧部署重镇——MLC LLM 即基于 TVM 把大模型编译上手机/浏览器；自动调优（auto-tuning）是它的独门能力。\n适合需要为新硬件/长尾硬件适配模型性能的团队。",
      "url": "https://github.com/apache/tvm",
      "stars": 13844,
      "lang": "Python",
      "pushed": "2026-10-18",
      "updates": [
        {
          "v": "v0.27.0.post1",
          "d": "2026-09-29",
          "notes": [
            "修复版：CUDA host bundling 支持低精度、tensor-map 与 cluster 内核"
          ]
        },
        {
          "v": "v0.27.0",
          "d": "2026-09-25",
          "notes": [
            "0.27 稳定版：TIR/CUDA 低精度与 tensor-map/cluster kernel 支持、Relax-ONNX Split initializer 修复（.post1 修 CUDA host bundling）"
          ]
        }
      ]
    },
    {
      "repo": "k2-fsa/sherpa-onnx",
      "name": "sherpa-onnx",
      "tags": [
        "离线语音",
        "Kaldi"
      ],
      "one": "端侧离线语音识别/合成框架",
      "intro": "Next-gen Kaldi 系的端侧语音框架，支持流式/离线 ASR、TTS、说话人识别，模型走 ONNX、无需联网服务。\n端侧视角：设备本地语音交互（眼镜/耳机/IoT）常用底座，跨安卓/iOS/Linux/嵌入式，配套模型生态完整。\n适合做离线语音助手与实时字幕类应用。",
      "url": "https://github.com/k2-fsa/sherpa-onnx",
      "stars": 15348,
      "lang": "C++",
      "pushed": "2026-10-17",
      "updates": [
        {
          "v": "v1.13.8",
          "d": "2026-09-10",
          "notes": [
            "修复 FunASR-Nano / Qwen3-ASR 离线识别器共享 PRNG 的数据竞争"
          ]
        },
        {
          "v": "v1.13.7",
          "d": "2026-09-01",
          "notes": [
            "修复 iOS Flutter 包，Rust 侧支持 Windows arm64，CI 构建修复"
          ]
        }
      ]
    },
    {
      "repo": "ggml-org/whisper.cpp",
      "name": "whisper.cpp",
      "tags": [
        "离线语音",
        "Whisper"
      ],
      "one": "Whisper 的 C/C++ 端侧移植，本地听写标配",
      "intro": "OpenAI Whisper 语音识别的纯 C/C++ 移植，量化后可在手机与笔记本上实时转写。\n端侧视角：本地听写/会议转写/字幕类应用的默认选择之一，与 llama.cpp 同社区同工程风格。\n适合一切需要离线语音转文字的端侧应用。",
      "url": "https://github.com/ggml-org/whisper.cpp",
      "stars": 54466,
      "lang": "C++",
      "pushed": "2026-10-12",
      "updates": [
        {
          "v": "v1.9.5",
          "d": "2026-10-06",
          "notes": [
            "维护版：ggml 同步升至 v0.26.0（nightly b5454）"
          ]
        },
        {
          "v": "v1.9.4",
          "d": "2026-09-11",
          "notes": [
            "例行版本更新：夜间构建 b5130，版本策略随 ggml 家族统一"
          ]
        }
      ]
    },
    {
      "repo": "google-ai-edge/mediapipe",
      "name": "MediaPipe",
      "tags": [
        "CV管线",
        "谷歌"
      ],
      "one": "谷歌端侧 CV/多模态管线框架",
      "intro": "Google 的跨平台端侧 ML 管线框架，内置人脸/手势/姿态等大量成品方案，图式编排（Graph）组装多模型流水线。\n端侧视角：安卓端 CV 能力（相机特效、手势交互）最常用的现成积木，也逐步接入 LLM/多模态任务。\n适合要快速集成成熟端侧 CV 能力的应用。",
      "url": "https://github.com/google-ai-edge/mediapipe",
      "stars": 37315,
      "lang": "C++",
      "pushed": "2026-10-16",
      "updates": [
        {
          "v": "v1.1.1",
          "d": "2026-10-14",
          "notes": [
            "为 Flutter SDK 增加按域拆分的 C 库，Bazel 构建调整"
          ]
        },
        {
          "v": "v1.1.0",
          "d": "2026-10-07",
          "notes": [
            "构建链现代化：移除内部 Bazel Apple 规则依赖；Bazel 构建支持 Python 3.13 / 3.14"
          ]
        }
      ]
    },
    {
      "repo": "apple/coremltools",
      "name": "coremltools",
      "tags": [
        "工具链",
        "苹果"
      ],
      "one": "Core ML 模型转换与量化工具链",
      "intro": "苹果官方的 Core ML 模型转换/量化/优化工具，PyTorch 与 TF 模型经它变成 iOS 可用的 .mlmodel/mlpackage。\n端侧视角：iOS 端侧部署的必经之路——神经网络压缩（palettization/剪枝）与 ANE 适配都在这条链上。\n适合任何要把模型塞进 iPhone/iPad 的团队。",
      "url": "https://github.com/apple/coremltools",
      "stars": 5434,
      "lang": "Python",
      "pushed": "2026-09-30",
      "updates": [
        {
          "v": "9.0",
          "d": "2025-11-10",
          "notes": [
            "9.0 正式版：Python 3.13 支持、int8 输入输出、模型状态读写、iOS26/macOS26 部署目标"
          ]
        },
        {
          "v": "9.0b1",
          "d": "2025-07-28",
          "notes": [
            "最近 Release 为 2025 年 7 月的 9.0b1（模型 int8 输入输出、模型状态读写、iOS26 系列部署目标），此后以主干维护为主"
          ]
        }
      ]
    },
    {
      "repo": "airockchip/rknn-toolkit2",
      "name": "RKNN-Toolkit2",
      "tags": [
        "NPU工具链",
        "瑞芯微"
      ],
      "one": "瑞芯微 NPU 工具链，RK 系端侧盒子入口",
      "intro": "瑞芯微官方的 NPU 模型转换/量化/部署工具链，把 ONNX/PyTorch 模型编译为 RK3588/RK3576 等芯片的 NPU 指令。\n端侧视角：国产端侧开发板与盒子（AI 盒子、机器人、边缘小主机）跑本地模型的主流硬件入口之一。\n适合用 RK 系硬件做本地推理的极客与边缘设备团队。",
      "url": "https://github.com/airockchip/rknn-toolkit2",
      "stars": 3452,
      "lang": "C",
      "pushed": "2026-10-13",
      "updates": [
        {
          "v": "v2.3.2",
          "d": "2025-04-09",
          "notes": [
            "最近公开 Release：RV1126B 平台支持、einsum/Norm 算子增强、自动混合精度；更新节奏随芯片 SDK 走"
          ]
        },
        {
          "v": "v2.3.0",
          "d": "2024-11-11",
          "notes": [
            "最近 Release 为 2024 年 11 月的 v2.3.0（ARM64 架构、Lite2 支持 pip 安装、RK3576 W4A16 对称量化），此后以主干维护为主"
          ]
        }
      ]
    },
    {
      "repo": "XiaoMi/mace",
      "name": "MACE",
      "tags": [
        "推理引擎",
        "小米"
      ],
      "one": "小米移动 AI 计算引擎，手机异构加速早期代表",
      "intro": "小米开源的移动端深度学习推理框架，针对手机 SoC 的 CPU/GPU/DSP 异构调度设计，早期端侧部署代表项目。\n端侧视角：手机厂商自研端侧框架开源的先行者，目前迭代节奏放缓，选型时更多作为参考实现。\n适合研究手机异构加速历史与老机型兼容场景。",
      "url": "https://github.com/XiaoMi/mace",
      "stars": 5052,
      "lang": "C++",
      "pushed": "2024-06-17",
      "updates": [
        {
          "v": "v1.1.1",
          "d": "2022-01-13",
          "notes": [
            "最近正式版为 2022 年（APU v4 ION buffer、Hexagon 库自动签名）——项目维护节奏已放缓，选型时注意"
          ]
        },
        {
          "v": "v1.0.4",
          "d": "2021-03-18",
          "notes": [
            "最近 Release 为 2021 年 3 月的 v1.0.4（MTK GPU 计算误差修复与预热优化），此后以主干维护为主"
          ]
        }
      ]
    }
  ]
};
window.GH_REPOS = {
  "updated": "2026-10-18",
  "repos": [
    {
      "name": "morluto/rea",
      "url": "https://github.com/morluto/rea",
      "stars": 317513,
      "desc": "Reverse engineer anything with agents, from app behavior down to native binaries.",
      "lang": "TypeScript",
      "pushed": "2026-10-18",
      "pinned": true,
      "intro_cn": "用智能体做逆向工程：从 App 行为到原生二进制都能自动分析，接入 Ghidra 等反编译器与 MCP 协议——安全研究 × AI Agent 的爆款（编辑置顶：创建于 2026-04，超出 120 天新建窗口故不在搜索榜内）。"
    },
    {
      "name": "deepseek-ai/deepseek-harness",
      "url": "https://github.com/deepseek-ai/deepseek-harness",
      "stars": 252884,
      "desc": "DeepSeek Harness: Everything is a Plugin.",
      "lang": "TypeScript",
      "pushed": "2026-10-17",
      "intro_cn": "DeepSeek 官方智能体框架：一切皆插件——把工具、技能与工作流统一成插件体系，国产开源智能体底座的现象级项目。"
    },
    {
      "name": "Ebony-Vinyl/dsh-our-free-model",
      "url": "https://github.com/Ebony-Vinyl/dsh-our-free-model",
      "stars": 24251,
      "desc": "在 dsh 里装上这个插件即可，无需登录、注册或填 API Key，就能使用包括 DeepSeek V4.1 Flash、Kimi K3 在内的前沿模型——完全免费，不限量。 All you do is install this plugin in dsh: no login, no sign-up, no API key — the frontier models are just there, DeepSeek V4.1 Flash and Kimi K3 among them. Completely free, with no usage cap.",
      "lang": "JavaScript",
      "pushed": "2026-10-18",
      "intro_cn": "dsh 免登录插件：装上即用 DeepSeek V4.1 Flash、Kimi K3 等模型，无需注册或填 API Key。"
    },
    {
      "name": "hypit-ai/hypit",
      "url": "https://github.com/hypit-ai/hypit",
      "stars": 23412,
      "desc": "Clone any viral video with AI agents. Not just a script, the whole workflow: swap the face, the words, the B-roll, ship 100 variants in one command, and get your 100M views.",
      "lang": "TypeScript",
      "pushed": "2026-10-15",
      "intro_cn": "用 AI 智能体克隆爆款视频：不止脚本，换脸、台词、B-roll 整条工作流一条命令跑完，可批量出百个变体。"
    },
    {
      "name": "lexmount/moli",
      "url": "https://github.com/lexmount/moli",
      "stars": 19431,
      "desc": "Best headless browser for AI agents. Lite, Fast, High-Compatibility. Built in Rust",
      "lang": "Rust",
      "pushed": "2026-10-18",
      "intro_cn": "给 AI 智能体用的无头浏览器：轻量、快速、高兼容——Agent 上网操作类任务的基础设施。"
    },
    {
      "name": "img2threejs/img2threejs",
      "url": "https://github.com/img2threejs/img2threejs",
      "stars": 18353,
      "desc": "Rebuild the object in a reference image as a code-only, procedural, quality-gated, animation-ready Three.js model. Token-efficient image-to-3D.",
      "lang": "Python",
      "pushed": "2026-10-17",
      "intro_cn": "把参考图里的物体重建成纯代码的 Three.js 程序化 3D 模型——省 token 的图像转 3D 路线。"
    },
    {
      "name": "yetone/magpie",
      "url": "https://github.com/yetone/magpie",
      "stars": 15713,
      "desc": "Every agent's model. One place. Codex on DeepSeek, Claude Code on Kimi, from the menu bar.",
      "lang": "Go",
      "pushed": "2026-10-18",
      "intro_cn": "一个入口用所有模型：让 Codex 跑 DeepSeek、Claude Code 跑 Kimi——智能体的模型路由层。"
    },
    {
      "name": "Vincentwei1021/video-shotcraft",
      "url": "https://github.com/Vincentwei1021/video-shotcraft",
      "stars": 12365,
      "desc": "AI video skill for Claude Code & Codex — cinematic product videos with Remotion: 152 shot recipe cards, 209 motion previews, a production-ready template",
      "lang": "TypeScript",
      "pushed": "2026-10-17",
      "intro_cn": "Claude Code / Codex 的 AI 视频技能：基于 Remotion 出电影级产品视频，内置 152 张运镜配方卡。"
    },
    {
      "name": "google/artemis",
      "url": "https://github.com/google/artemis",
      "stars": 12270,
      "desc": "ARTEMIS turns natural-language instructions into reliable Android automation. It automates end-to-end workflows, captures logs, and integrates seamlessly with AI coding assistants such as Antigravity, Codex, and Claude Code.  It also achieves 99%+ success rate on AndroidWorld Benchmark.",
      "lang": "Python",
      "pushed": "2026-10-01",
      "intro_cn": "谷歌出品：自然语言指令驱动的 Android 自动化智能体，AndroidWorld 基准 99%+ 成功率——GUI Agent 方向的标杆项目。"
    },
    {
      "name": "trailhq/Trail-Code",
      "url": "https://github.com/trailhq/Trail-Code",
      "stars": 10367,
      "desc": "Turbocharge Claude Code, Cursor, Codex, Gemini & every coding agent: faster, cheaper, with contextual understanding specific to your codebase.",
      "lang": "TypeScript",
      "pushed": "2026-10-18",
      "intro_cn": "给 Claude Code / Cursor / Codex 提速降本的上下文引擎：按你的代码库做情境理解。"
    },
    {
      "name": "TencentCloud/Octop",
      "url": "https://github.com/TencentCloud/Octop",
      "stars": 9851,
      "desc": "A smarter, self-hosted AI assistant — multi-user, multi-agent.",
      "lang": "Python",
      "pushed": "2026-10-18",
      "intro_cn": "腾讯云开源的自托管 AI 助手：多用户、多智能体，可私有化部署。"
    },
    {
      "name": "FareedKhan-dev/kimi-k3-in-c",
      "url": "https://github.com/FareedKhan-dev/kimi-k3-in-c",
      "stars": 9094,
      "desc": "A 2.78-trillion-parameter Kimi K3 running inference on a single CPU in 8.24 GB of RAM. Portable C99: no BLAS, no framework, no GPU.",
      "lang": "C",
      "pushed": "2026-10-02",
      "intro_cn": ""
    },
    {
      "name": "deeplethe/utopia",
      "url": "https://github.com/deeplethe/utopia",
      "stars": 8426,
      "desc": "World's first open-source enterprise world model.",
      "lang": "Rust",
      "pushed": "2026-10-18",
      "intro_cn": ""
    }
  ]
};
