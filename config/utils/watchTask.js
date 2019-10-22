const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

function watchTask(glob, taskName, hasCaching = false) {
    const watcher = gulp.watch(glob, gulp.series(taskName));

    if (hasCaching) {
        watcher.on("unlink", file => {
            delete $.cached.caches[taskName][file];
            $.remember.forget(taskName, file);
        });
    }

    return watcher;
}

module.exports = watchTask;
