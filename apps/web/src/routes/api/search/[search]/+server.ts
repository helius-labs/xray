import { json, type RequestEvent } from "@sveltejs/kit";

import type {
    ParsedAccountData,
} from "@solana/web3.js";

import validPublicKey from "$lib/util/solana/validate-pubkey";
import connect from "$lib/util/solana/connect";

import { PublicKey } from "@solana/web3.js";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const search = params?.search as string;

    const connection = connect();
    // If it's long, assume it's a tx.
    // They will be presented with an error on the tx page if it's not.
    const probablyTransactionSignature = search.length > 50;
    
    if(validPublicKey(search)) {
        const pubkey = new PublicKey(search);
        const account = await connection.getParsedAccountInfo(pubkey);
        
        // TODO: no casting
        const {
            program,
        } = account?.value?.data as ParsedAccountData;
         
        const url = program === "spl-token" ? `/${params.search}/token` : `/${params.search}/wallet`;
         
        return json({
            data : {
                valid : true,
                url,
            },
        });
    } else if(probablyTransactionSignature) {
        return json({
            data : {
                valid : true,
                url   : `/${params?.search}/tx`,
            },
        });
    }
 
    return json({
        data : {
            valid : false,
            url   : `/`,
        },
    });
}
