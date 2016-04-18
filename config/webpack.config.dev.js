'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const sassLoaders = [
  'style',
  'css',
  'postcss',
  'sass'
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
  stats: {
    colors: true,
    reasons: true
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
        loader: sassLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },
  postcss: function () {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}