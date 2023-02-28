import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, Source } from "helius-sdk";

import {
    ProtonAccount,
    ProtonActionType,
    ProtonTransaction,
    ProtonTransactionAction,
} from "../types";
import { traverseAccountData } from "../utils/account-data";

import { traverseTokenTransfers } from "../utils/token-transfers";

export const parseBurn = (
    transaction: EnrichedTransaction
): ProtonTransaction => {
    const {
        tokenTransfers = [],
        accountData = [],
        signature,
        timestamp,
        type,
        source,
    } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;

    if (tokenTransfers === null) {
        return {
            accounts: [],
            actions: [],
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type: "BURN",
        };
    }

    const primaryUser = tokenTransfers[0].fromUserAccount || "";
    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    const address = undefined;
    traverseTokenTransfers(
        tokenTransfers,
        actions,
        address,
        type as ProtonActionType
    );
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
