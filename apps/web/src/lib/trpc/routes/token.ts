import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const token = t.procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
        const response = await fetch(
            `https://api.helius.xyz/v0/token-metadata/?api-key=${HELIUS_KEY}`,
            {
                body: JSON.stringify({
                    includeOffChain: true,
                    mintAccounts: input,
                }),
                method: "POST",
            }
        );

        const json = await response.json();

        return json;
    });
