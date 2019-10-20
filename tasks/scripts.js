const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");
const isDevelopment = require("../constants");

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.cached(taskName))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.babel({ presets: ["@babel/env"] }))
        .pipe($.if(isDevelopment, $.debug()))
        .pipe($.remember(taskName))
        .pipe($.concat("bundle.js"))
        .pipe(
            $.if(
                !isDevelopment,
                combiner.obj($.uglify(), $.rename({ suffix: ".min" }))
            )
        )
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(dist));
};
