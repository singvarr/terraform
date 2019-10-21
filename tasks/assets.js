const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const { isDevelopment } = require("../constants");

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.newer(dist))
        .pipe($.if(isDevelopment, $.debug({ title: taskName })))
        .pipe($.cached(taskName))
        .pipe(gulp.dest(dist));
};
