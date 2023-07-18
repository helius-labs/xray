const { HELIUS_API_KEY = "", RPC_URL = "" } = process.env;

import { json } from "@sveltejs/kit";

import { SOL } from "$lib/next/constants";

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// Consume a search, return what to do with it
export async function POST({ request }) {
    const { address } = await request.json();

    try {
        const response = await fetch(
            `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${HELIUS_API_KEY}`
        );

        const result = await response.json();

        const tokens = (result?.tokens || []).filter(
            ({ decimals }: { decimals: number }) => decimals > 0
        );

        const data = [
            ...tokens,
            {
                amount: result.nativeBalance / LAMPORTS_PER_SOL,
                mint: SOL,
                tokenAccount: "",
            },
        ];

        return new Response(JSON.stringify(data));
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return new Response(JSON.stringify(String(err)));
    }
}
