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
    path: './',
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: '#source-map',
  devServer: {
    port: 3333,
    inline: true
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("bundle.css")
  ]
}