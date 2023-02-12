import { type EnrichedTransaction, Source } from "helius-sdk";

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

const unknown:ProtonTransaction = {
    type        : "UNKNOWN",
    source      : Source.SYSTEM_PROGRAM,
    primaryUser : "",
    timestamp   : 0,
    actions     : [],
    signature   : "",
    fee         : 0,
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
