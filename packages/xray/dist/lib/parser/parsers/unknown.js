import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { traverseTokenTransfers } from "../utils/token-transfers";
export const parseUnknown = (transaction, address) => {
    const { signature, timestamp, type, source, accountData, tokenTransfers, nativeTransfers, instructions, } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    if (tokenTransfers === null || nativeTransfers === null) {
        return {
            accounts: [],
            actions: [],
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type,
        };
    }
    const primaryUser = tokenTransfers[0]?.fromUserAccount ||
        nativeTransfers[0]?.fromUserAccount ||
        "";
    const actions = [];
    const accounts = [];
    traverseAccountData(accountData, accounts);
    if (instructions &&
        instructions[0].programId ===
            "xnft5aaToUM4UFETUQfj7NUDUBdvYHTVhNFThEYTm55") {
        let type = "XNFT_INSTALL";
        if (instructions[0].accounts.length === 6) {
            type = "XNFT_INSTALL";
        }
        else if (instructions[0].accounts.length === 3) {
            type = "XNFT_UNINSTALL";
        }
        return {
            accounts,
            actions,
            fee,
            primaryUser,
            signature,
            source,
            timestamp,
            type,
        };
    }
    traverseTokenTransfers(tokenTransfers, actions, address);
    traverseNativeTransfers(nativeTransfers, actions, address);
    return {
        accounts,
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
