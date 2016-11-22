'use strict';

const path = require('path');
const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';
const outputPath = path.resolve(__dirname, debug ? 'build' : 'dist');
const srcPath = path.resolve(__dirname, 'src');
const entry = [path.join(srcPath, 'index.js')];

const modPath = path.resolve(__dirname, 'node_modules');
const libPath = path.resolve(__dirname, 'node_modules', 'testing-library', 'src');

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
       sourceMap: true
     }),
  ],
  devtool: debug ? 'source-map' : undefined,
  module: {
    rules: [
      {
        test: /(\.js)$/,
        include: [srcPath, libPath],
        use: [require.resolve('babel-loader')],
      },
    ],
  },
  resolve: {
    symlinks: true,
    mainFiles: [srcPath, libPath],
    modules: [srcPath, libPath, modPath],
  },
};

console.log(module.exports);
