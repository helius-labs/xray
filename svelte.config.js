import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter(),
    },

    preprocess: [
        preprocess({
            postcss: true,

            // Enable TypeScript
            typescript: {
                // You can specify the tsconfig file directly
                tsconfigFile: "./tsconfig.json", // Path to your tsconfig.json file
            },
        }),
    ],
};

export default config;
