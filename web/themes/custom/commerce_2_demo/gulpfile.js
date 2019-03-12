var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');

// Compile the CSS and other tricks from the dark arts.
gulp.task('sass', function () {
  "use strict";
  return gulp.src('./sass/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['> 5%', 'safari 8']
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./css'));
});

// Watch for Sass file changes.
gulp.task('watch', function () {
  "use strict";
  return gulp.watch('./sass/{,**/}*.{scss,sass}', gulp.series('sass'))
});

// Default task.
// Ensure the CSS is compiled and then watch for file changes.
gulp.task('default', gulp.series('sass', 'watch'));
