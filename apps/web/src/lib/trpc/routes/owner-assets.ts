import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

export const ownerAssets = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const owner = input;
        const sortBy = {
            sortBy: "created",
            sortDirection: "asc",
        };
        const limit = 50;
        const page = 1;
        const before = "";
        const after = "";
        const response = await fetch(url, {
            body: JSON.stringify({
                id: "assets",
                jsonrpc: "2.0",
                method: "getAssetsByOwner",
                params: [owner, sortBy, limit, page, before, after],
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const data = await response.json();

        return data.result;
    });
