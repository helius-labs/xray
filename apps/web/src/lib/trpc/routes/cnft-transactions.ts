import { t } from "$lib/trpc/t";
import type { EnrichedTransaction } from "@helius-labs/helius-sdk/dist";
import { parseTransaction } from "@helius-labs/xray";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

type SignaturesResponse = {
    jsonrpc: string;
    result: {
        total: number;
        limit: number;
        page: number;
        items: string[][];
    };
    id: string;
};

export const cnftTransactions = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.number().optional().default(1),
        })
    )
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const response: SignaturesResponse = await fetch(url, {
            body: JSON.stringify({
                id: "signatures",
                jsonrpc: "2.0",
                method: "getSignaturesForAsset",
                params: {
                    id: input.account,
                    limit: 20,
                    page: input.cursor,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());

        const signatures = response.result.items.map((signature) => {
            return signature[0];
        });

        const transactionUrl = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        const transactions: EnrichedTransaction[] = await fetch(
            transactionUrl,
            {
                body: JSON.stringify({
                    transactions: signatures,
                }),
                method: "POST",
            }
        ).then((res) => res.json());

        const result = transactions.map((tx) => parseTransaction(tx)) || [];

        return {
            page: input.cursor + 1,
            result,
        };
    });
