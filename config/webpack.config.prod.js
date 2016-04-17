'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'sass-loader'
];

module.exports = {
  entry: './src/main.js',
  output: {
    path: '../build',
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'babel-preset-es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', sassLoaders)
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("bundle.css")
  ]
}