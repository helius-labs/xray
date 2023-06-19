import type { ProtonType, ProtonParser } from "./types";
import { protonParsers } from "./types";

export * from "./types";

export const parseTransaction: ProtonParser = (transaction, address) => {
    let parser: ProtonParser = protonParsers.UNKNOWN;

    const transactionType = transaction.type as ProtonType;

    if (typeof protonParsers[transactionType] === "undefined") {
        return protonParsers.UNKNOWN(transaction, address);
    }

    parser = protonParsers[transactionType];

    try {
        return parser(transaction, address);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return protonParsers.UNKNOWN(transaction, address);
    }
};
