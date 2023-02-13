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
      
                    secondary : "#0e0e0e",
                             
                    accent : "#ea580c",
                             
                    neutral : "#616161",
                             
                    "base-100" : "#010101",
                             
                    info : "#2563eb",
                             
                    success : "#34d399",
                             
                    warning : "#FBBD23",
                             
                    error : "#ee2222",
                },
            },
        ],
    },
};

module.exports = config;
