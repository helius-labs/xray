import { Connection } from "@solana/web3.js";
const networks = {
    devnet: `https://rpc-devnet.helius.xyz/`,
    mainnet: `https://rpc.helius.xyz/`,
    solanaMainnet: "https://api.mainnet-beta.solana.com",
};
export const connect = (network = "mainnet", heliusKey) => {
    let url = networks[network];
    if (heliusKey) {
        url += `?api-key=${heliusKey}`;
    }
    return new Connection(url, "confirmed");
};
