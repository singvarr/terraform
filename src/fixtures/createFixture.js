const createFixture = (length, fixtureCreator) => (
    Array.from({ length }, fixtureCreator)
);

module.exports = createFixture;
