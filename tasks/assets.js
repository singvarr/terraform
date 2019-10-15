const gulp = require("gulp");

module.exports = options => {
    const { distPath, srcPath } = options;

    return () => {
        return gulp
            .src(srcPath)
            .pipe(gulp.dest(distPath));
    };
};
