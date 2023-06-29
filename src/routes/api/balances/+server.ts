const { HELIUS_API_KEY = "" } = process.env;

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { address } = await request.json();

    try {
        const response = await fetch(
            `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${HELIUS_API_KEY}`
        );

        const result = await response.json();

        return new Response(JSON.stringify(result));
    } catch (err) {
        return new Response(JSON.stringify(String(err)));
    }
}
