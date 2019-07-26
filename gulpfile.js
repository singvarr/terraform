const gulp = require("gulp");

const {
    DIST_DIRECTORY,
    IS_DEVELOPMENT,
    SRC_DIRECTORY,
    TASKS_DIRECTORY
} = require("./constants");

const tasks = {
    ASSETS: "assets",
    CLEAN: "clean",
    IMAGES: "images",
    LINT: "lint",
    SCRIPTS: "scripts",
    STYLES: "styles"
};

function lazyLoadTask(taskName, path, options) {
    options.taskName = taskName;

    gulp.task(taskName, function(callback) {
        const task = require(path);
        const handler = task.call(this, options);

        return handler(callback);
    });
}

lazyLoadTask(tasks.CLEAN, `${TASKS_DIRECTORY}/clean`, { path: DIST_DIRECTORY });

lazyLoadTask(tasks.STYLES, `${TASKS_DIRECTORY}/styles`, {
    distPath: DIST_DIRECTORY,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/less/**/*.less`
});

lazyLoadTask(tasks.SCRIPTS, `${TASKS_DIRECTORY}/scripts`, {
    distPath: DIST_DIRECTORY,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/js/**/*.js`
});

lazyLoadTask(tasks.IMAGES, `${TASKS_DIRECTORY}/images`, {
    distPath: `${DIST_DIRECTORY}/assets/img`,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/assets/img/**/*.{png,jpeg,jpg}`
});

lazyLoadTask(tasks.ASSETS, `${TASKS_DIRECTORY}/assets`, {
    distPath: `${DIST_DIRECTORY}/assets`,
    isDev: IS_DEVELOPMENT,
    srcPath: [
        `${SRC_DIRECTORY}/assets/{fonts,icons}/**/*.*`,
        `${SRC_DIRECTORY}/fixtures/**/*.{png,jpeg,jpg}`
    ]
});

gulp.task("default", () => {
    gulp.watch("src/less/**/*.less", ["styles"]);
    gulp.watch("src/js/**/*.js", ["scripts"]);
});

gulp.task("build", gulp.series("clean"));
