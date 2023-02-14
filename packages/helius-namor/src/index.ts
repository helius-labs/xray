export * from "./types";

import {
    adjectives,
    animals,
    colors,
    names,
    uniqueNamesGenerator,
} from "unique-names-generator";

import { publicKeyMappings } from "./types";

export const nameFromString = (str: string) =>
    uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals, names],
        seed: str,
        separator: " ",
        length: 2,
        style: "capital",
    });

export const getSolanaName = (pubkey: string) => {
    const keyMap = new Map(Object.entries(publicKeyMappings));

    if (keyMap.has(pubkey)) {
        return keyMap.get(pubkey);
    }

    return nameFromString(pubkey);
};
