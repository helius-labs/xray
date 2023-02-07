import { PublicKey } from "@solana/web3.js";

import type { PublicKey as PublicKeyType } from "@solana/web3.js";

export default (address:string = ""):PublicKeyType | null => {
    try {
        return new PublicKey(address);
    } catch(error) {
        return null;
    }
};
