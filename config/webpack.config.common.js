'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { browsers } = require('./app.config')

module.exports = {
  entry: {
    app: './src/client.js',
    vendor: [
      'classnames',
      'immutable',
      'inputmask-core',
      'isomorphic-fetch',
      'lodash.flow',
      'lodash.get',
      'lodash.has',
      'lodash.isempty',
      'lodash.isnil',
      'lodash.isobject',
      'lodash.omit',
      'lodash.times',
      'material-ui',
      'moment',
      'moment-timezone',
      'pouchdb-adapter-idb',
      'pouchdb-adapter-localstorage',
      'pouchdb-adapter-memory',
      'pouchdb-adapter-websql',
      'pouchdb-core',
      'pouchdb-find',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-tap-event-plugin',
      'redux',
      'redux-immutable',
      'redux-logger',
      'redux-thunk'
    ]
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
              targets: {
                browsers: browsers
              },
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
          fallback: "style-loader",
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
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  stats: {
    colors: true,
    timings: true
  }
}
