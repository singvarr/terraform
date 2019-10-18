const gulp = require("gulp");
const del = require("del");
require("dotenv").config();

const { paths, tasks } = require("./constants");
const loadTask = require("./utils/loadTask");

loadTask("assets", {
    dist: "assets",
    src: [
        `${paths.SRC_DIRECTORY}/assets/{fonts,icons}/**/*.*`,
        `${paths.SRC_DIRECTORY}/fixtures/**/*.{png,jpeg,jpg}`
    ],
    taskName: tasks.ASSETS
});

loadTask("images", {
    dist: "assets/img",
    src: `${paths.SRC_DIRECTORY}/assets/img/**/*.{png,jpeg,jpg}`,
    taskName: tasks.IMAGES
});

loadTask("lint", {
    src: [__filename, `${paths.SRC_DIRECTORY}/js/**/*.js`, "./tasks/*.js"],
    taskName: tasks.LINT
});

loadTask("scripts", {
    dist: "js",
    src: `${paths.SRC_DIRECTORY}/js/**/*.js`,
    taskName: tasks.SCRIPTS
});

loadTask("styles", {
    dist: "styles",
    src: `${paths.SRC_DIRECTORY}/less/**/*.less`,
    taskName: tasks.STYLES
});

loadTask("nodemon", { extensions: "js hbs", server: "./server" });

loadTask("browserSync")

gulp.task(tasks.CLEAN, () => del(paths.DIST_DIRECTORY));

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

gulp.task(tasks.SERVER, gulp.series(tasks.NODEMON, tasks.BROWSER_SYNC));

gulp.task(tasks.WATCH, () => {
    gulp.watch("./src/assets/**/*.*", gulp.series(tasks.ASSETS));
    gulp.watch("./src/js/**/*.js", gulp.parallel(tasks.LINT, tasks.SCRIPTS));
    gulp.watch("./src/less/**/*.less", gulp.series(tasks.STYLES));
});

gulp.task(tasks.START, gulp.series(tasks.BUILD, tasks.WATCH));
