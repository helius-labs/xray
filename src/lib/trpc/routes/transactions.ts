import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "$lib/xray";

import { t } from "$lib/trpc/t";

import { z } from "zod";
import { getAPIUrl } from "$lib/util/get-api-url";

import { HELIUS_API_KEY } from "$env/static/private";

export const transactions = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.string().optional(),
            filter: z.string().optional(),
            isMainnet: z.boolean(),
            user: z.string().optional(),
        })
    )
    .output(
        z.object({
            oldest: z.string(),
            result: z.array(
                z.object({
                    accounts: z.array(
                        z.object({
                            account: z.string(),
                            changes: z.array(
                                z.object({
                                    amount: z.number(),
                                    mint: z.string(),
                                })
                            ),
                        })
                    ),
                    actions: z.array(
                        z.object({
                            actionType: z.string(),
                            amount: z.number(),
                            from: z.string().nullable().optional(),
                            fromName: z.string().optional(),
                            received: z.string().optional(),
                            sent: z.string().optional(),
                            to: z.string(),
                            toName: z.string().optional(),
                        })
                    ),
                    fee: z.number(),
                    primaryUser: z.string(),
                    raw: z.any(),
                    signature: z.string(),
                    source: z.string(),
                    timestamp: z.number(),
                    type: z.string(),
                })
            ),
        })
    )
    .query(async ({ input }) => {
        const url = getAPIUrl(
            `/v0/addresses/${
                input.account
            }/transactions?api-key=${HELIUS_API_KEY}${
                input.filter ? `&type=${input.filter}` : ""
            }${input.cursor ? `&before=${input.cursor}` : ""}`,
            input.isMainnet
        );

        const response = await fetch(url);

        const json: EnrichedTransaction[] = await response.json();

        const result = json.map((tx) => parseTransaction(tx, input.user)) || [];

        return {
            oldest: json[json.length - 1]?.signature || "",
            result,
        };
    });
