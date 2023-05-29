import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchJson } from "$lib/util/fetch";

import { CDNTokenListResolutionStrategy } from "@solana/spl-token-registry";

const [url] = new CDNTokenListResolutionStrategy().repositories;

export async function GET() {
    return json(await fetchJson(url));
}
