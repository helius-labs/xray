import { protonParsers } from "./types";
export * from "./types";
export const parseTransaction = (transaction, address) => {
    let parser = protonParsers.UNKNOWN;
    const transactionType = transaction.type;
    if (typeof protonParsers[transactionType] === "undefined") {
        return protonParsers.UNKNOWN(transaction, address);
    }
    parser = protonParsers[transactionType];
    try {
        return parser(transaction, address);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return protonParsers.UNKNOWN(transaction, address);
    }
};
