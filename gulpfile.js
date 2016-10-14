const gulp = require('gulp')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const rollup = require('rollup-stream')
const babelRollup = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')

const config = require('./config/gulp.config')

gulp.task('build:html', () => {
  return gulp
    .src(config.index)
    .pipe(htmlmin(config.htmlMinOptions))
    .pipe(gulp.dest('dist'))
})

gulp.task('build:server', () => {
  return rollup({
    entry: 'src/server.js',
    plugins: [
      json(),
      commonjs(),
      babelRollup({
        babelrc: false,
        presets: [
          'react',
          'react-optimize',
          'es2016',
          'es2017'
        ],
        plugins: [
          'external-helpers'
        ]
      })
    ]
  })
  .pipe(source('server.js'))
  .pipe(buffer())
  .pipe(babel({
    babelrc: false,
    minified: true,
    comments: false,
    presets: [
      'es2015-node'
    ]
  }))
  .pipe(gulp.dest('dist-server'))
})

gulp.task('build', gulp.parallel('build:server', 'build:html'))
