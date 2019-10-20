const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const { isDevelopment } = require("../constants");

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.if(isDevelopment, $.debug()))
        .pipe($.cached(taskName))
        .pipe(gulp.dest(dist));
};
