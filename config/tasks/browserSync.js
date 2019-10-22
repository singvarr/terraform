const browserSync = require("browser-sync");

module.exports = options => () => {
    const { glob, port, proxy } = options;

    browserSync.init({
        files: [glob],
        open: true,
        port,
        proxy: `localhost:${proxy}`
    });
};
