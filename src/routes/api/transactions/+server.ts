const { HELIUS_API_KEY = "" } = process.env;

import { transactionFromEnriched } from "$lib/next/state/util/transaction-from-enriched";

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { account, before, type } = await request.json();

    try {
        const response = await fetch(
            `https://api.helius.xyz/v0/addresses/${account}/transactions?api-key=${HELIUS_API_KEY}`
        );

        const data = await response.json();

        const parsed = data.map((transaction) => transactionFromEnriched(transaction));

        return new Response(JSON.stringify(parsed));
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(String(err)));
    }
}
