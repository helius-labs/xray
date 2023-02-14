import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(
        `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`,
        {
            method: "POST",
            headers: {},
            body: `{
            "transactions" : [
                "${params.address}"
            ]
        }`,
        }
    );

    const [data] = await response.json();

    return json({ data });
}
