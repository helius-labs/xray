import type { EnrichedTransaction } from "@helius/types";

import { ProtonTransaction, ProtonTransactionAction } from "./types";

export const parseBurn = (transaction: EnrichedTransaction): ProtonTransaction => {
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
<<<<<<< HEAD
<<<<<<< HEAD
            to,
            sent,
=======
            sent,
            to,
>>>>>>> 8d7c997 (feat: ProtonTransaction support for burn tx types)
=======
            to,
            sent,
>>>>>>> 90496cb (chore: fixed order of ProtonTransactionAction keys)
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
