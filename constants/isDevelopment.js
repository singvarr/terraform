const DEVELOPMENT = "development";
const IS_DEVELOPMENT = (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === DEVELOPMENT
);

module.exports = IS_DEVELOPMENT;
