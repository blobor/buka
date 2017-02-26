'use strict'

const { resolve, join } = require('path')
const webpack = require('webpack')

const root = resolve(__dirname, '..')
const buildDir = join(root, 'dist-server')

module.exports = {
  context: root,
  entry: {
    server: './src/server.js'
  },
  output: {
    publicPath: '/',
    path: buildDir,
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  target: 'node',
  // ToDo: node option
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
