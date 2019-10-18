const $ = require("gulp-load-plugins")();

module.exports = options => {
    const { extensions, server } = options;

    return $.nodemon({
        ext: extensions,
        script: server
    });
};
