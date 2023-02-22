import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { t } from "$lib/trpc/t";

import { z } from "zod";

import { transactions } from "@helius-labs/xray-test";

const { HELIUS_KEY } = process.env;

export const transaction = t.procedure
    .input(
        z.object({
            account: z.string().optional(),
            transaction: z.string(),
        })
    )
    .query(async ({ input }) => {
        if (!HELIUS_KEY) {
            const data = transactions.transactionsVariety.find(
                ({ signature = "" }) => input?.transaction === signature
            );

            // @ts-ignore
            return parseTransaction(data, input?.account);
        }

        const url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                transactions: [input?.transaction],
            }),

            method: "POST",
        });

        const [tx]: EnrichedTransaction[] = await response.json();

        const parsed = parseTransaction(tx, input?.account);

        console.log(input?.account);
        parsed.raw = tx;

        return parsed;
    });
