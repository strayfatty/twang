var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var angularTemplateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');

var cssFiles = [
    './css/bootstrap.css',
    './css/bs-actionlinks.css',
    './css/bs-navbar.css',
    './css/twang.css',
];

var scriptFiles = [
    './js/angular.js',
    './js/angular-route.js',
    './js/ui-bootstrap-tpls.js',
    './app/**/*.module.js',
    './app/**/*.js'
];

gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
            .pipe(minifyCss())
            .pipe(concat({ path: 'site.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function () {
    return gulp.src(scriptFiles)
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(addStream.obj(prepareTemplates()))
            .pipe(concat({path: 'scripts.js'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
    return prepareTemplates()
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['css', 'scripts']);

gulp.task('watch', function () {
    gulp.watch(cssFiles, ['css']);
    gulp.watch(scriptFiles.concat('app/**/*.html'), ['scripts']);
});

function prepareTemplates() {
    return gulp.src('app/**/*.html')
        .pipe(angularTemplateCache('templates.js', { root: 'app', module: 'app' }))
}