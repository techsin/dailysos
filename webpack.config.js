const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
  ? [
    './frontend/src/index.js'
  ]
  : [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './frontend/src/index.js'
  ];

const plugins = PRODUCTION
  ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
  : [
    new webpack.HotModuleReplacementPlugin()
  ];



module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, './site/public/js/'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loaders: [
        'babel-loader',
      ],
      exclude: /node_modules/,
    }]
  },
  plugins: plugins,
  devtool: 'source-map'
};


    // new HTMLWebpackPlugin({
    //   template: 'index-template.html',
    //   hash: true
    // })
