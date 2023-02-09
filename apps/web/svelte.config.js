import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit : {
        adapter : adapter(),
        outDir  : "dist",
        alias   : {
            src              : "./src",
            "@helius-labs/*" : "../../packages/*",
        },
    },

    preprocess : [
        preprocess({
            postcss : true,
        }),
    ],
};

export default config;
