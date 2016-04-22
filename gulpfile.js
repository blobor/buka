const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', done => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})