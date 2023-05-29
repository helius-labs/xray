import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchJson } from "$lib/util/fetch";

const { HELIUS_KEY } = process.env;

// Consume a search, return what to do with it
export async function POST({ request }: RequestEvent) {
    const options = await request.json();

    const assets = await fetchJson(
        `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
        {
            id: "assets",
            jsonrpc: "2.0",
            method: "getAssetsByOwner",
            params: options,
        }
    );

    return json(assets?.result?.items || []);
}
