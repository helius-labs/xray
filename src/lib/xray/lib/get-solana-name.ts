import { publicKeyMappings } from "../config";

// @ts-ignore
export const getSolanaName = (publicKey) => publicKeyMappings[publicKey];
