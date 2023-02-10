export * from "./types";

import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
    names
} from "unique-names-generator";

import { PublicKey } from "@solana/web3.js";

import  { publicKeyMappings } from "./types";

const isValid = (key:string) => {
    try {
        return new PublicKey(key)
    } catch (e) {
        console.log(e);
    
        return false;
    }
}


export const getSolanaName = (pubkey:string) => {
    if(!isValid(pubkey)) {
        return;
    }

    const keyMap:Map<string, string> = new Map(Object.entries(publicKeyMappings));

    if(keyMap.has(pubkey) !== undefined) {
        return keyMap.get(pubkey);
    }

    return uniqueNamesGenerator({
        dictionaries: [
            adjectives,
            colors,
            animals,
            names
        ],
        seed: pubkey,
        separator: " "
    });
}