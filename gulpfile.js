const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  const filesToLint = [
    '*.js',
    'config/**/*.js',
    'src/**/*.js'
  ];

  return gulp.src(filesToLint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});