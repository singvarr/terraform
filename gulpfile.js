const gulp = require("gulp");
const {
    DIST_DIRECTORY,
    IS_DEVELOPMENT,
    SRC_DIRECTORY,
    TASKS_DIRECTORY
} = require("./constants");

const tasks = {
    ASSETS: "assets",
    BUILD: "build",
    CLEAN: "clean",
    IMAGES: "images",
    LINT: "lint",
    SCRIPTS: "scripts",
    START: "start",
    STYLES: "styles",
    WATCH: "watch"
};

function lazyLoadTask(taskName, path, options) {
    options.taskName = taskName;

    gulp.task(taskName, callback => {
        const task = require(path);
        const handler = task.call(this, options);

        return handler(callback);
    });
}

lazyLoadTask(tasks.ASSETS, `${TASKS_DIRECTORY}/assets`, {
    distPath: `${DIST_DIRECTORY}/assets`,
    isDev: IS_DEVELOPMENT,
    srcPath: [
        `${SRC_DIRECTORY}/assets/{fonts,icons}/**/*.*`,
        `${SRC_DIRECTORY}/fixtures/**/*.{png,jpeg,jpg}`
    ]
});

lazyLoadTask(tasks.CLEAN, `${TASKS_DIRECTORY}/clean`, { path: DIST_DIRECTORY });

lazyLoadTask(tasks.IMAGES, `${TASKS_DIRECTORY}/images`, {
    distPath: `${DIST_DIRECTORY}/assets/img`,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/assets/img/**/*.{png,jpeg,jpg}`
});

lazyLoadTask(tasks.LINT, `${TASKS_DIRECTORY}/lint`, {
    srcPath: [__filename, `${SRC_DIRECTORY}/js/**/*.js`, "./tasks/*.js"]
});

lazyLoadTask(tasks.SCRIPTS, `${TASKS_DIRECTORY}/scripts`, {
    distPath: `${DIST_DIRECTORY}/js`,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/js/**/*.js`
});

lazyLoadTask(tasks.STYLES, `${TASKS_DIRECTORY}/styles`, {
    distPath: `${DIST_DIRECTORY}/styles`,
    isDev: IS_DEVELOPMENT,
    srcPath: `${SRC_DIRECTORY}/less/**/*.less`
});

gulp.task(
    tasks.BUILD,
    gulp.series(
        tasks.CLEAN,
        gulp.parallel(
            tasks.ASSETS,
            tasks.IMAGES,
            tasks.LINT,
            tasks.SCRIPTS,
            tasks.STYLES
        )
    )
);

gulp.task(tasks.WATCH, () => {
    gulp.watch("./src/assets/**/*.*", gulp.series(tasks.ASSETS));
    gulp.watch("./src/js/**/*.js", gulp.parallel(tasks.LINT, tasks.SCRIPTS));
    gulp.watch("./src/less/**/*.less", gulp.series(tasks.STYLES));
});

gulp.task(tasks.START, gulp.series(tasks.BUILD, tasks.WATCH));
