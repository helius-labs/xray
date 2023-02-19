import { sveltekit } from "@sveltejs/kit/vite";

import { defineConfig } from "vite";

import pkg from "./package.json";

const heliusKey = process.env.HELIUS_KEY;

export default defineConfig(({ mode }) => ({
    build: {
        target: "es2020",
    },

    define: {
        APP_NAME: JSON.stringify(pkg.name),
        APP_VERSION: JSON.stringify(pkg.version),
        IS_MOCKED: !Boolean(heliusKey),
    },

    optimizeDeps: {
        esbuildOptions: {
            target: "es2020",
        },
    },

    plugins: [sveltekit()],
}));
