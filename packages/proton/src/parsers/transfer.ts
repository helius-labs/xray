import type { EnrichedTransaction } from "@helius/types";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ProtonTransaction, ProtonTransactionAction } from "./types";

export const parseTransfer = (transaction: EnrichedTransaction): ProtonTransaction => {
    const { tokenTransfers, nativeTransfers } = transaction;

    if(tokenTransfers) {
        let firstTransaction;
        const actions: ProtonTransactionAction[] = [];

        if(tokenTransfers.length === 0 && nativeTransfers) {
            firstTransaction = nativeTransfers[0];
            const from = firstTransaction.fromUserAccount;
            const to = firstTransaction.toUserAccount;
            const sent = "So11111111111111111111111111111111111111112";
            const amount = firstTransaction.amount / LAMPORTS_PER_SOL;

            actions.push({
                from,
                sent,
                to,
                amount,
            });
        } else {
            firstTransaction = tokenTransfers[0];
            const from = firstTransaction.fromUserAccount;
            const to = firstTransaction.toUserAccount;
            const sent = firstTransaction.mint;
            const amount = firstTransaction.tokenAmount;

            actions.push({
                from,
                sent,
                to,
                amount,
            });
        }
        
        const primaryUser = firstTransaction?.fromUserAccount;
        const { type, source, timestamp } = transaction;

        return {
            type,
            primaryUser,
            timestamp,
            source,
            actions,
        };
    }
    
    return transaction;
};
