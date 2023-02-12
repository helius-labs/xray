import type { Queries } from "./types";

import getSolanaPrice from "$lib/state/actions/get-solana-price";
import getSolanaAccountInfo from "$lib/state/actions/get-solana-account-info";
import getSolanaTransaction from "$lib/state/actions/get-solana-transaction";
import getSolanaTransactions from "$lib/state/actions/get-solana-transactions";
import getSolanaToken from "$lib/state/actions/get-solana-token";
import getSolanaTokenRegistry from "$lib/state/actions/get-solana-token-registry";

import formatMoney from "$lib/util/format-money";

import { parseTransaction } from "@helius-labs/xray-proton";
import type { EnrichedTransaction } from "@helius/types";

type Token = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
};

const queries:Queries = {
    "solana-price" : {
        loader                   : getSolanaPrice,
        formatter                : formatMoney,
        fetchOnFirstSubscription : true,
    },

    "solana-token-registry" : {
        loader                   : () => getSolanaTokenRegistry(),
        fetchOnFirstSubscription : true,
        formatter                : (data:any) => new Map(data.map((token:Token) => ([ token?.address, token ]))),
    },

    "solana-account-info" : {
        loader : (...args:any) => getSolanaAccountInfo(args[0]),
    },

    "solana-account-transactions" : {
        loader    : (...args:any) => getSolanaTransactions(args[0]),
        formatter : (data:any) => data.map((tx:EnrichedTransaction) => ({
            parsed : parseTransaction(tx),
            raw    : tx,
        })),
    },

    "solana-transaction" : {
        loader    : (...args:any) => getSolanaTransaction(args[0]),
        formatter : (data:any) => ({
            parsed : parseTransaction(data),
            raw    : data,
        }),
    },

    "solana-token" : {
        loader : (...args:any) => getSolanaToken(args[0]),
    },
};

export default queries;
