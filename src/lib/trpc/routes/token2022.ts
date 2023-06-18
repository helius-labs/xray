import { t } from "$lib/trpc/t";
import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

const { HELIUS_KEY } = process.env;

export const token2022 = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const TOKEN_2022_PROGRAM_ID = new PublicKey(
            "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        );

        const walletPublicKey = new PublicKey(input);
        const url = `https://icarus.helius.xyz/?api-key=${HELIUS_KEY}`;

        const response = await fetch(url, {
            body: JSON.stringify({
                id: "accounts",
                jsonrpc: "2.0",
                method: "getTokenAccountsByOwner",
                params: [
                    walletPublicKey,
                    {
                        programId: TOKEN_2022_PROGRAM_ID,
                    },
                    {
                        commitment: "confirmed",
                        encoding: "jsonParsed",
                    },
                ],
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());

        type Accounts = {
            amount: number;
            mint: string;
        };

        // TODO: any type on this
        const accounts: Accounts[] = response?.result?.value?.map(
            (account: any) => {
                return {
                    amount: account.account.data.parsed.info.tokenAmount
                        .uiAmount,
                    mint: account.account.data.parsed.info.mint,
                };
            }
        );

        return accounts;
    });
