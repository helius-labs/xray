import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

// TODO: add output validation once this merges with the token endpoint
export const assetsByOwner = t.procedure
    .input(
        z.object({
            account: z.string(),
            after: z.string().optional(),
            before: z.string().optional(),
            limit: z.number(),
            page: z.number(),
            sortBy: z
                .object({
                    sortBy: z.string(),
                    sortDirection: z.string(),
                })
                .optional(),
        })
    )
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const {
            account: ownerAddress,
            limit,
            page,
            sortBy,
            before,
            after,
        } = input;

        const assets = await fetch(url, {
            body: JSON.stringify({
                id: "assets",
                jsonrpc: "2.0",
                method: "getAssetsByOwner",
                params: { after, before, limit, ownerAddress, page, sortBy },
            }),

            headers: {
                "Content-Type": "application/json",
            },

            method: "POST",
        }).then((res) => res.json());

        return assets?.result?.items || [];
    });
