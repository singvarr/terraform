const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");
const isDevelopment = require("../constants");

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.newer({ dest: dist, ext: ".css" }))
        .pipe($.if(isDevelopment, $.debug({ title: taskName })))
        .pipe($.cached(taskName))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.less())
        .pipe(
            $.if(
                !isDevelopment,
                combiner.obj(
                    $.autoprefixer(),
                    $.cleanCss({ level: 2 }),
                    $.rename({ suffix: ".min" })
                )
            )
        )
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(dist));
};
