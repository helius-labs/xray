import { EnrichedTransaction, Source } from "@helius/types";

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
        const [ firstTransaction ] = transaction.tokenTransfers;
        const sendingUser = firstTransaction?.fromUserAccount;
        const receivingUser = firstTransaction?.toUserAccount;
        // const tokenTransferName = call a fetch to get the shorten named (ex: SOL, USDC, DeGods #1232)
        const tokenTransferQuantity = firstTransaction?.tokenAmount;
        const tokenTransferMintAddress = firstTransaction?.mint;
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
