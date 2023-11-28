import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { NativeTransfer } from "helius-sdk";
import { type ProtonTransactionAction, SOL } from "../types";
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

            const to = tx.toUserAccount || "";

            const amount = tx.amount / LAMPORTS_PER_SOL;

            if (!address) {
                actions.push({
                    actionType: "TRANSFER",
                    amount,
                    from,
                    sent: SOL,
                    to,
                });
            } else if (
                tx.fromUserAccount !== address &&
                tx.toUserAccount !== address
            ) {
                actions.push({
                    actionType: "TRANSFER",
                    amount,
                    from,
                    sent: SOL,
                    to,
                });
            } else {
                let actionType = "";
                if (tx.fromUserAccount === address) {
                    actionType = "SENT";
                } else if (tx.toUserAccount === address) {
                    actionType = "RECEIVED";
                }

                if (actionType === "SENT") {
                    actions.push({
                        actionType,
                        amount,
                        from,
                        sent: SOL,
                        to,
                    });
                } else if (actionType === "RECEIVED") {
                    actions.push({
                        actionType,
                        amount,
                        from,
                        received: SOL,
                        to,
                    });
                }
            }
        }
    }
};
