// gulp
var gulp = require('gulp');

// plugins
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

// tasks
 
gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('css', function () {
  return gulp.src('./app/css/main.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['> 5%'],
        cascade: true
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./app/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
    gulp.src('./app/js/bundled.js')
      .pipe(clean({force: true}));
});

gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});



// default task
gulp.task('default',
  ['lint', 'connect']
);

// build task
gulp.task('build',
  ['lint', 'templates', 'css', 'js', 'copy-bower-components', 'connectDist']
);
