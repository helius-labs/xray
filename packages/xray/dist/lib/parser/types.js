import { Source } from "helius-sdk";
import * as parser from "./parsers";
export const SOL = "So11111111111111111111111111111111111111112";
export var ProtonSupportedType;
(function (ProtonSupportedType) {
    ProtonSupportedType[ProtonSupportedType["BURN"] = 0] = "BURN";
    ProtonSupportedType[ProtonSupportedType["BURN_NFT"] = 1] = "BURN_NFT";
    ProtonSupportedType[ProtonSupportedType["NFT_BID"] = 2] = "NFT_BID";
    ProtonSupportedType[ProtonSupportedType["NFT_BID_CANCELLED"] = 3] = "NFT_BID_CANCELLED";
    ProtonSupportedType[ProtonSupportedType["NFT_CANCEL_LISTING"] = 4] = "NFT_CANCEL_LISTING";
    ProtonSupportedType[ProtonSupportedType["NFT_LISTING"] = 5] = "NFT_LISTING";
    ProtonSupportedType[ProtonSupportedType["NFT_SALE"] = 6] = "NFT_SALE";
    ProtonSupportedType[ProtonSupportedType["NFT_MINT"] = 7] = "NFT_MINT";
    ProtonSupportedType[ProtonSupportedType["SWAP"] = 8] = "SWAP";
    ProtonSupportedType[ProtonSupportedType["TRANSFER"] = 9] = "TRANSFER";
    ProtonSupportedType[ProtonSupportedType["UNKNOWN"] = 10] = "UNKNOWN";
    ProtonSupportedType[ProtonSupportedType["BORROW_FOX"] = 11] = "BORROW_FOX";
    ProtonSupportedType[ProtonSupportedType["LOAN_FOX"] = 12] = "LOAN_FOX";
    ProtonSupportedType[ProtonSupportedType["TOKEN_MINT"] = 13] = "TOKEN_MINT";
    ProtonSupportedType[ProtonSupportedType["EXECUTE_TRANSACTION"] = 14] = "EXECUTE_TRANSACTION";
    ProtonSupportedType[ProtonSupportedType["COMPRESSED_NFT_MINT"] = 15] = "COMPRESSED_NFT_MINT";
    ProtonSupportedType[ProtonSupportedType["COMPRESSED_NFT_TRANSFER"] = 16] = "COMPRESSED_NFT_TRANSFER";
    ProtonSupportedType[ProtonSupportedType["APPROVE_TRANSACTION"] = 17] = "APPROVE_TRANSACTION";
    ProtonSupportedType[ProtonSupportedType["STAKE_SOL"] = 18] = "STAKE_SOL";
    ProtonSupportedType[ProtonSupportedType["SFT_MINT"] = 19] = "SFT_MINT";
    ProtonSupportedType[ProtonSupportedType["OFFER_LOAN"] = 20] = "OFFER_LOAN";
    ProtonSupportedType[ProtonSupportedType["RESCIND_LOAN"] = 21] = "RESCIND_LOAN";
    ProtonSupportedType[ProtonSupportedType["TAKE_LOAN"] = 22] = "TAKE_LOAN";
    ProtonSupportedType[ProtonSupportedType["REPAY_LOAN"] = 23] = "REPAY_LOAN";
    ProtonSupportedType[ProtonSupportedType["ADD_ITEM"] = 24] = "ADD_ITEM";
    ProtonSupportedType[ProtonSupportedType["UPDATE_ITEM"] = 25] = "UPDATE_ITEM";
    ProtonSupportedType[ProtonSupportedType["CANCEL_OFFER"] = 26] = "CANCEL_OFFER";
    ProtonSupportedType[ProtonSupportedType["LEND_FOR_NFT"] = 27] = "LEND_FOR_NFT";
    ProtonSupportedType[ProtonSupportedType["REQUEST_LOAN"] = 28] = "REQUEST_LOAN";
    ProtonSupportedType[ProtonSupportedType["CANCEL_LOAN_REQUEST"] = 29] = "CANCEL_LOAN_REQUEST";
    ProtonSupportedType[ProtonSupportedType["BORROW_SOL_FOR_NFT"] = 30] = "BORROW_SOL_FOR_NFT";
    ProtonSupportedType[ProtonSupportedType["REBORROW_SOL_FOR_NFT"] = 31] = "REBORROW_SOL_FOR_NFT";
    ProtonSupportedType[ProtonSupportedType["CLAIM_NFT"] = 32] = "CLAIM_NFT";
    ProtonSupportedType[ProtonSupportedType["UPDATE_OFFER"] = 33] = "UPDATE_OFFER";
    ProtonSupportedType[ProtonSupportedType["FORECLOSE_LOAN"] = 34] = "FORECLOSE_LOAN";
    ProtonSupportedType[ProtonSupportedType["STAKE_TOKEN"] = 35] = "STAKE_TOKEN";
    ProtonSupportedType[ProtonSupportedType["UNSTAKE_TOKEN"] = 36] = "UNSTAKE_TOKEN";
    ProtonSupportedType[ProtonSupportedType["BUY_ITEM"] = 37] = "BUY_ITEM";
    ProtonSupportedType[ProtonSupportedType["CLOSE_ITEM"] = 38] = "CLOSE_ITEM";
    ProtonSupportedType[ProtonSupportedType["CLOSE_ORDER"] = 39] = "CLOSE_ORDER";
    ProtonSupportedType[ProtonSupportedType["DELIST_ITEM"] = 40] = "DELIST_ITEM";
    ProtonSupportedType[ProtonSupportedType["LIST_ITEM"] = 41] = "LIST_ITEM";
    ProtonSupportedType[ProtonSupportedType["CANCEL_ORDER"] = 42] = "CANCEL_ORDER";
    ProtonSupportedType[ProtonSupportedType["CREATE_ORDER"] = 43] = "CREATE_ORDER";
    ProtonSupportedType[ProtonSupportedType["UPDATE_ORDER"] = 44] = "UPDATE_ORDER";
    ProtonSupportedType[ProtonSupportedType["FILL_ORDER"] = 45] = "FILL_ORDER";
    ProtonSupportedType[ProtonSupportedType["UPGRADE_FOX_REQUEST"] = 46] = "UPGRADE_FOX_REQUEST";
    ProtonSupportedType[ProtonSupportedType["MIGRATE_TO_PNFT"] = 47] = "MIGRATE_TO_PNFT";
    ProtonSupportedType[ProtonSupportedType["COMPRESSED_NFT_BURN"] = 48] = "COMPRESSED_NFT_BURN";
})(ProtonSupportedType || (ProtonSupportedType = {}));
export var ProtonSupportedActionType;
(function (ProtonSupportedActionType) {
    ProtonSupportedActionType[ProtonSupportedActionType["SENT"] = 0] = "SENT";
    ProtonSupportedActionType[ProtonSupportedActionType["RECEIVED"] = 1] = "RECEIVED";
    ProtonSupportedActionType[ProtonSupportedActionType["TRANSFER"] = 2] = "TRANSFER";
    ProtonSupportedActionType[ProtonSupportedActionType["TRANSFER_SENT"] = 3] = "TRANSFER_SENT";
    ProtonSupportedActionType[ProtonSupportedActionType["TRANSFER_RECEIVED"] = 4] = "TRANSFER_RECEIVED";
    ProtonSupportedActionType[ProtonSupportedActionType["SWAP"] = 5] = "SWAP";
    ProtonSupportedActionType[ProtonSupportedActionType["SWAP_SENT"] = 6] = "SWAP_SENT";
    ProtonSupportedActionType[ProtonSupportedActionType["SWAP_RECEIVED"] = 7] = "SWAP_RECEIVED";
    ProtonSupportedActionType[ProtonSupportedActionType["UNKNOWN"] = 8] = "UNKNOWN";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_SALE"] = 9] = "NFT_SALE";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_BUY"] = 10] = "NFT_BUY";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_SELL"] = 11] = "NFT_SELL";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_LISTING"] = 12] = "NFT_LISTING";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_CANCEL_LISTING"] = 13] = "NFT_CANCEL_LISTING";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_BID"] = 14] = "NFT_BID";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_BID_CANCELLED"] = 15] = "NFT_BID_CANCELLED";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_GLOBAL_BID"] = 16] = "NFT_GLOBAL_BID";
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_MINT"] = 17] = "NFT_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["AIRDROP"] = 18] = "AIRDROP";
    ProtonSupportedActionType[ProtonSupportedActionType["BURN"] = 19] = "BURN";
    ProtonSupportedActionType[ProtonSupportedActionType["BURN_NFT"] = 20] = "BURN_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["FREEZE"] = 21] = "FREEZE";
    ProtonSupportedActionType[ProtonSupportedActionType["TOKEN_MINT"] = 22] = "TOKEN_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["BORROW_FOX"] = 23] = "BORROW_FOX";
    ProtonSupportedActionType[ProtonSupportedActionType["LOAN_FOX"] = 24] = "LOAN_FOX";
    ProtonSupportedActionType[ProtonSupportedActionType["EXECUTE_TRANSACTION"] = 25] = "EXECUTE_TRANSACTION";
    ProtonSupportedActionType[ProtonSupportedActionType["XNFT_INSTALL"] = 26] = "XNFT_INSTALL";
    ProtonSupportedActionType[ProtonSupportedActionType["XNFT_UNINSTALL"] = 27] = "XNFT_UNINSTALL";
    ProtonSupportedActionType[ProtonSupportedActionType["COMPRESSED_NFT_MINT"] = 28] = "COMPRESSED_NFT_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["COMPRESSED_NFT_TRANSFER"] = 29] = "COMPRESSED_NFT_TRANSFER";
    ProtonSupportedActionType[ProtonSupportedActionType["APPROVE_TRANSACTION"] = 30] = "APPROVE_TRANSACTION";
    ProtonSupportedActionType[ProtonSupportedActionType["STAKE_SOL"] = 31] = "STAKE_SOL";
    ProtonSupportedActionType[ProtonSupportedActionType["SFT_MINT"] = 32] = "SFT_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["OFFER_LOAN"] = 33] = "OFFER_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["RESCIND_LOAN"] = 34] = "RESCIND_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["TAKE_LOAN"] = 35] = "TAKE_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["REPAY_LOAN"] = 36] = "REPAY_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["ADD_ITEM"] = 37] = "ADD_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["UPDATE_ITEM"] = 38] = "UPDATE_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["CANCEL_OFFER"] = 39] = "CANCEL_OFFER";
    ProtonSupportedActionType[ProtonSupportedActionType["LEND_FOR_NFT"] = 40] = "LEND_FOR_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["REQUEST_LOAN"] = 41] = "REQUEST_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["CANCEL_LOAN_REQUEST"] = 42] = "CANCEL_LOAN_REQUEST";
    ProtonSupportedActionType[ProtonSupportedActionType["BORROW_SOL_FOR_NFT"] = 43] = "BORROW_SOL_FOR_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["REBORROW_SOL_FOR_NFT"] = 44] = "REBORROW_SOL_FOR_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["CLAIM_NFT"] = 45] = "CLAIM_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["UPDATE_OFFER"] = 46] = "UPDATE_OFFER";
    ProtonSupportedActionType[ProtonSupportedActionType["FORECLOSE_LOAN"] = 47] = "FORECLOSE_LOAN";
    ProtonSupportedActionType[ProtonSupportedActionType["STAKE_TOKEN"] = 48] = "STAKE_TOKEN";
    ProtonSupportedActionType[ProtonSupportedActionType["UNSTAKE_TOKEN"] = 49] = "UNSTAKE_TOKEN";
    ProtonSupportedActionType[ProtonSupportedActionType["BUY_ITEM"] = 50] = "BUY_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["CLOSE_ITEM"] = 51] = "CLOSE_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["CLOSE_ORDER"] = 52] = "CLOSE_ORDER";
    ProtonSupportedActionType[ProtonSupportedActionType["DELIST_ITEM"] = 53] = "DELIST_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["LIST_ITEM"] = 54] = "LIST_ITEM";
    ProtonSupportedActionType[ProtonSupportedActionType["CANCEL_ORDER"] = 55] = "CANCEL_ORDER";
    ProtonSupportedActionType[ProtonSupportedActionType["CREATE_ORDER"] = 56] = "CREATE_ORDER";
    ProtonSupportedActionType[ProtonSupportedActionType["UPDATE_ORDER"] = 57] = "UPDATE_ORDER";
    ProtonSupportedActionType[ProtonSupportedActionType["FILL_ORDER"] = 58] = "FILL_ORDER";
    ProtonSupportedActionType[ProtonSupportedActionType["UPGRADE_FOX_REQUEST"] = 59] = "UPGRADE_FOX_REQUEST";
    ProtonSupportedActionType[ProtonSupportedActionType["MIGRATE_TO_PNFT"] = 60] = "MIGRATE_TO_PNFT";
    ProtonSupportedActionType[ProtonSupportedActionType["COMPRESSED_NFT_BURN"] = 61] = "COMPRESSED_NFT_BURN";
})(ProtonSupportedActionType || (ProtonSupportedActionType = {}));
export const ProtonCustomActionLabelTypes = {
    AIRDROP: "Airdropped",
    BURN: "Burned",
    BURN_NFT: "Burned NFT",
    COMPRESSED_NFT_BURN: "Burned NFT",
    FREEZE: "Frozen",
    XNFT_INSTALL: "xNFT Install",
    XNFT_UNINSTALL: "xNFT Uninstall",
};
export const unknownProtonTransaction = {
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
