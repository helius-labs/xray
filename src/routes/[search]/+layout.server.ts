import type { RequestEvent } from "./$types";
import type { ParsedAccountData, RpcResponseAndContext, AccountInfo } from "@solana/web3.js";

// TODO: This is a hack to get around the fact that the types for getParsedAccountInfo are wrong.
type ParsedAccountInfo = RpcResponseAndContext<AccountInfo<ParsedAccountData>>;

import { redirect } from "@sveltejs/kit";

import validatePubkey from "$lib/util/solana/validate-pubkey";

import connect from "$lib/util/solana/connect-mainnet";

// Decide where to go based on the search param.
export async function load({ params, url }: RequestEvent) {
    // Check if already resolved.
    if(url.pathname.endsWith("/token") ||
        url.pathname.endsWith("/wallet") ||
        url.pathname.endsWith("/tx")
    ) {
        return;
    }
    
    const connection = connect();

    // If it's long, assume it's a tx.
    // They will be presented with an error on the tx page if it's not.
    const probablyTransactionSignature = params.search.length > 50;

    const pubKey = validatePubkey(params.search);

    if(probablyTransactionSignature) {
        throw redirect(307, `/${params.search}/tx`);
    } else if(pubKey) {
        const account = await connection.getParsedAccountInfo(pubKey) as ParsedAccountInfo;

        const redirectUrl = account?.value?.data?.program === "spl-token" ? `/${params.search}/token` : `/${params.search}/wallet`;

        throw redirect(307, redirectUrl);
    } else {
        throw redirect(307, `/${params.search}/?error="invalid-search"`);
    }
}
