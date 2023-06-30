import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_API_KEY } = process.env;

export const balances = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const url = `https://api.helius.xyz/v0/addresses/${input}/balances?api-key=${HELIUS_API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        return data;
    });
