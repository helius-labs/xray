import type { EnrichedTransaction, NFTEvent } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray";

import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const nftHistory = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.string().optional(),
            sortOrder: z.string(),
            types: z.array(z.string()),
        })
    )
    .output(
        z.object({
            oldest: z.string(),
            result: z.array(
                z.object({
                    accounts: z.array(
                        z.object({
                            account: z.string(),
                            changes: z.array(
                                z.object({
                                    amount: z.number(),
                                    mint: z.string(),
                                })
                            ),
                        })
                    ),
                    actions: z.array(
                        z.object({
                            actionType: z.string(),
                            amount: z.number(),
                            from: z.string(),
                            fromName: z.string().optional(),
                            received: z.string().optional(),
                            sent: z.string().optional(),
                            to: z.string(),
                            toName: z.string().optional(),
                        })
                    ),
                    fee: z.number(),
                    primaryUser: z.string(),
                    raw: z.any(),
                    signature: z.string(),
                    source: z.string(),
                    timestamp: z.number(),
                    type: z.string(),
                })
            ),
        })
    )
    .query(async ({ input }) => {
        const nftEventsUrl = `https://api.helius.xyz/v1/nft-events?api-key=${HELIUS_KEY}`;
        const transactionsUrl = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        if (input.cursor === "") {
            return {
                oldest: "",
                result: [],
            };
        }

        const response = await fetch(nftEventsUrl, {
            body: JSON.stringify({
                options: {
                    paginationToken: input.cursor,
                    sortOrder: input.sortOrder,
                },
                query: {
                    accounts: [input.account],
                    types: input.types,
                },
            }),
            method: "POST",
        });

        const data: any = await response.json();

        const signatureList: string[] =
            data?.result.map((tx: any) => tx.signature) || [];

        const transactions = await fetch(transactionsUrl, {
            body: JSON.stringify({
                transactions: signatureList,
            }),

            method: "POST",
        });

        let json: EnrichedTransaction[] = await transactions.json();

        if (input.sortOrder === "ASC") {
            json = json.reverse();
        }

        const result = json.map((tx) => parseTransaction(tx)) || [];

        return {
            oldest: data.paginationToken || "",
            result,
        };
    });
