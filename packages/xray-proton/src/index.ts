import type { EnrichedTransaction } from "@helius/types";

import {
    parseBurn,
    parseSwap,
    parseTransfer,
    parseUnknown
} from "./parsers";

const supportedTransactions = {
    TRANSFER : parseTransfer,
    SWAP     : parseSwap,
    UNKNOWN  : parseUnknown,
    BURN     : parseBurn,
    BURN_NFT : parseBurn,
};

type SupportedTransactionTypes = keyof typeof supportedTransactions;

export const parseTransaction = (transaction:EnrichedTransaction) => {
    const parser = supportedTransactions[transaction?.type as SupportedTransactionTypes];

    if(!parser) {
        return parseUnknown(transaction);
    }

    return parser(transaction);
};
