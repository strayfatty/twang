var config = require('../config.js'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

gulp.task('vendor-styles', function() {
    return gulp.src(config.vendor.styles.src.globs, config.vendor.styles.src.options)
        .pipe(sourcemaps.init())
            .pipe(concat({ path: config.vendor.styles.output }))
            .pipe(cssnano())
        .pipe(sourcemaps.write(config.vendor.styles.sourcemaps.path, config.vendor.styles.sourcemaps.options))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('app-styles', function() {
    return gulp.src(config.app.styles.src.globs, config.vendor.styles.src.options)
        .pipe(sourcemaps.init())
            .pipe(sass(config.app.styles.sass.options).on('error', sass.logError))
            .pipe(cssnano())
            .pipe(rename(config.app.styles.output))
        .pipe(sourcemaps.write(config.app.styles.sourcemaps.path, config.app.styles.sourcemaps.options))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('styles', ['vendor-styles', 'app-styles']);