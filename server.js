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
    pageTitlesTranslations,
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

app.get("/", (_, res) => {
    res.render("main", {
        contacts,
        developer: faker.name.findName(),
        gallery: getRandomGallery(4, 20),
        navigation,
        partners: createFixture(20, getRandomPartner),
        portfolio: createFixture(10, faker.image.technics),
        reviews: createFixture(30, getRandomReview),
        services,
        stats,
        team: createFixture(4, getRandomWorker),
        title: pageTitlesTranslations.MAIN
    });
});

app.get("/services", (_, res) => {
    res.render("services", {
        developer: faker.name.findName(),
        images: createFixture(10, faker.image.technics),
        navigation,
        services,
        title: pageTitlesTranslations.SERVICES
    });
});

app.listen(PORT);
