import { t } from "$lib/trpc/t";

import { z } from "zod";
import { isMainnet } from "../../util/stores/network";
import { getRPCUrl } from "$lib/util/get-rpc-url";

import { HELIUS_API_KEY } from "$env/static/private";

export const assets = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.number().optional(),
            isMainnet: z.boolean(),
        })
    )
    .query(async ({ input }) => {
        const { cursor = 1, account } = input;
        const url = getRPCUrl(`?api-key=${HELIUS_API_KEY}`, input.isMainnet);
        const response = await fetch(url, {
            body: JSON.stringify({
                id: "get-assets-" + account,
                jsonrpc: "2.0",
                method: "getAssetsByOwner",
                params: {
                    limit: 1000,
                    ownerAddress: account,
                    page: cursor,
                    sortBy: {
                        sortBy: "created",
                        sortDirection: "desc",
                    },
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const result = await response.json();

        return result?.result;
    });
