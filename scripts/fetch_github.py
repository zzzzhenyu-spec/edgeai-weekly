# -*- coding: utf-8 -*-
# ============================================================
# fetch_github.py —— 抓取近期高星 AI 仓库（GitHub Search API）
# 用法: python scripts/fetch_github.py
# 输出: js/github_repos.js  ->  window.GH_REPOS = {updated, repos:[...]}
# 规则: 近 ~120 天创建、星数达阈值的 AI 相关仓库，按星数排序取前 12；
#       多组查询词合并去重（未认证 API 限额 60 次/时，本脚本最多 3 次请求）。
# 失败时保留旧文件（面板显示旧数据并在页面标注抓取日期）。
# ============================================================
import datetime
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from netutil import http_get

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "js" / "github_repos.js"
UA = {"User-Agent": "edgeai-weekly/1.0", "Accept": "application/vnd.github+json"}

QUERIES = [
    'topic:llm stars:>{s} created:>{since}',
    'topic:ai-agents stars:>{s} created:>{since}',
    'topic:on-device stars:>{s} created:>{since}',
]
STAR_FLOOR = 1200
MAX_ITEMS = 12


def fetch():
    since = (datetime.date.today() - datetime.timedelta(days=120)).isoformat()
    seen, repos = set(), []
    for q_tpl in QUERIES:
        q = q_tpl.format(s=STAR_FLOOR, since=since)
        url = ("https://api.github.com/search/repositories?q=" +
               q.replace(" ", "+").replace(":", "%3A").replace(">", "%3E").replace("/", "%2F") +
               "&sort=stars&order=desc&per_page=10")
        try:
            data = json.loads(http_get(url, timeout=25, headers=UA).decode("utf-8", "ignore"))
        except Exception as e:
            print(f"  [失败] {q}: {str(e)[:60]}")
            continue
        for it in data.get("items", []):
            if it["id"] in seen:
                continue
            seen.add(it["id"])
            repos.append({
                "name": it["full_name"],
                "url": it["html_url"],
                "stars": it["stargazers_count"],
                "desc": it.get("description") or "",
                "lang": it.get("language") or "",
                "pushed": (it.get("pushed_at") or "")[:10],
            })
        if len(repos) >= MAX_ITEMS + 8:
            break
    repos.sort(key=lambda r: r["stars"], reverse=True)
    return repos[:MAX_ITEMS]


def main():
    repos = fetch()
    if not repos:
        print("未取到任何仓库（API 限额或网络问题），保留旧文件")
        return 1
    payload = {"updated": datetime.date.today().isoformat(), "repos": repos}
    OUT.write_text(
        "/* 自动生成: scripts/fetch_github.py (勿手改) · 近120天高星AI仓库 */\n"
        "window.GH_REPOS = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8", newline="\n")
    print(f"已写入 {OUT.relative_to(ROOT)}：{len(repos)} 个仓库")
    for r in repos:
        print(f"  ★{r['stars']:>6}  {r['name']}  ({r['lang']})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
