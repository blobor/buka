'use strict'

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonConfig = require('./webpack.config.common')

let config = {
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: '#source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/images',
        to: 'images'
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('bundle.css')
  ]
}

module.exports = Object.assign({}, commonConfig, config)
