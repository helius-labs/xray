import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

// TODO: add output validation once this merges with the token endpoint
export const assetsByOwner = t.procedure
    .input(
        z.object({
            after: z.string().optional(),
            before: z.string().optional(),
            limit: z.number(),
            owner: z.string(),
            page: z.number(),
            sortBy: z.object({
                sortBy: z.string(),
                sortDirection: z.string(),
            }),
        })
    )
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const { owner, limit, page, sortBy, before, after } = input;

        const assets = await fetch(url, {
            body: JSON.stringify({
                id: "assets",
                jsonrpc: "2.0",
                method: "getAssetsByOwner",
                params: [owner, sortBy, limit, page, before, after],
            }),

            headers: {
                "Content-Type": "application/json",
            },

            method: "POST",
        }).then((res) => res.json());

        console.log({ assets });

        return assets;
    });
