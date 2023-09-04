import type { ComponentType } from "svelte";

import type { EnrichedTransaction } from "helius-sdk";

import type {
    ProtonActionType,
    ProtonTransaction,
    ProtonTransactionAction,
} from "$lib/xray";

import type {
    IconPaths,
    modals,
    BONFIDA_RECORDS,
    SOCIAL_BONFIDA_RECORDS,
    CRYPTO_BONFIDA_RECORDS,
    TRADITIONAL_DNS_TYPES,
} from "$lib/config";

export * from "$lib/config";

export type BonfidaRecord = keyof typeof BONFIDA_RECORDS;

export type SocialBonfidaRecord = keyof typeof SOCIAL_BONFIDA_RECORDS;

export type CryptoBonfidaRecord = keyof typeof CRYPTO_BONFIDA_RECORDS;

export type TraditionalDnsTypes = keyof typeof TRADITIONAL_DNS_TYPES;

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
