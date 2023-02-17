import { Connection } from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

const networks = {
    devnet: `https://rpc-devnet.helius.xyz/?api-key=${HELIUS_KEY}`,
    mainnet: `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
    solanaMainnet: "https://api.mainnet-beta.solana.com",
};

export default (network: "devnet" | "mainnet" = "mainnet") => {
    if (!HELIUS_KEY) {
        return new Connection(networks.solanaMainnet, "confirmed");
    }

    return new Connection(networks[network], "confirmed");
};
