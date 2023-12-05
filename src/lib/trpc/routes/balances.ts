import { t } from "$lib/trpc/t";
import { getAPIUrl } from "$lib/util/get-api-url";

import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";

export const balances = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        const [account, isMainnet] = input;
        const url = getAPIUrl(
            `/v0/addresses/${account}/balances?api-key=${HELIUS_API_KEY}`,
            isMainnet
        );

        const response = await fetch(url);

        const data = await response.json();

        return data;
    });
