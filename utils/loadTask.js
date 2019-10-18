const gulp = require("gulp");
const path = require("path");
const { paths } = require("../constants");

function loadTask(task, options) {
    const { taskName } = options;

    task = path.join(paths.TASKS_DIRECTORY, task);
    options.dist =
        options.dist && path.join(paths.DIST_DIRECTORY, options.dist);

    gulp.task(taskName, callback => {
        const task = require(task);
        const handler = task.call(this, options);

        return handler(callback);
    });
}

module.exports = loadTask;
