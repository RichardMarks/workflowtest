'use strict';

const path = require('path');
const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';
const outputPath = path.resolve(__dirname, debug ? 'build' : 'dist');
const srcPath = path.resolve(__dirname, 'src');
const entry = [path.join(srcPath, 'index.js')];

module.exports = {
  entry,
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: './',
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
     new webpack.optimize.UglifyJsPlugin({
       compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
     }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  devtool: debug ? 'source-map' : undefined,
  module: {
    loaders: [
    {
      test: /(\.js)$/,
      include: [srcPath],
      loader: require.resolve('babel-loader'),
      babelrc: false,
      query: {
        presets: [
          'babel-preset-es2015',
        ].map(require.resolve),
      }
    },
    ],
  },
  resolve: {
    root: [
      srcPath,
    ],
    extensions: ['', '.js'],
    fallback: [path.resolve('./node_modules')],
  },
  resolveLoader: {
    fallback: [path.resolve('./node_modules')],
  },
};

console.log(module.exports);
