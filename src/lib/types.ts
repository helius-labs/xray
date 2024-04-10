import type { ComponentType } from "svelte";

import type { EnrichedTransaction } from "helius-sdk";

import type { ProtonTransaction, ProtonTransactionAction } from "$lib/xray";

import type { IconPaths, modals } from "$lib/config";

import type { SOL } from "$lib/xray";

import type { Asset } from "@nifty-oss/asset";

export * from "$lib/config";

export interface UIConfig {
    dev: boolean;
    devMode: boolean;
    isMocked: boolean;
    name: string;
    version: string;
}

export interface UIAccount {
    publicKey: string;
    transactions: Array<any>;
}
export interface UITransaction {
    parsed: ProtonTransaction;
    raw: EnrichedTransaction;
}

export interface UITokenMetadataAttribute {
    trait_type?: string;
    traitType?: string;
    value: string;
}
export interface UITokenMetadataCreators {
    address: string;
    share: number;
    verified: boolean;
}

export interface FileProperties {
    type: string;
    uri: string;
}

export interface UITokenMetadata {
    address: string;
    image: string;
    name: string;
    collectionKey: string;
    description?: string;
    attributes?: UITokenMetadataAttribute[];
    sellerFeeBasisPoints?: number;
    creators?: UITokenMetadataCreators[];
    price?: number;
    owner: string;
    delegate?: string;
    frozen?: boolean;
    mutable?: boolean;
    compressed?: boolean;
    dataHash?: string;
    creatorHash?: string;
    assetHash?: string;
    tree?: string;
    seq?: number;
    leafId?: number;
    files?: FileProperties[];
    video_uri?: string;
    burnt?: boolean;
    mintExtensions?: object;
}

export type Icon = keyof typeof IconPaths;

export interface TransactionActionMetadata {
    icon: Icon;
    label: string;
    filterLabel?: string;
}

export interface TransactionPage {
    result: Array<ProtonTransaction>;
    oldest: string;
}

export interface UITransactionActionGroup {
    label: string;
    icon: Icon;
    type: string;
    actions: ProtonTransactionAction[];
    timestamp: number;
}

export interface TRPCTransactionsOutput {
    result: Array<ProtonTransaction>;
    oldest: string;
}

export interface Modal {
    title: string;
    component: ComponentType;
    showClose?: boolean;
    fullscreen?: boolean;
    props?: Record<string, any>;
}

export type Modals = keyof typeof modals;

export type NullableProp<T> = T | null | undefined;

export interface JupiterToken {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    logoURI: string;
}

export interface TokenMap {
    [symbol: string]: string;
}

export type RecognizedTokens = {
    [key: string]: string;
};

/** Used in the account/tokens page */
export type UIAccountToken = {
    id: string;
    decimals: number;
    balance: number;
    balanceInUSD: number;
    price: number;
    fullMetadata: any;
};

/**
 * Used in the account/tokens page. A special case for SOL is necessary because
 * it's not structed like other tokens
 */
export type UISolAccountToken = {
    id: typeof SOL;
    balance: number;
    balanceInUSD: number;
    price: number;
};

/** Used in the Nifty Asset pages. */
export type UINiftyAsset = Asset & { json: any };
