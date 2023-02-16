import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

import { transactions } from "@helius-labs/xray-test";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    if (!HELIUS_KEY) {
        const data = transactions.transactionsVariety.find(
            ({ signature = "" }) => signature === params?.signature
        );

        return json({ data });
    }

    const response = await fetch(
        `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`,
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

    const [data] = await response.json();

    return json({ data });
}
