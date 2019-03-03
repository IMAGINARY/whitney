'use strict';

var output_dir = './assets';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var dependencies = ['tone', 'paper'];

// How many times the scripts task is fired
var scriptsCount = 0;

function bundleApp(isProduction) {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './src/es6/main.js',
    debug: true
  });

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
  if (!isProduction && scriptsCount === 1){
    // create vendors.js for dev environment.
    browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(output_dir + '/js'));
  }
  if (!isProduction){
    // make the dependencies external so they dont get bundled by the
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    });
  }

  appBundler
  // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output_dir + '/js'));
}

gulp.task('scripts:dev', function () {
  bundleApp(false);
});

gulp.task('scripts:prod', function (){
  bundleApp(true);
});

gulp.task('scripts:watch', function () {
  gulp.watch(['./src/js/*.js'], ['scripts:dev']);
});

gulp.task('default', ['scripts:prod']);