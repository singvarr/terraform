const faker = require("faker");

const getRandomTopic = () => ({
    title: faker.name.title(),
    slug: faker.lorem.slug()
});

module.exports = getRandomTopic;
