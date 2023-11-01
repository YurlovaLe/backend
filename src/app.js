const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { hello, users } = parsedUrl.query;
  console.log(parsedUrl.search)

  if (hello) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write(`Hello, ${hello}`);
    res.end();

    return;
  }

  if (hello === '') {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.write('Enter a name');
    res.end();

    return;
  }

  if (typeof(users) === 'string') {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end();

    return;
  }

  if (parsedUrl.search) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.write('');
    res.end();

    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен http://${hostname}:${port}/`);
});
