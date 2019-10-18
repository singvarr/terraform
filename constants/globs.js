const paths = require("..");

module.exports = {
    ALL_JS: `${paths.ROOT_PATH}/**/*.js `,
    ASSETS: `${paths.SRC_DIRECTORY}/assets/{fonts,icons}/**/*.*`,
    IMAGES: `${paths.SRC_DIRECTORY}/fixtures/**/*.{png,jpeg,jpg}`,
    JS: `${paths.SRC_DIRECTORY}/js/**/*.js`,
    LESS: `${paths.SRC_DIRECTORY}/less/**/*.less`
};
