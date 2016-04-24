'use strict';

var babelify = require('babelify'),
  banner,
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  changed = require('gulp-changed'),
  es2015 = require('babel-preset-es2015'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  zip = require('gulp-zip'),
  header = require('gulp-header'),
  htmlreplace = require('gulp-html-replace'),
  notify = require('gulp-notify'),
  path,
  pkg = require('./package.json'),
  react = require('babel-preset-react'),
  sass = require('gulp-ruby-sass'),
  scsslint = require('gulp-scss-lint'),
  streamify = require('gulp-streamify'),
  source = require('vinyl-source-stream'),
  uglify = require('gulp-uglify'),
  watchify = require('watchify');

path = {
  HTML: 'client/index.html',
  ASSETS: ['client/assets/img/**/*', 'client/assets/fonts/**/*', 'client/assets/favicon/**/*'],
  STYLES: 'client/sass/style.scss',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  ASSETS_DEST: 'public/assets',
  DEST: 'public',
  ENTRY_POINT: 'client/components/app.jsx'
};

// Header for app.min.js
banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @dependencies : <%= JSON.stringify(pkg.dependencies) %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @git <%= pkg.repository.url %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function productionBuild(file) {
  var props = {
    entries: [path.ENTRY_POINT],
    debug : false,
    transform: [[babelify, {presets: [es2015, react]}]]
  };
  var bundler = browserify(props);
  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(path.MINIFIED_OUT))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(path.DEST))
  }
  return rebundle();
}

function developmentBuild(file) {
  var props = {
    entries: [path.ENTRY_POINT],
    debug : true,
    transform: [[babelify, {presets: [es2015, react]}]]
  };
  // watchify()
  var bundler = watchify(browserify(props));
  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST));
  }
  // listen for an update and run rebundle
  bundler.on('update', function() {
    var started = new Date();
    rebundle();
    var finished = new Date();
    gutil.log('Rebundled after ' + (finished - started) + 'ms.');
  });
  // run it once the first time buildScript is called
  return rebundle();
}

// Check scss code styling
gulp.task('scss', function() {
  return gulp.src([
    'src/**/*.scss',
    '!**/bourbon/**',
    '!**/animatewithsass/**',
    '!**/meyer-reset.scss'
  ])
    .on('error', handleErrors)
    .pipe(scsslint({
      'config': 'scss-lint.yml',
      'maxBuffer': 1307200
    }));
});

// Copy the html file
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .on('error', handleErrors)
    .pipe(gulp.dest(path.DEST));
});

// Replace dev build with prod build
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .on('error', handleErrors)
    .pipe(htmlreplace({
      'js': path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// Compile sass to css
gulp.task('sass', function() {
  return sass(path.STYLES, {style: 'compressed'})
    .on('error', handleErrors)
    .pipe(gulp.dest(path.DEST))
    .pipe(browserSync.stream());
});

// Copy assets
gulp.task('assets', function() {
  gulp.src(path.ASSETS)
    .pipe(changed(path.ASSETS_DEST))
    .on('error', handleErrors)
    .pipe(gulp.dest(path.ASSETS_DEST));
});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.ASSETS, ['assets']);
});

// Create production build
gulp.task('production', ['replaceHTML', 'sass', 'assets'], function() {
  process.env.NODE_ENV = 'production';
  return productionBuild('app.jsx');
});

// Create development build, watch for changes
gulp.task('dev', ['watch', 'copy', 'sass', 'assets'], function() {
  return developmentBuild('app.jsx');
});

// Bundle all files needed for deployment in a .zip file.
gulp.task('bundle', ['production'], function() {
  gulp.src(['app.js', 'server/**/*', 'public/**/*', 'Makefile', 'package.json', 'settings.json'], {base:'.'})
    .pipe(zip('bundle.zip'))
    .pipe(gulp.dest('./'));
});

// Serve the project with browserSync.
gulp.task('serve', ['dev'], function() {
	browserSync.init({
		proxy: 'http://localhost:3000',
    browser: "google chrome",
    port: 3001,
	});

  gulp.watch('client/sass/*.scss', ['sass']);
  gulp.watch(['public/index.html', 'public/assets/*.*', 'public/build.js']).on('change', browserSync.reload);
});
