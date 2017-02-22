'use strict'

const { resolve, join } = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonConfig = require('./webpack.config.common')

const root = resolve(__dirname, '..');
const buildDir = join(root, 'public');

let config = {
  context: root,
  output: {
    publicPath: '/',
    path: buildDir,
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
        postcss: () => ([
            autoprefixer()
          ]
        )
      }
    })
  ]
}

module.exports = Object.assign({}, commonConfig, config)
