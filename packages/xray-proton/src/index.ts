export * from "./types";

import type { EnrichedTransaction } from "@helius-labs/helius-types";

import { parseSwap } from "./parsers/swap";
import { parseTransfer } from "./parsers/transfer";
import { parseUnknown } from "./parsers/unknown";

const supportedTransactionParsers = {
    TRANSFER : parseTransfer,
    SWAP     : parseSwap,
    UNKNOWN  : parseUnknown,
};

type SupportedTransactionTypes = keyof typeof supportedTransactionParsers;

export const parseTransaction = (transaction:EnrichedTransaction) => {
    const supported = transaction?.type in supportedTransactionParsers;

    if(!supported) {
        return {
            supported : false,
            type      : "UNKNOWN",
            parsed    : parseUnknown(transaction),
        };
    }

    return {
        supported : true,
        type      : transaction?.type,

        // TODO: better narrowing
        // @ts-ignore
        parsed    : supportedTransactionParsers[transaction?.type](transaction),
    };
};
