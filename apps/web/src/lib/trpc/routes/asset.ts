import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const asset = t.procedure.input(z.string()).query(async ({ input }) => {
    const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

    const response = await fetch(url, {
        body: JSON.stringify({
            id: "asset",
            jsonrpc: "2.0",
            method: "getAsset",
            params: [input],
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });

    const data = await response.json();

    return data;
});
