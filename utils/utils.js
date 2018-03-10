const fs = require('fs');
const url = require('url');
const { Console } = require('console');

const TAG = 'UTILS';

const output = fs.createWriteStream('./logfile.log');
const logger = new Console(output);

const writeToLog = (req, data) => {
  return new Promise((resolve, reject) => {
    let currentDate = new Date();
    let outputType;
    let outputDateTime = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ` +
                          `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ` +
                          `.${currentDate.getMilliseconds()}`;
    let pathname = url.parse(req.url, true).pathname;
    const logMessage =`\t[${outputDateTime}] [${outputType}] \n
                        URL: ${pathname} \n
                        Request: \n
                        ${JSON.stringify(data)} \n
                        ------------------------------------------\n`;
    writeDataTofile('./../logfile.log', logMessage, err => {
      if(err) {
        console.error(err.message);
        reject();
      }
      resolve();
    });
  });
};

const readArticles = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./articles.json', (err, data) => {
      if(err) reject(`[${TAG}] Could't read articles.json`);
      let articles;
      try {
        articles = JSON.parse(data);
      } catch(err) {
        reject(`[${TAG}] Failed to convert articles.json`);
      }
      if(id) {
        const article = articles.find(el => el.id == id);
        resolve(article);
      } else {
        resolve(articles)
      }
    });
  });
};

const addNewArticle = (article) => {
  return new Promise(async(resolve, reject) => {
    const currentArticles = await readArticles();
    currentArticles.push(article);
    writeDataTofile('../articles.json', currentArticles, err => {
      if(err) console.error(`[${TAG}] Could't write new Article`);
      resolve();
    });
  });
};

const writeDataTofile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if(err) reject(err.message);
      resolve();
    });
  });
};

const getReqParams = (req) => {
  const objParams = {};
  const SplitedParams = url.parse(req.url).query.split('&').map(el => el.split('='));
  SplitedParams.forEach(el => objParams[el[0]] = el[1]);
  return objParams;
};

const prettyJson = (data) => {
  return JSON.stringify(data, null, 2);
}

module.exports = {
  readArticles,
  writeToLog,
  getReqParams,
  addNewArticle,
  writeDataTofile,
  prettyJson
};