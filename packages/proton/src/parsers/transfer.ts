import type { EnrichedTransaction, Source } from "@helius/types";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface Transfer {
    sendingUser: string | null,
    receivingUser: string | null,
    tokenTransferQuantity: number,
    tokenTransferMintAddress: string,
    source: Source;
    timestamp: number;
}

export const parseTransfer = (transaction: EnrichedTransaction): Transfer | EnrichedTransaction => {
    const { tokenTransfers, nativeTransfers } = transaction;

    if(tokenTransfers) {
        let firstTransaction;
        let tokenTransferQuantity;
        let tokenTransferMintAddress;
        
        if(tokenTransfers.length === 0 && nativeTransfers) {
            firstTransaction = nativeTransfers[0];
            tokenTransferQuantity = firstTransaction?.amount / LAMPORTS_PER_SOL;
            tokenTransferMintAddress = "So11111111111111111111111111111111111111112";
        } else {
            firstTransaction = tokenTransfers[0];
            tokenTransferQuantity = firstTransaction?.tokenAmount;
            tokenTransferMintAddress = firstTransaction?.mint;
        }
        
        const sendingUser = firstTransaction?.fromUserAccount;
        const receivingUser = firstTransaction?.toUserAccount;
        const { source, timestamp } = transaction;

        return {
            sendingUser,
            receivingUser,
            tokenTransferQuantity,
            tokenTransferMintAddress,
            source,
            timestamp,
        };
    }

    return transaction;
};
