import { t } from "$lib/trpc/t";

import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";

import { getRPCUrl } from "$lib/util/get-rpc-url";
import type { UITokenMetadata } from "$lib/types";

// TODO: add output validation once this merges with the token endpoint
export const asset = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        const [asset, isMainnet] = input;
        const url = getRPCUrl(`?api-key=${HELIUS_API_KEY}`, isMainnet);

        const response = await fetch(url, {
            body: JSON.stringify({
                id: "asset",
                jsonrpc: "2.0",
                method: "getAsset",
                params: {
                    id: asset,
                    options: {
                        showFungible: true,
                    },
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const data = await response.json();
        let metadata: UITokenMetadata | undefined;

        if (data?.result?.compression?.compressed === true) {
            const assetData = await fetch(data.result.content.json_uri);
            const returnAssetData = await assetData.json();

            metadata = {
                address: data?.result?.id || "",
                assetHash: data?.result?.compression?.asset_hash,
                attributes: returnAssetData?.attributes || [],
                burnt: data?.result?.burnt,
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
                mintExtensions: data?.result?.mint_extensions || "",
                mutable: data?.result?.mutable,
                name: returnAssetData?.name || "",
                owner: data?.result?.ownership?.owner || "",
                // sellerFeeBasisPoints ??
                sellerFeeBasisPoints: data?.result?.royalty.basis_points || 0,
                seq: data?.result?.compression?.seq,
                tree: data?.result?.compression?.tree,
            };
        }
        return metadata ?? data?.result;
    });
