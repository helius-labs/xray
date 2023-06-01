import type {
    Assets,
    AssetsByOwner,
    AssetsByGroup,
    Dict,
    Asset,
    AssetMedia,
    DasFile,
    DasAttribute,
    AssetType,
    OwnedAssets,
} from "$lib/types";

import {
    ASSET,
    ASSETS,
    FETCH_MODEL,
    PREVIEW_CDN,
    OWNED_ASSETS,
    SOL,
} from "$lib/constants";

import { writable, derived, get } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { tokens, updateTokensMap } from "$lib/state/tokens";
import { account } from "$lib/state/accounts";
import { addBalanceForOwner } from "$lib/state/balances";

// Main map of all assets the app comes across
export const assets = writable<Assets>(ASSETS());

// Map of account adddresses to owned assets
export const assetsByOwner = writable<AssetsByOwner>(new Map());

// Map of ids grouped by DAS group ID (which is the ID of a token in assets map)
export const assetsByGroup = writable<AssetsByGroup>(new Map());

// Fill in more details for a specific asset.
export const enrichAsset = async (id: string) => {
    console.log("ENRICHING!!!!!");

    const asset = await fetchJson<Asset>(`/api/asset/${id}`);

    if (asset) {
        addAsset(asset);
    }

    console.log("ASSET", asset);
};

// Attempt to determine the type of a raw asset based on existence of certain properties.
const extractAssetType = (asset: any): AssetType => {
    if (asset.mint && asset?.decimals > 0) {
        return "token";
    } else if (asset.id) {
        return "das";
    }

    return "unknown";
};

// If we have determined asset is a DAS, use this to pull out key value.
export const extractDetailsFromDAS = (asset: any) => {
    const result: Asset = {
        ...ASSET(),
        creators: asset?.content?.creators,
        description: asset?.content?.metadata?.description || "",
        externalUrl: asset.content?.links?.external_url || "",
        frozen: asset?.ownership?.frozen,
        name: asset?.content?.metadata?.name || "",
        symbol: asset?.content?.metadata?.symbol || "",
        type: "das",
        uri: asset?.content?.json_uri,
        id: asset.id,
    };

    // Extract media files
    result.media = (asset?.content?.files as DasFile[]).reduce<AssetMedia>(
        (acc, file) => {
            if (file?.mime?.startsWith("image/")) acc.images.push(file.uri);
            if (file?.mime?.startsWith("video/")) acc.videos.push(file.uri);
            if (file?.mime?.startsWith("text/html"))
                acc.htmlFiles.push(file.uri);

            return acc;
        },
        {
            htmlFiles: [],
            images: [],
            other: [],
            videos: [],
        }
    );

    // Generate preview from first image scalled down to 300px
    result.imagePreview = result?.media?.images[0]
        ? `${PREVIEW_CDN}/${result?.media?.images[0]}`
        : "";

    // Standardize attribute property names
    result.attributes = (
        asset?.content?.metadata?.attributes as DasAttribute[]
    )?.map(({ trait_type, traitType, value }) => ({
        traitType: trait_type || traitType,
        value,
    }));

    return result;
};

// If we have determined asset is a SPL token, use this to pull out key value.
const extractDetailsFromTokenInfo = (asset: any): Asset => {
    const details = get(tokens)?.data?.get(asset.mint);

    const result: Asset = {
        ...ASSET(),
        id: asset.mint,
        name: details?.name || "",
        symbol: details?.symbol || "",
        type: "token",
    };

    if (details?.logoURI) {
        result.imagePreview = `${PREVIEW_CDN}/${details?.logoURI}`;
        result.media.images = [details?.logoURI];
    }

    return result;
};

// Extract details and Asset type from raw asset data.
const extractAssetDetails = (asset: any) => {
    // The future result to add
    let result: Asset = ASSET();

    // Extract type from raw asset details
    const type = extractAssetType(asset);

    // Extract details from result and get a Asset shape
    if (type === "token") {
        result = extractDetailsFromTokenInfo(asset);
    } else if (type === "das") {
        result = extractDetailsFromDAS(asset);
    }

    return result;
};

// Adds asset details to the main assets map
export const addAsset = (asset: Asset) => {
    assets.update(($map = new Map()) => {
        const existing = $map.get(asset.id);

        $map.set(asset.id, {
            ...FETCH_MODEL(),
            ...existing,
            data: {
                ...existing?.data,
                ...asset,
            },

            // If the asset doesn't have an image file,
            // Assume it's not enriched
            enriched: Boolean(asset.imagePreview),
        });

        // console.log($map, asset.id);

        return $map;
    });
};

// Adds asset details to assetsByOwners map if it doesn't already exist
export const addAssetByOwner = (ownerAddress: string, id: string) => {
    assetsByOwner.update((map = new Map()) => {
        let result = map.get(ownerAddress);

        if (!result) {
            result = {
                data: [],
            };
        }

        if (!result.data.includes(id)) {
            result.data.push(id);
        }

        map.set(ownerAddress, result);

        return map;
    });
};

export const updateAssetsByOwner = async (ownerAddress: string, page = 1) => {
    try {
        if (!get(tokens)) {
            await updateTokensMap();
        }

        const [byOwnerResult, tokensByOwnerResult] = await Promise.all([
            // Get DAS assets
            fetchJson<{ id: string }[]>("/api/assets-by-owner", {
                limit: 50,
                ownerAddress,
                page,
                sortBy: {
                    sortBy: "created",
                    sortDirection: "asc",
                },
            }),

            // Get tokens
            fetchJson<{
                nativeBalance: number;
                tokens: {
                    amount: number;
                    decimals: number;
                    mint: string;
                    tokenAccount: string;
                }[];
            }>("/api/balances", {
                account: ownerAddress,
            }),
        ]);

        // Register solana and add native balance
        addBalanceForOwner(
            SOL,
            ownerAddress,
            tokensByOwnerResult.nativeBalance / LAMPORTS_PER_SOL
        );

        // Add assets to the main asset map and the assetsByOwner map
        Array.prototype
            .concat(byOwnerResult, tokensByOwnerResult.tokens)
            .map((raw) => {
                // The future result to add
                let asset: Asset = extractAssetDetails(raw);

                // Add token balance if exists
                if (asset.type === "token" && raw?.amount) {
                    addBalanceForOwner(
                        asset.id,
                        ownerAddress,
                        (raw.amount / 10) * raw.decimals
                    );
                }

                addAsset(asset);

                // Register in assetsByOwner map under ownerAddress
                addAssetByOwner(ownerAddress, asset.id);
            });
    } catch (error) {
        console.log(error);
    }
};

export const ownedAssets = derived(
    [assetsByOwner, account, assets],
    ([$assetsByOwner, $account, $assets]) => {
        const result = $assetsByOwner.get($account) || { data: [] };

        if (!result) return OWNED_ASSETS();

        return result.data.reduce<OwnedAssets>((acc, id) => {
            const asset = $assets.get(id)?.data;

            if (asset?.type === "token") {
                acc.token.push(id);
            } else if (asset?.type === "das") {
                acc.das.push(id);
            } else {
                acc.unknown.push(id);
            }

            return acc;
        }, OWNED_ASSETS());
    }
);
