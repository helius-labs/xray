import type { EnrichedTransaction, Source } from "@helius-labs/helius-types";

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

export const parseTransaction = (transaction:EnrichedTransaction):ProtonTransaction => {
    const parser = parsers[transaction?.type as ProtonSupportedTypes];

    const source = "SYSTEM_PROGRAM" as Source;
    
    if(typeof parser === "undefined") {
        return {
            type        : "UNKNOWN",
            source,
            primaryUser : "",
            timestamp   : 0,
            actions     : [],
        };
    }
    
    try {
        return parser(transaction);
    } catch(error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return {
            type        : "UNKNOWN",
            source,
            primaryUser : "",
            timestamp   : 0,
            actions     : [],
        };
    }
};
