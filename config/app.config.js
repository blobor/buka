'use strict'

module.exports = {
  index: './src/index.hbs',
  htmlMinOptions: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  },
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
}
