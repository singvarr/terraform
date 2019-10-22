const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");

module.exports = options => done => {
    const { extensions, script } = options;

    const server = nodemon({
        done,
        ext: extensions,
        script
    }).on("start", browserSync.reload);

    return server;
};
