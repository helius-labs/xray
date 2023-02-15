import {
    parsers,
    ProtonSupportedType,
    unknownProtonTransaction,
    type ProtonParser,
} from "./types";

export * from "./types";

export const parseTransaction: ProtonParser = (transaction) => {
    const supportedParsers = Object.keys(ProtonSupportedType);

    let parser: ProtonParser = parsers.UNKNOWN;

    if (!supportedParsers.includes(transaction.type)) {
        return unknownProtonTransaction;
    }

    const parserIndex =
        Math.floor(supportedParsers.indexOf(transaction.type) / 2) - 1;
    // console.log("supportedParsers", supportedParsers);
    // console.log("parserIndex", parserIndex);

    parser = Object.values(parsers)[parserIndex];
    // console.log("parser", parser);

    try {
        return parser(transaction);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return unknownProtonTransaction;
    }
};
