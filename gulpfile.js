"use strict";

var gulp = require('gulp');
var gutil = require("gulp-util");
var less = require('gulp-less');
var babelify = require('babelify');
var browserSync = require('browser-sync').create();
//var jshint = require('gulp-jshint');
//var react = require('gulp-react');
//var minifyCSS = require('gulp-minify-css');

var path = require('path');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var uglify = require('gulp-uglify');
//var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './app/client.jsx',
    debug: true,
    transform: [babelify, reactify]
  });
  gutil.log('browserifying...');

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    //.pipe(uglify())
    .on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

var paths = {
  build:    'build/',
  public:   'public/',
  server:   ['package.json', 'app/app.js', 'app/*.jsx', 'app/**/*.jsx', 'app/**/*.js']
};

gulp.task('js-watch', ['js'], browserSync.reload);

// Build for production
gulp.task('build', ['clean', 'less', 'webpack', 'copy']);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

  // Serve files from the root of this project
  browserSync.init({
    proxy: 'localhost:5000',
    browser: []
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch(['app/**/*.js', 'app/**/*.jsx'], ['js-watch']);
});

gulp.task('less', function () {
  return gulp.src('./app/styles/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

// Clean build directory
gulp.task('clean', function (callback) {
  fs.remove(paths.build, callback);
});

// Copy the app
gulp.task('copy', ['copy:server', 'copy:public']);

// copy server files
gulp.task('copy:server', ['clean'], function() {
  return gulp.src(paths.server, { base: '.' })
    .pipe(gulp.dest(paths.build));
});

// copy public
gulp.task('copy:public', ['clean', 'less'],  function() {
  var src = [paths.public + '**/*', '!**/*.map'];
  var filterCSS = filter(paths.public + 'css/main.css');

  return gulp.src(src, { base: '.' })

    .pipe(filterCSS)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(filterCSS.restore())

    .pipe(gulp.dest(paths.build));
});
