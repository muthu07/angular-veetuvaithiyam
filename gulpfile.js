var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
 
gulp.task("sass", function(){
	gulp.src('./src/styles/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./src/styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/sass/**/*.scss', ['sass']);
});

gulp.task('cssconcat', function () {
    gulp.src('./src/styles/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./src/styles/build/'))
        .pipe(cssmin());
});

gulp.task('cssconcat:watch', function () {
  gulp.watch('./src/styles/css/**/*.css', ['cssconcat']);
});

gulp.task('cssmin', function () {
    gulp.src('./src/styles/build/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/dist/css'));
});

gulp.task('cssmin:watch', function () {
  gulp.watch('./src/styles/build/*.css', ['cssmin']);
});

gulp.task("sasscss",["sass","sass:watch"]);
gulp.task("concatcss",["cssconcat","cssconcat:watch"]);
gulp.task("mincss",["cssmin","cssmin:watch"]);

gulp.task('default', ["sasscss","concatcss","mincss"]);	

