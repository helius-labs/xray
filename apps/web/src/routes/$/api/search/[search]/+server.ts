import { json, type RequestEvent } from "@sveltejs/kit";

import type { ParsedAccountData } from "@solana/web3.js";

import connect from "$lib/util/solana/connect";
import validPublicKey from "$lib/util/solana/validate-pubkey";

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";
import type { SearchResult } from "$lib/types";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const search = params?.search as string;

    const connection = connect();
    // If it's long, assume it's a tx.
    // They will be presented with an error on the tx page if it's not.
    const probablyTransactionSignature = search.length > 50;
    const probablySolanaName = search.length > 4 && search.slice(-4) === ".sol";

    if (validPublicKey(search)) {
        const pubkey = new PublicKey(search);
        const account = await connection.getParsedAccountInfo(pubkey);

        // TODO: no casting
        const { program } = account?.value?.data as ParsedAccountData;

        const data: SearchResult = {
            address: params.search || "",
            isAccount: false,
            isDomain: false,
            isToken: program === "spl-token",
            isTransaction: false,
            search: params.search || "",
            url:
                program === "spl-token"
                    ? `/${params.search}/token`
                    : `/${params.search}/wallet`,
            valid: true,
        };

        return json({ data });
    } else if (probablyTransactionSignature) {
        const data: SearchResult = {
            address: params.search || "",
            isAccount: false,
            isDomain: false,
            isToken: false,
            isTransaction: true,
            search: params.search || "",
            url: `/${params?.search}/tx`,
            valid: true,
        };

        return json({ data });
    } else if (probablySolanaName) {
        try {
            const { pubkey } = await getDomainKey(search);

            const domain = await NameRegistryState.retrieve(connection, pubkey);

            const data: SearchResult = {
                address: domain?.registry?.owner.toBase58() || "",
                isAccount: false,
                isDomain: false,
                isToken: false,
                isTransaction: true,
                search: params.search || "",
                url: `/${domain?.registry?.owner.toBase58()}/wallet`,
                valid: true,
            };

            return json({ data });
        } catch (error) {
            return json({
                data: {
                    url: `/`,
                    valid: false,
                },
            });
        }
    }

    return json({
        data: {
            url: `/`,
            valid: false,
        },
    });
}
