import { sveltekit } from "@sveltejs/kit/vite";

import { defineConfig } from "vite";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

import pkg from "./package.json";
import path from "path";

const heliusKey = process.env.HELIUS_API_KEY;

export default defineConfig(({ mode }) => ({
    build: {
        target: "es2020",
    },

    define: {
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version),
        // ...nodeBandAid,
        "process.env.NODE_DEBUG": false,
    },

    optimizeDeps: {
        esbuildOptions: {
            target: "es2020",
        },
    },

    plugins: [
        sveltekit(),
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            define: {},
            process: true,
        }),
    ],
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib"), // Add this line
        },
    },
}));
