const gulp = require('gulp')
const del = require('del')
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

const clean = () => del('dist-server/**', {
  force: true
})

const buildHtml = () => {
  return gulp
    .src(config.index)
    .pipe(gulpIf(!isDevelopment, htmlmin(config.htmlMinOptions)))
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
        exclude: 'node_modules/**',
        presets: [
          'react',
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
    minified: !isDevelopment,
    comments: isDevelopment
  }))
  .pipe(gulp.dest('dist-server'))
}

const buildServer = gulp.parallel(compileServerJS, buildHtml)

gulp.task('build', gulp.series(clean, gulp.parallel(buildClient, buildServer)))

gulp.task('build:client', buildClient)
gulp.task('build:server', buildServer)

gulp.task('start:dev', gulp.series(clean, buildServer, () => {
  const webpackConfig = Object.assign(require('./config/webpack.config.dev'), {
    watch: true,
    progress: true
  })

  gulp.watch(config.index, buildHtml)
  gulp.watch('src/**/*.js', compileServerJS)
  return gulp.src(webpackConfig.entry.app)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('public'))
}))
