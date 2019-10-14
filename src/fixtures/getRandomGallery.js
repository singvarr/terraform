const faker = require("faker");
const createFixture = require("./createFixture");

const createGallery = length => () => ({
    name: faker.name.title,
    images: createFixture(length, () => ({
        link: faker.internet.url(),
        img: faker.image.technics()
    }))
});

const getRandomGallery = (galleriesQuantity, imagesInGallery) => (
    createFixture(galleriesQuantity, createGallery(imagesInGallery))
);

module.exports = getRandomGallery;
