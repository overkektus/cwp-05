const http = require('http');
const fs = require('fs');

const { readAll } = require('./handlers/readAll');

const hostname = '127.0.0.1';
const port = 3000;
const handlers = {
  '/api/articles/readall': readAll,
  '/api/articles/read': read,
  '/api/articles/create': createArticle,
  '/api/articles/update': updateArticle,
  '/api/articles/delete': removeArticle,
  '/api/comments/create': createComment,
  '/api/comments/delete': removeComment
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {

    const handler = getHandler(req.url);

    handler(req, res, payload, (err, result) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
  return handlers[url] || notFound;
}

function read(req, res, cb) {
  fs.readFile('./article.json', (err, data) => {
    if(err) console.error('[ERROR] Some error in read file')
    const articles = JSON.parse(data);
    cb(null, articles.map(article => {
      if(article.id === req.id) return
    }));
  });
}

function createArticle() {

}

function updateArticle() {
  
}

function removeArticle() {
  
}

function createComment() {
  
}

function removeComment() {
  
}

function notFound(req, res, cb) {
  cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
  let body = [];
  req.on('data', (chunk) => { body.push(chunk); })
      .on('end', () => {
          body = Buffer.concat(body).toString();
          let params;
          if (body !== "") {
              params = JSON.parse(body);
          }
          cb(null, params);
      });
}