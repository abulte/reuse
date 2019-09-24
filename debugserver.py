from http.server import HTTPServer

from api.upload import handler


def serve(handler):
    try:
        port = 8888
        debugserver = HTTPServer(('', port), handler)
        print('Started httpserver on port', port)
        print('http://localhost:' + str(port))
        debugserver.serve_forever()
    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        debugserver.socket.close()


if __name__ == '__main__':
    serve(handler)
