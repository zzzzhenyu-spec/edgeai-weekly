# ============================================================
# fetch_papers.ps1 —— 从 arXiv 抓取"端侧AI"相关最新论文候选
# 用法: powershell -ExecutionPolicy Bypass -File scripts\fetch_papers.ps1
#       可选参数 -Days 21 (回看天数, 默认21)  -Max 25 (每个查询取几条)
# 输出: data\papers_candidates.json + 控制台摘要
# 人工筛选(期刊二区以上 / CCF-B 以上会议)后整理进 js\data.js
# ============================================================
param(
    [int]$Days = 21,
    [int]$Max = 25
)

$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dataDir = Join-Path $root 'data'
New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

$queries = @(
    'all:"on-device LLM"',
    'all:"on-device AI"',
    'all:"on-device agent"',
    'all:"on-device inference"',
    'all:"edge LLM"',
    'all:"small language model"',
    'all:"LLM smartphone"'
)

# 相关性关键词(命中其一即保留)
$keywords = @('on-device', 'on device', 'edge device', 'edge ai', 'edge llm',
              'smartphone', 'mobile device', 'mobile llm', 'wearable', 'iot',
              'embedded device', 'npu', 'resource-constrained', 'resource constrained',
              '端侧', 'edge-side', 'mobile agent', 'edge computing')

$since = (Get-Date).AddDays(-$Days)
$seen = @{}
$results = @()

foreach ($q in $queries) {
    $url = "https://export.arxiv.org/api/query?search_query=$([uri]::EscapeDataString($q))&sortBy=submittedDate&sortOrder=descending&max_results=$Max"
    Write-Host "查询: $q"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 40
        [xml]$feed = $resp.Content
        $entries = @($feed.feed.entry)
        foreach ($e in $entries) {
            if (-not $e.id) { continue }
            if ($seen.ContainsKey($e.id)) { continue }
            $pub = [datetime]$e.published
            if ($pub -lt $since) { continue }
            $text = ("$($e.title) $($e.summary)").ToLower()
            $matched = @($keywords | Where-Object { $text.Contains($_) })
            if ($matched.Count -eq 0) { continue }
            $seen[$e.id] = $true
            $authors = @($e.author | ForEach-Object { $_.name })
            $results += [pscustomobject]@{
                id        = $e.id
                title     = ($e.title -replace '\s+', ' ').Trim()
                authors   = ($authors | Select-Object -First 12)
                published = $pub.ToString('yyyy-MM-dd')
                updated   = ([datetime]$e.updated).ToString('yyyy-MM-dd')
                cats      = (@($e.category | ForEach-Object { $_.term }) -join ',')
                matched   = ($matched -join ',')
                summary   = ($e.summary -replace '\s+', ' ').Trim()
                url       = $e.id
            }
        }
    }
    catch {
        Write-Host "  请求失败: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Start-Sleep -Seconds 3   # arXiv API 礼貌间隔
}

$results = $results | Sort-Object published -Descending
$out = Join-Path $dataDir 'papers_candidates.json'
[IO.File]::WriteAllText($out, ($results | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "共 $($results.Count) 篇候选(近 $Days 天), 已写入 $out" -ForegroundColor Green
Write-Host "------ 摘要 ------"
foreach ($r in $results) {
    $firstSentence = ($r.summary -split '(?<=\.)\s+')[0]
    if ($firstSentence.Length -gt 120) { $firstSentence = $firstSentence.Substring(0, 120) + '...' }
    Write-Host ("[{0}] {1}" -f $r.published, $r.title)
    Write-Host ("      {0} ... | 命中: {1}" -f $firstSentence, $r.matched) -ForegroundColor DarkGray
}
