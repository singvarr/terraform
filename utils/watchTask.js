const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

function watchTask(glob, taskName) {
    const watcher = gulp.watch(glob, gulp.series(taskName));

    watcher.on("unlink", path => {

        delete $.cached.caches[taskName][path];
        $.remember.forget(taskName, path);
    });

    return watcher;
}

module.exports = watchTask;
