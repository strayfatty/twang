var config = require('../config.js'),
    gulp = require('gulp');

gulp.task('watch', function () {
    gulp.watch(config.vendor.scripts.src.globs, ['vendor-scripts']);
    gulp.watch(config.app.scripts.src.globs.concat(config.app.scripts.templates.globs), ['app-scripts']);
    gulp.watch(config.vendor.styles.src.globs, ['vendor-styles']);
    gulp.watch(config.app.styles.src.globs, ['app-styles']);
});