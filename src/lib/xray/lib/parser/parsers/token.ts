import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { EnrichedTransaction } from "helius-sdk";
import type {
    ProtonAccount,
    ProtonParser,
    ProtonTransactionAction,
} from "../types";
import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { traverseTokenTransfers } from "../utils/token-transfers";

export const parseTokenMint: ProtonParser = (
    transaction: EnrichedTransaction,
    address: string | undefined
) => {
    const {
        signature,
        timestamp,
        accountData,
        tokenTransfers,
        nativeTransfers,
        type,
        source,
    } = transaction;

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

    const primaryUser = nativeTransfers[0]?.fromUserAccount || "";
    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    traverseTokenTransfers(tokenTransfers, actions, address);
    traverseNativeTransfers(nativeTransfers, actions, address);
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
