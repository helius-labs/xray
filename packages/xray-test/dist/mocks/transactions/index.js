export * from "./swaps";
export * from "./transfers";
import { swapUsdcSol } from "./swaps";
import { transferMulti, transferNFT, transferSol, transferToken, } from "./transfers";
import { burnToken, burnNFT } from "./burns";
export const transactionsVariety = [
    transferToken,
    swapUsdcSol,
    burnToken,
    transferNFT,
    burnNFT,
    transferSol,
    transferMulti,
];
