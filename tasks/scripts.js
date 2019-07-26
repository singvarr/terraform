const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = options => {
    const { distPath, isDev, srcPath } = options;

    return () => {
        return gulp
            .src(srcPath)
            .pipe($.watch(srcPath))
            .pipe($.if(isDev, $.sourcemaps.init()))
            .pipe($.babel({ presets: ["@babel/env"] }))
            .pipe($.concat("bundle.js"))
            .pipe(
                $.if(
                    !isDev,
                    combiner.obj($.uglify(), $.rename({ suffix: ".min" }))
                )
            )
            .pipe($.if(isDev, $.sourcemaps.write()))
            .pipe(gulp.dest(distPath));
    };
};
