const gulp = require('gulp')
const gulpIf = require('gulp-if')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const webpack = require('webpack-stream')
const rollup = require('rollup-stream')
const babelRollup = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const commonjs = require('rollup-plugin-commonjs')

const config = require('./config/gulp.config')

const isDevelopment = process.env.NODE_ENV !== 'production'
console.log(`[SKIPASS.SITE WEB] Running gulp task with NODE_ENV=${process.env.NODE_ENV}`)

const buildHtml = () => {
  return gulp
    .src(config.index)
    .pipe(gulpIf(isDevelopment, htmlmin(config.htmlMinOptions)))
    .pipe(gulp.dest('dist-server'))
}

const buildClient = () => {
  const webpackConfigPath = isDevelopment ? './config/webpack.config.dev' : './config/webpack.config.prod'
  const webpackConfig = Object.assign(require(webpackConfigPath), {
    progress: true
  })

  return gulp.src(webpackConfig.entry.app)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('public'))
}

const compileServerJS = () => {
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
    minified: !isDevelopment,
    comments: isDevelopment,
    presets: [
      'es2015-node'
    ]
  }))
  .pipe(gulp.dest('dist-server'))
}

const buildServer = gulp.parallel(compileServerJS, buildHtml)

gulp.task('build', gulp.parallel(buildClient, buildServer))

gulp.task('build:client', buildClient)
gulp.task('build:server', buildServer)

gulp.task('start')
