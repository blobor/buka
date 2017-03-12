'use strict'

const { resolve, join } = require('path')
const webpack = require('webpack')

const root = resolve(__dirname, '..')
const distDir = 'dist-server'
const buildDirPath = join(root, distDir)

module.exports = {
  context: root,
  entry: {
    server: './src/server.js'
  },
  output: {
    publicPath: `${distDir}/`,
    path: buildDirPath,
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }, {
        test: /\.hbs$/,
        loader: 'file-loader',
        options: {
          name: 'views/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
