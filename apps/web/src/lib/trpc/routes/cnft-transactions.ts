import { t } from "$lib/trpc/t";
import type { EnrichedTransaction } from "@helius-labs/helius-sdk/dist";
import { parseTransaction } from "@helius-labs/xray";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

type SignaturesResponse = {
    total: number;
    limit: number;
    page: number;
    items: string[][];
};

export const cnftTransactions = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const response: SignaturesResponse = await fetch(url, {
            body: JSON.stringify({
                id: "signatures",
                jsonrpc: "2.0",
                method: "getSignaturesForAsset",
                params: {
                    id: input,
                    page: 1,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());

        const signatures = response.items.map((signature) => {
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

        return transactions.map((tx) => {
            return parseTransaction(tx);
        });
    });
