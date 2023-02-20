import {
    parsers,
    ProtonSupportedType,
    unknownProtonTransaction,
    type ProtonParser,
} from "./types";

export * from "./types";

export const parseTransaction: ProtonParser = (transaction, address) => {
    const supportedParsers = Object.keys(parsers);

    let parser: ProtonParser = parsers.UNKNOWN;

    if (!supportedParsers.includes(transaction.type)) {
        return unknownProtonTransaction;
    }

    const parserIndex = supportedParsers.indexOf(transaction.type);

    parser = Object.values(parsers)[parserIndex];

    try {
        return parser(transaction, address);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return unknownProtonTransaction;
    }
};
