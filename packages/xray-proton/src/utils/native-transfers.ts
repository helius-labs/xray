import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NativeTransfer } from "helius-sdk";
import { ProtonTransactionAction, SOL } from "../types";
import { rentTransferCheck } from "./rent-transfer-check";

export const traverseNativeTransfers = (
    nativeTransfers: NativeTransfer[],
    actions: ProtonTransactionAction[],
    address: string | undefined
) => {
    for (let i = 0; i < nativeTransfers.length; i++) {
        const tx = nativeTransfers[i];

        if (!rentTransferCheck(tx.amount)) {
            const from = tx.fromUserAccount || "";
            let fromName;
            if (tx.fromUserAccount) {
                fromName = getSolanaName(tx.fromUserAccount);
            }

            const to = tx.toUserAccount || "";
            let toName;
            if (tx.toUserAccount) {
                toName = getSolanaName(tx.toUserAccount);
            }

            const amount = tx.amount / LAMPORTS_PER_SOL;

            if (!address) {
                const sent = SOL;
                actions.push({
                    actionType: "TRANSFER",
                    amount,
                    from,
                    fromName,
                    sent,
                    to,
                    toName,
                });
            } else {
                let actionType = "";
                if (tx.fromUserAccount === address) {
                    actionType = "TRANSFER_SENT";
                } else if (tx.toUserAccount === address) {
                    actionType = "TRANSFER_RECEIVED";
                }

                if (actionType === "TRANSFER_SENT") {
                    const sent = SOL;
                    actions.push({
                        actionType,
                        amount,
                        from,
                        fromName,
                        sent,
                        to,
                        toName,
                    });
                } else if (actionType === "TRANSFER_RECEIVED") {
                    const received = SOL;
                    actions.push({
                        actionType,
                        amount,
                        from,
                        fromName,
                        received,
                        to,
                        toName,
                    });
                }
            }
        }
    }
};
