const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
require("dotenv").config();

const { SRC_DIRECTORY } = require("./constants");

const { PORT } = process.env;

const app = express();

app.use(express.static(path.join("dist")));

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(SRC_DIRECTORY, "views"));

app.listen(PORT);
