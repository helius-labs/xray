import { EnrichedTransaction, Source, TransactionType } from "helius-sdk";

import * as parser from "../parsers";

export const SOL = "So11111111111111111111111111111111111111112";

export enum ProtonSupportedType {
    BURN,
    BURN_NFT,
    NFT_BID,
    NFT_BID_CANCELLED,
    NFT_CANCEL_LISTING,
    NFT_LISTING,
    NFT_SALE,
    NFT_MINT,
    SWAP,
    TRANSFER,
    UNKNOWN,
    BORROW_FOX,
    LOAN_FOX,
    TOKEN_MINT,
}

export enum ProtonSupportedActionType {
    "SENT",
    "RECEIVED",
    "TRANSFER",
    "TRANSFER_SENT",
    "TRANSFER_RECEIVED",
    "SWAP",
    "SWAP_SENT",
    "SWAP_RECEIVED",
    "UNKNOWN",
    "NFT_SALE",
    "NFT_BUY",
    "NFT_SELL",
    "NFT_LISTING",
    "NFT_CANCEL_LISTING",
    "NFT_BID",
    "NFT_BID_CANCELLED",
    "NFT_MINT",
    "NFT_MINT_AIRDROP",
    "BURN",
    "FREEZE",
    "TOKEN_MINT",
    "BORROW_FOX",
    "LOAN_FOX",
}

export type ProtonParser = (
    transaction: EnrichedTransaction,
    address?: string
) => ProtonTransaction;

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
    type: ProtonType | TransactionType;
    primaryUser: string;
    fee: number;
    signature: string;
    timestamp: number;
    source: Source;
    actions: ProtonTransactionAction[];
    raw?: EnrichedTransaction;
}

export type ProtonParsers = Record<string, ProtonParser>;

export const unknownProtonTransaction: ProtonTransaction = {
    actions: [],
    fee: 0,
    primaryUser: "",
    signature: "",
    source: Source.SYSTEM_PROGRAM,
    timestamp: 0,
    type: "UNKNOWN",
};

export const protonParsers = {
    BORROW_FOX: parser.parseBorrowFox,
    BURN: parser.parseBurn,
    BORROW_FOX: parser.parseBorrowFox,
    BURN_NFT: parser.parseBurn,
    LOAN_FOX: parser.parseLoanFox,
    LOAN_FOX: parser.parseLoanFox,
    NFT_BID: parser.parseNftBid,
    NFT_BID_CANCELLED: parser.parseNftCancelBid,
    NFT_CANCEL_LISTING: parser.parseNftCancelList,
    NFT_LISTING: parser.parseNftList,
    NFT_MINT: parser.parseNftMint,
    NFT_SALE: parser.parseNftSale,
    SWAP: parser.parseSwap,
    TOKEN_MINT: parser.parseTokenMint,
    TRANSFER: parser.parseTransfer,
    UNKNOWN: parser.parseUnknown,
};

export type ProtonType = keyof typeof protonParsers;
export type ProtonActionType = keyof typeof ProtonSupportedActionType;
