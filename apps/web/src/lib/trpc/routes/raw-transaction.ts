import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "@helius-labs/xray";

const { HELIUS_KEY } = process.env;

export const rawTransaction = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const connection = connect("mainnet", HELIUS_KEY);

        const transaction = await connection.getTransaction(input, {
            maxSupportedTransactionVersion: 0,
        });

        return {
            transaction,
        };
    });
