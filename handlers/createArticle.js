const fs = require('fs');

module.exports.createArticle = (req, res, payload, cb) => {
  fs.readFile('./articles.json', (err, data) => {
    if(err) console.error('[ERROR] Some error in read file');
    const articles = JSON.parse(data);
    let newArticle = {
      id: articles.length + 1,
      title: payload.title,
      text: payload.text,
      date: Date.now(),
      author: payload.author,
      comments: []
    };
    articles.push(newArticle);
    fs.writeFile('./articles.json', JSON.stringify(articles, null, 2), err => {
      if(err) console.error('[ERROR] Some error if write file');
      cb(null, newArticle)
    });
  });
}