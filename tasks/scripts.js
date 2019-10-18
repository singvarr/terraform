const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = options => () => {
    const { distPath, isDev, srcPath, taskName } = options;

    return gulp
        .src(srcPath, { since: gulp.lastRun(taskName) })
        .pipe($.cached(taskName))
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.babel({ presets: ["@babel/env"] }))
        .pipe($.remember(taskName))
        .pipe($.concat("bundle.js"))
        .pipe(
            $.if(!isDev, combiner.obj($.uglify(), $.rename({ suffix: ".min" })))
        )
        .pipe($.if(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest(distPath));
};
