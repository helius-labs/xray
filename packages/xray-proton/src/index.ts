export * from "./types";

import {
    type EnrichedTransaction,
    Source
} from "@helius-labs/helius-types";

import type {
    ProtonTransaction,
    ProtonSupportedTypes
} from "./types";
 
import {
    parseBurn,
    parseSwap,
    parseTransfer,
} from "./parsers";

const parsers = {
    TRANSFER : parseTransfer,
    SWAP     : parseSwap,
    BURN     : parseBurn,
    BURN_NFT : parseBurn,
    UNKNOWN  : (data:any) => data,
};

const unknown:ProtonTransaction = {
    type        : "UNKNOWN",
    source      : Source.SYSTEM_PROGRAM,
    primaryUser : "",
    timestamp   : 0,
    actions     : [],
    signature   : "",
};

export const parseTransaction = (transaction:EnrichedTransaction):ProtonTransaction => {
    const parser = parsers[transaction?.type as ProtonSupportedTypes];
    
    if(typeof parser === "undefined") {
        return unknown;
    }
    
    try {
        return parser(transaction);
    } catch(error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return unknown;
    }
};
