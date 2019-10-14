const faker = require("faker");

const getRandomReview = () => ({
    company: faker.company.companyName(),
    image: faker.image.abstract(),
    review: faker.lorem.paragraph(),
    title: faker.name.jobTitle()
});

module.exports = getRandomReview;
