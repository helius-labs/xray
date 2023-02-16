import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

// Consume a search, return whadt to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(
        `https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_KEY}`,
        {
            body: JSON.stringify({
                includeOffChain: true,
                mintAccounts: [params?.address],
            }),
            headers: {},
            method: "POST",
        }
    );

    const [data] = (await response.json()) || [];

    return json({ data });
}
