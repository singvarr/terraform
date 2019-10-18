const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = options => () => {
    const { distPath, isDev, srcPath, taskName } = options;

    return gulp
        .src(srcPath, { since: gulp.lastRun(taskName) })
        .pipe($.if(isDev, $.sourcemaps.init()))
        .pipe($.less())
        .pipe(
            $.if(
                !isDev,
                combiner.obj(
                    $.autoprefixer(),
                    $.cleanCss({ level: 2 }),
                    $.rename({ suffix: ".min" })
                )
            )
        )
        .pipe($.if(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest(distPath));
};
