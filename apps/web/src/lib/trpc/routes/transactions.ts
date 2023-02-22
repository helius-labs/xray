import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { zodTRPCTransactionsInput } from "$lib/types";

import { t } from "$lib/trpc/t";
import { transactions as mock } from "@helius-labs/xray-test";

const { HELIUS_KEY } = process.env;

export const transactions = t.procedure
    .input(zodTRPCTransactionsInput)
    .query(async ({ input }) => {
        if (!HELIUS_KEY) {
            return {
                result:
                    mock.transactionsVariety.map((tx: any) =>
                        parseTransaction(tx, input.address[0])
                    ) || [],
            };
        }

        const url = `https://api.helius.xyz/v0/addresses/${
            input.address
        }/transactions?api-key=${HELIUS_KEY}${
            input.before ? `&before=${input.before}` : ""
        }`;

        const response = await fetch(url);

        const json: EnrichedTransaction[] = await response.json();
        console.log({ json });
        const result =
            json.map((tx) => parseTransaction(tx, input.address[0])) || [];

        return {
            result,
            oldest: json[json.length - 1].signature,
        };
    });
