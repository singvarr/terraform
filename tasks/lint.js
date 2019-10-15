const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combiner = require("stream-combiner2");

module.exports = options => {
    return () => {
        const { srcPath } = options;

        return gulp
            .src(srcPath)
            .pipe(combiner.obj($.eslint(), $.eslint.formatEach()));
    };
};
