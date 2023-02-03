import { json, type RequestEvent } from "@sveltejs/kit";

import { HELIUS_KEY } from "$env/static/private";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const response = await fetch(`https://api.helius.xyz/v0/tokens/metadata/?api-key=${HELIUS_KEY}`, {
        method  : "POST",
        headers : {},
        body    : JSON.stringify({
            mintAccounts : [
                params.address,
            ],
        }),
    });

    const [ data ]  = await response.json();
    
    return json({ data });
}
