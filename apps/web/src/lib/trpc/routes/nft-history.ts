import type { EnrichedTransaction, NFTEvent } from "helius-sdk";

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
        const nftEventsUrl = `https://api.helius.xyz/v1/nft-events?api-key=${HELIUS_KEY}`;
        const transactionsUrl = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        const response = await fetch(nftEventsUrl, {
            body: JSON.stringify({
                options: {
                    sortOrder: "DESC",
                },
                query: {
                    accounts: [input.account],
                    // types: ["NFT_SALE", "NFT_MINT"],
                },
            }),
            method: "POST",
        });

        const data: any = await response.json();

        const signatureList = data?.result.map((tx: any) => tx.signature) || [];

        const transactions = await fetch(transactionsUrl, {
            body: JSON.stringify({
                transactions: signatureList,
            }),

            method: "POST",
        });

        const json: EnrichedTransaction[] = await transactions.json();

        const result = json.map((tx) => parseTransaction(tx)) || [];

        return {
            paginationToken: data.paginationToken,
            result,
        };
    });
