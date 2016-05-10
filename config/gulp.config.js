'use strict';

module.exports = {
  allJS: [
    '*.js',
    'config/**/*.js',
    'src/**/*.js'
  ],
  index: './src/index.html',
  htmlMinOptions: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
};