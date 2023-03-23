import { json, type RequestEvent } from "@sveltejs/kit";

import type { EnrichedTransaction } from "helius-sdk";

const { HELIUS_KEY, HELIUS_API_URL } = process.env;

import { transactions } from "@helius-labs/xray-test";

import { parseTransaction } from "@helius-labs/xray-proton";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    if (!HELIUS_KEY) {
        const data = transactions.transactionsVariety.find(
            ({ signature = "" }) => {
                return signature === params?.address;
            }
        );

        return json({ data });
    }

    const response = await fetch(
        `${HELIUS_API_URL}/v0/transactions/?api-key=${HELIUS_KEY}`,
        {
            body: `{
            "transactions" : [
                "${params.address}"
            ]
        }`,
            headers: {},
            method: "POST",
        }
    );

    const [data]: EnrichedTransaction[] = await response.json();

    // this is a ProtonTransaction
    return json({ data: parseTransaction(data) });
}
