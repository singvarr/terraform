const gulp = require("gulp");
const $ = require("gulp-load-plugins");

function watchTask(glob, taskName) {
    gulp.watch(glob, gulp.series(taskName)).on("change", event => {
        const { path, type } = event;

        if (type === "deleted") {
            delete $.cached.caches[taskName][path];

            $.remember.forget(taskName, path);
        }
    });
}

module.exports = watchTask;
