import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY, HELIUS_API_URL } = process.env;

export const balances = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const url = `${HELIUS_API_URL}/v0/addresses/${input}/balances?api-key=${HELIUS_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        return data;
    });
