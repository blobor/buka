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
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/images',
        to: 'images'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        to: ''
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      'compress': {
        warnings: false
      }
    }),
    new ExtractTextPlugin('bundle.css')
  ]
}

module.exports = Object.assign({}, commonConfig, config)
