import { EnrichedTransaction } from "helius-sdk";
import { ProtonTransaction } from "../types";
export declare const parseBorrowFox: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
export declare const parseLoanFox: (transaction: EnrichedTransaction) => ProtonTransaction;
