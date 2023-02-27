import { z } from "zod";

import type { EnrichedTransaction, TransactionType } from "helius-sdk";

import type {
    ProtonTransaction,
    ProtonActionType,
    ProtonTransactionAction,
} from "@helius-labs/xray-proton";

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
    traitType: string;
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

export interface SearchResult {
    isValidPublicKey: boolean;
    isToken: boolean;
    account: UIAccount;
    token: UITokenMetadata;
    transaction: UITransaction;
}

export type Icon = keyof typeof IconPaths;

export interface TransactionActionMetadata {
    icon: Icon;
    label: string;
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
    showClose: boolean;
}
