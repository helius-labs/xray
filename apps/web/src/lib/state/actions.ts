import type { TokenInfo } from "@solana/spl-token-registry";

import { TokenListProvider } from "@solana/spl-token-registry";

import type { EnrichedTransaction } from "helius-sdk";

import type { UIConfig } from "$lib/types";

import { dev } from "$app/environment";

export const getXrayConfig = async (): Promise<UIConfig> => {
    const devMode = Boolean(window.localStorage.getItem("xray:devmode"));

    return {
        dev,
        devMode,

        // These get replaced by vite
        // @ts-ignore
        isMocked: IS_MOCKED,
        // @ts-ignore
        name: APP_NAME,
        // @ts-ignore
        version: APP_VERSION,
    };
};

export const updateXrayConfig = (
    existing: UIConfig,
    options: UIConfig
): UIConfig => {
    window.localStorage.setItem("xray:devmode", String(options.devMode));

    return {
        ...existing,
        ...options,
    };
};

export const getSolanaAccountInfo = async (address: string): Promise<any> => {
    const response = await fetch(`/$/api/solana/${address}/account-info`);

    const json = await response.json();

    return json?.data;
};

export const getTokenPrice = async (
    token: string
): Promise<Record<string, any>> => {
    const response = await fetch(
        `https://public-api.birdeye.so/public/price/?address=${token}`
    );

    const json = await response.json();

    const { value } = json.data;

    return value;
};

export const getSolanaTps = async (): Promise<any> => {
    const response = await fetch(`/$/api/solana/tps`);

    const { data } = await response.json();

    return data;
};

export const getSolanaTokenRegistry = async (): Promise<TokenInfo[]> => {
    const tokenListProvider = new TokenListProvider();

    const tokenList = await tokenListProvider.resolve();

    return tokenList.filterByClusterSlug("mainnet-beta").getList();
};

export const getSolanaToken = async (address: string): Promise<any> => {
    const response = await fetch(`/$/api/solana/${address}/token`);

    const { data } = await response.json();

    return data;
};

export const getSolanaTransaction = async (
    signature: string
): Promise<EnrichedTransaction> => {
    const response = await fetch(`/$/api/solana/${signature}/transaction`);

    const { data } = await response.json();
    return data;
};

export const getSolanaTransactions = async (
    address: string
): Promise<EnrichedTransaction[]> => {
    const response = await fetch(`/$/api/solana/${address}/transactions`);

    const { data } = await response.json();

    return data;
};

const recentActivityKey = "xray:recent-activity";

export const getRecentActity = () => {
    const activity = window.localStorage.getItem(recentActivityKey);

    return JSON.parse(activity || "[]");
};

export const addRecentActivity = (item: string) => {
    let data = [];

    try {
        data = JSON.parse(
            window.localStorage.getItem(recentActivityKey) || "[]"
        );
    } catch (error) {}

    window.localStorage.setItem(recentActivityKey, JSON.stringify(data));
};
