'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonConfig = require('./webpack.config.common')
const { browsers } = require('./app.config')

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
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => {
          return [
            autoprefixer({
              browsers
            })
          ]
        }
      }
    })
  ]
}

module.exports = Object.assign({}, commonConfig, config)
