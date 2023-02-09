import {
    type EnrichedTransaction,
    Source
} from "@helius/types";

import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../types";

export const parseBurn = (transaction: EnrichedTransaction): ProtonTransaction => {
    if(transaction?.tokenTransfers === null) {
        return {
            type        : "BURN",
            primaryUser : "",
            timestamp   : 0,
            source      : Source.SYSTEM_PROGRAM,
            actions     : [],
        };
    }

    const { tokenTransfers } = transaction;
    const actions: ProtonTransactionAction[] = [];
    const primaryUser = tokenTransfers[0].fromUserAccount;
    const { type, source, timestamp } = transaction;

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount;
        const sent = tx.mint;
        const to = tx.toUserAccount;
        const amount = tx.tokenAmount;

        actions.push({
            from,
            to,
            sent,
            amount,
        });
    }

    return {
        type,
        primaryUser,
        timestamp,
        source,
        actions,
    };
};
