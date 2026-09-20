# ============================================================
# check_dblp.ps1 —— 用 DBLP API 核对候选论文的正式发表 venue
# 用法: powershell -ExecutionPolicy Bypass -File scripts\check_dblp.ps1
# 输入: data\papers_candidates.json (由 fetch_papers.ps1 生成)
# 输出: 控制台核对结果 + data\papers_dblp.json (附 venue 信息)
# 说明: DBLP 同时收录 arXiv(CoRR)条目，type 为 Informal 即纯预印本；
#       命中期刊/会议条目则说明已有正式 venue，可按 二区/CCF-B+ 标准筛选
# ============================================================
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$inFile = Join-Path $root 'data\papers_candidates.json'
$outFile = Join-Path $root 'data\papers_dblp.json'

if (-not (Test-Path $inFile)) { Write-Host "未找到 $inFile，请先运行 fetch_papers.ps1" -ForegroundColor Red; exit 1 }
$items = Get-Content $inFile -Raw -Encoding UTF8 | ConvertFrom-Json

function Normalize([string]$t) {
    (($t.ToLower() -replace '[^a-z0-9 ]', ' ') -replace '\s+', ' ').Trim()
}

$out = @()
foreach ($p in $items) {
    $key = Normalize $p.title
    $words = ($key -split ' ' | Select-Object -First 10) -join ' '
    $url = "https://dblp.org/search/publ/api?q=$([uri]::EscapeDataString($words))&format=json&h=10"
    $venue = ''; $year = ''; $type = ''
    try {
        $r = Invoke-RestMethod -Uri $url -TimeoutSec 30
        $hits = @($r.result.hits.hit)
        foreach ($h in $hits) {
            if (-not $h.info -or -not $h.info.title) { continue }
            $dblpTitle = Normalize $h.info.title
            if ($dblpTitle -eq $key -or $dblpTitle.Contains($key) -or $key.Contains($dblpTitle)) {
                $venue = $h.info.venue; $year = $h.info.year; $type = $h.info.type
                break
            }
        }
    } catch { Write-Host "  DBLP 请求失败: $($p.title.Substring(0, [Math]::Min(40, $p.title.Length)))" -ForegroundColor Yellow }
    $status = if ($venue) { "DBLP: $venue $year [$type]" } else { "未收录" }
    Write-Host ("[{0}] {1}" -f $status, $p.title)
    $out += [pscustomobject]@{
        title = $p.title; published = $p.published; authors = $p.authors
        summary = $p.summary; url = $p.url
        dblp_venue = $venue; dblp_year = $year; dblp_type = $type
    }
    Start-Sleep -Milliseconds 1500
}
[IO.File]::WriteAllText($outFile, ($out | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))
Write-Host "`n核对完成, 已写入 $outFile" -ForegroundColor Green
