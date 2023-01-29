import { json, type RequestEvent } from "@sveltejs/kit";

import { HELIUS_KEY } from "$env/static/private";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(`https://api.helius.xyz/v0/addresses/${params.address}/transactions?api-key=${HELIUS_KEY}`);

    const data  = await response.json();
    
    return json({ data });
}
