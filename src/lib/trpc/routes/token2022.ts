import { t } from "$lib/trpc/t";
import { getRPCUrl } from "$lib/util/get-rpc-url";
import { PublicKey } from "@solana/web3.js";
import { z } from "zod";
import { isMainnet } from '../../util/stores/network';

const { HELIUS_API_KEY } = process.env;

export const token2022 = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        const [wallet, isMainnet] = input;
        const TOKEN_2022_PROGRAM_ID = new PublicKey(
            "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        );

        const walletPublicKey = new PublicKey(wallet);
        const url = getRPCUrl(`?api-key=${HELIUS_API_KEY}`, isMainnet)
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
