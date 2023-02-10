import http from 'http';
import url from 'url';

const PORT = 8002;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url!).pathname;

  if (req.method == 'GET') {
    if (reqUrl == '/') {
      res.write('hello world');
      res.end();
    }
  } else if (req.method == 'POST') {
    if (reqUrl == '/create') {
      res.write('Created Something!');
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
