import { writable, get } from "svelte/store";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { addBalance } from "$lib/state/balances";

import type { Balance, Asset, AssetsState } from "$lib/components/next/types";

import { ASSET, SOL } from "$lib/components/next/constants";

import { assetFromDas } from "$lib/state/util/asset-from-das";

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

const setLoading = (fetchable, loading: boolean) =>
    fetchable.update((state) => ({ ...state, loading }));

const setError = (fetchable, error: string) =>
    fetchable.update((state) => ({ ...state, error }));

const updateItem = (fetchable, data: Asset | Balance) =>
    fetchable.update((state) => {
        const existing = state?.data?.get(data.id) || {};

        state.data.set(data.id, {
            ...existing,
            ...data,
        });

        return state;
    });

const fetchTokenDetails = (id: string) =>
    fetch("/api/token", {
        body: JSON.stringify({
            tokens: [id],
        }),
        method: "POST",
    }).then((res) => res.json());

const fetchAssets = (address: string, page?: number) =>
    fetch("/api/assets", {
        body: JSON.stringify({
            address,
            limit: ASSET_PAGE_SIZE,
            page,
        }),
        method: "POST",
    }).then((res) => res.json());

const fetchBalances = (address: string) =>
    fetch("/api/balances", {
        body: JSON.stringify({
            address,
        }),
        method: "POST",
    }).then((res) => res.json());

export const enrichAsset = async (id: string) => {
    const _assets = get(assets);

    if (_assets.data.has(id) && _assets.data.get(id)?.enriched) {
        return;
    }

    const details = await fetchTokenDetails(id);

    // eslint-disable-next-line no-console
    console.log({ details });
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

        let pageResult = [];

        // Fetch all asset pages
        while (pageResult?.length === ASSET_PAGE_SIZE || page === 1) {
            // Reassign result here why not lol
            ({ items: pageResult = [] } = await fetchAssets(address, page));

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

        setError(String(error));
    } finally {
        setLoading(assets, false);
    }
};

// Fetches all token balances for an address.
// This includes NFTs and tokens but no details. Enrichment required.
export const loadBalances = async (address: string) => {
    setLoading(balances, true);

    try {
        const balances = await fetchBalances(address);

        // Add SOL to balances
        updateItem(balances, {
            amount: balances?.nativeBalance / LAMPORTS_PER_SOL,
            id: SOL,
            type: "token",
        });

        // Loop over other balances and add to assets
        balances?.tokens?.forEach((tokenBalance) => {
            const { amount, decimals, mint } = tokenBalance;

            updateItem(balances, {
                amount: amount / LAMPORTS_PER_SOL,
                id: mint,
                type: decimals > 0 ? "assets" : "token",
            });
        });
    } catch (error) {
        setError(balances, String(error));
    } finally {
        setLoading(balances, false);
    }
};
