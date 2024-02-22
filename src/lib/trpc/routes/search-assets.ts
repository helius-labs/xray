import { t } from "$lib/trpc/t";

import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";
import { getRPCUrl } from "$lib/util/get-rpc-url";

export const searchAssets = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.number().optional(),
            isMainnet: z.boolean(),
            nativeBalance: z.boolean().optional(),
            tokenType: z.string().optional(),
        })
    )
    .query(async ({ input }) => {
        const {
            account,
            cursor = 1,
            isMainnet,
            tokenType = "all",
            nativeBalance = false,
        } = input;

        const url = getRPCUrl(`/?api-key=${HELIUS_API_KEY}`, isMainnet);

        const response = await fetch(url, {
            body: JSON.stringify({
                id: "my-id",
                jsonrpc: "2.0",
                method: "searchAssets",
                params: {
                    displayOptions: {
                        showNativeBalance: nativeBalance,
                    },
                    limit: 1000,
                    ownerAddress: account,
                    page: cursor,
                    sortBy: { sortBy: "id", sortDirection: "asc" },
                    tokenType,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const { result } = await response.json();

        return result;
    });
