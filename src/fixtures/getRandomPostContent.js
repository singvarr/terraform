const faker = require("faker");

const getRandomPostContent = paragraphs => ({
    title: faker.name.title(),
    content: faker.lorem.paragraphs(paragraphs)
});

module.exports = getRandomPostContent;
