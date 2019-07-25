const path = require("path");
require("dotenv").config();

const { NODE_ENV } = process.env;

const DEVELOPMENT = "development";
const IS_DEVELOPMENT = !NODE_ENV || NODE_ENV === DEVELOPMENT;

const DIST_DIRECTORY = path.join(__dirname, "dist");
const SRC_DIRECTORY = path.join(__dirname, "src");
const TASKS_DIRECTORY = path.join(__dirname, "tasks");

module.exports = {
    DIST_DIRECTORY,
    IS_DEVELOPMENT,
    SRC_DIRECTORY,
    TASKS_DIRECTORY
};
