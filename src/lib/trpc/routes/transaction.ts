import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "$lib/xray";

import { t } from "$lib/trpc/t";
import { z } from "zod";
import { getAPIUrl } from "$lib/util/get-api-url";

import { HELIUS_API_KEY } from "$env/static/private";

export const transaction = t.procedure
    .input(
        z.object({
            account: z.string().optional(),
            isMainnet: z.boolean(),
            transaction: z.string(),
        })
    )
    .query(async ({ input }) => {
        try {
            const url = getAPIUrl(
                `/v0/transactions/?api-key=${HELIUS_API_KEY}`,
                input.isMainnet
            );

            const response = await fetch(url, {
                body: JSON.stringify({
                    transactions: [input?.transaction],
                }),

                method: "POST",
            });

            if (!response.ok) {
                return { data: null, error: "Transaction not found" };
            }

            const [tx]: EnrichedTransaction[] = await response.json();

            const parsed = parseTransaction(tx, input?.account);

            if (parsed === undefined) {
                return { data: null, error: "Transaction not found" };
            }

            parsed.raw = tx;

            return parsed;
        } catch (error) {
            return { data: null, error: "Server error" };
        }
    });
