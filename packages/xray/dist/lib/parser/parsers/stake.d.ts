import { EnrichedTransaction } from "helius-sdk";
import { ProtonTransaction } from "../types";
export declare const parseStakeSol: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
