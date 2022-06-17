const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const replace = require('gulp-replace');

gulp.task('default', () => {
  return gulp
    .src('./build/index.html')
    .pipe(replace(/main.(.*?).js"><\/script>/, 'main.$1.js" inline></script>'))
    .pipe(replace(/main.(.*?).css" rel="stylesheet" \/>/, 'main.$1.css" rel="stylesheet" inline />'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ['png'],
      })
    )
    .pipe(gulp.dest('./package'));
});