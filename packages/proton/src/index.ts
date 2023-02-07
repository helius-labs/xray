import type { EnrichedTransaction } from "@helius/types";

import {
    parseSwap,
    parseTransfer,
    parseUnknown
} from "./parsers";

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
