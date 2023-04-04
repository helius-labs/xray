import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray";

import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const transaction = t.procedure
    .input(
        z.object({
            account: z.string().optional(),
            transaction: z.string(),
        })
    )
    .query(async ({ input }) => {
        const url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                transactions: [input?.transaction],
            }),

            method: "POST",
        });

        const [tx]: EnrichedTransaction[] = await response.json();

        const parsed = parseTransaction(tx, input?.account);

        parsed.raw = tx;

        return parsed;
    });
