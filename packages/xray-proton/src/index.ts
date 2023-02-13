import { Source, type EnrichedTransaction } from "helius-sdk";

import type {
    ProtonSupportedTypes,
    ProtonTransaction
} from "./types";
 
export * from "./types";

import {
    parseBurn,
    parseNftBid,
    parseNftCancelBid,
    parseNftCancelList,
    parseNftList,
    parseNftSale,
    parseSwap,
    parseTransfer
} from "./parsers";

const parsers = {
    TRANSFER           : parseTransfer,
    SWAP               : parseSwap,
    BURN               : parseBurn,
    BURN_NFT           : parseBurn,
    NFT_SALE           : parseNftSale,
    NFT_BID            : parseNftBid,
    NFT_BID_CANCELLED  : parseNftCancelBid,
    NFT_LISTING        : parseNftList,
    NFT_CANCEL_LISTING : parseNftCancelList,
    UNKNOWN            : (data:any) => data,
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
