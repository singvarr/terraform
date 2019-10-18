const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");
const { isDevelopment } = require("../constants");

const pngCompressConfig = {
    floyd: 0.3,
    quality: "30"
};
const jpegCompressConfig = {
    loops: 1,
    min: 50,
    max: 90,
    quality: "veryhigh"
};

module.exports = options => () => {
    const { dist, src, taskName } = options;

    return gulp
        .src(src, { since: gulp.lastRun(taskName) })
        .pipe($.newer(dist))
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
