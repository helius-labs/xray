const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    daisyui: {
        themes: [
            {
                helius: {
                    accent: "#ea580c",

                    "base-100": "#010101",

                    error: "#ee2222",

                    info: "#2563eb",

                    neutral: "#616161",

                    primary: "#f5f5f4",

                    "primary-content": "#f5f5f4",

                    secondary: "#0e0e0e",

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
