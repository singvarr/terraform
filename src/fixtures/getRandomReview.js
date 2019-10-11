const faker = require("faker");

const getRandomReview = () => ({
    image: faker.image.abstract(),
    name: faker.company.name(),
    review: faker.lorem.paragraph(),
    title: faker.name.jobTitle()
});

module.exports = getRandomReview;
