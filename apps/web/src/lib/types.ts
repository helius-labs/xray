import type { ComponentType } from "svelte";

import type { EnrichedTransaction } from "helius-sdk";

import type {
    ProtonActionType,
    ProtonTransaction,
    ProtonTransactionAction,
} from "@helius-labs/xray";

import type { IconPaths } from "$lib/config";

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
export interface UITokenMetadata {
    address: string;
    image: string;
    name: string;
    collectionKey: string;
    description?: string;
    attributes?: UITokenMetadataAttribute[];
    creators?: UITokenMetadataCreators[];
    price?: number;
}

export type Icon = keyof typeof IconPaths;

export interface TransactionActionMetadata {
    icon: Icon;
    label: string;
    filterLabel?: string;
    lucideIcon: any;
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

// simple dict with string keys
export type Dict<T> = Map<string, T>;

export type FetchModel<T> = {
    error?: any;
    data: T;
    isLoading?: boolean;
    hasFetched?: boolean;
    nextCursor?: string;

    // Sometimes we fetch a primitive format then enrich it later
    enriched?: boolean;
    isEnriching?: boolean;
};

export type TransactionsInput = {
    account: string;
    filter?: string;
    cursor?: string;
    user?: string;
};

export type AssetsInput = {
    limit: number;
    ownerAddress: string;
    page: number;
    sortBy: {
        sortBy: string;
        sortDirection: "asc";
    };
};

export type AssetMedia = {
    images: string[];
    videos: string[];
    htmlFiles: string[];
    other: string[];
};

export type AssetCreator = {
    address: string;
    share: number;
    verified: boolean;
};

export type AssetAttribute = {
    traitType: string;
    value: string;
};

export type AssetType = "das" | "token" | "unknown";

export type Asset = {
    type: AssetType;
    id: string;
    name: string;
    symbol: string;
    description: string;
    imagePreview: string;
    frozen: boolean;
    creators: AssetCreator[];
    uri: string;
    media: AssetMedia;
    externalUrl: string;
    attributes: AssetAttribute[];
};

export type DasFile = {
    uri: string;
    mime: string;
};

export type DasAttribute = {
    traitType: string;
    trait_type: string;
    value: string;
};

export type TokenBalance = {
    mint: string;
    amount: number;
    decimals: number;
};

export type OwnedAssets = Record<AssetType, string[]>;

export type Transactions = Dict<ProtonTransaction>;

export type TransactionsByOwner = Dict<FetchModel<string[]>>;

export type AssetsByOwner = Dict<FetchModel<string[]>>;

export type AssetsByGroup = Dict<FetchModel<string[]>>;

export type Assets = Dict<FetchModel<Asset>>;

export type BalancesByOwner = Dict<FetchModel<Dict<number>>>;
