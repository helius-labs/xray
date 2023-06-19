import { PublicKey } from "@solana/web3.js";
export const isValidPublicKey = (address = "") => {
    try {
        return new PublicKey(address.trim());
    }
    catch (error) {
        return null;
    }
};
