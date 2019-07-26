const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");

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

module.exports = options => {
    return () => {
        const { distPath, isDev, srcPath } = options;

        return gulp
            .src(srcPath)
            .pipe($.watch(srcPath))
            .pipe(
                $.if(
                    !isDev,
                    $.imagemin([
                        imageminPngquant(pngCompressConfig),
                        imageminJpegRecompress(jpegCompressConfig)
                    ])
                )
            )
            .pipe(gulp.dest(distPath));
    };
};
