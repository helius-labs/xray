import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_API_KEY } = process.env;

export const assets = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.number().optional(),
        })
    )
    .query(async ({ input }) => {
        const { cursor = 1, account } = input;

        const response = await fetch(
            `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`,
            {
                body: JSON.stringify({
                    id: "get-assets-" + account,
                    jsonrpc: "2.0",
                    method: "getAssetsByOwner",
                    params: {
                        limit: 1000,
                        ownerAddress: account,
                        page: cursor,
                        sortBy: {
                            sortBy: "created",
                            sortDirection: "desc",
                        },
                    },
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );

        const result = await response.json();

        return result?.result;
    });
