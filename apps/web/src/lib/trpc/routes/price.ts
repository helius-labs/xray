import { z } from "zod";

import { t } from "$lib/trpc/t";

const { HELIUS_KEY } = process.env;

export const price = t.router({
    price: t.procedure.input(z.string()).query(async ({ input: token }) => {
        if (!HELIUS_KEY) {
            return 25;
        }

        const response = await fetch(
            `https://public-api.birdeye.so/public/price/?address=${token}`
        );

        const json = await response.json();

        return json.value;
    }),
});
