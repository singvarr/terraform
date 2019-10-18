const faker = require("faker");

const maxViews = 20000;

const getRandomPostPreview = () => ({
    date: faker.date.between(2016, new Date()),
    image: faker.random.image(),
    slug: faker.lorem.slug(),
    title: faker.name.title(),
    views: faker.random.number(maxViews)
});

module.exports = getRandomPostPreview;
