module.exports = {
    root: true,
    extends: ["eslint:recommended"],
    rules: {
        camelcase: "error",
        "max-len": "error",
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: "error",
        "object-curly-spacing": ["error", "always"],
        "eol-last": "error",
        "comma-dangle": "error",
        "no-trailing-spaces": "error",
        "default-case": "error",
        "no-var": "error",
        semi: "error",
        "no-useless-computed-key": "error"
    },
    env: {
        es6: true,
        node: true,
        browser: true
    }
};
