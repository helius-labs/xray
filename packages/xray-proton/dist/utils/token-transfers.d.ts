import { TokenTransfer } from "helius-sdk";
import { ProtonActionType, ProtonTransactionAction } from "../types";
export declare const traverseTokenTransfers: (tokenTransfers: TokenTransfer[], actions: ProtonTransactionAction[], address: string | undefined, type?: ProtonActionType) => void;
