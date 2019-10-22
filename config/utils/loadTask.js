const gulp = require("gulp");
const path = require("path");
const { paths } = require("../constants");

function loadTask(taskPath, options) {
    const { taskName } = options;

    taskPath = path.join(paths.TASKS_DIRECTORY, taskPath);

    if (options.dist) {
        options.dist = path.join(paths.DIST_DIRECTORY, options.dist);
    }

    gulp.task(taskName, callback => {
        const task = require(taskPath);
        const handler = task.call(this, options);

        return handler(callback);
    });
}

module.exports = loadTask;
