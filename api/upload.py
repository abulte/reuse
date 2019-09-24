import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
import requests

TARGET_URL = 'https://next.data.gouv.fr/api/1'


class handler(BaseHTTPRequestHandler):

    def add_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range')  # noqa
        self.send_header('Access-Control-Expose-Headers', 'Content-Length,Content-Range') # noqa

    def do_OPTIONS(self):
        self.send_response(204)
        self.add_cors_headers()
        self.send_header('Access-Control-Max-Age', 1728000)
        self.send_header('Content-Type', 'text/plain; charset=utf-8')
        self.send_header('Content-Length', 0)
        self.end_headers()

    def upload_image(self, url, reuse, token):
        r = requests.get(url, allow_redirects=True)
        headers = {'Authorization': 'Bearer %s' % token}
        files = {'file': r.content}
        r = requests.post('%s/reuses/%s/image' % (TARGET_URL, reuse), files=files, headers=headers)
        return r.status_code, r.json()

    def do_GET(self):
        url, token, reuse = None, None, None
        query = urlparse(self.path).query
        if query:
            query_components = dict(qc.split('=') for qc in query.split('&'))
            url = query_components.get('url')
            token = query_components.get('token')
            reuse = query_components.get('reuse')
        if not url or not token or not reuse:
            self.send_error(400, 'Missing url or token or reuse GET parameter')
            return

        try:
            status, data = self.upload_image(url, reuse, token)
        except Exception as e:
            self.send_response(500)
            data = {'error': str(e)}
        else:
            self.send_response(status)
            self.send_header('Cache-Control', 'maxage=0, s-maxage=86400')
        finally:
            self.send_header('Content-type', 'application/json')
            self.add_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())
