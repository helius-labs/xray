import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchJson } from "$lib/util/fetch";

const { HELIUS_KEY } = process.env;

export async function POST({ request }: RequestEvent) {
    const options = (await request.json()) as { account: string };

    return json(
        await fetchJson(
            `https://api.helius.xyz/v0/addresses/${options.account}/balances?api-key=${HELIUS_KEY}`
        )
    );
}
