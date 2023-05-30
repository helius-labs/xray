import { writable, derived, get } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import {
    type FetchModel,
    type Dict,
    type Asset,
    defaultAsset,
    defaultFetchModel,
} from "$lib/types";

import { SOL } from "@helius-labs/xray/dist";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { tokens, updateTokensMap } from "$lib/state/tokens";
import { account } from "$lib/state/accounts";

const HELIUS_IMAGE_CDN = "https://cdn.helius.services/cdn-cgi/image";
const PREVIEW_CDN = `${HELIUS_IMAGE_CDN}/width=300`;

type AssetByOwner = Dict<FetchModel<string[]>>;

type AssetByGroup = Dict<FetchModel<string[]>>;

const solanaIcon =
    "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";

const enrichAsset = async (id: string) => {
    console.log({ id });
};

const assets = writable<Dict<FetchModel<Asset>>>(
    new Map([
        [
            SOL,
            {
                ...defaultFetchModel,
                data: {
                    ...defaultAsset,
                    id: SOL,
                    imagePreview: solanaIcon,
                    media: {
                        images: [solanaIcon],
                    },
                    name: "SOL",
                    symbol: "SOL",
                    type: "token",
                },
            },
        ],
    ])
);

const assetsByOwner = writable<AssetByOwner>(new Map());

const assetsByGroup = writable<AssetByGroup>(new Map());

const assetBalances = writable<Dict<number>>();

const addAsset = (asset: { id: string }, type: "das" | "token" | "") => {
    assets.update((map = new Map()) => {
        const existing = map.get(asset.id) || { data: {} };

        const value: Asset = {
            ...defaultAsset,
            ...existing.data,
            id: asset.id,
            type,
        };

        if (type === "das") {
            value.name = asset?.content?.metadata?.name;
            value.description = asset?.content?.metadata?.description;
            value.symbol = asset?.content?.metadata?.symbol;
            value.externalUrl = asset.content?.links?.external_url;
            value.uri = asset?.content?.json_uri;
            value.creators = asset?.content?.creators;
            value.frozen = asset?.ownership?.frozen;

            value.media = asset?.content?.files.reduce(
                (acc, file) => {
                    if (file?.mime?.startsWith("image/")) {
                        return {
                            ...acc,
                            images: [...acc.images, file.uri],
                        };
                    } else if (file?.mime?.startsWith("video/")) {
                        return {
                            ...acc,
                            videos: [...acc.videos, file.uri],
                        };
                    } else if (file?.mime?.startsWith("text/html")) {
                        return {
                            ...acc,
                            htmlFiles: [...acc.htmlFiles, file.uri],
                        };
                    }

                    return acc;
                },
                {
                    htmlFiles: [],
                    images: [],
                    videos: [],
                }
            );

            // Generate preview from first image scalled down to 300px
            value.imagePreview = `${PREVIEW_CDN}/${value?.media?.images[0]}`;

            value.attributes = asset?.content?.metadata?.attributes?.map(
                ({ trait_type, value }) => ({ traightType: trait_type, value })
            );
        } else if (type === "token") {
            const token = get(tokens)?.data?.get(asset.id);

            if (token) {
                value.imagePreview = `${PREVIEW_CDN}/${token?.logoURI}`;
                value.media = {
                    images: [token?.logoURI],
                };
                value.name = token?.name;
                value.symbol = token?.symbol;
            }
        }

        map.set(asset.id, { ...existing, data: value });

        if (!value.imagePreview) {
            enrichAsset(asset.id);
        }

        return map;
    });
};

const addAssetByOwner = (ownerAddress: string, asset: { id: string }) => {
    assetsByOwner.update((map = new Map()) => {
        let result = map.get(ownerAddress);

        if (!result) {
            result = {
                data: [],
            };
        }

        if (!result.data.includes(asset.id)) {
            result.data.push(asset.id);
        }

        map.set(ownerAddress, result);

        return map;
    });
};

const addBalance = (id: string, amount: number) => {
    const balances = get(assetBalances) || new Map();

    balances.set(id, amount);

    assetBalances.set(balances);
};

const updateAssetsByOwner = async (ownerAddress: string, page = 1) => {
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
    addBalance(SOL, tokensByOwnerResult.nativeBalance / LAMPORTS_PER_SOL);
    addAssetByOwner(ownerAddress, { id: SOL });

    // Add assets to the main asset map and the assetsByOwner map
    Array.prototype
        .concat(byOwnerResult, tokensByOwnerResult.tokens)
        .map((asset) => {
            if (!asset) {
                return;
            }

            asset.id = asset?.id || asset?.mint;

            let type = "";

            if (asset.mint && asset?.decimals > 0) {
                type = "token";
            } else if (asset.id) {
                type = "das";
            }

            // Skip if no id or amount
            if (!asset.id || !asset.amount) {
                return;
            }

            // If token, then might have an amount
            if (asset.amount && type === "token") {
                addBalance(asset.id, (asset.amount / 10) * asset.decimals);
            }

            // Register token in main asset map
            addAsset(asset, type);

            // Register in assetsByOwner map under ownerAddress
            addAssetByOwner(ownerAddress, asset);
        });
};

const ownedTokens = derived(
    [assetsByOwner, account],
    ([$assetsByOwner, $account]) =>
        $assetsByOwner.get($account) ||
        [].filter((id) => get(assets).get(id)?.data.type === "token"),
    []
);

const ownedDas = derived(
    [assetsByOwner, account],
    ([$assetsByOwner, $account]) =>
        $assetsByOwner.get($account) ||
        [].filter((id) => get(assets).get(id)?.data.type === "das"),
    []
);

export {
    updateAssetsByOwner,
    assets,
    assetsByOwner,
    assetsByGroup,
    assetBalances,
    ownedTokens,
    ownedDas,
};
