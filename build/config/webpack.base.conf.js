import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import config from 'config';
import fs from 'fs';
import HappyPack from 'happypack';

process.traceDeprecation = false;

console.log(chalk.green(`building for ${process.env.NODE_ENV}...`));

// Environment variable injection
// ================================================================================
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
process.env.PACKAGE_VERSION = version;

// Defining config variables
// ================================================================================
const BUILD_PATH = path.join(__dirname, '../../dist');
const APP_ENTRY_POINT = config.get('appEntry');

let PUBLIC_PATH;

if (process.env.NODE_ENV === 'development') {
  PUBLIC_PATH = '.'
} else {
  PUBLIC_PATH = config.get('publicPath');
}


const COMMON_LOADERS = [
  {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loaders: [ 'happypack/loader?id=jsx' ],
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        }
      }
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
        }
      }
    ],
  },
  {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    enforce: "pre",
    loader: "eslint-loader"
  }
];

// Export
// ===============================================================================
const webpackConfig = {
  output: {
    path: BUILD_PATH,
  },
  resolve: {
    extensions: [" ",'.js', '.jsx', '.css', '.less'],
    modules: ['node_modules', 'src'],
    alias: {
      '@node_modules': path.resolve('node_modules'),
    },
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 8,
      loaders: [ 'babel-loader?cacheDirectory' ],
    }),

    new ProgressBarPlugin(),
    new webpack.IgnorePlugin(/vertx/),
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      __CONFIG__: '',
      'process.env': {
        NODE_ENV: JSON.stringify(config.get('env')),
        FETCH_ENV: JSON.stringify(config.get('fetchConfig')),
        APP_VERSION : JSON.stringify(process.env.PACKAGE_VERSION),
        DEBUG: config.get('env') !== 'production' ? JSON.stringify(config.get('debug')) : false,
      },
    }),
  ],
  module: {
    rules: COMMON_LOADERS,
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    // console:true,
    // fs:'{}',
    // tls:'{}',
    // net:'{}'
    'frame7': 'Framework7',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name,index) => {
    if(index === 0) {
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({ name:'vendors',  filename: `${name}/assets/js/[name].[hash].js`}),
      );
      webpackConfig.module.rules.push(
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: `${name}/assets/img/[hash].[ext]`,
                publicPath: `${PUBLIC_PATH}/`,
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                query: {
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: true,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  }
                },
              }
            }
          ],
        },
      )
    }
  });

} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({ name:'vendors',  filename: 'assets/js/[name].[hash].js'}),
    );
  webpackConfig.module.rules.push(
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'assets/img/[hash].[ext]',
            publicPath: `${PUBLIC_PATH}/`,
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            },
          }
        }
      ],
    },
  )
} else {
  console.log(chalk.red('You must define a entry'));
}
export default webpackConfig;
