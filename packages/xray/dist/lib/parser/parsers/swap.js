import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { traverseTokenTransfers } from "../utils/token-transfers";
export const parseSwap = (transaction, address) => {
    const { type, source, signature, timestamp, tokenTransfers, nativeTransfers, accountData, } = transaction;
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
    const primaryUser = tokenTransfers[0].fromUserAccount || "";
    const actions = [];
    const accounts = [];
    if (source === "HADESWAP") {
        traverseTokenTransfers(tokenTransfers, actions, address);
        traverseNativeTransfers(nativeTransfers, actions, address);
    }
    else {
        traverseTokenTransfers(tokenTransfers, actions, address);
    }
    traverseAccountData(accountData, accounts);
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
