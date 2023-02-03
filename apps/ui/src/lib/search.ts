import { goto } from "$app/navigation";

import validatePubkey from "$lib/util/solana/validate-pubkey";

export default async (search:string) => {
    // TODO: better validation
    
    // If it's long, assume it's a tx.
    // They will be presented with an error on the tx page if it's not.
    const probablyTransactionSignature = search.length > 50;

    if(probablyTransactionSignature || validatePubkey(search)) {
        await goto(`/${search}`);
    } else {
        const error = new Error("Invalid address or transaction signature.");
       
        throw error;
    }
};
