import { json, type RequestEvent } from "@sveltejs/kit";

import { search, connect } from "$lib/xray";

import { HELIUS_API_KEY } from "$env/static/private";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const conection = connect("mainnet", HELIUS_API_KEY);

    const result = await search(params?.query || "", conection);

    return json(result);
}
