const fs = require('fs');
const url = require('url');

module.exports.read = (req, res, payload, cd) => {
  fs.readFile('./articles.json', (err, data) => {
    if(err) console.error('[ERROR] Some error in read file')
    const articles = JSON.parse(data);
    let queryData = url.parse(req.url, true).query;
    cd(null, articles.find(article => {
      if(article.id == queryData.id) return true;
    }));
  });
}