import type { Transaction, TransactionAction } from "$lib/next/types";

// Transation types that have parsers
import { COMPRESSED_NFT_MINT } from "$lib/next/transaction-parser/parsers/COMPRESSED_NFT_MINT";
import { COMPRESSED_NFT_TRANSFER } from "$lib/next/transaction-parser/parsers/COMPRESSED_NFT_TRANSFER";

export const TRANSACTION_TYPES: Record<
    string,
    {
        parser?: (
            transaction: Transaction,
            userAddress?: string
        ) => TransactionAction[];
    }
> = {
    AIRDROP: {},
    APPROVE_TRANSACTION: {},
    BORROW_FOX: {},
    BORROW_SOL_FOR_NFT: {},
    BURN: {},
    BURN_NFT: {},
    BUY_ITEM: {},
    CANCEL_LOAN_REQUEST: {},
    CANCEL_OFFER: {},
    CANCEL_ORDER: {},
    CLAIM_NFT: {},
    CLOSE_ITEM: {},
    CLOSE_ORDER: {},
    COMPRESSED_NFT_BURN: {},
    COMPRESSED_NFT_MINT: {
        parser: COMPRESSED_NFT_MINT,
    },
    COMPRESSED_NFT_TRANSFER: {
        parser: COMPRESSED_NFT_TRANSFER,
    },
    CREATE_ORDER: {},
    DELIST_ITEM: {},
    EXECUTE_TRANSACTION: {},
    FILL_ORDER: {},
    FORECLOSE_LOAN: {},
    FREEZE: {},
    LEND_FOR_NFT: {},
    LIST_ITEM: {},
    LOAN_FOX: {},
    MIGRATE_TO_PNFT: {},
    NFT_BID: {},
    NFT_BID_CANCELLED: {},
    NFT_BUY: {},
    NFT_CANCEL_LISTING: {},
    NFT_GLOBAL_BID: {},
    NFT_LISTING: {},
    NFT_MINT: {},
    NFT_SALE: {},
    NFT_SELL: {},
    OFFER_LOAN: {},
    REBORROW_SOL_FOR_NFT: {},
    REPAY_LOAN: {},
    REQUEST_LOAN: {},
    RESCIND_LOAN: {},
    SFT_MINT: {},
    STAKE_SOL: {},
    STAKE_TOKEN: {},
    SWAP: {},
    TAKE_LOAN: {},
    TOKEN_MINT: {},
    TRANSFER: {},
    UNKNOWN: {},
    UNSTAKE_TOKEN: {},
    UPDATE_ITEM: {},
    UPDATE_OFFER: {},
    UPDATE_ORDER: {},
    UPGRADE_FOX_REQUEST: {},
    XNFT_INSTALL: {},
    XNFT_UNINSTALL: {},
};

export const TRANSACTION_ACTION_TYPES = {
    RECEIVED: {},
    SENT: {},
    SWAP_RECEIVED: {},
    SWAP_SENT: {},
    UNKNOWN: {},
};
