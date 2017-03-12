'use strict'

const { resolve, join } = require('path')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const webpack = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin");

const root = resolve(__dirname, '..')
const distDir = 'dist-server'
const buildDirPath = join(root, distDir)

module.exports = (env = (process.env.NODE_ENV || 'development')) => {
  const { ifProduction } = getIfUtils(env)

  return {
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
    plugins: removeEmpty([
      new webpack.NoEmitOnErrorsPlugin(),
      ifProduction(new BabiliPlugin())
    ])
  }
}
