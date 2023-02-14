import { Connection } from "@solana/web3.js";

import { HELIUS_KEY } from "$env/static/private";

const networks = {
    mainnet: `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
    devnet: `https://rpc-devnet.helius.xyz/?api-key=${HELIUS_KEY}`,
};

export default (network: "devnet" | "mainnet" = "mainnet") =>
    new Connection(networks[network], "confirmed");
