import config from 'config';
import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import AutoDllPlugin from 'autodll-webpack-plugin';

import webpackConfig from './webpack.base.conf';

let PUBLIC_PATH;

if (process.env.NODE_ENV === 'development') {
  PUBLIC_PATH = '.'
} else {
  PUBLIC_PATH = config.get('publicPath');
}

const APP_ENTRY_POINT = config.get('appEntry');
const ANALYZER_BUNDLE = config.get('analyzerBundle');

let webpackDevOutput;

let entryConfig = {
};

// Config for Javascript file
if (Object.entries(APP_ENTRY_POINT).length > 1) {

  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`${item[0]}/assets/js/${item[0]}`]: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      item[1]
    ]});
  });

} else if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`assets/js/${item[0]}`]: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      item[1],
    ]});
  });
} else {
  console.log(chalk.red('You must define a entry'));
  new AutoDllPlugin({
    filename: '[name].dll.js',
    entry: {
      vendor: [
        'whatwg-fetch'
      ]
    }
  })
}

//Config for output

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  webpackDevOutput = {
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
  };

} else  if (Object.entries(APP_ENTRY_POINT).length === 1){
  webpackDevOutput = {
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
  };
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.output = Object.assign(webpackConfig.output, webpackDevOutput);

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new StyleLintPlugin({
      context: "src",
      configFile: '.stylelintrc.js',
      files: '**/*.less',
      failOnError: false,
      quiet: false,
      syntax: 'less'
    }
  ),
  new AutoDllPlugin({
    filename: '[name].dll.js',
    entry: {
      vendor: [
        'whatwg-fetch'
      ]
    }
  })
);

webpackConfig.module.rules = webpackConfig.module.rules.concat(
  {
    test: /\.css|less$/,
    exclude: [path.resolve('node_modules'), path.resolve('src/assets/css/mod_css')],
    use: [
      {
        loader: "style-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
      {
        loader: "css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
      {
        loader: 'postcss-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
        options: {
          config: {
            path: 'build/config/postcss.config.js'
          }
        }
      },
      {
        loader: "less-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
    ],
  },
  {
    test: /\.css|less$/,
    include: [path.resolve('node_modules'), path.resolve('src/assets/css/mod_css')  ],
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'build/config/postcss.config.js'
          }
        }
      },
      {
        loader: "less-loader"
      }
    ],
  },
);


if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name,index) => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}/${name}.html`,
        template: 'public/index.html',
        inject: 'true',
        chunks: [`${name}/assets/js/${name}`, 'vendors'],
      }),
    );
    if(index === 0) {
      const serverIndex = config.get('server-index');
      const opnHost = `http://${config.get('host')}:${config.get('port')}`;

      webpackConfig.plugins.push(
        new OpenBrowserPlugin({
          url: `${opnHost}/${serverIndex ? serverIndex : `${name}/${name}.html`}`,
        }),
      )
    }
  });
} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
  const serverIndex = config.get('server-index');
  const opnHost = `http://${config.get('host')}:${config.get('port')}`;

  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'public/index.html',
        inject: 'body',
        chunks: [`assets/js/${name}`, 'vendors'],
      }),
      new OpenBrowserPlugin({
        url: `${opnHost}/${serverIndex ? serverIndex : `${name}.html`}`,
      }),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

if (ANALYZER_BUNDLE) {
  const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  )
}


webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.entry = entryConfig;

export default webpackConfig;
