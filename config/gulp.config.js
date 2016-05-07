'use strict';

module.exports = {
  allJS: [
    '*.js',
    'config/**/*.js',
    'src/**/*.js'
  ],
  index: './index.html',
  htmlMinOptions: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
};