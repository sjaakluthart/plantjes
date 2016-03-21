'use strict';

var babelify = require('babelify'),
  banner,
  bowerBanner,
  bowerPkg = require('./bower.json'),
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  es2015 = require('babel-preset-es2015'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  header = require('gulp-header'),
  htmlreplace = require('gulp-html-replace'),
  mainBowerFiles = require('main-bower-files'),
  notify = require('gulp-notify'),
  path,
  pkg = require('./package.json'),
  react = require('babel-preset-react'),
  rename = require('gulp-rename'),
  reload = browserSync.reload,
  sass = require('gulp-ruby-sass'),
  scsslint = require('gulp-scss-lint'),
  streamify = require('gulp-streamify'),
  source = require('vinyl-source-stream'),
  uglify = require('gulp-uglify'),
  watchify = require('watchify');

path = {
  ASSETS: '',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  ASSETS_DEST: 'dist/assets',
  DEST: 'dist',
  ENTRY_POINT: './src/react/app.jsx'
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

// Header for bower_components.js
bowerBanner = ['/**',
  ' * Bower Components',
  ' * @dependencies : <%= JSON.stringify(pkg.dependencies) %>',
  ' */',
  ''].join('\n');

// TODO Add jsx code styling checks

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
      .pipe(header(banner, {pkg : pkg}))
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

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
    .on('error', handleErrors)
    .pipe(concat('bower_components.js'))
    .pipe(uglify())
    .pipe(header(bowerBanner, {pkg : bowerPkg}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function() {
  return sass('src/client/sass/style.scss', {style: 'compressed'})
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', function() {
  gulp.src(path.ASSETS)
    .pipe(changed(path.ASSETS_DEST))
    .on('error', handleErrors)
    .pipe(gulp.dest(path.ASSETS_DEST));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch(path.ASSETS, ['assets']);
});

// Create production build
gulp.task('production', ['bower', 'sass', 'assets'], function() {
  return productionBuild('app.jsx');
});

// Create development build, watch for changes
gulp.task('dev', ['watch', 'bower', 'sass', 'assets'], function() {
  return developmentBuild('app.jsx');
});
