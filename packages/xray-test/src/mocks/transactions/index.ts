export * from "./swaps";
export * from "./transfers";

import { swapUsdcSol } from "./swaps";

import {
    transferMulti,
    transferNFT,
    transferSol,
    transferToken,
} from "./transfers";

export const transactionsVariety = [
    transferToken,
    swapUsdcSol,
    transferNFT,
    transferSol,
    transferMulti,
];
