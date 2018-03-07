const http = require('http');
const url = require('url');
const fs = require('fs');

const { readAll } = require('./handlers/readAll');
const { read } = require('./handlers/read');
const { createArticle } = require('./handlers/createArticle');
const { removeArticle } = require('./handlers/removeArticle');

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

    let pathname = url.parse(req.url, true).pathname;
    const handler = getHandler(pathname);

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

function updateArticle() {
  
}

function createComment() {
  
}

function removeComment() {
  
}

function notFound(req, res, payload, cb) {
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