const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

module.exports = function(options) {
    const { distPath, srcPath } = options;

    return function() {
        return gulp
            .src(srcPath)
            .pipe($.watch(srcPath))
            .pipe(gulp.dest(distPath));
    };
};
