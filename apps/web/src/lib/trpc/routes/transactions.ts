import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { t } from "$lib/trpc/t";

import { z } from "zod";

import { transactions as mock } from "@helius-labs/xray-test";

const { HELIUS_KEY } = process.env;

export const transactions = t.procedure
    .input(
        z.object({
            account: z.string(),
            before: z.string().optional(),
            user: z.string().optional(),
        })
    )
    .query(async ({ input }) => {
        if (!HELIUS_KEY) {
            return {
                result:
                    mock.transactionsVariety.map((tx: any) =>
                        parseTransaction(tx, input.user)
                    ) || [],
            };
        }

        const url = `https://api.helius.xyz/v0/addresses/${
            input.account
        }/transactions?api-key=${HELIUS_KEY}${
            input.before ? `&before=${input.before}` : ""
        }`;

        const response = await fetch(url);

        const json: EnrichedTransaction[] = await response.json();

        const result = json.map((tx) => parseTransaction(tx, input.user)) || [];

        return {
            oldest: json[json.length - 1].signature,
            result,
        };
    });
