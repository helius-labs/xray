import { getSolanaName } from "@helius-labs/helius-namor";
import type {
    EnrichedTransaction,
    Source
} from "@helius-labs/helius-types";

import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../types";

export const parseBurn = (transaction: EnrichedTransaction): ProtonTransaction => {
    let source = "SYSTEM_PROGRAM" as Source;

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
    source = transaction.source

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount || "";
        let fromName;
        if(tx.fromUserAccount) {
            fromName = getSolanaName(tx.fromUserAccount);
        }
        const to = tx.toUserAccount || "";
        let toName;
        if(tx.toUserAccount) {
            fromName = getSolanaName(tx.toUserAccount);
        }
        const sent = tx.mint;
        const amount = tx.tokenAmount;

        actions.push({
            from,
            fromName,
            to,
            toName,
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
