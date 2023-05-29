import { writable, get } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import type { FetchModel, Dict, Asset } from "$lib/types";

import { SOL } from "@helius-labs/xray/dist";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type AssetByOwner = Dict<FetchModel<string[]>>;

type AssetByGroup = Dict<FetchModel<string[]>>;

const assets = writable<Dict<FetchModel<Asset>>>(new Map());

const assetsByOwner = writable<AssetByOwner>();

const assetsByGroup = writable<AssetByGroup>();

const assetBalances = writable<Dict<number>>();

const addAsset = (
    asset: {
        id: string;
    },
    type: "das" | "token"
) => {
    const map = get(assets);

    map.set(asset.id, {
        data: {
            attributes: [],
            description: "",
            id: asset.id,
            image: "",
            image_preview: "",
            name: "",
            symbol: "",
            type,
        },
    });

    assets.set(map);
};

const addAssetByOwner = (ownerAddress: string, asset: { id: string }) => {
    const value = get(assetsByOwner) || new Map();

    let result = value.get(ownerAddress);

    if (!result) {
        result = {
            data: [],
        };
    }

    if (!result.data.includes(asset.id)) {
        result.data.push(asset.id);
    }

    value.set(ownerAddress, result);

    assetsByOwner.set(value);
};

const addBalance = (id: string, amount: number) => {
    const balances = get(assetBalances) || new Map();

    balances.set(id, amount);

    assetBalances.set(balances);
};

const updateAssetsByOwner = async (ownerAddress: string, page = 1) => {
    const [assetsByOwner, tokensByOwner] = await Promise.all([
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
    addBalance(SOL, tokensByOwner.nativeBalance / LAMPORTS_PER_SOL);
    addAsset({ id: SOL }, "token");
    addAssetByOwner(ownerAddress, { id: SOL });

    // Add assets to the main asset map and the assetsByOwner map
    Array.prototype.concat(assetsByOwner, tokensByOwner.tokens).map((asset) => {
        const id = asset.id || asset.mint;

        const type = asset.mint && asset.decimals > 0 ? "token" : "das";

        // Skip if no id or amount
        if (!id || asset.amount === 0) {
            return;
        }

        // If token, then might have an amount
        if (asset.amount && type === "token") {
            addBalance(id, (asset.amount / 10) * asset.decimals);
        }

        // Register token in main asset map
        addAsset({ id }, type);

        // Register in assetsByOwner map under ownerAddress
        addAssetByOwner(ownerAddress, { id });
    });
};

export {
    updateAssetsByOwner,
    assets,
    assetsByOwner,
    assetsByGroup,
    assetBalances,
};
