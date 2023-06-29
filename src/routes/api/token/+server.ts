const { HELIUS_API_KEY = "" } = process.env;

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { tokens = [] } = await request.json();

    try {
        const response = await fetch(
            `https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_API_KEY}`,
            {
                body: JSON.stringify({
                    disableCache: false,
                    includeOffChain: true,
                    mintAccounts: tokens,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );

        const result = await response.json();

        return new Response(JSON.stringify(result));
    } catch (err) {
        return new Response(JSON.stringify(String(err)));
    }
}
