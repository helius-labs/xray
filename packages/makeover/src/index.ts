// // Format Helius transactions for display on the UI
import type { EnrichedTransaction } from "../../../../helius-sdk";

import {
    parseSwap,
    parseTransfer,
    parseUnknown
} from "../parsers/parsers";

// // TODO: Something here to make the data more like UI state

// // TODO: Maybe?
// interface UITransaction extends EnrichedTransaction {
//     // ...
// }

const supportedTransactions = {
    TRANSFER : parseTransfer,
    SWAP     : parseSwap,
    UNKNOWN  : parseUnknown,
};

type SupportedTransactionTypes = keyof typeof supportedTransactions;

export const parseTransaction = (transaction:EnrichedTransaction) => {
    const parser = supportedTransactions[transaction?.type as SupportedTransactionTypes];

    if(!parser) {
        return parseUnknown(transaction);
    }

    return parser(transaction);
};
