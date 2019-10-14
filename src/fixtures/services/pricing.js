const faker = require("faker");

module.exports = {
    BUDGET: {
        translationKey: "services.pricing.budget",
        description: faker.lorem.sentence()
    },
    STANDARD: {
        translationKey: "services.pricing.standard",
        description: faker.lorem.sentence()
    },
    PREMIUM: {
        translationKey: "services.pricing.premium",
        description: faker.lorem.sentence()
    }
};
