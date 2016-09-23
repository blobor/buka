'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const commonConfig = require('./webpack.config.common')

const sassLoaders = [
  'style',
  'css',
  'postcss',
  'sass'
]

let config = {
  output: {
    path: '/',
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
        loader: 'babel'
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
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
      })
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}

module.exports = Object.assign({}, commonConfig, config)
