const svelte = require("rollup-plugin-svelte");
const ts = require("rollup-plugin-ts");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve");
    
const plugins = {
    plugins : [
        resolve({
            dedupe  : [ "svelte" ],
        }),
        ts(),
        svelte(),
        json(),
    ],
};

module.exports = [
    {
        input  : "src/index.js",
        output : [
            {
                file   : "dist/index.js",
                format : "es",
            },
        ],
    
        ...plugins,
    },
];
