import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction } from "@helius-labs/helius-types";

import type { Transfer } from "../types";

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
