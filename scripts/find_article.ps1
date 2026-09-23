# ============================================================
# find_article.ps1 —— 通过 Bing 搜索定位真实文章 URL 并提取 og:image
# 用法: powershell -ExecutionPolicy Bypass -File scripts\find_article.ps1
# 输出: data\articles.json (id/query/url/finalUrl/image/title)
# 供每周更新时快速给 news 条目配真实链接与配图
# ============================================================
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outFile = Join-Path $root 'data\articles.json'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

$targets = @(
    @{ id = 'n1';  q = 'MediaTek Dimensity 9600 Pro press release 2nm agentic AI' }
    @{ id = 'n2';  q = 'Computerworld Qualcomm Snapdragon 8 Elite Gen 6 Hexagon NPU agentic' }
    @{ id = 'n3';  q = '端侧AI之战正式打响 巨潮 豆包 NaviX Ultra' }
    @{ id = 'n4';  q = '小米18 Fold 折叠屏 内置 端侧大模型 上市' }
    @{ id = 'n5';  q = 'Apple Machine Learning Research third generation foundation models AFM 3' }
    @{ id = 'n6';  q = '面壁智能 WAIC MiniCPM5-2B 端侧大模型 发布' }
    @{ id = 'n7';  q = 'Qwen3.5 开源 小尺寸模型 0.8B 2B 4B 9B' }
    @{ id = 'n8';  q = 'Qualcomm HUMAIN Horizon Ultra AI PC announce' }
    @{ id = 'n9';  q = '2026 车载大模型 端云协同 车机 小模型' }
    @{ id = 'n10'; q = '阶跃星辰 Step 5 Preview 6000亿参数' }
)

$results = @()
foreach ($t in $targets) {
    Write-Host "搜索 [$($t.id)]: $($t.q)"
    $entry = [pscustomobject]@{ id = $t.id; query = $t.q; url = ''; finalUrl = ''; image = ''; pageTitle = '' }
    try {
        $bing = 'https://www.bing.com/search?q=' + [uri]::EscapeDataString($t.q)
        $html = (Invoke-WebRequest -Uri $bing -UseBasicParsing -TimeoutSec 30 -UserAgent $ua).Content
        # 提取第一个非 bing 自身的有机结果链接
        $m = [regex]::Matches($html, '<h2[^>]*><a[^>]+href="(https?://(?!www\.bing|go\.microsoft|cn\.bing)[^"]+)"')
        if ($m.Count -gt 0) { $entry.url = $m[0].Groups[1].Value }
    } catch { Write-Host "  搜索失败: $($_.Exception.Message)" -ForegroundColor Yellow }
    if ($entry.url) {
        try {
            $resp = Invoke-WebRequest -Uri $entry.url -UseBasicParsing -TimeoutSec 30 -UserAgent $ua
            $entry.finalUrl = $resp.BaseResponse.ResponseUri.AbsoluteUri
            $page = $resp.Content
            $og = [regex]::Match($page, '<meta[^>]+property=["'']og:image["''][^>]+content=["'']([^"'' ]+)["'']')
            if (-not $og.Success) { $og = [regex]::Match($page, '<meta[^>]+content=["'']([^"'' ]+)["''][^>]+property=["'']og:image["'']') }
            if (-not $og.Success) { $og = [regex]::Match($page, '<meta[^>]+name=["'']twitter:image["''][^>]+content=["'']([^"'' ]+)["'']') }
            if ($og.Success) { $entry.image = $og.Groups[1].Value }
            $pt = [regex]::Match($page, '<title[^>]*>([^<]{0,150})</title>')
            if ($pt.Success) { $entry.pageTitle = $pt.Groups[1].Value.Trim() }
            Write-Host ("  -> {0}" -f $entry.finalUrl)
            Write-Host ("     图: {0}" -f ($entry.image -replace '^$', '(无)'))
        } catch { Write-Host "  页面抓取失败: $($_.Exception.Message)" -ForegroundColor Yellow }
    }
    $results += $entry
    Start-Sleep -Milliseconds 1200
}
[IO.File]::WriteAllText($outFile, ($results | ConvertTo-Json -Depth 4), [Text.UTF8Encoding]::new($false))
Write-Host "`n完成, 已写入 $outFile" -ForegroundColor Green
