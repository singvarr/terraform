const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const i18n = require("i18n");
const faker = require("faker");
require("dotenv").config();

const { DIST_DIRECTORY, SRC_DIRECTORY } = require("./constants");
const {
    contacts,
    createFixture,
    getRandomGallery,
    getRandomPartner,
    getRandomReview,
    getRandomWorker,
    menu: navigation,
    services,
    stats
} = require("./src/fixtures");

const { PORT } = process.env;

const app = express();

app.use(express.static(DIST_DIRECTORY));

i18n.configure({
    defaultLocale: "ru",
    directory: path.join(SRC_DIRECTORY, "locales")
});
app.use(i18n.init);

const hbs = exphbs.create({
    extname: ".hbs",
    helpers: {
        __: function() {
            return i18n.__.apply(this, arguments);
        }
    }
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(SRC_DIRECTORY, "views"));

app.listen(PORT);
