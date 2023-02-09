import type { EnrichedTransaction } from "@helius/types";

import {
    ProtonBurn,
    ProtonTokensBurned
} from "../types";

export const parseBurn = (transaction: EnrichedTransaction): ProtonBurn | EnrichedTransaction => {
    const sendingUser = transaction.tokenTransfers[0].fromUserAccount;
    const tokensBurned: ProtonTokensBurned[] = [];
    const { source, timestamp, tokenTransfers } = transaction;
    
    if(tokenTransfers?.length > 0) {
        for(let i = 0; i < tokenTransfers.length; i++) {
            const [ tx ] = tokenTransfers;
            const tokenBurned = tx.mint;
            const tokenBurnedAmount = tx.tokenAmount;

            tokensBurned.push({
                tokenBurned,
                tokenBurnedAmount,
            });
        }
    }

    return {
        sendingUser,
        tokensBurned,
        source,
        timestamp,
    };
};
