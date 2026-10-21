# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 44 期（2026.10.15 — 10.21 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：端侧 AI 算力「下沉」与「上探」同时发生——Synaptics 把内置谷歌 Coral NPU、最高 400 GOPS 的多模态边缘 AI 压进 MCU（Astra SR200），Snap 用 2200 美元双目显示+手势追踪眼镜 SPECS 开启消费者预售，AI 眼镜「百元音频—千元拍摄—万元显示」三级价格带成形；监管侧工信部确认超百款终端达 L3 辅助级、旗舰已可端侧自主执行；开源侧 Meta Muse Spark Open（816B 总参，两台 Mac Studio 本地可跑）与 DeepSeek 全开源推理框架 DeepInfer（单集群日吞吐 155 万亿 token）接力，谷歌 Gemini 4 Argon 具身推理 87% 引发具身卡位战，OpenAI 与苹果因 AI 设备机密对簿公堂；陪伴智能体从玩具走向具身——奇瑞墨宝消费级家庭人形开订、跃然光之召唤开售，ISHO Ring 把智能戒指做成指尖入口；首个全流程合规智能体手机开售即遭超百款 App 拒接，豆包 SAEP 协议启动公示；A2A 一周双落地（Rokid 打车、微信语音操作），Meta 修复雷朋「未唤醒也录音」Bug，苹果家用机器人 J595 曝光（最快 2027）。学术侧聚焦端云路由与协同推理、WebGPU 边缘内核与 TEE 模型保护。今日新增：Synaptics Astra SR200、奇瑞墨甲「墨宝」、Snap SPECS 消费者版预售。

## 近 7 天速览

