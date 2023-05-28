import { get } from "svelte/store";

import { createQuery, createInfiniteQuery } from "@tanstack/svelte-query";

import connectionStore from "$lib/util/stores/connection";

const getBlockTransactions = async (slot: number) => {
    const connection = get(connectionStore);

    const block = await connection.getBlock(slot, {
        maxSupportedTransactionVersion: 0,
    });
};

const getCurrentSlot = async () => {
    const connection = get(connectionStore);

    const slot = await connection.getSlot();

    return slot;
};

const getPrice = () =>
    fetch(
        `https://public-api.birdeye.so/public/price/?address=So11111111111111111111111111111111111111112`
    )
        .then((res) => res.json())
        .then((json) => json?.data?.value || 0);

const getTps = async () => {
    const connection = get(connectionStore);

    const samples = await connection.getRecentPerformanceSamples(1);

    return samples[0]?.numTransactions / samples[0]?.samplePeriodSecs;
};

export default {
    assets: (
        client: any,
        input: {
            account: string;
            pageNumber?: number;
        }
    ) =>
        client.assetsByOwner.createQuery({
            account: input.account,
            limit: 50,
            page: input.pageNumber || 1,
            sortBy: {
                sortBy: "created",
                sortDirection: "asc",
            },
        }),
    blockTransactions: (slot: number) =>
        createQuery({
            queryFn: () => getBlockTransactions(slot),
            queryKey: ["block-transactions", slot],
        }),
    currentSlot: () =>
        createInfiniteQuery({
            queryFn: getCurrentSlot,
            queryKey: ["current-slot"],
            refetchInterval: 2000,
        }),
    price: () =>
        createInfiniteQuery({
            queryFn: getPrice,
            queryKey: ["price-sol-usd"],
            refetchInterval: 3000,
        }),
    tokens: (
        client: any,
        input: {
            account: string;
        }
    ) => client.balances.createQuery(input.account),
    tps: () =>
        createInfiniteQuery({
            queryFn: getTps,
            queryKey: ["sol-tps"],
            refetchInterval: 10000,
        }),
    transactions: (
        client: any,
        input: {
            account: string;
            filter: string;
            user: string;
            cursor?: string;
        }
    ) =>
        client.transactions.createInfiniteQuery(
            {
                account: input.account,
                filter: input.filter,
                user: input.account,
            },
            {
                getNextPageParam: (lastPage: { oldest: string }) =>
                    lastPage.oldest,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            }
        ),
};
