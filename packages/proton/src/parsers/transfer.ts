import type { EnrichedTransaction } from "@helius/types";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { ProtonTransaction, ProtonTransactionAction } from "./types";

export const parseTransfer = (transaction: EnrichedTransaction): ProtonTransaction => {
    const { tokenTransfers, nativeTransfers } = transaction;
    const nativeTransfersLength = nativeTransfers.length - tokenTransfers.length;
    const actions: ProtonTransactionAction[] = [];
    const primaryUser = tokenTransfers.length ? tokenTransfers[0].fromUserAccount : nativeTransfers[0].fromUserAccount;
    const { type, source, timestamp } = transaction;

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount;
        const to = tx.toUserAccount;
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
        const from = tx.fromUserAccount;
        const to = tx.toUserAccount;
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
