const path = require("path");

const ROOT_PATH = path.join(__dirname, "..");

module.exports = {
    DIST_DIRECTORY: path.join(ROOT_PATH, "dist"),
    SRC_DIRECTORY: path.join(ROOT_PATH, "src"),
    TASKS_DIRECTORY: path.join(ROOT_PATH, "tasks")
};
