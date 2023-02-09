import { EnrichedTransaction } from "@helius/types";

import { ProtonTransaction, ProtonTransactionAction } from "./types";

export const parseSwap = (transaction: EnrichedTransaction): ProtonTransaction => {
    const { tokenTransfers } = transaction;
    const actions: ProtonTransactionAction[] = [];
    const primaryUser = tokenTransfers[0].fromUserAccount;
    const { type, source, timestamp } = transaction;

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
<<<<<<< HEAD
<<<<<<< HEAD
        let sent;
        let received;
=======
        let sent; let received;
>>>>>>> 9c4a140 (feat: ProtonTransaction support for swap tx type)
=======
        let sent;
        let received;
>>>>>>> 8d7c997 (feat: ProtonTransaction support for burn tx types)

        if(tx.fromUserAccount === primaryUser) {
            sent = tx.mint;
        } else if(tx.toUserAccount === primaryUser) {
            received = tx.mint;
        }

        const from = tx.fromUserAccount;
        const to = tx.toUserAccount;
        const amount = tx.tokenAmount;

        if(sent) {
            actions.push({
                from,
<<<<<<< HEAD
<<<<<<< HEAD
                to,
                sent,
=======
                sent,
                to,
>>>>>>> 9c4a140 (feat: ProtonTransaction support for swap tx type)
=======
                to,
                sent,
>>>>>>> 90496cb (chore: fixed order of ProtonTransactionAction keys)
                amount,
            });
        } else {
            actions.push({
                from,
                to,
                received,
                amount,
            });
        }
    }
    
    return {
        type,
        primaryUser,
        timestamp,
        source,
        actions,
    };
};
