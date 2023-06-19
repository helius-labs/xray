import { Source } from "helius-sdk";
import * as parser from "../parsers";
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
    ProtonSupportedActionType[ProtonSupportedActionType["NFT_MINT"] = 16] = "NFT_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["AIRDROP"] = 17] = "AIRDROP";
    ProtonSupportedActionType[ProtonSupportedActionType["BURN"] = 18] = "BURN";
    ProtonSupportedActionType[ProtonSupportedActionType["BURN_NFT"] = 19] = "BURN_NFT";
    ProtonSupportedActionType[ProtonSupportedActionType["FREEZE"] = 20] = "FREEZE";
    ProtonSupportedActionType[ProtonSupportedActionType["TOKEN_MINT"] = 21] = "TOKEN_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["BORROW_FOX"] = 22] = "BORROW_FOX";
    ProtonSupportedActionType[ProtonSupportedActionType["LOAN_FOX"] = 23] = "LOAN_FOX";
    ProtonSupportedActionType[ProtonSupportedActionType["EXECUTE_TRANSACTION"] = 24] = "EXECUTE_TRANSACTION";
    ProtonSupportedActionType[ProtonSupportedActionType["XNFT_INSTALL"] = 25] = "XNFT_INSTALL";
    ProtonSupportedActionType[ProtonSupportedActionType["XNFT_UNINSTALL"] = 26] = "XNFT_UNINSTALL";
    ProtonSupportedActionType[ProtonSupportedActionType["COMPRESSED_NFT_MINT"] = 27] = "COMPRESSED_NFT_MINT";
    ProtonSupportedActionType[ProtonSupportedActionType["COMPRESSED_NFT_TRANSFER"] = 28] = "COMPRESSED_NFT_TRANSFER";
})(ProtonSupportedActionType || (ProtonSupportedActionType = {}));
export const ProtonCustomActionLabelTypes = {
    AIRDROP: "Airdropped",
    BURN: "Burned",
    BURN_NFT: "Burned NFT",
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
    COMPRESSED_NFT_MINT: parser.parseCompressedNftMint,
    COMPRESSED_NFT_TRANSFER: parser.parseCompressedNftTransfer,
    EXECUTE_TRANSACTION: parser.parseTransfer,
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
