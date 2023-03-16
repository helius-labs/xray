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
                    traitType: z.string(),
                    value: z.string(),
                })
            ),
            collectionKey: z.string(),
            compressed: z.boolean(),
            creators: z.array(
                z.object({
                    address: z.string(),
                    share: z.number(),
                    verified: z.boolean(),
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
        let metadata = {
            address: "",
            attributes: [],
            collectionKey: "",
            compressed: false,
            creators: [],
            description: "",
            image: "",
            name: "",
        };

        console.log("data", data);

        if (data?.result?.compression?.compressed === true) {
            const assetData = await fetch(data.result.content.json_uri);
            const returnAssetData = await assetData.json();

            metadata = {
                address: data?.result?.id || "",
                attributes: returnAssetData?.attributes || [],
                collectionKey: data?.result?.grouping.group_value || "",
                compressed: true,
                creators: data?.result?.creators || [],
                description: returnAssetData?.description || "",
                image:
                    // returnAssetData?.properties.files[0]?.uri ||
                    returnAssetData?.image || "",
                name: returnAssetData?.name || "",
            };
        }
        return metadata;
    });
