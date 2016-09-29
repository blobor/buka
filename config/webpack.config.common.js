'use strict'

const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    app: './src/client.js',
    vendor: [
      'react',
      'react-dom',
      'moment',
      'material-ui',
      'inputmask-core'
    ]
  },
  postcss: function () {
    return [
      autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
      })
    ]
  }
}
