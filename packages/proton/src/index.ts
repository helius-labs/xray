import type { EnrichedTransaction } from "@helius/types";

import {
    parseSwap,
    parseTransfer,
    parseUnknown
} from "./parsers";

const supportedTransactionParsers = {
    TRANSFER : parseTransfer,
    SWAP     : parseSwap,
    UNKNOWN  : parseUnknown,
};

type SupportedTransactionTypes = keyof typeof supportedTransactionParsers;

export const parseTransaction = (transaction:EnrichedTransaction) => {
    // Look up a parser for the transaction type
    if(transaction?.type in supportedTransactionParsers) {
        const txType = transaction?.type as SupportedTransactionTypes;

        const parsed = supportedTransactionParsers[txType](transaction);
        
        return parsed;
    }

    // Default to unknown
    return parseUnknown(transaction);
};
