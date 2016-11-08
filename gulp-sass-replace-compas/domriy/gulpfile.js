'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const compass = require('compass-importer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
 
gulp.task('sass', function () {
  return gulp.src('../domriyecommerce/assets/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    importer: compass,
    sourceMap: true,
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  /*.pipe(autoprefixer({
      browsers: ['last 60 versions'],
      cascade: false
  }))*/
  .pipe(rename('main.bundle.css'))
  .pipe(sourcemaps.write())
  .pipe(notify("SASS Compiled!"))
  .pipe(gulp.dest('../themes/AlphaSpaceDomriyEcommerce/assets/css'));
});
 

gulp.watch('../domriyecommerce/assets/sass/**/*.scss', gulp.series('sass'));

gulp.task('serve', function () {

    browserSync.init({
        proxy: 'http://domriy-local.cc/',
        /*host: 'kvz-local.cc',*/
        open: 'external'
    });

    gulp.watch('../domriyecommerce/assets/sass/**/*.scss', gulp.series('sass')).on("change", reload);
});
