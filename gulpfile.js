// --- Gulp & Constants
const gulp = require('gulp');
const buildDir = 'dist';

// --- Plugins & Dependencies
//const source = require('vinyl-source-stream');
//const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// --- Tasks
// - Default task. Will start dev server, watch for changes, and build them on the fly
gulp.task('default', ['build']);

// - Copy js to build dir, minify/uglify app code
gulp.task('build-js', () => {
    var app = gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + '/js'));

    return app;
});

// - Bundle CSS
gulp.task('build-css', () => {
    var app = gulp.src('src/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildDir + '/css'));

    return app;
});

// - Copy HTML & PHP
gulp.task('copy-pages', () => {
    return gulp.src([
        'src/**/*.html',
        'src/**/*.php'
    ])
        .pipe(gulp.dest(buildDir));
});

// - Clean build directory
gulp.task('clean', () => {
    return gulp.src(buildDir + '/*').pipe(clean());
});

// - Build entire project
gulp.task('build', ['build-js', 'build-css', 'copy-pages']);
