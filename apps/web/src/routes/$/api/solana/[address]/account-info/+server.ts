import { json, type RequestEvent } from "@sveltejs/kit";

import connect from "$lib/util/solana/connect";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function GET({ params }: RequestEvent) {
    const connection = connect();

    const pubKey = new PublicKey(params.address || "");

    const accountInfo = await connection.getParsedAccountInfo(pubKey);

    return json({
        data: {
            ...accountInfo,
            balance: (accountInfo?.value?.lamports || 0) / LAMPORTS_PER_SOL,
        },
    });
}
