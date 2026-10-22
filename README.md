# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 44 期（2026.10.16 — 10.22 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：端侧 AI 的模型-算力-商业三线并进——讯飞星火 X2.6 端云一体（293B-A30B、1M 上下文，首个全国产算力完整训练的主流模型，同步开源 4B 端侧版）；Meta 财报确认 Muse 下月登陆智能眼镜并押注订阅变现（美加一个半月超 1000 万人设置 Muse 智能体），AI 眼镜从卖硬件转向卖服务；蚂蚁 LingDT 决策模型 23 项基准超微软与 Jev，专用小模型管执行的格局成形；Synaptics 把谷歌 Coral NPU（开源 RISC-V 架构、最高 400 GOPS）压进 MCU，端侧算力下沉到微控制器层。监管侧工信部确认超百款终端达 L3 辅助级、旗舰已可端侧自主执行；开源侧 DeepSeek 全开源推理框架 DeepInfer（单集群日吞吐 155 万亿 token），Gemini 4 Argon 具身推理 87% 引发具身卡位战；超百款 App 拒接豆包撞出智能体生态墙，SAEP 协议公示；陪伴智能体走向具身（奇瑞墨宝消费级人形开订），ISHO Ring 把智能戒指做成指尖入口，苹果家用机器人 J595 曝光。今日新增：星火 X2.6 端云一体、蚂蚁 LingDT 决策模型、Muse 下月登陆 Meta 智能眼镜。

## 近 7 天速览

