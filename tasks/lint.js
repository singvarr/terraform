const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = options => () => {
    const { src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.cached(taskName))
        .pipe(combiner.obj($.eslint(), $.eslint.formatEach()))
        .pipe($.debug({ title: taskName }));
};
