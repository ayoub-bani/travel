var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass')(require("node-sass"));
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var terser = require('gulp-terser');
var image = require('gulp-image');

// CSS Task
gulp.task('concat-css', function () {
    return gulp.src('project/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

// Javascript Task
gulp.task('concat-js', function () {
    return gulp.src('project/js/*.js')
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
})
// Image task
gulp.task('img', function () {
    return gulp.src('project/image/*.*')
        .pipe(image())
        .pipe(gulp.dest('dist/img'))
})

// watch Tasks
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch('project/css/**/*.scss', gulp.series('concat-css'));
    gulp.watch('project/js/*.js', gulp.series('concat-js'));
    gulp.watch('project/image/*.*', gulp.series('img'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});