import { json, type RequestEvent } from "@sveltejs/kit";

import search from "$lib/util/search";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    return json(await search(params?.search || ""));
}
