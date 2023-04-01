import type { EnrichedTransaction } from "helius-sdk";

import { parseTransaction } from "@helius-labs/xray-proton";

import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const nativeTransferTransactions = t.procedure
    .input(
        z.object({
            account: z.string(),
            cursor: z.string().optional(),
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
                            from: z.string(),
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
        const url = `https://api.helius.xyz/v0/addresses/${
            input.account
        }/transactions?api-key=${HELIUS_KEY}${
            input.cursor ? `&before=${input.cursor}` : ""
        }`;

        const response = await fetch(url);

        const json: EnrichedTransaction[] = await response.json();

        const result =
            json
                .filter((tx) => {
                    const accountData = tx.accountData.find(
                        (data) => data.account === input.account
                    );
                    if (accountData) {
                        const nativeBalance = Math.abs(
                            accountData.nativeBalanceChange
                        );
                        return !(
                            (nativeBalance >= 0 && nativeBalance <= 4120320)
                            // nativeBalance <= 2282880
                        );
                    }
                    return false;
                })
                .map((tx) => parseTransaction(tx, input.account)) || [];

        return {
            oldest: json[json.length - 1]?.signature || "",
            result,
        };
    });
