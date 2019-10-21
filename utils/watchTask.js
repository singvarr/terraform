const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

function watchTask(glob, taskName, extensions) {
    const watcher = gulp.watch(glob, gulp.series(taskName));

    watcher.on("unlink", file => {
        let filePath = extensions
            ? file.replace(extensions.source, extensions.target)
            : file;

        delete $.cached.caches[taskName][file];
        $.remember.forget(taskName, filePath);
    });

    return watcher;
}

module.exports = watchTask;
