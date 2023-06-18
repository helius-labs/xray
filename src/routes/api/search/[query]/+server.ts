import { json, type RequestEvent } from "@sveltejs/kit";

import { search, connect } from "$lib/xray";

const { HELIUS_KEY } = process.env;

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const conection = connect("mainnet", HELIUS_KEY);

    const result = await search(params?.query || "", conection);

    return json(result);
}
