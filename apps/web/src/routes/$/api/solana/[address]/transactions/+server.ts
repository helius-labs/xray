import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

import { transactions } from "@helius-labs/xray-test";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    if (!HELIUS_KEY) {
        return json({ data: transactions.transactionsVariety });
    }

    const response = await fetch(
        `https://api.helius.xyz/v0/addresses/${params.address}/transactions?api-key=${HELIUS_KEY}`
    );

    const data = await response.json();

    return json({ data });
}
