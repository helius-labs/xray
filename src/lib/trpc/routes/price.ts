import { z } from "zod";

import { t } from "$lib/trpc/t";

export const price = t.procedure
    .input(z.string())
    .query(async ({ input: token }) => {
        const apiKey = import.meta.env.VITE_BIRDEYE_API_KEY;
        const response = await fetch(
            `https://public-api.birdeye.so/public/price/?address=${token}`,
            {
                headers: {
                    Accept: "application/json",
                    "X-API-KEY": apiKey,
                    "x-chain": "solana",
                },
            }
        );

        const json = await response.json();

        return json?.data?.value || 0;
    });
