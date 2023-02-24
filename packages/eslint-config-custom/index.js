module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },

    extends: ["custom"],

    extends: ["plugin:prettier/recommended", "plugin:svelte/recommended"],
    globals: {
        APP_NAME: "readonly",
        APP_VERSION: "readonly",
    },
    overrides: [
        {
            files: ["**/*.svelte"],
            processor: "svelte3/svelte3",
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
    },
    plugins: [
        "svelte3",
        "@typescript-eslint/eslint-plugin",
        "prettier",
        "write-good-comments",
        "import",
        "promise",
        "sort-keys-fix",
        "this",
        "no-unsanitized",
        "simple-import-sort",
    ],
    rules: {
        indent: ["error", 4],

        "no-console": "error",

        "no-debugger": "error",

        "no-unsanitized/method": "error",

        "no-unsanitized/property": "error",

        "no-var": "error",

        "prettier/prettier": "error",

        "promise/always-return": "error",

        "promise/avoid-new": "warn",

        "promise/catch-or-return": "error",

        "promise/no-callback-in-promise": "warn",

        "promise/no-native": "off",

        "promise/no-nesting": "warn",

        "promise/no-new-statics": "error",

        "promise/no-promise-in-callback": "warn",

        "promise/no-return-in-finally": "warn",

        "promise/no-return-wrap": "error",

        "promise/param-names": "error",

        "promise/valid-params": "warn",

        "sort-keys-fix/sort-keys-fix": "warn",
        "this/no-this": "error",
        "write-good-comments/write-good-comments": "warn",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
    },
    settings: {
        "svelte3/typescript": () => require("typescript"), // pass the TypeScript package to the Svelte plugin
        // OR
        "svelte3/typescript": true, // load TypeScript as peer dependency
        // ...
    },
};
