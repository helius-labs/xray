import { t } from "$lib/trpc/t";
import { connect } from "@helius-labs/xray";
import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const concurrentMerkleTree = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect("mainnet", HELIUS_KEY);
        const pubkey = new PublicKey(address);
        const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(
            connection,
            pubkey
        );

        return cmt;
    });
