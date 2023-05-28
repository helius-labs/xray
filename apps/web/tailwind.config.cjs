const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    daisyui: {
        themes: [
            {
                helius: {
                    accent: "#ea580c",

                    "base-100": "black",

                    error: "#ee2222",

                    info: "#2563eb",

                    neutral: "#a1a1a1",

                    primary: "#c7c7c7",

                    "primary-content": "#f5f5f4",

                    secondary: "#414141",

                    success: "#34d399",

                    warning: "#FBBD23",
                },
            },
        ],
    },

    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
        require("prettier-plugin-tailwindcss"),
    ],

    theme: {
        extend: {},
    },
};

module.exports = config;
