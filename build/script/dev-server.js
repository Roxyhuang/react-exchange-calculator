import express from 'express';
import http from 'http';
// import https from 'https';
import webpack from 'webpack';
import config from 'config';
import os from "os";

const APP_ENTRY_POINT = config.get('appEntry');
let webpackConfig;

if (os.platform() !== 'win32') {
  require('../script/check-versions')();
  webpackConfig = require('../config/webpack.dev.conf').default;
} else {
  webpackConfig = require('../config/webpack.dev.speed.conf').default;
}

const app = express();
const compiler = webpack(webpackConfig);

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  // res.header('Content-Type', 'Content-type:application/x-javascript');
  next();
});

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  clientLogLevel: "error",
  compress: true,
  noInfo: false,
  quiet: false,
  stats: {
    colors: true,
    chunks: false,
  },
});

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  reload: true,
  path: '/__webpack_hmr',
  heartbeat: 1000,
}));

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name) => {
    app.use(`/${name}/assets`, express.static('public/assets'));
  });
} else {
  app.use('/assets', express.static('public/assets'));
}

if (require.main === module) {
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log('Listening on %j', server.address());
  });
}
