import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "@helius-labs/xray";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

export const accountInfo = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect("mainnet", HELIUS_KEY);

        const pubKey = new PublicKey(address);

        const accountInfo = await connection.getParsedAccountInfo(pubKey);

        return {
            ...accountInfo,
            balance: (accountInfo?.value?.lamports || 0) / LAMPORTS_PER_SOL,
        };
    });
