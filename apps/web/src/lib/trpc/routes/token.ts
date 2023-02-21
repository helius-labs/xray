import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { zodTRPCTransactionsInput } from "$lib/types";

import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const token = t.procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
        const response = await fetch(
            `https://api.helius.xyz/v0/token-metadata/?api-key=${HELIUS_KEY}`,
            {
                method: "POST",
                body: JSON.stringify({
                    mintAccounts: input,
                    includeOffChain: true,
                }),
            }
        );

        const json = await response.json();

        return json;
    });
