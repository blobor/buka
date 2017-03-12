'use strict'

const { resolve, join } = require('path')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

const { browserslist } = require('../package.json')
const { vendor } = require('./app.config')

const root = resolve(__dirname, '..')
const buildDir = join(root, 'public')

module.exports = (env = (process.env.NODE_ENV || 'development')) => {
  const { ifProduction, ifDevelopment } = getIfUtils(env)
  const browsers = ifProduction(browserslist.production, browserslist.development)

  return {
    context: root,
    devtool: ifDevelopment('eval-source-map', false),
    output: {
      publicPath: '/',
      path: buildDir,
      pathinfo: ifDevelopment(),
      filename: '[name].js'
    },
    entry: {
      app: './src/client.js',
      vendor: vendor
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: [
              'react',
              ['env', {
                targets: { browsers },
                modules: false,
                useBuiltIns: true
              }]
            ],
            env: {
              production: {
                presets: [
                  'react-optimize'
                ]
              }
            }
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader'
            ]
          })
        }
      ]
    },
    plugins: removeEmpty([
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/manifest.json', to: '' }
      ]),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
      }),
      new ExtractTextPlugin({
        filename: 'bundle.css'
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(env) }
      }),
      ifProduction(new BabiliPlugin()),
      new webpack.LoaderOptionsPlugin({
        minimize: ifProduction(),
        debug: ifDevelopment(),
        options: { postcss: () => [autoprefixer()] }
      })
    ])
  }
}
