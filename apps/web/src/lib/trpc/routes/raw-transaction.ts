import { z } from "zod";

import { t } from "$lib/trpc/t";

import connect from "$lib/util/solana/connect";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const rawTransaction = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const connection = connect();

        const transaction = await connection.getTransaction(input, {
            maxSupportedTransactionVersion: 0,
        });

        return {
            transaction,
        };
    });
