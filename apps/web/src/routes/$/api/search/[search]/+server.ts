import {
    json,
    type RequestEvent
} from "@sveltejs/kit";

import {
    getDomainKey,
    NameRegistryState
} from "@bonfida/spl-name-service";
import type { ParsedAccountData } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

import connect from "$lib/util/solana/connect";
import validPublicKey from "$lib/util/solana/validate-pubkey";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const search = params?.search as string;

    const connection = connect();
    // If it's long, assume it's a tx.
    // They will be presented with an error on the tx page if it's not.
    const probablyTransactionSignature = search.length > 50;
    const probablySolanaName = search.slice(-4) === ".sol";
    
    if(validPublicKey(search)) {
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
                valid : true,
            },
        });
    } else if (probablyTransactionSignature) {
        return json({
            data: {
                valid: true,
                url: `/${params?.search}/tx`,
            },
        });
    } else if(probablySolanaName) {
        try {
            // const { pubkey } = await getDomainKey(search);
            // const data = await NameRegistryState.retrieve(
            //     connection,
            //     pubkey,
            // );

            // const url = data.registry.owner ? `/${data.registry.owner}/wallet` : `/${params.search}/?error="invalid-search"`;
            const address = await fetch(`https://resolve-solana-domain.qudo-code.repl.co/domain/${search}`)
                .then((res) => res.json());
            // const data = await fetch(`/api/bonfida/domain/${search}`, {
            //     body    : JSON.stringify({ search }),
            //     headers : {
            //         "Content-Type" : "application/json",
            //     },
            //     method : "GET",
            // });

            // const address = await data.json();
            const url = address ? `/${address}/wallet` : `${search}/?error="invalid-search"`;
            
            return json({
                data : {
                    url,
                    valid : true,
                },
            });
        } catch(error) {
            // console.log(error);
            
            return json({
                data : {
                    url   : `/`,
                    valid : false,
                },
            });
        }
    }

    return json({
        data: {
            valid: false,
            url: `/`,
        },
    });
}
