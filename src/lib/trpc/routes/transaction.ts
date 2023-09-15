import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "$lib/xray";

import { t } from "$lib/trpc/t";

import { z } from "zod";
import { getAPIUrl } from "$lib/util/get-api-url";

const { HELIUS_API_KEY } = process.env;

export const transaction = t.procedure
    .input(
        z.object({
            account: z.string().optional(),
            transaction: z.string(),
            isMainnet: z.boolean(),
        })
    )
    .query(async ({ input }) => {
        const url = getAPIUrl(`/v0/transactions/?api-key=${HELIUS_API_KEY}`, input.isMainnet)
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
