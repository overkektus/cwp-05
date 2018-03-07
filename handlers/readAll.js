
module.exports.readAll = (req, res, payload, cb) => {
  fs.readFile('./articles.json', (err, data) => {
    if(err) console.error('[ERROR] Some error in read file')
    cb(null, JSON.parse(data));
  });
}