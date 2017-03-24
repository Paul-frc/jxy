var gulp         = require('gulp');
var gulp         = require('gulp-if');
var useref       = require('gulp-useref');
var purify       = require('gulp-purifycss');
var cssnano      = require('gulp-cssnano');
var uglify       = require('gulp-uglify');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var fs           = require('file-system');
var finalhandler = require('finalhandler');
var http         = require('http');
var http2        = require('http2');
var serveStatic  = require('serve-static');
var runSequence  = require('run-sequence');
var del          = require('del');

// http server

// gulp.task('start-server', function(){
//     var serve = serveStatic('./dist', {
//       'index': ['index.html'],
//       'extensions': ['html'],
//       'maxAge': 3600000
//     })
//     var server = http.createServer(function onRequest (request, response) {
//       serve(request, response, finalhandler(request, response))
//     })
//     server.listen(8888)
// })

// https server, with http/2
// requires .ssl directory with cert and key
// https://certsimple.com/blog/localhost-ssl-fix

gulp.task('start-server', function(){
    var options = {
      key: fs.readFileSync('./.ssl/key.pem'),
      cert: fs.readFileSync('./.ssl/cert.pem')
    };
    var serve = serveStatic('./dist', {
      'index': ['index.html'],
      'extensions': ['html'],
      'maxAge': 3600000
    })
    var server = http2.createServer(options, function onRequest (request, response) {
      serve(request, response, finalhandler(request, response))
    })
    server.listen(8888)
})

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
    gulp.watch('src/**/*.+(html|css|js)', ['build']);
})

// Gulp - Build + Watch + start-server

gulp.task('default', function(callback) {
  runSequence(
    'build',
    'watch',
    'start-server',
    callback
  )
})

/* TODO

    1. Browser refresh on save

*/
