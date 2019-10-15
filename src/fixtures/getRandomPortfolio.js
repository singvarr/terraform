const faker = require("faker");
const createFixture = require("./createFixture");
const { createGallery } = require("./getRandomGallery");

const getRandomPortfolio = (galleriesInSection, imagesPerGallery) => () => ({
    title: faker.name.title(),
    galleries: createFixture(
        galleriesInSection,
        createGallery(imagesPerGallery)
    )
});

module.exports = getRandomPortfolio;
