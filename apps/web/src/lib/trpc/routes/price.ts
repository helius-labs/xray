import { z } from "zod";

import { t } from "$lib/trpc/t";

export const price = t.procedure
    .input(z.string())
    .query(async ({ input: token }) => {
        const response = await fetch(
            `https://public-api.birdeye.so/public/price/?address=${token}`
        );

        const json = await response.json();

        return json?.data?.value || 0;
    });
