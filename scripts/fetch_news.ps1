# ============================================================
# fetch_news.ps1 —— 抓取 RSS/Atom 订阅源中的端侧AI相关新闻候选
# 用法: powershell -ExecutionPolicy Bypass -File scripts\fetch_news.ps1
#       可选参数 -Days 10 (回看天数, 默认10, 周报留些余量)
# 订阅源列表: scripts\sources.json (可自行增删)
# 输出: data\news_candidates.json + 控制台摘要
# 人工择要、撰写中文总结后整理进 js\data.js 的 news 数组
# ============================================================
param(
    [int]$Days = 10
)

$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dataDir = Join-Path $root 'data'
New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
$srcFile = Join-Path $root 'scripts\sources.json'

if (-not (Test-Path $srcFile)) { Write-Host "未找到 $srcFile" -ForegroundColor Red; exit 1 }
$sources = Get-Content $srcFile -Raw -Encoding UTF8 | ConvertFrom-Json

# 相关性关键词: 标题或摘要命中其一即保留(小写匹配)
$keywords = @(
    '端侧', '端侧ai', '端侧大模型', 'on-device', 'on device', 'edge ai', 'edge-side',
    'edge llm', 'npu', 'ai手机', 'ai phone', '小模型', 'slm', 'small language model',
    'mobile ai', 'local ai', 'offline ai', 'agentic ai', 'inference',
    'apple intelligence', 'gemini nano', 'galaxy ai', '天玑', '骁龙', 'snapdragon', 'dimensity',
    '瑞芯微', 'rk1828', '展锐', '全志', '海思', '麒麟', '玄戒', '蓝心', '小艺', 'andresgpt',
    'openclaw', 'workbuddy', 'jev', 'typesafe', 'minicpm', '端云协同'
)

$since = (Get-Date).AddDays(-$Days)
$results = @()

foreach ($s in $sources) {
    Write-Host "抓取: $($s.name) ($($s.url))"
    try {
        $resp = Invoke-WebRequest -Uri $s.url -UseBasicParsing -TimeoutSec 30 `
                  -Headers @{ 'User-Agent' = 'Mozilla/5.0 (weekly-info RSS fetcher)' }
        [xml]$x = $resp.Content
        $items = @()
        if ($x.rss) {            # RSS 2.0
            $items = @($x.rss.channel.item | ForEach-Object {
                [pscustomobject]@{ title = $_.title; link = $_.link; date = $_.pubDate; desc = $_.description }
            })
        } elseif ($x.feed) {     # Atom
            $items = @($x.feed.entry | ForEach-Object {
                [pscustomobject]@{ title = $_.title.'#text'; link = $_.link.href; date = $_.published; desc = $_.summary.'#text' }
            })
        }
        $hit = 0
        foreach ($it in $items) {
            if (-not $it.title) { continue }
            $text = ("$($it.title) $($it.desc)").ToLower()
            $matched = @($keywords | Where-Object { $text.Contains($_) })
            if ($matched.Count -eq 0) { continue }
            $d = [datetime]::Now
            if ($it.date) { try { $d = [datetime]$it.date } catch { } }
            if ($d -lt $since) { continue }
            $plain = ($it.desc -replace '<[^>]+>', '' -replace '\s+', ' ').Trim()
            if ($plain.Length -gt 400) { $plain = $plain.Substring(0, 400) + '...' }
            $results += [pscustomobject]@{
                source = $s.name; cat = $s.cat
                title = ($it.title -replace '\s+', ' ').Trim()
                date = $d.ToString('yyyy-MM-dd')
                matched = ($matched -join ',')
                summary = $plain
                url = "$($it.link)"
            }
            $hit++
        }
        Write-Host "  命中 $hit 条"
    } catch {
        Write-Host "  抓取失败: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Start-Sleep -Milliseconds 800
}

$results = $results | Sort-Object date -Descending
$out = Join-Path $dataDir 'news_candidates.json'
[IO.File]::WriteAllText($out, ($results | ConvertTo-Json -Depth 4), [Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "共 $($results.Count) 条候选(近 $Days 天), 已写入 $out" -ForegroundColor Green
Write-Host "------ 摘要 ------"
foreach ($r in $results) {
    Write-Host ("[{0}][{1}] {2}" -f $r.date, $r.source, $r.title)
    Write-Host ("      命中: {0}" -f $r.matched) -ForegroundColor DarkGray
}
