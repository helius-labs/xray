const { HELIUS_API_KEY = "" } = process.env;

import { parseTransaction } from "$lib/next/transaction-parser";

import tFetch from "$lib/util/tfetch";

import type { EnrichedTransaction } from "helius-sdk";

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { account, before, type } = await request.json();

    try {
        const transactions = await tFetch<EnrichedTransaction[]>(
            `https://api.helius.xyz/v0/addresses/${account}/transactions?api-key=${HELIUS_API_KEY}`
        );

        // @ts-ignore
        if (transactions.error) {
            // @ts-ignore
            throw new Error(transactions.error);
        }

        if (transactions?.length) {
            const parsed = transactions.map((transaction) =>
                parseTransaction(transaction, account)
            );

            return new Response(JSON.stringify(parsed));
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return new Response(JSON.stringify(String(err)));
    }
}
