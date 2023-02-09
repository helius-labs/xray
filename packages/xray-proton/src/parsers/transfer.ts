import type {
    EnrichedTransaction,
    Source
} from "@helius-labs/helius-types";

import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../types";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const parseTransfer = (transaction: EnrichedTransaction): ProtonTransaction => {
    const {
        timestamp,
        tokenTransfers = [],
        nativeTransfers = [],
    } = transaction;

    const type = "TRANSFER";
    const source = "SYSTEM_PROGRAM" as Source;

    if(tokenTransfers === null || nativeTransfers === null) {
        return {
            type,
            source,
            primaryUser : "",
            timestamp   : 0,
            actions     : [],
        };
    }
    
    const nativeTransfersLength = nativeTransfers.length - tokenTransfers.length;

    const actions: ProtonTransactionAction[] = [];

    const primaryUser = tokenTransfers[0]?.fromUserAccount || "";

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount || "";
        const to = tx.toUserAccount || "";
        const sent = tx.mint;
        const amount = tx.tokenAmount;
    
        actions.push({
            from,
            to,
            sent,
            amount,
        });
    }
    
    for(let i = 0; i < nativeTransfersLength; i++) {
        const [ tx ] = nativeTransfers;

        const from = tx.fromUserAccount || "";
        const to = tx.toUserAccount || "";
        const sent = "So11111111111111111111111111111111111111112";
        const amount = tx.amount / LAMPORTS_PER_SOL;

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
