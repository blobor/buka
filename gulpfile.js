const gulp = require('gulp');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');

const config = require('./config/gulp.config');

gulp.task('lint', () => {
  return gulp
    .src(config.allJS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build:html', () => {
  return gulp
    .src(config.index)
    .pipe(htmlmin(config.htmlMinOptions))
    .pipe(gulp.dest('dist'));
});