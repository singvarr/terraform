const pricing = require("./pricing");

const services = [
    {
        image: "./sofa.png",
        pricing,
        translationKey: "services.visualizationInterior"
    },
    {
        image: "./house.png",
        pricing,
        translationKey: "services.visualizationExterior"
    },
    {
        image: "./bear.png",
        pricing,
        translationKey: "services.modeling"
    },
    {
        image: "./zombie.png",
        pricing,
        translationKey: "services.interactiveVisualization"
    }
];

module.exports = services;
