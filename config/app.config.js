'use strict'

module.exports = {
  // supported browsers
  browsers: [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'not ie 10',
    'not ie_mob 10'
  ],
  index: './src/index.hbs',
  htmlMinOptions: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}
