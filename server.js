const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const i18n = require("i18n");
const faker = require("faker");

const { paths } = require("./constants");
const {
    contacts,
    createFixture,
    getRandomGallery,
    getRandomPartner,
    getRandomPortfolio,
    getRandomPostContent,
    getRandomPostPreview,
    getRandomReview,
    getRandomTopic,
    getRandomWorker,
    getWidgetContent,
    menu: navigation,
    pageTitlesTranslations,
    services,
    stats
} = require("./src/fixtures");

const { PORT } = process.env;

const app = express();

app.use(express.static(paths.DIST_DIRECTORY));

i18n.configure({
    defaultLocale: "ru",
    directory: path.join(paths.SRC_DIRECTORY, "locales")
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
app.set("views", path.join(paths.SRC_DIRECTORY, "views"));

app.get("/favicon.ico", (_, res) => {
    res.sendStatus(204);
});

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
        contacts,
        developer: faker.name.findName(),
        images: createFixture(10, faker.image.technics),
        navigation,
        services,
        title: pageTitlesTranslations.SERVICES
    });
});

app.get("/portfolio", (_, res) => {
    res.render("portfolio", {
        contacts,
        developer: faker.name.findName(),
        images: createFixture(10, faker.image.technics),
        navigation,
        portfolio: createFixture(4, getRandomPortfolio(4, 10)),
        title: pageTitlesTranslations.PORTFOLIO
    });
});

app.get("/blog", (_, res) => {
    res.render("blog", {
        contacts,
        developer: faker.name.findName(),
        images: createFixture(10, faker.image.technics),
        navigation,
        newPosts: getWidgetContent(3, "widget.newPosts", getRandomPostPreview),
        posts: createFixture(10, getRandomPostPreview),
        title: pageTitlesTranslations.BLOG,
        topics: getWidgetContent(3, "widget.topics", getRandomTopic)
    });
});

app.get("/post", (_, res) => {
    res.render("post", {
        contacts,
        developer: faker.name.findName(),
        navigation,
        newPosts: getWidgetContent(3, "widget.newPosts", getRandomPostPreview),
        post: getRandomPostContent(10),
        title: pageTitlesTranslations.POST,
        topics: getWidgetContent(3, "widget.topics", getRandomTopic)
    });
});

app.listen(PORT);
