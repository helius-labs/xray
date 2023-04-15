import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray";

import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const nftHistory = t.procedure
    .input(
        z.object({
            account: z.string(),
        })
    )
    .query(async ({ input }) => {
        const url = `https://api.helius.xyz/v1/nft-events?api-key=${HELIUS_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                options: {
                    sortOrder: "DESC",
                },
                query: {
                    accounts: [input.account],
                    types: ["NFT_SALE"],
                },
            }),
            method: "POST",
        });

        const json = await response.json();

        const result = json.map((tx: any) => parseTransaction(tx)) || [];

        return {
            oldest: json[json.length - 1]?.signature || "",
            result,
        };
    });
