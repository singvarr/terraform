const path = require("path");
const gulp = require("gulp");
const $ = require("gulp-load-plugins");

function watchTask(glob, task) {
    gulp.watch(glob, gulp.series(task)).on("unlink", file => {
        const absolutePath = path.resolve(file);

        delete $.cached().caches[task][absolutePath];
        $.remember().forget(file);
    });
}

module.exports = watchTask;
