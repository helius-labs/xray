import { Connection } from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

const networks = {
    devnet: `https://rpc-devnet.helius.xyz/?api-key=${HELIUS_KEY}`,
    mainnet: `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
};

export default (network: "devnet" | "mainnet" = "mainnet") =>
    new Connection(networks[network], "confirmed");
