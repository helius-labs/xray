import { json, type RequestEvent } from "@sveltejs/kit";

const { HELIUS_KEY } = process.env;

import { tokens } from "@helius-labs/xray-test";

// Consume a search, return whadt to do with it
export async function GET({ params }: RequestEvent) {
    if (!HELIUS_KEY) {
        const mocked =
            tokens.find(
                ({ mint, account }) =>
                    mint === params?.address || account === params?.address
            ) || {};

        return json({ data: mocked });
    }

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

    const data = (await response.json()) || [];

    return json({ data: data[0] });
}
