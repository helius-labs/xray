import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { zodTRPCTransactionsInput } from "$lib/types";

import { t } from "$lib/trpc/t";

const { HELIUS_KEY } = process.env;

export const transactions = t.procedure
    .input(zodTRPCTransactionsInput)
    .query(async ({ input }) => {
        const url = `https://api.helius.xyz/v0/addresses/${
            input.address
        }/transactions?api-key=${HELIUS_KEY}${
            input.before ? `&before=${input.before}` : ""
        }`;

        const response = await fetch(url);

        const json: EnrichedTransaction[] = await response.json();

        const result =
            json.map((tx) => parseTransaction(tx, input.address[0])) || [];

        return {
            result,
            oldest: json[json.length - 1].signature,
        };
    });
