import { json, type RequestEvent } from "@sveltejs/kit";

import type { ParsedAccountData } from "@solana/web3.js";

import connect from "$lib/util/solana/connect";
import validPublicKey from "$lib/util/solana/validate-pubkey";

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";

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

        const url =
            program === "spl-token"
                ? `/${params.search}/token`
                : `/${params.search}/wallet`;

        return json({
            data: {
                url,
                valid: true,
            },
        });
    } else if (probablyTransactionSignature) {
        return json({
            data: {
                url: `/${params?.search}/tx`,
                valid: true,
            },
        });
    } else if (probablySolanaName) {
        const domain = search.slice(0, -4);
        try {
            const { pubkey } = await getDomainKey(domain);
            const data = await NameRegistryState.retrieve(connection, pubkey);

            return json({
                data: {
                    url: `/${data.registry.owner}/wallet`,
                    valid: true,
                },
            });
        } catch (error) {
            console.log(error);
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
