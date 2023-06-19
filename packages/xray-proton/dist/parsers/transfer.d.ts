import type { EnrichedTransaction } from "helius-sdk";
import { ProtonTransaction } from "../types";
export declare const parseTransfer: (transaction: EnrichedTransaction, address: string | undefined) => ProtonTransaction;
