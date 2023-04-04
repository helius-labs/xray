import { PublicKey } from "@solana/web3.js";

import type { PublicKey as PublicKeyType } from "@solana/web3.js";

export const isValidPublicKey = (
    address: string = ""
): PublicKeyType | null => {
    try {
        return new PublicKey(address.trim());
    } catch (error) {
        return null;
    }
};
