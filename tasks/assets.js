const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = options => {
    const { distPath, srcPath } = options;

    return () => {
        return gulp
            .src(srcPath)
            .pipe($.watch(srcPath))
            .pipe(gulp.dest(distPath));
    };
};
