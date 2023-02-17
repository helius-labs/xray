import type { TokenInfo } from "@solana/spl-token-registry";

import { TokenListProvider } from "@solana/spl-token-registry";

import type { EnrichedTransaction } from "helius-sdk";

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
