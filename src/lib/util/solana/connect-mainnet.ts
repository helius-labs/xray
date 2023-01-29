import { Connection } from "@solana/web3.js";

import { HELIUS_KEY } from "$env/static/private";

export default () => new Connection(
    `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`,
    "confirmed"
);