### 行业关注事件（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-19 | [Meta 官方确认雷朋眼镜「未唤醒也录音」的 Bug 并称已修复：睡眠模式无声录音引爆隐私争议](https://mashable.com/tech/meta-confirms-smart-glasses-recording-without-being-activated) | Mashable（编译） |
| 2026-10-18 | [超百款 App 集体拒绝豆包手机助手操控：首个全流程合规智能体手机开售撞上生态墙，豆包发起 SAEP 声明协议](https://www.chinanews.com.cn/sh/2026/10-18/10716588.shtml) | 央视新闻 |
| 2026-10-15 | [OpenAI 反诉指控前员工带走逾百份 AI 设备机密文件回苹果：法官称「极有可能」发禁令，但拒绝全面检查代码库](https://news.qq.com/rain/a/20261015A02U0X00) | 腾讯新闻（全天候科技） |

### 端侧Agent（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-17 | [微信鸿蒙版测试接入 A2A：语音唤醒小艺即可操作微信发消息、打电话](https://www.ithome.com/1/014/331.htm) | IT之家 |
| 2026-10-15 | [黄仁勋谈 OpenClaw：首个真正可信的智能体运行框架，英伟达为之开发 OpenShell 零信任容器](https://www.ithome.com/1/013/610.htm) | IT之家 |

### AI硬件（9 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-21 | [奇瑞墨甲发布首款消费级家庭陪伴人形机器人「墨宝」：0.9 米身高 22 个自由度，分层记忆+FaceID 识别，全球预订开启](https://www.ithome.com/1/016/037.htm) | IT之家 |
| 2026-10-21 | [Snap 首款面向普通消费者的智能眼镜 SPECS 开启预售：双镜片内嵌显示屏+完整手势追踪，2200 美元定价站上 AI 眼镜价格之巅](https://news.qq.com/rain/a/20261021A06KP700) | 腾讯新闻 |
| 2026-10-20 | [讯飞 AI 录音环发布：4+1 麦克风阵列的无感常驻录音设备 1299 元，2 小时录音 10 秒传完、首年不限次数转写](https://news.zol.com.cn/1262/12627470.html) | 中关村在线 |
| 2026-10-20 | [前 REDMI 总经理王腾创业首作 ISHO Ring 智能戒指揭晓：AI 睡眠监测切入指尖入口，航空钛+蓝宝石+同品类最强 MCU，10 月 29 日发布](https://news.mydrivers.com/1/1158/1158784.htm) | 快科技 |
| 2026-10-18 | [苹果家用机器人再曝新进展：古尔曼称 HomeView 高端版代号 J595 配电动机械臂，9 英寸屏 360 度转向说话人，最快 2027 年发布](https://www.ithome.com/1/014/611.htm) | IT之家 |
| 2026-10-17 | [社区让 PS5 变成本地 AI 服务器：Vulkan 原生跑 Qwen3.8-27B 达 20.9 token/s，局域网开放 API](https://www.ithome.com/1/014/372.htm) | IT之家 |
| 2026-10-16 | [Rokid 携手腾讯出行上线行业首个 AI 眼镜原生打车：A2A 协议智能体直连，全程只动口不动手](https://www.ithome.com/1/013/964.htm) | IT之家 |
| 2026-10-16 | [XREAL One Pro Plus 发布：1200 尼特峰值亮度 + AI HDR，599 美元](https://www.ithome.com/1/014/137.htm) | IT之家 |
| 2026-10-15 | [跃然第三代 AI 玩具「光之召唤」开售：奥特曼 AI 互动对话器 599 元，可佩戴形态支持远距离组队对讲](https://sz.ifeng.com/c/8xDX2OH7dM9) | 凤凰网科技 |

### 芯片厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-21 | [Synaptics 发布 Astra SR200 MCU：内置谷歌 Coral NPU、最高 400 GOPS，业界首搭 Cortex-M85+M52 双核并集成高带宽定制 DRAM——多模态边缘 AI 下沉到微控制器](https://www.ithome.com/1/016/027.htm) | IT之家 |
| 2026-10-19 | [达摩院发布首款 ASIL-B+ASIL-D 双认证 RISC-V 车规 CPU 玄铁 E908A，首发自动驾驶与具身智能路线图](https://www.ithome.com/1/014/960.htm) | IT之家 |

### 大模型厂商（7 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-20 | [DeepSeek 全开源大规模推理框架 DeepInfer：单集群日吞吐 155 万亿 token，公布每卡每小时收入 38 美元](https://news.qq.com/rain/a/20261020A0DA3W00) | 智东西 |
| 2026-10-19 | [岩芯矩阵开源 EdgeRock-4B：RMA 记忆岩锚把 KV Cache 固定在 72MiB，单卡 80GB 跑 512 路并发、吞吐 6.42 倍于源模型](https://finance.sina.com.cn/wm/2026-10-19/doc-inivueuh0952341.shtml) | 量子位 |
| 2026-10-17 | [DeepSeek V4.1 Flash：552B MoE 将 KV 缓存压至 1/4（SSD 1/8），1017 版帕累托改进，权重 MIT 开放](https://www.ithome.com/1/014/328.htm) | IT之家 |
| 2026-10-16 | [Meta 开放权重模型 Muse Spark Open：816B 总参 / 42B 激活，两台 M5 Ultra Mac Studio 组 1TB 统一内存本地跑，苹果 CEO 回应「拓展端侧 AI 边界」](https://zhidx.com/p/601572.html) | 智东西 |
| 2026-10-16 | [Gemini 4 Argon 具身推理 87% 领跑前沿模型：单张照片生成数千仿真回合，谷歌、OpenAI、DeepSeek 同月入局具身大脑](https://news.qq.com/rain/a/20261016A0EHO000) | 腾讯新闻（亿欧网） |
| 2026-10-16 | [腾讯混元开源记忆框架 Hy Memory 2.0：3B 激活专用模型跑赢 Opus 5，MemHub 让 10 种 AI 工具共享一份本地记忆](https://www.ithome.com/1/014/108.htm) | IT之家 |
| 2026-10-15 | [PrismML 开源 Ternary Bonsai 2：三元权重把 2B 模型压到 0.43GB，iPhone 18 Pro Max 本地跑出 120 token/s](https://www.ithome.com/1/013/894.htm) | IT之家 |

### 行业动态（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-20 | [工信部定调：AI 手机电脑旗舰已具备端侧自主执行任务能力，超百款终端达 L3、AI 终端从「被动响应」转向「主动服务」](https://finance.sina.com.cn/tech/roll/2026-10-20/doc-inivwitp6542897.shtml) | 新浪科技 |
| 2026-10-15 | [库克确认：Apple Intelligence 携阿里千问/万相获批，月底在华发布测试版（不含 Siri AI）](https://www.ithome.com/1/013/478.htm) | IT之家 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[BiShield-TEE: On the (In-)Security of Unilateral Weight Ob…](https://arxiv.org/abs/2610.21565)；[PriorityFEC: Deadline-Aware Streaming FEC for KV-Cache Han…](https://arxiv.org/abs/2610.21390)；[Disagreement-Guided Weak-to-Strong Routing](https://arxiv.org/abs/2610.22245)；[HyCo: Hybrid Drafting for Cost-Efficient Mobile-Cloud Spec…](https://arxiv.org/abs/2610.21436)；[Verification Turns Capability Gaps into Routing Decisions:…](https://arxiv.org/abs/2610.19169)；[GPU Goldmines: Tunable WebGPU Kernels for Edge LLM Inferen…](https://arxiv.org/abs/2610.17321)；[Context-Aware Precision Scheduling for Small Language Mode…](https://arxiv.org/abs/2610.15640)；[PEAM: On-device Communication Agent for Personalized, Effi…](https://arxiv.org/abs/2610.14855)；[「Is Low Power Enough?」Rethinking Energy Efficiency in High…](https://arxiv.org/abs/2610.14714)；[Linear-Time Non-Local Codec Placement for Machine Learning…](https://arxiv.org/abs/2610.14703)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（博客与厂商动态 + 端侧 AI 概念速查 + GitHub 端侧框架与高星仓库）④ 评论区

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-10-21。
