import { json, type RequestEvent } from "@sveltejs/kit";

import { HELIUS_KEY } from "$env/static/private";

import parseTransactions from "$lib/util/solana/parse-transactions";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(`https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`, {
        method  : "POST",
        headers : {},
        body    : `{ transactions : [ "${params.address}" ] }`,
    });

    const data  = await response.json();
    
    return json({
        data : parseTransactions(data),
    });
}
