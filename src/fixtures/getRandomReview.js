const faker = require("faker");

const getRandomReview = () => ({
    image: faker.image.abstract(),
    name: faker.company.companyName(),
    review: faker.lorem.paragraph(),
    title: faker.name.jobTitle()
});

module.exports = getRandomReview;
