const path = require("path");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");
const isDevelopment = require("../constants");

module.exports = options => () => {
    const { dist, output, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.newer(path.join(dist, output)))
        .pipe($.if(isDevelopment, $.debug({ title: taskName })))
        .pipe($.cached(taskName))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.babel({ presets: ["@babel/env"] }))
        .pipe($.remember(taskName))
        .pipe($.concat(output))
        .pipe(
            $.if(
                !isDevelopment,
                combiner.obj($.uglify(), $.rename({ suffix: ".min" }))
            )
        )
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(dist));
};
