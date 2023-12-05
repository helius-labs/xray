import { z } from "zod";

import { t } from "$lib/trpc/t";

import { VITE_BIRDEYE_API_KEY } from "$env/static/private";

export const price = t.procedure
    .input(z.string())
    .query(async ({ input: token }) => {
        const response = await fetch(
            `https://public-api.birdeye.so/public/price/?address=${token}`,
            {
                headers: {
                    Accept: "application/json",
                    "X-API-KEY": VITE_BIRDEYE_API_KEY,
                    "x-chain": "solana",
                },
            }
        );

        const json = await response.json();

        return json?.data?.value || 0;
    });
