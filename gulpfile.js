const gulp = require("gulp");
require("dotenv").config();

const { globs, paths, tasks } = require("./config/constants");
const loadTask = require("./config/utils/loadTask");
const watchTask = require("./config/utils/watchTask");

const { PORT, PROXY } = process.env;

loadTask("assets", {
    dist: "assets",
    src: globs.ASSETS,
    taskName: tasks.ASSETS
});

loadTask("browserSync", {
    glob: globs.STATIC,
    port: PROXY,
    proxy: PORT,
    taskName: tasks.BROWSER_SYNC
});

loadTask("clean", {
    taskName: tasks.CLEAN,
    folder: paths.DIST_DIRECTORY
});

loadTask("images", {
    dist: "assets/img",
    src: globs.IMAGES,
    taskName: tasks.IMAGES,
    jpegCompressConfig: {
        loops: 1,
        min: 50,
        max: 90,
        quality: "veryhigh"
    },
    pngCompressConfig: {
        floyd: 0.3,
        quality: "30"
    }
});

loadTask("lint", { src: globs.ALL_JS, taskName: tasks.LINT });

loadTask("scripts", {
    dist: "js",
    src: globs.JS,
    output: "bundle.js",
    taskName: tasks.SCRIPTS
});

loadTask("nodemon", {
    extensions: "js hbs",
    script: "./server",
    taskName: tasks.NODEMON
});

loadTask("styles", {
    dist: "styles",
    src: globs.LESS,
    taskName: tasks.STYLES
});

gulp.task(
    tasks.STATIC,
    gulp.parallel(
        tasks.ASSETS,
        tasks.IMAGES,
        tasks.LINT,
        tasks.SCRIPTS,
        tasks.STYLES
    )
);

gulp.task(tasks.BUILD, gulp.series(tasks.CLEAN, tasks.STATIC));

gulp.task(tasks.WATCH, () => {
    watchTask(globs.ASSETS, tasks.ASSETS);
    watchTask(globs.JS, tasks.SCRIPTS, true);
    watchTask(globs.LESS, tasks.STYLES);
    watchTask(globs.ALL_JS, tasks.LINT);
});

gulp.task(
    tasks.DEFAULT,
    gulp.series(
        tasks.STATIC,
        gulp.parallel(tasks.WATCH, tasks.NODEMON, tasks.BROWSER_SYNC)
    )
);
