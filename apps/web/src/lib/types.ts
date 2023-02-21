import { z } from "zod";

import type { EnrichedTransaction, TransactionType } from "helius-sdk";

import type {
    ProtonTransaction,
    ProtonActionType,
    ProtonTransactionAction,
} from "@helius-labs/xray-proton";

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

export interface TransactionActionMetadata {
    icon: Icon;
    label: string;
}

export const transactionActionsMetadata: Record<
    ProtonActionType,
    TransactionActionMetadata
> = {
    BURN: {
        icon: "flame",
        label: "Burn",
    },
    NFT_BID: {
        icon: "sale",
        label: "NFT Bid",
    },
    NFT_BID_CANCELLED: {
        icon: "cancel",
        label: "Canceled NFT Bid",
    },
    NFT_BUY: {
        icon: "sale",
        label: "Bought",
    },
    NFT_LISTING: {
        icon: "sale",
        label: "Listed NFT",
    },
    NFT_MINT: {
        icon: "mint",
        label: "Mint",
    },
    NFT_MINT_AIRDROP: {
        icon: "gift",
        label: "Airdrop",
    },
    NFT_SALE: {
        icon: "sale",
        label: "Bought",
    },
    NFT_CANCEL_LISTING: {
        icon: "cancel",
        label: "Canceled NFT Lising",
    },
    NFT_SELL: {
        icon: "sale",
        label: "Sold",
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

export const zodTRPCTransactionsInput = z.object({
    address: z.array(z.string()),
    before: z.string().optional(),
});
