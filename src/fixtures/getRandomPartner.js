const faker = require("faker");

const getRandomPartner = () => ({
    image: faker.image.abstract(),
    name: faker.company.companyName()
});

module.exports = getRandomPartner;
