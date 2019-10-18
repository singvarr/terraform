const gulp = require("gulp");

module.exports = options => () => {
    const { distPath, srcPath, taskName } = options;

    return gulp
        .src(srcPath, { since: gulp.lastRun(taskName) })
        .pipe(gulp.dest(distPath));
};
