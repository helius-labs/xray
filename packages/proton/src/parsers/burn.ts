import type { EnrichedTransaction, Source } from "@helius/types";

type TokensBurned = {
    tokenBurned: string;
    tokenBurnedAmount: number;
}

interface Burn {
    sendingUser: string | null;
    tokensBurned: TokensBurned[];
    source: Source;
    timestamp: number;
}

export const parseBurn = (transaction: EnrichedTransaction): Burn | EnrichedTransaction => {
    const sendingUser = transaction.feePayer;
    const tokensBurned: TokensBurned[] = [];
    const { source, timestamp, tokenTransfers } = transaction;
    
    if(tokenTransfers && tokenTransfers.length > 0) {
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
