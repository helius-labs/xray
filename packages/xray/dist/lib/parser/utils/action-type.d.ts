import { NativeTransfer, TokenTransfer } from "helius-sdk";
type MergedTransfer = TokenTransfer | NativeTransfer;
export declare const transferType: (transfer: MergedTransfer, address: string | undefined) => "TRANSFER" | "TRANSFER_SENT" | "TRANSFER_RECEIVED";
export {};
