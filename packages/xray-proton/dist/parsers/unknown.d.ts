import type { EnrichedTransaction } from "helius-sdk";
import { ProtonTransaction } from "../types";
export declare const parseUnknown: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
