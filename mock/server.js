const express =  require('express');
const Mock =  require('mockjs');
const chalk = require('chalk');
const config = require('config');

const test = require('./data/test.json');

const port = config.get('mockConfig').port || 8888;

console.log(chalk.cyanBright(`Start Mock-Server in ${port}`));

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.all('/api', (req, res) => {
  res.json(Mock.mock(test));
});

console.log(`Mock-Server on ${8888} %j`);

app.listen(port);
