import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const asset = t.procedure
    .input(z.string())
    .output(
        z.object({
            address: z.string(),
            attributes: z.array(
                z.object({
                    trait_type: z.string(),
                    value: z.string(),
                })
            ),
            collectionKey: z.string(),
            creators: z.array(
                z.object({
                    address: z.string(),
                    share: z.number(),
                })
            ),
            description: z.string(),
            image: z.string(),
            name: z.string(),
        })
    )
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                id: "asset",
                jsonrpc: "2.0",
                method: "getAsset",
                params: [input],
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const data = await response.json();

        if (data.compression.compressed === true) {
            const assetData = await fetch(data.result.content.json_uri);
            const returnAssetData = await assetData.json();
        } else {
        }

        return returnAssetData;
    });
