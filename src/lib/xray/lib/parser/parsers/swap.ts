import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, TokenTransfer } from "helius-sdk";

import type {
    ProtonAccount,
    ProtonTransaction,
    ProtonTransactionAction,
} from "../types";
import { SOL } from "../types";

import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { rentTransferCheck } from "../utils/rent-transfer-check";
import { traverseTokenTransfers } from "../utils/token-transfers";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseSwap = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    const {
        type,
        source,
        signature,
        timestamp,
        tokenTransfers,
        nativeTransfers,
        accountData,
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

    const primaryUser = tokenTransfers[0].fromUserAccount || "";
    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    if (source === "HADESWAP") {
        traverseTokenTransfers(tokenTransfers, actions, address);
        traverseNativeTransfers(nativeTransfers, actions, address);
    } else {
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
