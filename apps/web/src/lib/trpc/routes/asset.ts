import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

// TODO: add output validation once this merges with the token endpoint
export const asset = t.procedure.input(z.string()).query(async ({ input }) => {
    const url = `https://mainnet-beta.solanarpc.network/?api-key=${HELIUS_KEY}`;

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
        assetHash: "",
        attributes: [],
        collectionKey: "",
        compressed: false,
        creatorHash: "",
        creators: [],
        dataHash: "",
        delegate: "",
        description: "",
        frozen: false,
        image: "",
        leafId: 0,
        name: "",
        owner: "",
        sellerFeeBasisPoints: 0,
        seq: 0,
        tree: "",
    };

    if (data?.result?.compression?.compressed === true) {
        const assetData = await fetch(data.result.content.json_uri);
        const returnAssetData = await assetData.json();

        metadata = {
            address: data?.result?.id || "",
            assetHash: data?.result?.compression?.asset_hash,
            attributes: returnAssetData?.attributes || [],
            collectionKey: data?.result?.grouping[0]?.group_value || "",
            compressed: true,
            creatorHash: data?.result?.compression?.creator_hash,
            creators: data?.result?.creators || [],
            dataHash: data?.result?.compression?.data_hash,
            delegate: data?.result?.ownership?.delegated
                ? data?.result?.ownership?.delegate
                : "",
            description: returnAssetData?.description || "",
            frozen: data?.result?.ownership?.frozen,
            image: returnAssetData?.image || "",
            leafId: data?.result?.compression?.leaf_id,
            name: returnAssetData?.name || "",
            owner: data?.result?.ownership?.owner || "",
            sellerFeeBasisPoints: data?.result?.sellerFeeBasisPoints || 0,
            seq: data?.result?.compression?.seq,
            tree: data?.result?.compression?.tree,
        };
    }
    return metadata;
});
