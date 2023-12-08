//@ts-nocheck
import type { EnrichedTransaction } from "helius-sdk";

import { t } from "$lib/trpc/t";
import { z } from "zod";

import { parseTransaction } from "$lib/xray";

import {
    VOTE_PROGRAM_ID,
    type ConfirmedTransactionMeta,
    type TransactionSignature,
    Connection,
} from "@solana/web3.js";
import { getRPCUrl } from "$lib/util/get-rpc-url";

import { HELIUS_API_KEY } from "$env/static/private";

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
            isMainnet: z.boolean(),
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

        const connection = new Connection(
            getRPCUrl(`?api-key=${HELIUS_API_KEY}`, input.isMainnet),
            "confirmed"
        );

        const block = await connection.getBlock(input.slot, {
            maxSupportedTransactionVersion: 0,
        });

        const transactions: TransactionWithInvocations[] | undefined =
            block?.transactions.map((tx, index) => {
                let signature: TransactionSignature | undefined;
                if (tx.transaction.signatures.length > 0) {
                    signature = tx.transaction.signatures[0];
                }

                const programIndexes =
                    tx.transaction.message.compiledInstructions
                        .map((ix) => ix.programIdIndex)
                        .concat(
                            tx.meta?.innerInstructions?.flatMap((ix) => {
                                return ix.instructions.map(
                                    (ix) => ix.programIdIndex
                                );
                            }) || []
                        );

                const invocations = programIndexes.reduce(
                    (acc, programIndex) => {
                        const programId = tx.transaction.message
                            .getAccountKeys({
                                accountKeysFromLookups:
                                    tx.meta?.loadedAddresses,
                            })
                            .get(programIndex)!
                            .toBase58();

                        const programTransactionCount =
                            invokedPrograms.get(programId) || 0;
                        invokedPrograms.set(
                            programId,
                            programTransactionCount + 1
                        );

                        const count = acc.get(programId) || 0;
                        acc.set(programId, count + 1);

                        return acc;
                    },
                    new Map<string, number>()
                );

                return {
                    index,
                    invocations,
                    meta: tx.meta,
                    signature,
                };
            });

        // Filters out vote transactions -> Returns a list of the transaction signatures
        let signatureList = transactions
            ?.filter(
                ({ invocations }) =>
                    !(invocations.has(voteFilter) && invocations.size === 1)
            )
            .map(({ signature }) => signature);

        if (!signatureList?.length) {
            return {
                oldest: "",
                result: [],
            };
        }

        if (input.cursor) {
            const lastTransactionIndex = signatureList.indexOf(input.cursor);

            if (lastTransactionIndex >= 0) {
                signatureList = signatureList.slice(lastTransactionIndex + 1);
            }
        }

        signatureList = signatureList.slice(0, limit);

        const url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_API_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                transactions: signatureList,
            }),

            method: "POST",
        });

        const json: EnrichedTransaction[] = await response.json();

        const result = json.map((tx) => parseTransaction(tx)) || [];

        return {
            oldest: signatureList?.slice(-1)?.[0] || "",
            result,
        };
    });
