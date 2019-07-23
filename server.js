const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

require("dotenv").config();
const { PORT } = process.env;

const app = express();

const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, "src", "views", "layouts"),
    partialsDir: path.join(__dirname, "src", "views", "partials")
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join("dist")));

app.listen(PORT);
