import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

import { tokens } from "@helius-labs/xray-test";

export const token = t.procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
        if (!HELIUS_KEY) {
            const mocked = tokens.find(
                ({ mint, account }) => mint === input[0] || account === input[0]
            );

            return mocked;
        }

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
