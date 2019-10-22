const paths = require("./paths");

module.exports = {
    ALL_JS: [
        `${paths.ROOT_PATH}/**/*.js`,
        "!node_modules/**",
        `!${paths.DIST_DIRECTORY}/**`
    ],
    ASSETS: `${paths.SRC_DIRECTORY}/assets/{fonts,icons}/**/*.*`,
    IMAGES: `${paths.SRC_DIRECTORY}/fixtures/**/*.{png,jpeg,jpg}`,
    JS: [
        `${paths.SRC_DIRECTORY}/js/**/*.js`,
        `!${paths.SRC_DIRECTORY}/fixtures/**`
    ],
    LESS: `${paths.SRC_DIRECTORY}/less/**/*.less`,
    STATIC: `${paths.SRC_DIRECTORY}/**/*.*`,
    STYLUS: `${paths.SRC_DIRECTORY}/styles/**/*.styl`
};
