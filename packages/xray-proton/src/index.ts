import type { EnrichedTransaction, Source } from "helius-sdk";

import type {
    ProtonSupportedTypes,
    ProtonTransaction
} from "./types";
 
import {
    parseBurn,
    parseNftBid,
    parseNftList,
    parseNftSale,
    parseSwap,
    parseTransfer
} from "./parsers";

const parsers = {
    TRANSFER    : parseTransfer,
    SWAP        : parseSwap,
    BURN        : parseBurn,
    BURN_NFT    : parseBurn,
    NFT_SALE    : parseNftSale,
    NFT_BID     : parseNftBid,
    NFT_LISTING : parseNftList,
    UNKNOWN     : (data:any) => data,
};

export const parseTransaction = (transaction:EnrichedTransaction):ProtonTransaction => {
    const parser = parsers[transaction?.type as ProtonSupportedTypes];

    const source = "SYSTEM_PROGRAM" as Source;
    
    if(typeof parser === "undefined") {
        return {
            type        : "UNKNOWN",
            primaryUser : "",
            fee         : 0,
            signature   : "",
            timestamp   : 0,
            source,
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
            primaryUser : "",
            fee         : 0,
            signature   : "",
            timestamp   : 0,
            source,
            actions     : [],
        };
    }
};
