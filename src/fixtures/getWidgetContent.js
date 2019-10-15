const createFixture = require("./createFixture");

const getWidgetContent = (itemsLength, title, fixtureCreator) => ({
    title,
    items: createFixture(itemsLength, fixtureCreator)
});

module.exports = getWidgetContent;
