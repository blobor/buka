'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonConfig = require('./webpack.config.common')

let config = {
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      'compress': {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer()]
      }
    })
  ]
}

module.exports = Object.assign({}, commonConfig, config)
