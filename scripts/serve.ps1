# ============================================================
# serve.ps1 —— 迷你静态文件服务器(仅用于本地预览, 无需管理员)
# 用法: powershell -ExecutionPolicy Bypass -File scripts\serve.ps1 [端口]
# 然后浏览器打开 http://127.0.0.1:8080/  (Ctrl+C 停止)
# ============================================================
param([int]$Port = 8080)

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$listener = New-Object System.Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-Host "静态服务已启动: http://127.0.0.1:$Port/  (根目录: $root, Ctrl+C 停止)" -ForegroundColor Green

$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'
  '.ico' = 'image/x-icon'; '.woff2' = 'font/woff2'
}
$utf8 = [Text.UTF8Encoding]::new($false)

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = New-Object IO.StreamReader($stream)
    $requestLine = $reader.ReadLine()
    while ($true) { $line = $reader.ReadLine(); if ($null -eq $line -or $line -eq '') { break } }
    if (-not $requestLine) { $client.Close(); continue }

    $path = $requestLine.Split(' ')[1]
    $path = [Uri]::UnescapeDataString(($path -replace '\?.*$', ''))
    if ($path -eq '/') { $path = '/index.html' }
    $file = Join-Path $root ($path -replace '/', '\')
    $file = [IO.Path]::GetFullPath($file)
    $allowed = $file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)

    $status = '200 OK'; $body = $null; $ctype = 'text/plain; charset=utf-8'
    if (-not $allowed -or -not (Test-Path $file -PathType Leaf)) {
      $status = '404 Not Found'; $body = $utf8.GetBytes('404 Not Found')
    } else {
      $ext = [IO.Path]::GetExtension($file).ToLower()
      if ($types.ContainsKey($ext)) { $ctype = $types[$ext] }
      $body = [IO.File]::ReadAllBytes($file)
    }
    $resp = "HTTP/1.1 $status`r`nContent-Type: $ctype`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
    $headerBytes = $utf8.GetBytes($resp)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($body, 0, $body.Length)
    $stream.Flush()
    Write-Host ("{0} {1} -> {2}" -f $status, $path, $ctype) -ForegroundColor DarkGray
  } catch {
    Write-Host "请求处理异常: $($_.Exception.Message)" -ForegroundColor Yellow
  } finally { $client.Close() }
}
