import type { EnrichedTransaction, TransactionType } from "helius-sdk";

import type { ProtonTransaction } from "@helius-labs/xray-proton";

import type { IconPaths } from "$lib/icons";

export * from "$lib/icons";

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

export enum UITransactionActionType {
    BURN = "BURN",
    SWAP = "SWAP",
    TRANSFER = "TRANSFER",
    TRANSFER_RECEIVED = "TRANSFER_RECEIVED",
    TRANSFER_SENT = "TRANSFER_SENT",
    SWAP_RECEIVED = "SWAP_RECEIVED",
    SWAP_SENT = "SWAP_SENT",
    UNKNOWN = "UNKNOWN",
}

export interface UITransactionActionsMetadataObject {
    icon: Icon;
    label: string;
}

export type UITransactionActionMetadata = Record<
    UITransactionActionType,
    UITransactionActionsMetadataObject
>;

export const transactionActionsMetadata: UITransactionActionMetadata = {
    BURN: {
        icon: "flame",
        label: "Burn",
    },
    SWAP: {
        icon: "swap",
        label: "Swap",
    },
    SWAP_RECEIVED: {
        icon: "swap",
        label: "Swap",
    },
    SWAP_SENT: {
        icon: "swap",
        label: "Swap",
    },
    TRANSFER: {
        icon: "arrowRight",
        label: "Transfer",
    },
    TRANSFER_RECEIVED: {
        icon: "arrowDown",
        label: "Received",
    },
    TRANSFER_SENT: {
        icon: "arrowUp",
        label: "Sent",
    },
    UNKNOWN: {
        icon: "box",
        label: "Generic Transaction",
    },
};

export interface UITransactionAction {
    type: TransactionType;
    actionType?: UITransactionActionType;
    signature: string;
    timestamp: number;
    receivedFrom?: string;
    sentTo?: string;
    received?: string;
    sent?: string;
    amount?: number;
}

export interface UITransactionActionGroup {
    label: string;
    icon: Icon;
    type: string;
    actions: UITransactionAction[];
    timestamp: number;
}
