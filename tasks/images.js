const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");
const { isDevelopment } = require("../constants");

module.exports = options => () => {
    const {
        dist,
        jpegCompressConfig,
        pngCompressConfig,
        src,
        taskName
    } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.newer(dist))
        .pipe($.if(isDevelopment, $.debug({ title: taskName })))
        .pipe(
            $.if(
                !isDevelopment,
                $.imagemin([
                    imageminPngquant(pngCompressConfig),
                    imageminJpegRecompress(jpegCompressConfig)
                ])
            )
        )
        .pipe(gulp.dest(dist));
};
