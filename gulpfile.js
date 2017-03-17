var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var purify = require('gulp-purifycss');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');


// minify + uglify css, js and html
// optimize images
// copy all to dest
gulp.task('all', function() {
  return gulp.src('src/**/*')
    .pipe(useref())
    .pipe(gulpIf('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.+(png|jpg|jpeg|gif|svg)', cache(imagemin({
      interlaced: true,
    }))))
    .pipe(gulp.dest('dist'))
})

// purify global css against all html and js
gulp.task('purify-css', function() {
  return gulp.src('dist/css/*.css')
    .pipe(purify(['dist/**/*.js', 'dist/**/*.html']))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'all',
    'purify-css',
    callback
  )
})

// Watch
gulp.task('watch', function() {
  gulp.watch('src/**/*.+(html|css|js)',  ['build']);
})

// Gulp - Build + Watch
gulp.task('default', function(callback) {
  runSequence(
    'build',
    'watch',
    callback
  )
})
