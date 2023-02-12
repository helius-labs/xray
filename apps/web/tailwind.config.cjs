const config = {
    content : [ "./src/**/*.{html,js,svelte,ts}" ],

    theme : {
        extend : {},
    },

    plugins : [
        require("@tailwindcss/typography"),
        require("daisyui"),
        require("tailwindcss-neumorphism"),
    ],

    daisyui : {
        themes : [
            {
                helius : {
                    primary           : "#f5f5f4",

                    "primary-content" : "#f5f5f4",
      
                    secondary : "#060606",
                             
                    accent : "#ea580c",
                             
                    neutral : "#616161",
                             
                    "base-100" : "#060606",
                             
                    info : "#2563eb",
                             
                    success : "#34d399",
                             
                    warning : "#FBBD23",
                             
                    error : "#dc2626",
                },
            },
        ],
    },
};

module.exports = config;
