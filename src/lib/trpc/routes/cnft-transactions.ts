import { t } from "$lib/trpc/t";
import { parseTransaction } from "$lib/xray";
import type { EnrichedTransaction } from "helius-sdk";
import { z } from "zod";
import { getAPIUrl } from "$lib/util/get-api-url";
import { getRPCUrl } from "$lib/util/get-rpc-url";

import { HELIUS_API_KEY } from "$env/static/private";

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
            isMainnet: z.boolean(),
        })
    )
    .query(async ({ input }) => {
        const url = getRPCUrl(`?api-key=${HELIUS_API_KEY}`, input.isMainnet);
        const response: SignaturesResponse = await fetch(url, {
            body: JSON.stringify({
                id: "signatures",
                jsonrpc: "2.0",
                method: "getSignaturesForAsset",
                params: {
                    id: input.account,
                    limit: 50,
                    page: input.cursor,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());

        const signatures = response.result.items.map(
            ([signature]) => signature
        );

        const transactionUrl = getAPIUrl(
            `/v0/transactions/?api-key=${HELIUS_API_KEY}`,
            input.isMainnet
        );

        const transactions: EnrichedTransaction[] =
            (await fetch(transactionUrl, {
                body: JSON.stringify({
                    transactions: signatures,
                }),
                method: "POST",
            }).then((res) => res.json())) || [];

        const result = transactions.map((tx) => parseTransaction(tx)) || [];

        return {
            oldest: signatures[signatures.length - 1],
            result,
        };
    });
