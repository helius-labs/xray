import * as actions from "./actions";

import formatMoney from "$lib/util/format-money";

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
    loader    : actions.getTokenPrice,
};

export const solanaTps = {
    loader    : actions.getSolanaTps,
};

export const solanaTokenRegistry = {
    loader                   : actions.getSolanaTokenRegistry,
    fetchOnFirstSubscription : true,
    formatter                : (data:any) => new Map(data.map((token:Token) => ([ token?.address, token ]))),
};

export const solanaAccountInfo = {
    loader : actions.getSolanaAccountInfo,
};

export const solanaTransactions = {
    loader    : actions.getSolanaTransactions,
    formatter : (data:any) => data.map((tx:EnrichedTransaction) => ({
        parsed : parseTransaction(tx),
        raw    : tx,
    })),
};

export const solanaTransaction = {
    loader    : actions.getSolanaTransaction,
    formatter : (data:any) => ({
        parsed : parseTransaction(data),
        raw    : data,
    }),
};

export const solanaToken = {
    loader : actions.getSolanaToken,
};

