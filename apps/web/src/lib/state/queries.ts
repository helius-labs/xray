import * as actions from "./actions";

import { parseTransaction } from "@helius-labs/xray-proton";

import type { EnrichedTransaction } from "helius-sdk";

type Token = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
};

export const tokenPrice = {
    loader: actions.getTokenPrice,
};

export const solanaTps = {
    loader: actions.getSolanaTps,
};

export const solanaTokenRegistry = {
    fetchOnFirstSubscription: true,
    formatter: (data: any) =>
        new Map(data.map((token: Token) => [token?.address, token])),
    loader: actions.getSolanaTokenRegistry,
};

export const solanaAccountInfo = {
    loader: actions.getSolanaAccountInfo,
};

export const solanaTransactions = {
    loader: actions.getSolanaTransactions,
};

export const solanaTransaction = {
    loader: actions.getSolanaTransaction,
};

export const xrayConfig = {
    loader: actions.getXrayConfig,
    mutator: actions.updateXrayConfig,
};

export const solanaToken = {
    loader: actions.getSolanaToken,
};

export const recentActivity = {
    loader: actions.getTokenPrice,
};
