const faker = require("faker");

const contacts = {
    additionalPhone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(true),
    mainPhone: faker.phone.phoneNumber(),
    email: faker.internet.email()
};

module.exports = contacts;
