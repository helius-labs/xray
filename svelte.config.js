import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter(),
    },

    onwarn: (warning, handler) => {
        if (warning.code.startsWith("a11y-")) {
            return;
        }
        handler(warning);
    },

    preprocess: [
        preprocess({
            postcss: true,
        }),
    ],
};

export default config;
