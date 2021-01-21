/*global require*/
var gulp = require('gulp');
var prefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
//var zip = require('gulp-zip'); //Used in watch task


//HTML Task
gulp.task('html', function () {
  "use strict";
  return gulp.src('website/stage/html/*.pug')
          .pipe(pug({pretty: true}))
          .pipe(gulp.dest('website/dist'))
          .pipe(livereload()); //You have to add -livereload.listen()- at the beggining of watch task
});



//CSS Task
gulp.task('css', function () {
  "use strict";
  return gulp.src(['website/stage/css/**/*.css', 'website/stage/css/**/*.scss'])
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(prefixer())
            .pipe(concat('main.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('website/dist/css'))
            .pipe(livereload());
});

//


//JS Task
gulp.task('js', function () {
  "use strict";
  return gulp.src('website/stage/js/*.js')
          .pipe(concat('main.js'))
          .pipe(uglify())
          .pipe(gulp.dest('website/dist/js'))
          .pipe(livereload()); //You have to add -livereload.listen()- at the beggining of watch task
});





//  ===== Waaatch task =====
gulp.task('watch', function () {
  "use strict";
  require('./server.js');
  livereload.listen();
  gulp.watch("website/stage/**/*.pug", gulp.series('html'));
  gulp.watch("website/stage/css/**/*.scss", gulp.series('css'));
  gulp.watch("website/stage/css/**/*.css", gulp.series('css'));
  gulp.watch("website/stage/js/*.js", gulp.series('js'));
});











