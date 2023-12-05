import { t } from "$lib/trpc/t";
import { getAPIUrl } from "$lib/util/get-api-url";

import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";

export const token = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        const [token, isMainnet] = input;
        const url = getAPIUrl(
            `/v0/token-metadata/?api-key=${HELIUS_API_KEY}`,
            isMainnet
        );
        const response = await fetch(url, {
            body: JSON.stringify({
                includeOffChain: true,
                mintAccounts: [token],
            }),
            method: "POST",
        });
        const json = await response.json();
        return json;
    });
