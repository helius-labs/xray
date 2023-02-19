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
}

export enum ProtonSupportedActionType {
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
}

export type ProtonParser = (
    transaction: EnrichedTransaction,
    address?: string
) => ProtonTransaction;

export type ProtonType = keyof typeof ProtonSupportedType;
export type ProtonActionType = keyof typeof ProtonSupportedActionType;

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
}

export type ProtonParsers = Record<ProtonType, ProtonParser>;

export const unknownProtonTransaction: ProtonTransaction = {
    actions: [],
    fee: 0,
    primaryUser: "",
    signature: "",
    source: Source.SYSTEM_PROGRAM,
    timestamp: 0,
    type: "UNKNOWN",
};

export const parsers: ProtonParsers = {
    BURN: parser.parseBurn,
    BURN_NFT: parser.parseBurn,
    NFT_BID: parser.parseNftBid,
    NFT_BID_CANCELLED: parser.parseNftCancelBid,
    NFT_CANCEL_LISTING: parser.parseNftCancelList,
    NFT_LISTING: parser.parseNftList,
    NFT_MINT: parser.parseNftMint,
    NFT_SALE: parser.parseNftSale,
    SWAP: parser.parseSwap,
    TRANSFER: parser.parseTransfer,
    UNKNOWN: parser.parseUnknown,
};
