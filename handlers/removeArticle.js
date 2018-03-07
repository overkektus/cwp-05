const fs = require('fs');
const url = require('url');

module.exports.removeArticle = (req, res, payload, cb) => {
  fs.readFile('./articles.json', (err, data) => {
    if(err) console.error('[ERROR] Some error in read file')
    const articles = JSON.parse(data);
    let queryData = url.parse(req.url, true).query;
    const newArticles = articles.filter(article => article.id != queryData.id);
    fs.writeFile('./articles.json', JSON.stringify(newArticles, null, 2), (err) => {
      if(err) console.error('[ERROR] Some error if write file');
      cb(null, newArticles);
    });
  });
}