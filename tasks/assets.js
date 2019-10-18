const gulp = require("gulp");

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe(gulp.dest(dist));
};
