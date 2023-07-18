import type {
    EnrichedTransaction,
    Source,
    NativeTransfer,
    TokenTransfer,
} from "helius-sdk";

import type {
    TRANSACTION_ACTION_TYPES,
    TRANSACTION_TYPES,
} from "$lib/next/transaction-parser";

export type Fetchable<T> = {
    data: T;
    error?: string;
    loading?: boolean;
    hasFetched?: boolean;
    pages?: any[][];
    cursor?: string | number;
};

export type Balance = {
    amount: number;
    id: string;
    exchangeRate: {
        USD: number | null;
    };
};

export type Attribute = {
    traitType: string;
    value: string;
};

export type Creator = {
    address: string;
    share: number;
    verified: boolean;
};

export type Authorities = {
    address: string;
    scopes?: string[];
};

export type Grouping = {
    groupKey: string;
    groupValue: string;
};

export type Asset = {
    id: string;
    compressed: boolean;
    name: string;
    symbol: string;
    image: string;
    authorities: Authorities[];
    grouping: Grouping[];
    files: {
        images: string[];
        videos: string[];
        htmlFiles: string[];
    };
    royalty: {
        basisPoints: number;
        locked: boolean;
        percent: number;
        primarySaleHappened: boolean;
        royaltyModel: string;
        target: string;
    } | null;
    burnt: boolean;
    thumbnail: string;
    animationUrl: string;
    htmlFile: string;
    description: string;
    owner: string;
    mutable: boolean;
    frozen: boolean;
    delegate: string;
    attributes: Attribute[];
    creators: Creator[];
    dataHash: string;
    creatorHash: string;
    assetHash: string;
    tree: string;
    seq: number;
    leafId: number;
    collectionKey: string;
    uri: string;
    ownershipModel: string;
    interface: string;
    type: "token" | "asset" | null;
    enriched: boolean;
};

export type Account = {
    account: string;
    changes: {
        mint: string;
        amount: number;
    }[];
};

export type TransferType = "native" | "token";

export type MergedTransfer = TokenTransfer | NativeTransfer;

export type TransactionAction = {
    actionType: string;
    from: string;
    to: string;
    token: string;
    amount: number;
    transferType?: TransferType;
};

export type Transaction = {
    id: string;
    type: string;
    fee: number;
    timestamp: number;
    source: Source;
    actions: TransactionAction[];
    accounts: Account[];
    raw?: EnrichedTransaction;
};

export type AssetsState = Fetchable<Map<string, Asset>>;

export type BalancesState = Fetchable<Map<string, Balance>>;

export type TransactionsState = Fetchable<Map<string, Transaction>>;

export type TransactionType = keyof typeof TRANSACTION_TYPES;

export type TransactionActionType = keyof typeof TRANSACTION_ACTION_TYPES;
