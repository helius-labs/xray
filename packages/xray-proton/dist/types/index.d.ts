import { EnrichedTransaction, Source, TransactionType } from "helius-sdk";
export declare const SOL = "So11111111111111111111111111111111111111112";
export declare enum ProtonSupportedType {
    BURN = 0,
    BURN_NFT = 1,
    NFT_BID = 2,
    NFT_BID_CANCELLED = 3,
    NFT_CANCEL_LISTING = 4,
    NFT_LISTING = 5,
    NFT_SALE = 6,
    NFT_MINT = 7,
    SWAP = 8,
    TRANSFER = 9,
    UNKNOWN = 10,
    BORROW_FOX = 11,
    LOAN_FOX = 12,
    TOKEN_MINT = 13,
    EXECUTE_TRANSACTION = 14,
    COMPRESSED_NFT_MINT = 15,
    COMPRESSED_NFT_TRANSFER = 16
}
export declare enum ProtonSupportedActionType {
    "SENT" = 0,
    "RECEIVED" = 1,
    "TRANSFER" = 2,
    "TRANSFER_SENT" = 3,
    "TRANSFER_RECEIVED" = 4,
    "SWAP" = 5,
    "SWAP_SENT" = 6,
    "SWAP_RECEIVED" = 7,
    "UNKNOWN" = 8,
    "NFT_SALE" = 9,
    "NFT_BUY" = 10,
    "NFT_SELL" = 11,
    "NFT_LISTING" = 12,
    "NFT_CANCEL_LISTING" = 13,
    "NFT_BID" = 14,
    "NFT_BID_CANCELLED" = 15,
    "NFT_MINT" = 16,
    "AIRDROP" = 17,
    "BURN" = 18,
    "BURN_NFT" = 19,
    "FREEZE" = 20,
    "TOKEN_MINT" = 21,
    "BORROW_FOX" = 22,
    "LOAN_FOX" = 23,
    "EXECUTE_TRANSACTION" = 24,
    "XNFT_INSTALL" = 25,
    "XNFT_UNINSTALL" = 26,
    "COMPRESSED_NFT_MINT" = 27,
    "COMPRESSED_NFT_TRANSFER" = 28
}
export declare const ProtonCustomActionLabelTypes: {
    AIRDROP: string;
    BURN: string;
    BURN_NFT: string;
    FREEZE: string;
    XNFT_INSTALL: string;
    XNFT_UNINSTALL: string;
};
export type ProtonParser = (transaction: EnrichedTransaction, address?: string) => ProtonTransaction;
export interface ProtonTransactionAction {
    actionType: ProtonActionType;
    from: string;
    fromName: string | undefined;
    to: string;
    toName: string | undefined;
    sent?: string;
    received?: string;
    amount: number;
}
export interface ProtonTransaction {
    type: ProtonType | TransactionType | ProtonActionType;
    primaryUser: string;
    fee: number;
    signature: string;
    timestamp: number;
    source: Source;
    actions: ProtonTransactionAction[];
    accounts: ProtonAccount[];
    raw?: EnrichedTransaction;
}
export interface ProtonAccount {
    account: string;
    changes: ProtonAccountChange[];
}
export interface ProtonAccountChange {
    mint: string;
    amount: number;
}
export type ProtonParsers = Record<string, ProtonParser>;
export declare const unknownProtonTransaction: ProtonTransaction;
export declare const protonParsers: {
    BORROW_FOX: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    BURN: (transaction: EnrichedTransaction) => ProtonTransaction;
    BURN_NFT: (transaction: EnrichedTransaction) => ProtonTransaction;
    COMPRESSED_NFT_MINT: ProtonParser;
    COMPRESSED_NFT_TRANSFER: ProtonParser;
    EXECUTE_TRANSACTION: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    LOAN_FOX: (transaction: EnrichedTransaction) => ProtonTransaction;
    NFT_BID: ProtonParser;
    NFT_BID_CANCELLED: ProtonParser;
    NFT_CANCEL_LISTING: ProtonParser;
    NFT_LISTING: ProtonParser;
    NFT_MINT: ProtonParser;
    NFT_SALE: ProtonParser;
    SWAP: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    TOKEN_MINT: ProtonParser;
    TRANSFER: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    UNKNOWN: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
};
export type ProtonType = keyof typeof protonParsers;
export type ProtonActionType = keyof typeof ProtonSupportedActionType;
