import { EnrichedTransaction, Source } from "@helius/types";

interface Swap {
    swapUser: string | null;
    tokenSwapped: string;
    tokenSwappedAmount: number;
    tokenReceived: string | undefined;
    tokenReceivedAmount: number | undefined;
    source: Source;
    timestamp: number;
}

export const parseSwap = (transaction: EnrichedTransaction): Swap | EnrichedTransaction => {
    const { tokenTransfers } = transaction;

    if(tokenTransfers) {
        const [ firstTransaction ] = tokenTransfers;
        const swapUser = firstTransaction.fromUserAccount;
        const tokenSwapped = firstTransaction.mint;
        const tokenSwappedAmount = firstTransaction.tokenAmount;
        const { source, timestamp } = transaction;
        
        // const swapTransfer = transaction.tokenTransfers.find(({ toUserAccount })) => toUserAccount === swapUser
        let tokenReceived;
        let tokenReceivedAmount;
        
        for(let i = 1; i < tokenTransfers.length; i++) {
            if(tokenTransfers[i].toUserAccount === swapUser) {
                tokenReceived = tokenTransfers[i].mint;
                tokenReceivedAmount = tokenTransfers[i].tokenAmount;
            }
        }
        
        return {
            swapUser,
            tokenSwapped,
            tokenSwappedAmount,
            tokenReceived,
            tokenReceivedAmount,
            source,
            timestamp,
        };
    }
    
    return transaction;
};