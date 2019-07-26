const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = function(options) {
    const { distPath, isDev, srcPath } = options;

    return function() {
        return gulp
            .src(srcPath)
            .pipe($.watch(srcPath))
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
};
