import { z } from "zod";

import { t } from "$lib/trpc/t";

import connect from "$lib/util/solana/connect";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const accountInfo = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect();

        const pubKey = new PublicKey(address);

        const accountInfo = await connection.getParsedAccountInfo(pubKey);

        return {
            ...accountInfo,
            balance: (accountInfo?.value?.lamports || 0) / LAMPORTS_PER_SOL,
        };
    });
