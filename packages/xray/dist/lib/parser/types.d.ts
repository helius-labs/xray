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
    COMPRESSED_NFT_TRANSFER = 16,
    APPROVE_TRANSACTION = 17,
    STAKE_SOL = 18,
    SFT_MINT = 19,
    OFFER_LOAN = 20,
    RESCIND_LOAN = 21,
    TAKE_LOAN = 22,
    REPAY_LOAN = 23,
    ADD_ITEM = 24,
    UPDATE_ITEM = 25,
    CANCEL_OFFER = 26,
    LEND_FOR_NFT = 27,
    REQUEST_LOAN = 28,
    CANCEL_LOAN_REQUEST = 29,
    BORROW_SOL_FOR_NFT = 30,
    REBORROW_SOL_FOR_NFT = 31,
    CLAIM_NFT = 32,
    UPDATE_OFFER = 33,
    FORECLOSE_LOAN = 34,
    STAKE_TOKEN = 35,
    UNSTAKE_TOKEN = 36,
    BUY_ITEM = 37,
    CLOSE_ITEM = 38,
    CLOSE_ORDER = 39,
    DELIST_ITEM = 40,
    LIST_ITEM = 41,
    CANCEL_ORDER = 42,
    CREATE_ORDER = 43,
    UPDATE_ORDER = 44,
    FILL_ORDER = 45,
    UPGRADE_FOX_REQUEST = 46,
    MIGRATE_TO_PNFT = 47,
    COMPRESSED_NFT_BURN = 48
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
    "NFT_GLOBAL_BID" = 16,
    "NFT_MINT" = 17,
    "AIRDROP" = 18,
    "BURN" = 19,
    "BURN_NFT" = 20,
    "FREEZE" = 21,
    "TOKEN_MINT" = 22,
    "BORROW_FOX" = 23,
    "LOAN_FOX" = 24,
    "EXECUTE_TRANSACTION" = 25,
    "XNFT_INSTALL" = 26,
    "XNFT_UNINSTALL" = 27,
    "COMPRESSED_NFT_MINT" = 28,
    "COMPRESSED_NFT_TRANSFER" = 29,
    "APPROVE_TRANSACTION" = 30,
    "STAKE_SOL" = 31,
    "SFT_MINT" = 32,
    "OFFER_LOAN" = 33,
    "RESCIND_LOAN" = 34,
    "TAKE_LOAN" = 35,
    "REPAY_LOAN" = 36,
    "ADD_ITEM" = 37,
    "UPDATE_ITEM" = 38,
    "CANCEL_OFFER" = 39,
    "LEND_FOR_NFT" = 40,
    "REQUEST_LOAN" = 41,
    "CANCEL_LOAN_REQUEST" = 42,
    "BORROW_SOL_FOR_NFT" = 43,
    "REBORROW_SOL_FOR_NFT" = 44,
    "CLAIM_NFT" = 45,
    "UPDATE_OFFER" = 46,
    "FORECLOSE_LOAN" = 47,
    "STAKE_TOKEN" = 48,
    "UNSTAKE_TOKEN" = 49,
    "BUY_ITEM" = 50,
    "CLOSE_ITEM" = 51,
    "CLOSE_ORDER" = 52,
    "DELIST_ITEM" = 53,
    "LIST_ITEM" = 54,
    "CANCEL_ORDER" = 55,
    "CREATE_ORDER" = 56,
    "UPDATE_ORDER" = 57,
    "FILL_ORDER" = 58,
    "UPGRADE_FOX_REQUEST" = 59,
    "MIGRATE_TO_PNFT" = 60,
    "COMPRESSED_NFT_BURN" = 61
}
export declare const ProtonCustomActionLabelTypes: {
    AIRDROP: string;
    BURN: string;
    BURN_NFT: string;
    COMPRESSED_NFT_BURN: string;
    FREEZE: string;
    XNFT_INSTALL: string;
    XNFT_UNINSTALL: string;
};
export type ProtonParser = (transaction: EnrichedTransaction, address?: string) => ProtonTransaction;
export interface ProtonTransactionAction {
    actionType: ProtonActionType;
    from: string;
    to: string;
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
    BURN: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    BURN_NFT: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    COMPRESSED_NFT_BURN: ProtonParser;
    COMPRESSED_NFT_MINT: ProtonParser;
    COMPRESSED_NFT_TRANSFER: ProtonParser;
    EXECUTE_TRANSACTION: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
    LOAN_FOX: (transaction: EnrichedTransaction) => ProtonTransaction;
    NFT_BID: ProtonParser;
    NFT_BID_CANCELLED: ProtonParser;
    NFT_CANCEL_LISTING: ProtonParser;
    NFT_GLOBAL_BID: ProtonParser;
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
