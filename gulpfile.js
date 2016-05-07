const gulp = require('gulp');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');

gulp.task('lint', () => {
  const filesToLint = [
    '*.js',
    'config/**/*.js',
    'src/**/*.js'
  ];

  return gulp
    .src(filesToLint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('minify:html', () => {
  const files = [
    './index.html'
  ];
  const htmlMinOptions = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  };

  return gulp
    .src(files)
    .pipe(htmlmin(htmlMinOptions))
    .pipe(gulp.dest('dist'));
});