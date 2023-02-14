import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

// Consume a search, return whadt to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(
        `https://api.helius.xyz/v0/tokens/metadata/?api-key=${HELIUS_KEY}`,
        {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                mintAccounts: [params?.address],
            }),
        }
    );

    const [ data ] = await response.json() || [];

    return json({ data });
}
