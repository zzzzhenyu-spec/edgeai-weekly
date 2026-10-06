# 端侧AI每周情报站 · Edge AI Weekly

> 每周只收**最近 7 天**的端侧 AI / AI 硬件 / 科研论文动态 ｜ [在线阅读](https://zzzzhenyu-spec.github.io/edgeai-weekly/)

## 2026 · 第 42 期（2026.09.30 — 10.06 · 近 7 天）

**近 7 天导读**：近 7 天聚焦：AI 眼镜进入监管时刻——挪威政府拟立法在公共场所临时禁用 AI 眼镜（全球首个国家级动议），荷兰连锁 Hans Anders 停售 Meta 雷朋眼镜，而三星 Galaxy Glasses 过 FCC 认证、有望 11 月上市，扩张与收紧同步进行；Jev 线高热——TypeSafe AI 估值 100 亿美元、日处理破万亿 token，OpenAI 推出被指「Jev 克隆」的 Decisions API，「快+慢」分层成为平台级共识；华为双响——Mate 90 麒麟 τ 四芯齐发（麒麟 9035 NPU +51%），高通获得「逻辑折叠」芯片技术专利许可；地平线 HSD V2.1 国内量产首发端到端全场景倒车；macOS 27 移除 Apple Intelligence 总开关后，社区工具补位释放约 12GB 端侧模型存储。学术侧新作集中于端侧 KV 缓存、小音频语言模型与具身 VLM 端侧部署。今日新增：挪威拟公共场所临时禁用 AI 眼镜；RemoveMacAI 开源工具一键移除 Apple Intelligence、释放约 12GB。

## 近 7 天速览

### 行业关注事件（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-05 | [挪威拟立法在公共场所临时禁用 AI 眼镜：全球首个国家级动议，隐私监管从场馆走向立法](https://www.theguardian.com/world/2026/oct/05/norway-temporary-ban-smart-glasses-public-places) | The Guardian（编译） |
| 2026-10-03 | [Jev 开发商 TypeSafe AI 估值 100 亿美元：日处理破万亿 token，创始人详解「系统一」路线](https://www.qbitai.com/2026/10/500148.html) | 量子位 |
| 2026-09-30 | [OpenAI 在 DevDay 推出 Decisions API：被 TechCrunch 直称「Jev 克隆」，快系统路线获头部实验室跟进](https://techcrunch.com/2026/09/30/openais-jev-clone-could-help-the-frontier-lab-stop-its-swarming-agents/) | TechCrunch（编译） |

### 端侧Agent（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-09-30 | [OpenClaw 推出 Enterprise 版：为持久性智能体补上企业级安全与治理](https://www.ithome.com/1/008/774.htm) | IT之家 |

### AI硬件（3 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-05 | [AI 眼镜隐私抵制蔓延到零售渠道：荷兰连锁 Hans Anders 暂停销售 Meta 雷朋智能眼镜](https://www.ithome.com/1/009/798.htm) | IT之家 |
| 2026-10-02 | [Nvidia 推出 64GB 版 DGX Spark：内存涨价潮下的本地 AI「生路」，4999 美元起](https://www.tomshardware.com/pc-components/gpus/nvidia-introduces-64gb-dgx-spark-to-throw-local-ai-fans-a-lifeline-amid-the-rampocalypse-new-gb10-config-starts-at-usd4999-for-those-who-can-work-with-less) | Tom's Hardware（编译） |
| 2026-10-01 | [三星 Galaxy Glasses 通过美国 FCC 认证：骁龙 AR1 + Android XR + Gemini，有望 11 月上市](https://www.ithome.com/1/009/102.htm) | IT之家 |

### 芯片厂商（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-05 | [高通获得华为「逻辑折叠」芯片技术专利许可：先进封装路线赢得头部芯片公司背书](https://www.ithome.com/1/009/852.htm) | IT之家（彭博社报道） |
| 2026-09-30 | [地平线发布 HSD V2.1：国内量产首发端到端全场景倒车，首批 iCAR V27 10 月 8 日推送](https://www.ithome.com/1/008/787.htm) | IT之家 |

### 手机厂商（1 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-01 | [华为 Mate 90 发布：麒麟 τ 家族四款芯片齐上，麒麟 9035 NPU 提升 51%，小艺智能体进旗舰](https://www.ithome.com/1/009/101.htm) | IT之家 |

### 行业动态（2 条）

| 日期 | 要闻 | 来源 |
|------|------|------|
| 2026-10-06 | [macOS 27 砍掉 Apple Intelligence 总开关后，开源工具 RemoveMacAI 补位：一键移除端侧模型、释放约 12GB](https://arstechnica.com/apple/2026/10/command-line-tool-quickly-removes-apple-intelligence-from-macos-27/) | Ars Technica（编译） |
| 2026-09-30 | [《智能眼镜声学性能测试规范》10 月 2 日实施：收音、放音首次有了统一标尺](https://www.ithome.com/1/008/779.htm) | IT之家 |

## 科研前沿（10 篇）

- **arXiv 新作跟踪（10 篇，预印本）**：[ME-VLM: A Unified VLM for Embodied Cognition and Agent Coo…](https://arxiv.org/abs/2609.24526)；[LoRA-generating hypernetworks for efficient on-device LLM …](https://arxiv.org/abs/2609.24979)；[TierKV: Long-Context On-Device LLMs via Predictive Multi-T…](https://arxiv.org/abs/2609.21172)；[Samsone: A Family of Open Small Audio Language Models for …](https://arxiv.org/abs/2609.21666)；[End-to-End Latency-Minimizing and Load-Balanced Request Sc…](https://arxiv.org/abs/2609.17193)；[CIDERS: Cloud-Edge LLM Collaborative Learning via Accelera…](https://arxiv.org/abs/2609.15664)；[Understanding the Security Boundary of Obfuscation-based O…](https://arxiv.org/abs/2609.10117)；[PELM: Power Efficient On-Device LLM Inference with Specula…](https://arxiv.org/abs/2609.09662)；[From Fixed Keys to Readable Schemas: Small Language Models…](https://arxiv.org/abs/2609.09476)；[Beyond Fluent Generation: A CPU Reliability Benchmark for …](https://arxiv.org/abs/2609.07370)

## 页面板块

① 近 7 天资讯（分类筛选卡片，点击看详情与配图）② 科研前沿（原文扩写中文介绍 + 论文结构图）③ 知识分享（端侧 AI 发展史 + 厂商/个人/中文媒体三分区博客库）④ 评论区

## 说明

- 每周更新，数据窗口严格为运行日往前 7 天；来源仅简体中文与英文；
- 论文收录标准：SCI 二区以上期刊 / CCF-B 以上会议；arXiv 新作以预印本标记跟踪（DBLP 核对 venue）；
- 数据更新于 2026-10-06；本 README 由 `scripts/build_readme.py` 自动生成。
