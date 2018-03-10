const utils = require('../utils/utils');
const fs = require('fs');

module.exports.updateArticle = async (req, res, payload, cb) => {
  const queryParams = utils.getReqParams(req);
  const articles = await utils.readArticles();
  const oldArticle = await utils.readArticles(queryParams.id);
  const newArticle = {
    "id": oldArticle.id,
    "title": payload.title,
    "text": payload.text,
    "date": payload.date,
    "author": payload.author
  }
  let newArticles = articles.filter(el => el.id != oldArticle.id);
  newArticles.push(newArticle);
  newArticles.sort((a, b) => {
    if(a.id > b.id) return 1;
    if(a.id < b.id) return -1;
    return 0;
  });
  await utils.writeDataTofile('./articles.json', utils.prettyJson(newArticles));
}