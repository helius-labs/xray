import type { TransactionType } from "$lib/types";

import { supportedTransactionTypes } from "$lib/config";

import { parseTransaction } from "$lib/util/solana/parse-transactions";

export default async (address:string):Promise<any> => {
    const response = await fetch(`/api/solana/${address}/transactions`);

    const { data }  = await response.json();

    // Filter out supported txs and parse them.
    const supported = data
        .filter(({ type } : { type:TransactionType }) => supportedTransactionTypes.includes(type))
        .map(parseTransaction);
        
    return {
        supported,

        // Supply list of all transactions for "raw" view.
        all : data,
    };
};
