import { writable, get } from "svelte/store";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type {
    Asset,
    Balances,
    AssetsState,
    BalancesState,
} from "$lib/next/types";

import { ASSET, SOL } from "$lib/next/constants";

import { assetFromDas } from "$lib/next/state/util/asset-from-das";

import { updateItem, setLoading, setError } from "$lib/next/state/util/update";

import tFetch from "$lib/util/tfetch";

const ASSET_PAGE_SIZE = 1000;

export const balances = writable<BalancesState>({
    data: new Map(),
    error: "",
    loading: false,
});

export const assets = writable<AssetsState>({
    data: new Map(),
    error: "",
    loading: false,
});

export const enrichAsset = async (id: string) => {
    const _assets = get(assets);

    if ((_assets.data.has(id) && _assets.data.get(id)?.enriched) || !id) {
        return;
    }

    const details = await tFetch<Asset>("/api/token/" + id);

    updateItem(assets, {
        ...details,
        enriched: true,
    });
};

// Fetches all assets associated with the Digital Asset Standard (DAS)
// These assets aren't gaurenteed to be complete. Enriching MAY be necessary.
export const loadAssets = async (address: string) => {
    setLoading(assets, true);

    // Add SOL to assets
    updateItem(
        assets,
        ASSET({
            id: SOL,
            image: "https://xray.helius.xyz/media/tokens/solana.png",
            name: "SOL",
            symbol: "SOL",
        })
    );

    try {
        let page = 1;

        let pageResult: any[] = [];

        // Fetch all asset pages
        while (pageResult?.length === ASSET_PAGE_SIZE || page === 1) {
            // Reassign result here why not lol
            ({ items: pageResult = [] } = await tFetch<{
                items: any[];
            }>("/api/assets", {
                address,
                limit: ASSET_PAGE_SIZE,
                page,
            }));

            pageResult.forEach((das) => {
                // Format asset to our shape
                const asset = assetFromDas(das);

                // Add formatted to asset map
                updateItem(assets, asset);
            });

            page++;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        setError(assets, String(error));
    } finally {
        setLoading(assets, false);
    }
};

// Fetches all token balances for an address.
// This includes NFTs and tokens but no details. Enrichment required.
export const loadBalances = async (address: string) => {
    setLoading(balances, true);

    try {
        const balancesResponse = await tFetch<any[]>("/api/balances", {
            address,
        });

        // Loop over other balances and add to assets
        balancesResponse.forEach((tokenBalance) => {
            const { amount, decimals, mint } = tokenBalance;

            updateItem(balances, {
                amount: amount / LAMPORTS_PER_SOL,
                exchangeRate: {
                    USD: 0,
                },
                id: mint,
                type: decimals > 0 ? "asset" : "token",
            });
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        setError(balances, String(error));
    } finally {
        setLoading(balances, false);
    }
};
