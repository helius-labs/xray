import type { SearchResult } from "$lib/types";

import { json, type RequestEvent } from "@sveltejs/kit";

import connect from "$lib/util/solana/connect";

import validPublicKey from "$lib/util/solana/validate-pubkey";

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const search = params?.search as string;

    const connection = connect();
    // If it's long, assume it's a tx.
    // They will present with an error on the tx page if it's not.
    const probablyTransactionSignature = search.length > 50;
    const probablySolanaName = search.length > 4 && search.slice(-4) === ".sol";
    const probablyBackpackName =
        search.startsWith("@backpack ") && search.length > 10;

    if (validPublicKey(search)) {
        const pubkey = new PublicKey(search);
        const account = await connection.getParsedAccountInfo(pubkey);

        // TODO Property 'program' does not exist on type 'Buffer | ParsedAccountData'.
        // @ts-ignore
        const isToken = account?.value?.data?.program === "spl-token";

        const data: SearchResult = {
            address: params.search || "",
            isAccount: false,
            isDomain: false,
            isToken,
            isTransaction: false,
            search: params.search || "",
            url: isToken
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
    } else if (probablyBackpackName) {
        const username = search.slice(10);

        const url = `https://xnft-api-server.xnfts.dev/v1/users/fromUsername?username=${username}`;

        const response = await fetch(url);

        const { user } = await response.json();

        const addresses = user?.publicKeys.reduce(
            // @ts-ignore
            (acc, { publicKey, blockchain }) => {
                if (blockchain === "solana") {
                    return [publicKey, ...acc];
                }

                return acc;
            },
            []
        );

        const data: SearchResult = {
            address: params.search || "",
            isAccount: false,
            isDomain: false,
            isToken: false,
            isTransaction: true,
            multi: addresses.length > 1 ? addresses : false,
            search: params.search || "",
            url: `${addresses[0]}/wallet`,
            valid: true,
        };

        console.log({ data });

        return json({ data });
    }

    return json({
        data: {
            url: `/`,
            valid: false,
        },
    });
}
