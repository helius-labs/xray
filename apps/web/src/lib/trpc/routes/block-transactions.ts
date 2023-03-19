import { t } from "$lib/trpc/t";
import { z } from "zod";

import { parseTransaction } from "@helius-labs/xray-proton/dist";
import type { EnrichedTransaction } from "helius-sdk";
import connect from "src/lib/util/solana/connect";

import {
    VOTE_PROGRAM_ID,
    type ConfirmedTransactionMeta,
    type TransactionSignature,
} from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

type TransactionWithInvocations = {
    index: number;
    signature?: TransactionSignature | undefined;
    meta: ConfirmedTransactionMeta | null;
    invocations: Map<string, number>;
};

const voteFilter = VOTE_PROGRAM_ID.toBase58();

export const blockTransactions = t.procedure
    .input(
        z.object({
            cursor: z.string().optional(),
            limit: z.number().min(1).max(100).optional(),
            slot: z.number(),
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
        const limit = input.limit ?? 100;
        const invokedPrograms = new Map<string, number>();

        const connection = connect();

        const block = await connection.getBlock(input.slot, {
            maxSupportedTransactionVersion: 0,
        });

        const transactions: TransactionWithInvocations[] | undefined =
            block?.transactions.map((tx, index) => {
                let signature: TransactionSignature | undefined;
                if (tx.transaction.signatures.length > 0) {
                    signature = tx.transaction.signatures[0];
                }

                let programIndexes = tx.transaction.message.compiledInstructions
                    .map((ix) => ix.programIdIndex)
                    .concat(
                        tx.meta?.innerInstructions?.flatMap((ix) => {
                            return ix.instructions.map(
                                (ix) => ix.programIdIndex
                            );
                        }) || []
                    );

                const indexMap = new Map<number, number>();
                programIndexes.forEach((programIndex) => {
                    const count = indexMap.get(programIndex) || 0;
                    indexMap.set(programIndex, count + 1);
                });

                const invocations = new Map<string, number>();
                const accountKeys = tx.transaction.message.getAccountKeys({
                    accountKeysFromLookups: tx.meta?.loadedAddresses,
                });
                for (const [i, count] of indexMap.entries()) {
                    const programId = accountKeys.get(i)!.toBase58();
                    invocations.set(programId, count);
                    const programTransactionCount =
                        invokedPrograms.get(programId) || 0;
                    invokedPrograms.set(programId, programTransactionCount + 1);
                }

                return {
                    index,
                    invocations,
                    meta: tx.meta,
                    signature,
                };
            });

        let filteredTxs: TransactionWithInvocations[] | undefined =
            transactions?.filter(({ invocations }) => {
                return !(invocations.has(voteFilter) && invocations.size === 1);
            });

        if (filteredTxs && input.cursor) {
            const lastTxIndex = filteredTxs.findIndex(
                (tx) => tx.signature === input.cursor
            );

            if (lastTxIndex >= 0) {
                filteredTxs = filteredTxs.slice(lastTxIndex + 1);
            }
        }

        if (filteredTxs) {
            filteredTxs = filteredTxs.slice(0, limit);
        }

        const url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

        if (filteredTxs?.length === 0) {
            return {
                oldest: "",
                result: [],
            };
        }

        const response = await fetch(url, {
            body: JSON.stringify({
                transactions: filteredTxs?.map((tx) => tx.signature),
            }),

            method: "POST",
        });

        const json: EnrichedTransaction[] = await response.json();

        const result = json.map((tx) => parseTransaction(tx)) || [];

        return {
            oldest: filteredTxs?.at(filteredTxs?.length - 1)?.signature || "",
            result,
        };
    });
