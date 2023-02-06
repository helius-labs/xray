// // Format Helius transactions for display on the UI
import type { EnrichedTransaction, Source } from "../../../../helius-sdk";

// // TODO: Something here to make the data more like UI state

// // TODO: Maybe?
// interface UITransaction extends EnrichedTransaction {
//     // ...
// }

interface Transfer {
    sendingUser: string | null,
    receivingUser: string | null,
    tokenTransferQuantity: number,
    tokenTransferMintAddress: string,
    source: Source;
    timestamp: number;
}

const parseTransfer = (transaction: EnrichedTransaction): Transfer | EnrichedTransaction => {
    if(transaction.tokenTransfers && transaction.tokenTransfers[0]) {
        const sendingUser = transaction.tokenTransfers[0].fromUserAccount;
        const receivingUser = transaction.tokenTransfers[0].toUserAccount;
        const tokenTransferQuantity = transaction.tokenTransfers[0].rawTokenAmount;
        // const tokenTransferName = call a fetch to get the shorten named (ex: SOL, USDC, DeGods #1232)
        const tokenTransferMintAddress = transaction.tokenTransfers[0].mint;
        const { source, timestamp } = transaction;
        // maybe translate timestamp in this v
        
        return {
            sendingUser, receivingUser, tokenTransferQuantity, tokenTransferMintAddress, source, timestamp,
        };
    }
    
    return transaction;
};

interface Swap {
    source: Source;
    timestamp: number;
}

const parseSwap = (transaction: EnrichedTransaction): Swap | EnrichedTransaction => {
    if(transaction.tokenTransfers) {
        return transaction;
    }
    
    return transaction;
};

const parseUnknown = (transaction: EnrichedTransaction) => transaction;

export const parseTransaction = (transaction:EnrichedTransaction) => {
    switch(transaction.type) {
    case "TRANSFER":
        return parseTransfer(transaction);
    case "SWAP":
        return parseSwap(transaction);
    case "UNKNOWN":
        return parseUnknown(transaction);
    default:
        return parseUnknown(transaction);
    }
};
