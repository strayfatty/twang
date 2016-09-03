var config = require('../config.js'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
    order = require('gulp-order'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    path = require('path');

function templateStream() {
    return gulp.src(config.app.scripts.templates.globs)
        .pipe(order())
        .pipe(angularTemplateCache(config.app.scripts.templates.file, config.app.scripts.templates.options));
}

gulp.task('vendor-scripts-dev', function() {
    return gulp.src(config.vendor.scripts.src.globs, config.vendor.scripts.src.options)
        .pipe(sourcemaps.init())
            .pipe(concat({ path: config.vendor.scripts.output.dev }))
        .pipe(sourcemaps.write(config.vendor.scripts.sourcemaps.path, config.vendor.scripts.sourcemaps.options))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('vendor-scripts', ['vendor-scripts-dev'], function () {
    return gulp.src(path.join(config.paths.output, config.vendor.scripts.output.dev))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename(config.vendor.scripts.output.prod))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('app-scripts-dev', function () {
    return gulp.src(config.app.scripts.src.globs, config.app.scripts.src.options)
        .pipe(order(config.app.scripts.order.globs))
        .pipe(sourcemaps.init())
            .pipe(addStream.obj(templateStream()))
            .pipe(concat({ path: config.app.scripts.output.dev }))
        .pipe(sourcemaps.write(config.app.scripts.sourcemaps.path, config.app.scripts.sourcemaps.options))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('app-scripts', ['app-scripts-dev'], function () {
    return gulp.src(path.join(config.paths.output, config.app.scripts.output.dev))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename(config.app.scripts.output.prod))
        .pipe(gulp.dest(config.paths.output));
});

gulp.task('scripts', ['vendor-scripts', 'app-scripts']);