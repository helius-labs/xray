import { NativeTransfer, TokenTransfer } from "helius-sdk";

type MergedTransfer = TokenTransfer | NativeTransfer;

export const transferType = (
    transfer: MergedTransfer,
    address: string | undefined
) => {
    if (transfer.fromUserAccount === address) {
        return "TRANSFER_SENT";
    } else if (transfer.toUserAccount === address) {
        return "TRANSFER_RECEIVED";
    } else {
        return "TRANSFER";
    }
};
