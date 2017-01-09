'use strict'

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { browsers } = require('./app.config')

const sassLoaders = [
  'css',
  'postcss',
  'sass'
]

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
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: [
            'react',
            ['env', {
              targets: {
                browsers: browsers
              },
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
        loader: ExtractTextPlugin.extract('style', sassLoaders)
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.json?$/,
        loader: 'json'
      }
    ]
  },
  stats: {
    colors: true,
    timings: true
  },
  postcss: function () {
    return [
      autoprefixer({
        browsers
      })
    ]
  }
}
