export * from "./types";

import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
    names
} from "unique-names-generator";

import { PublicKey } from "@solana/web3.js";

import { publicKeyMappings } from "./types";

export const nameFromString = (str:string) => uniqueNamesGenerator({
    dictionaries : [
        adjectives,
        colors,
        animals,
        names,
    ],
    seed      : str,
    separator : " ",
});

export const getSolanaName = (pubkey:string) => {
    try {
        new PublicKey(pubkey);
    } catch(e) {
        throw new Error("Invalid solana address");
    }

    const keyMap = new Map(Object.entries(publicKeyMappings));

    if(keyMap.has(pubkey)) {
        return keyMap.get(pubkey);
    }

    return nameFromString(pubkey);
};
