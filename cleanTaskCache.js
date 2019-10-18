const path = require("path");
const $ = require("gulp-load-plugins");

function cleanTaskCache(watcher, ...tasks) {
    watcher.on("unlink", file => {
        const absolutePath = path.resolve(file);

        tasks.forEach(task => delete $.cached().caches[task][absolutePath]);
        $.remember().forget(file);
    });
}

module.exports = cleanTaskCache;
