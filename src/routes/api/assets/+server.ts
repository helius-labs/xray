const { RPC_URL = "" } = process.env;

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { address, page = 1, limit = 1000 } = await request.json();

    try {
        const response = await fetch(RPC_URL, {
            body: JSON.stringify({
                id: "my-id",
                jsonrpc: "2.0",
                method: "getAssetsByOwner",
                params: {
                    limit,
                    ownerAddress: address,
                    page,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const { result } = await response.json();

        return new Response(JSON.stringify(result));
    } catch (err) {
        return new Response(JSON.stringify(String(err)));
    }
}
