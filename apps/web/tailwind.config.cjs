const config = {
    content : [ "./src/**/*.{html,js,svelte,ts}" ],

    theme : {
        extend : {},
    },

    plugins : [
        require("@tailwindcss/typography"),
        require("daisyui"),
    ],

    daisyui : {
        themes : [
            {
                helius : {
                    primary           : "#f5f5f4",

                    "primary-content" : "#f5f5f4",
      
                    secondary : "#f5f5f4",
                             
                    accent : "#ea580c",
                             
                    neutral : "#292524",
                             
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
