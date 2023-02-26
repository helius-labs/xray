import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, Source } from "helius-sdk";

import {
    ProtonActionType,
    ProtonTransaction,
    ProtonTransactionAction,
} from "../types";

import { traverseTokenTransfers } from "../utils/token-transfers";

export const parseBurn = (
    transaction: EnrichedTransaction
): ProtonTransaction => {
    const { tokenTransfers, signature, timestamp, type, source } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;

    if (tokenTransfers === null) {
        return {
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

    const address = undefined;
    traverseTokenTransfers(
        tokenTransfers,
        actions,
        address,
        type as ProtonActionType
    );

    return {
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
