import { Connection } from "@solana/web3.js";
declare const networks: {
    devnet: string;
    mainnet: string;
    solanaMainnet: string;
};
export type Network = keyof typeof networks;
export declare const connect: (network?: Network, heliusKey?: string) => Connection;
export {};