### 行业关注事件（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-19 | [Meta 官方确认雷朋眼镜「未唤醒也录音」的 Bug 并称已修复：睡眠模式无声录音引爆隐私争议](https://mashable.com/tech/meta-confirms-smart-glasses-recording-without-being-activated) | Mashable（编译） |
| 2026-10-18 | [超百款 App 集体拒绝豆包手机助手操控：首个全流程合规智能体手机开售撞上生态墙，豆包发起 SAEP 声明协议](https://www.chinanews.com.cn/sh/2026/10-18/10716588.shtml) | 央视新闻 |

### 端侧Agent（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-17 | [微信鸿蒙版测试接入 A2A：语音唤醒小艺即可操作微信发消息、打电话](https://www.ithome.com/1/014/331.htm) | IT之家 |

### AI硬件（9 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-22 | [扎克伯格：Muse 下月正式登陆 Meta 智能眼镜，预计用户将达数十亿——每位用户收入潜力超过现有应用家族总和](https://www.sohu.com/a/1091086713_122066678) | 搜狐科技 |
| 2026-10-21 | [奇瑞墨甲发布首款消费级家庭陪伴人形机器人「墨宝」：0.9 米身高 22 个自由度，分层记忆+FaceID 识别，全球预订开启](https://www.ithome.com/1/016/037.htm) | IT之家 |
| 2026-10-21 | [宇树发布 H2-X「功夫传奇」人形机器人：主打安保救援，4 米高台空翻落地、徒手抬起车头，续航约 8 小时](https://finance.sina.com.cn/wm/2026-10-22/doc-iniwcaff5147685.shtml) | 新浪财经 |
| 2026-10-20 | [讯飞 AI 录音环发布：4+1 麦克风阵列的无感常驻录音设备 1299 元，2 小时录音 10 秒传完、首年不限次数转写](https://news.zol.com.cn/1262/12627470.html) | 中关村在线 |
| 2026-10-20 | [前 REDMI 总经理王腾创业首作 ISHO Ring 智能戒指揭晓：AI 睡眠监测切入指尖入口，航空钛+蓝宝石+同品类最强 MCU，10 月 29 日发布](https://news.mydrivers.com/1/1158/1158784.htm) | 快科技 |
| 2026-10-18 | [苹果家用机器人再曝新进展：古尔曼称 HomeView 高端版代号 J595 配电动机械臂，9 英寸屏 360 度转向说话人，最快 2027 年发布](https://www.ithome.com/1/014/611.htm) | IT之家 |
| 2026-10-17 | [社区让 PS5 变成本地 AI 服务器：Vulkan 原生跑 Qwen3.8-27B 达 20.9 token/s，局域网开放 API](https://www.ithome.com/1/014/372.htm) | IT之家 |
| 2026-10-16 | [Rokid 携手腾讯出行上线行业首个 AI 眼镜原生打车：A2A 协议智能体直连，全程只动口不动手](https://www.ithome.com/1/013/964.htm) | IT之家 |
| 2026-10-16 | [XREAL One Pro Plus 发布：1200 尼特峰值亮度 + AI HDR，599 美元](https://www.ithome.com/1/014/137.htm) | IT之家 |

### 芯片厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-21 | [Synaptics 发布 Astra SR200 MCU：内置谷歌 Coral NPU、最高 400 GOPS，业界首搭 Cortex-M85+M52 双核并集成高带宽定制 DRAM——多模态边缘 AI 下沉到微控制器](https://www.ithome.com/1/016/027.htm) | IT之家 |
| 2026-10-19 | [达摩院发布首款 ASIL-B+ASIL-D 双认证 RISC-V 车规 CPU 玄铁 E908A，首发自动驾驶与具身智能路线图](https://www.ithome.com/1/014/960.htm) | IT之家 |

### 大模型厂商（8 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-22 | [讯飞 1024 开发者节发布星火 X2.6 端云一体大模型：293B-A30B MoE、1M 上下文，首个全国产算力完整训练的主流模型，同步开源 4B 端侧版](https://www.ithome.com/1/016/403.htm) | IT之家 |
| 2026-10-22 | [蚂蚁数科发布决策模型 LingDT-Decision-1.0：23 项基准超越微软与 Jev 热门决策模型，Token 消耗降超 90%、响应快 10 倍](https://news.qq.com/rain/a/20261022A0BKMW00) | 腾讯新闻 |
| 2026-10-20 | [DeepSeek 全开源大规模推理框架 DeepInfer：单集群日吞吐 155 万亿 token，公布每卡每小时收入 38 美元](https://news.qq.com/rain/a/20261020A0DA3W00) | 智东西 |
| 2026-10-19 | [岩芯矩阵开源 EdgeRock-4B：RMA 记忆岩锚把 KV Cache 固定在 72MiB，单卡 80GB 跑 512 路并发、吞吐 6.42 倍于源模型](https://finance.sina.com.cn/wm/2026-10-19/doc-inivueuh0952341.shtml) | 量子位 |
| 2026-10-17 | [DeepSeek V4.1 Flash：552B MoE 将 KV 缓存压至 1/4（SSD 1/8），1017 版帕累托改进，权重 MIT 开放](https://www.ithome.com/1/014/328.htm) | IT之家 |
| 2026-10-16 | [Meta 开放权重模型 Muse Spark Open：816B 总参 / 42B 激活，两台 M5 Ultra Mac Studio 组 1TB 统一内存本地跑，苹果 CEO 回应「拓展端侧 AI 边界」](https://zhidx.com/p/601572.html) | 智东西 |
| 2026-10-16 | [Gemini 4 Argon 具身推理 87% 领跑前沿模型：单张照片生成数千仿真回合，谷歌、OpenAI、DeepSeek 同月入局具身大脑](https://news.qq.com/rain/a/20261016A0EHO000) | 腾讯新闻（亿欧网） |
| 2026-10-16 | [腾讯混元开源记忆框架 Hy Memory 2.0：3B 激活专用模型跑赢 Opus 5，MemHub 让 10 种 AI 工具共享一份本地记忆](https://www.ithome.com/1/014/108.htm) | IT之家 |

### 行业动态（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-20 | [工信部定调：AI 手机电脑旗舰已具备端侧自主执行任务能力，超百款终端达 L3、AI 终端从「被动响应」转向「主动服务」](https://finance.sina.com.cn/tech/roll/2026-10-20/doc-inivwitp6542897.shtml) | 新浪科技 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[BiShield-TEE: On the (In-)Security of Unilateral Weight Ob…](https://arxiv.org/abs/2610.21565)；[PriorityFEC: Deadline-Aware Streaming FEC for KV-Cache Han…](https://arxiv.org/abs/2610.21390)；[Disagreement-Guided Weak-to-Strong Routing](https://arxiv.org/abs/2610.22245)；[HyCo: Hybrid Drafting for Cost-Efficient Mobile-Cloud Spec…](https://arxiv.org/abs/2610.21436)；[Verification Turns Capability Gaps into Routing Decisions:…](https://arxiv.org/abs/2610.19169)；[GPU Goldmines: Tunable WebGPU Kernels for Edge LLM Inferen…](https://arxiv.org/abs/2610.17321)；[Context-Aware Precision Scheduling for Small Language Mode…](https://arxiv.org/abs/2610.15640)；[PEAM: On-device Communication Agent for Personalized, Effi…](https://arxiv.org/abs/2610.14855)；[「Is Low Power Enough?」Rethinking Energy Efficiency in High…](https://arxiv.org/abs/2610.14714)；[Linear-Time Non-Local Codec Placement for Machine Learning…](https://arxiv.org/abs/2610.14703)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（博客与厂商动态 + 端侧 AI 概念速查 + GitHub 端侧框架与高星仓库）④ 评论区

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-10-22。
