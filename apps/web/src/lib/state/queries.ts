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
    formatter: (data: any) =>
        data.map((tx: EnrichedTransaction) => ({
            parsed: parseTransaction(
                tx,
                "BGkpRfK8L5Yy7A8wimA4CXra2GhFxdSWK944Ap6dPKCu"
            ),
            raw: tx,
        })),
    loader: actions.getSolanaTransactions,
};

export const solanaTransaction = {
    formatter: (data: any) => ({
        parsed: parseTransaction(data),
        raw: data,
    }),
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
