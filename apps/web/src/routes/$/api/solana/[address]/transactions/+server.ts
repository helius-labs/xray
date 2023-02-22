import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

import { transactions } from "@helius-labs/xray-test";

import { parseTransaction } from "@helius-labs/xray-proton";
import type { EnrichedTransaction } from "helius-sdk";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    if (!HELIUS_KEY) {
        return json({ data: transactions.transactionsVariety });
    }

    const response = await fetch(
        `https://api.helius.xyz/v0/addresses/${params.address}/transactions?api-key=${HELIUS_KEY}`
    );

    const data: EnrichedTransaction[] = await response.json();

    // this is a ProtonTransaction[]
    return json({
        data: data.map((tx) =>
            parseTransaction(tx as EnrichedTransaction, params.address)
        ),
    });
}
