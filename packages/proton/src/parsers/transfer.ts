import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, Source } from "@helius/types";

interface Transfer {
    sendingUser: string | null,
    receivingUser: string | null,
    tokenTransferQuantity: number,
    tokenTransferMintAddress: string,
    source: Source;
    timestamp: number;
}

export const parseTransfer = (transaction: EnrichedTransaction): Transfer | EnrichedTransaction => {
    if(transaction.tokenTransfers) {
        let firstTransaction;
        let tokenTransferQuantity;
        let tokenTransferMintAddress;

        if(transaction.tokenTransfers.length === 0 && transaction.nativeTransfers) {
            [ firstTransaction ] = transaction.nativeTransfers;
            tokenTransferQuantity = firstTransaction?.amount / LAMPORTS_PER_SOL;
            tokenTransferMintAddress = "So11111111111111111111111111111111111111112";
        } else {
            [ firstTransaction ] = transaction.tokenTransfers;
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
