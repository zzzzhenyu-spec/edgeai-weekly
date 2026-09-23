# -*- coding: utf-8 -*-
# ============================================================
# serve.py —— 本地静态文件服务器（本地预览用）
# 用法: python scripts/serve.py [端口]   默认 8080
# 浏览器打开 http://127.0.0.1:8080/ （Ctrl+C 停止）
# 禁用缓存，改完刷新即可看到最新效果
# ============================================================
import http.server, socketserver, sys, os
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = Path(__file__).resolve().parent.parent
os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript; charset=utf-8",
        ".mjs": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("%d %s" % (self.response_code if hasattr(self, "response_code") else 200,
                         self.translate_path(self.path).replace(str(ROOT), "")))


with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"静态服务已启动: http://127.0.0.1:{PORT}/  (根目录: {ROOT}, Ctrl+C 停止)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止")
