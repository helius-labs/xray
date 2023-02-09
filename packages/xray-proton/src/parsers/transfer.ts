import {
    type EnrichedTransaction,
    Source,
    NativeTransfer
} from "@helius/types";

import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../types";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const parseTransfer = (transaction: EnrichedTransaction): ProtonTransaction => {
    const {
        type,
        source,
        timestamp,
        tokenTransfers = [],
        nativeTransfers = [],
    } = transaction;

    if(tokenTransfers === null || nativeTransfers === null) {
        return {
            type        : "TRANSFER",
            primaryUser : "",
            timestamp   : 0,
            source      : Source.SYSTEM_PROGRAM,
            actions     : [],
        };
    }
    
    const nativeTransfersLength = nativeTransfers.length - tokenTransfers.length;

    const actions: ProtonTransactionAction[] = [];

    const primaryUser = tokenTransfers[0].fromUserAccount || "";

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
        type : "TRANSFER",
        primaryUser,
        timestamp,
        source,
        actions,
    };
};
