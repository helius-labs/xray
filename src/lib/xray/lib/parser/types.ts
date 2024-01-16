import type { EnrichedTransaction } from "helius-sdk";
import { Source, TransactionType } from "helius-sdk";
import * as parser from "./parsers";

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
    EXECUTE_TRANSACTION,
    COMPRESSED_NFT_MINT,
    COMPRESSED_NFT_TRANSFER,
    COMPRESSED_NFT_UPDATE_METADATA,
    APPROVE_TRANSACTION,
    STAKE_SOL,
    SFT_MINT,
    OFFER_LOAN,
    RESCIND_LOAN,
    TAKE_LOAN,
    REPAY_LOAN,
    ADD_ITEM,
    UPDATE_ITEM,
    CANCEL_OFFER,
    LEND_FOR_NFT,
    REQUEST_LOAN,
    CANCEL_LOAN_REQUEST,
    BORROW_SOL_FOR_NFT,
    REBORROW_SOL_FOR_NFT,
    CLAIM_NFT,
    UPDATE_OFFER,
    FORECLOSE_LOAN,
    STAKE_TOKEN,
    UNSTAKE_TOKEN,
    BUY_ITEM,
    CLOSE_ITEM,
    CLOSE_ORDER,
    DELIST_ITEM,
    LIST_ITEM,
    CANCEL_ORDER,
    CREATE_ORDER,
    UPDATE_ORDER,
    FILL_ORDER,
    UPGRADE_FOX_REQUEST,
    MIGRATE_TO_PNFT,
    COMPRESSED_NFT_BURN,
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
    "NFT_GLOBAL_BID",
    "NFT_MINT",
    "AIRDROP",
    "BURN",
    "BURN_NFT",
    "FREEZE",
    "TOKEN_MINT",
    "BORROW_FOX",
    "LOAN_FOX",
    "EXECUTE_TRANSACTION",
    "XNFT_INSTALL",
    "XNFT_UNINSTALL",
    "COMPRESSED_NFT_MINT",
    "COMPRESSED_NFT_TRANSFER",
    "COMPRESSED_NFT_UPDATE_METADATA",
    "APPROVE_TRANSACTION",
    "STAKE_SOL",
    "SFT_MINT",
    "OFFER_LOAN",
    "RESCIND_LOAN",
    "TAKE_LOAN",
    "REPAY_LOAN",
    "ADD_ITEM",
    "UPDATE_ITEM",
    "CANCEL_OFFER",
    "LEND_FOR_NFT",
    "REQUEST_LOAN",
    "CANCEL_LOAN_REQUEST",
    "BORROW_SOL_FOR_NFT",
    "REBORROW_SOL_FOR_NFT",
    "CLAIM_NFT",
    "UPDATE_OFFER",
    "FORECLOSE_LOAN",
    "STAKE_TOKEN",
    "UNSTAKE_TOKEN",
    "BUY_ITEM",
    "CLOSE_ITEM",
    "CLOSE_ORDER",
    "DELIST_ITEM",
    "LIST_ITEM",
    "CANCEL_ORDER",
    "CREATE_ORDER",
    "UPDATE_ORDER",
    "FILL_ORDER",
    "UPGRADE_FOX_REQUEST",
    "MIGRATE_TO_PNFT",
    "COMPRESSED_NFT_BURN",
}

export const ProtonCustomActionLabelTypes = {
    AIRDROP: "Airdropped",
    BURN: "Burned",
    BURN_NFT: "Burned NFT",
    COMPRESSED_NFT_BURN: "Burned NFT",
    FREEZE: "Frozen",
    XNFT_INSTALL: "xNFT Install",
    XNFT_UNINSTALL: "xNFT Uninstall",
};

export type ProtonParser = (
    transaction: EnrichedTransaction,
    address?: string
) => ProtonTransaction;

export interface ProtonTransactionAction {
    actionType: ProtonActionType;
    from: string | null;
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
    metadata?: { [key: string]: any };
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

export const unknownProtonTransaction: ProtonTransaction = {
    accounts: [],
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
    BURN_NFT: parser.parseBurn,
    COMPRESSED_NFT_BURN: parser.parseCompressedNftBurn,
    COMPRESSED_NFT_MINT: parser.parseCompressedNftMint,
    COMPRESSED_NFT_TRANSFER: parser.parseCompressedNftTransfer,
    EXECUTE_TRANSACTION: parser.parseTransfer,
    LOAN_FOX: parser.parseLoanFox,
    NFT_BID: parser.parseNftBid,
    NFT_BID_CANCELLED: parser.parseNftCancelBid,
    NFT_CANCEL_LISTING: parser.parseNftCancelList,
    NFT_GLOBAL_BID: parser.parseNftGlobalBid,
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
