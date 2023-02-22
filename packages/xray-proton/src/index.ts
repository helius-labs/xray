import {
    protonParsers,
    ProtonType,
    unknownProtonTransaction,
    type ProtonParser,
} from "./types";

export * from "./types";

export const parseTransaction: ProtonParser = (transaction, address) => {
    let parser: ProtonParser = protonParsers.UNKNOWN;

    const transactionType = transaction.type as ProtonType;

    if (typeof protonParsers[transactionType] === "undefined") {
        return unknownProtonTransaction;
    }

    parser = protonParsers[transactionType];

    try {
        return parser(transaction, address);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return unknownProtonTransaction;
    }
};
