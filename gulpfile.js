const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require("node-sass"));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');

// CSS Task
gulp.task('concat-css', function () {
    return gulp.src('project/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(replace('../../../images', '../img'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

// Javascript Task
gulp.task('concat-js', function () {
    return gulp.src(['./node_modules/@popperjs/core/dist/umd/popper.min.js', './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'project/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
})
// Image task
gulp.task('img', function () {
    return gulp.src('project/images/*.*')
        // .pipe(image())
        .pipe(imagemin())
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
    gulp.watch('project/images/*.*', gulp.series('img'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});

// Default Gulp task
gulp.task('default', gulp.series('watch'));
