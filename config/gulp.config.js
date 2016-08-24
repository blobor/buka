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
  }
}
