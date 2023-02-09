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

export const getSolanaName = (pubkey:string) => {
    try {
        new PublicKey(pubkey)
    } catch (e) {
        throw new Error("Invalid solana address");
    }

    const keyMap = new Map(Object.entries(publicKeyMappings));

    if (keyMap.has(pubkey)) {
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