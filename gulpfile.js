const gulp = require('gulp')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

const config = require('./config/gulp.config')

gulp.task('build:html', () => {
  return gulp
    .src(config.index)
    .pipe(htmlmin(config.htmlMinOptions))
    .pipe(gulp.dest('dist'))
})

gulp.task('build:server', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist-server'))
})

gulp.task('build', gulp.parallel('build:server', 'build:html'))
