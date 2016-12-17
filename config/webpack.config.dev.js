'use strict'

const webpack = require('webpack')
const commonConfig = require('./webpack.config.common')

const sassLoaders = [
  'style',
  'css',
  'postcss',
  'sass'
]

let config = {
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: '#source-map',
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}

module.exports = Object.assign({}, commonConfig, config)
