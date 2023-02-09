import type {
    EnrichedTransaction,
    Source
} from "@helius-labs/helius-types";

import {
    ProtonTransaction,
    ProtonTransactionAction,
} from "../types";

export const parseBurn = (transaction: EnrichedTransaction): ProtonTransaction => {
    const source = "SYSTEM_PROGRAM" as Source;

    if(transaction?.tokenTransfers === null) {
        return {
            type        : "BURN",
            source,
            primaryUser : "",
            timestamp   : 0,
            actions     : [],
        };
    }

    const { tokenTransfers } = transaction;
    const actions: ProtonTransactionAction[] = [];

    const primaryUser = tokenTransfers[0].fromUserAccount || "";

    const {
        timestamp,
    } = transaction;

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount || "";
        const sent = tx.mint;
        const to = tx.toUserAccount || "";
        const amount = tx.tokenAmount;

        actions.push({
            from,
            to,
            sent,
            amount,
        });
    }

    return {
        type       : "BURN",
        primaryUser,
        timestamp,
        source,
        actions,
    };
};
