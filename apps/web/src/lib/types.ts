import type { ComponentType } from "svelte";

import type { EnrichedTransaction } from "helius-sdk";

import type {
    ProtonActionType,
    ProtonTransaction,
    ProtonTransactionAction,
} from "@helius-labs/xray-proton";

import type { IconPaths, modals } from "$lib/config";

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
    trait_type: string;
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

export interface SearchResult {
    url: string;
    address: string;
    isToken: boolean;
    isAccount: boolean;
    isTransaction: boolean;
    isDomain: boolean;
    valid: boolean;
    search: string;
    multi?: Array<string>;
}
