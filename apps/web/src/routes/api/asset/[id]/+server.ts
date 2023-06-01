import { json, type RequestEvent } from "@sveltejs/kit";
import { fetchJson } from "$lib/util/fetch";

import type { Asset } from "$lib/types";

import { extractDetailsFromDAS } from "$lib/state/assets";

const { HELIUS_KEY } = process.env;

type TokenOptions = {
    id: string;
    type: "token" | "das" | undefined;
};

const getAsset = async (id: string) => {
    const response = await fetch(
        `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "my-id",
                method: "getAsset",
                params: {
                    id,
                },
            }),
        }
    );

    const { result } = await response.json();

    return result;
};

const getToken = async (id: string) => {
    const response = await fetch(
        `https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mintAccounts: [id],
                includeOffChain: true,
                disableCache: false,
            }),
        }
    );

    const { data } = await response.json();

    return data;
};

export async function GET({ params }: RequestEvent) {
    console.log("GET", params);
    try {
        const [das, token] = await Promise.all([
            getAsset(params.id || ""),
            getToken(params.id || ""),
        ]);

        const assetFromDas = extractDetailsFromDAS(das);

        return json(assetFromDas);
    } catch (error) {
        console.error(error);

        return json({});
    }
}
