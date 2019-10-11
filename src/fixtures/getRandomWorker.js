const faker = require("faker");

const getRandomWorker = () => ({
    img: faker.image.avatar(),
    name: faker.name.findName(),
    title: faker.name.jobTitle()
});

module.exports = getRandomWorker;
