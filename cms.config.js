export default {
    contentEndpoint : "https://api-us-west-2.hygraph.com/v2/clcdsxmbh4lqo01um4pjuel0y/master",
    queries         : [
        {
            model : "generals",
            args  : `(
                    first: 1
                ) {
                    title
                    description
                }
            `,
        },
    ],
};
