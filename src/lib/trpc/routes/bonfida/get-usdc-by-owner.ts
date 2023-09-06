import { z } from "zod";
import { t } from "$lib/trpc/t";
import { connect } from "$lib/xray"; // Only if needed
import { PublicKey } from "@solana/web3.js";

const { HELIUS_API_KEY } = process.env;

export const usdc = t.procedure
    .input(
        z.object({
            address: z.string(),
        })
    )
    .query(async ({ input }) => {
        try {
            const connection = connect("mainnet", HELIUS_API_KEY);
            const pk = new PublicKey(input.address);
            const r = await connection.getTokenAccountsByOwner(pk, {
                mint: new PublicKey(
                    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                ),
            });
            const pubkey = r.value[0].pubkey;
            const value = r.value;
            return { value, pubkey };
        } catch (error) {
            return null;
        }
    });
