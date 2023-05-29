import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchJson } from "$lib/util/fetch";

import { parseTransaction } from "@helius-labs/xray";

import type { TransactionsInput } from "$lib/types";

import type { EnrichedTransaction } from "helius-sdk";

const { HELIUS_KEY } = process.env;

// Consume a search, return what to do with it
export async function POST({ request }: RequestEvent) {
    const options = (await request.json()) as TransactionsInput;

    const url = `https://api.helius.xyz/v0/addresses/${
        options.account
    }/transactions?api-key=${HELIUS_KEY}${
        options.filter ? `&type=${options.filter}` : ""
    }${options.cursor ? `&before=${options.cursor}` : ""}`;

    const response = await fetchJson<EnrichedTransaction[]>(url);

    const parsed =
        response.map((tx) => parseTransaction(tx, options.user)) || [];

    return json({
        oldest: response[response.length - 1]?.signature || "",
        result: parsed,
    });
}
