# ============================================================
# fetch_paper_figs.ps1 —— 从 arXiv HTML 版抓论文第一张结构图
# 用法: powershell -ExecutionPolicy Bypass -File scripts\fetch_paper_figs.ps1
# 输出: data\paper_figs.json  (arxivId -> figureUrl)
# 每周更新论文后运行一次, 把图填入 js\data.js 对应条目的 image 字段
# ============================================================
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36'

# 本期论文的 arXiv ID (从 js/data.js 的 venue 字段提取或手工维护)
$ids = @(
    '2609.17193', '2609.15664', '2609.10117', '2609.09662', '2609.09476',
    '2609.07370', '2609.03079', '2609.01798', '2609.00665', '2609.01338',
    '2312.11514', '2312.12456'
)

$out = @{}
foreach ($id in $ids) {
    $figUrl = ''
    foreach ($v in @("v1", "")) {
        $htmlUrl = "https://arxiv.org/html/$id$v"
        try {
            $r = Invoke-WebRequest -Uri $htmlUrl -UseBasicParsing -TimeoutSec 40 -UserAgent $ua
            if ($r.StatusCode -ne 200) { continue }
            $h = $r.Content
            # 第一张正文图: arxiv html 的 figure 图片在 assets/ 下
            $m = [regex]::Match($h, '<img[^>]+src="([^"]+(?:assets/x[0-9]+[^"]*|fig[^"]*)\.(?:png|jpg|gif|webp|svg))"')
            if ($m.Success) {
                $src = $m.Groups[1].Value
                # 相对路径基于 /html/ 解析(页面URL无尾斜杠, 不重复论文ID段)
                if ($src.StartsWith('/')) { $src = 'https://arxiv.org' + $src }
                elseif (-not $src.StartsWith('http')) { $src = 'https://arxiv.org/html/' + $src }
                $figUrl = $src
                break
            }
        } catch { }
        Start-Sleep -Milliseconds 800
    }
    $out[$id] = $figUrl
    Write-Host ("{0}  {1}" -f $id, ($(if ($figUrl) { $figUrl } else { '(无HTML版或无图)' })))
    Start-Sleep -Milliseconds 800
}
[IO.File]::WriteAllText((Join-Path $root 'data\paper_figs.json'), ($out | ConvertTo-Json), [Text.UTF8Encoding]::new($false))
Write-Host "已写入 data\paper_figs.json"
