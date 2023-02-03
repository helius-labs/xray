import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit : {
        adapter : adapter(),
        alias   : {
            src : "./src",
        },
    },

    preprocess : [
        preprocess({
            postcss : true,
        }),
    ],
};

export default config;
