const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");

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

gulp.task("images", () => {
    return gulp
        .src("src/assets/**/*.*", { since: gulp.lastRun("images") })
        .pipe(
            imagemin([
                imageminPngquant({
                    floyd: 0.3,
                    quality: "30"
                }),
                imageminJpegRecompress({
                    loops: 1,
                    min: 50,
                    max: 90,
                    quality: "veryhigh"
                })
            ])
        )
        .pipe(gulp.dest("dist/assets"));
});

gulp.task("fonts", () => {
    return gulp.src("src/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("vendor", () => {
    return gulp.src("src/vendor/**/*.*").pipe(gulp.dest("dist/vendor"));
});

gulp.task("default", () => {
    // gulp.watch("./src/*.html", ["html"]);
    gulp.watch("src/less/**/*.less", ["styles"]);
    gulp.watch("src/js/**/*.js", ["scripts"]);
});

gulp.task("build", gulp.series("clean"));
