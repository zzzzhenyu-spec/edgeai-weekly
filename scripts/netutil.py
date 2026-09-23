# -*- coding: utf-8 -*-
"""netutil.py —— 通用 HTTP GET 工具（供各脚本 import）
优先 urllib；遇到 406/403（部分站点按 TLS 指纹拦截 Python，如 arXiv）
自动回退系统 curl（Windows 10+ 自带，走 Schannel，指纹不同）。
"""
import shutil
import subprocess
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) weekly-info/1.0",
      "Accept": "*/*"}


def http_get(url, timeout=40, headers=None):
    """返回 bytes；失败抛异常"""
    h = dict(UA)
    if headers:
        h.update(headers)
    try:
        req = urllib.request.Request(url, headers=h)
        return urllib.request.urlopen(req, timeout=timeout).read()
    except urllib.error.HTTPError as e:
        if e.code not in (403, 406):
            raise
    # 回退 curl（-L 跟随重定向，--max-time 限时）
    curl = shutil.which("curl")
    if not curl:
        raise RuntimeError("urllib 被拦截(406/403)且系统无 curl")
    args = [curl, "-sS", "-L", "--max-time", str(timeout), "-A", h["User-Agent"], url]
    r = subprocess.run(args, capture_output=True, timeout=timeout + 10)
    if r.returncode != 0 or not r.stdout:
        raise RuntimeError(f"curl 失败({r.returncode}): {r.stderr[:120].decode('utf-8', 'ignore')}")
    return r.stdout
