import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Token, TokenTransfer } from "helius-sdk";
import { ProtonActionType, ProtonTransactionAction, SOL } from "../types";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const traverseTokenTransfers = (
    tokenTransfers: TokenTransfer[],
    actions: ProtonTransactionAction[],
    address: string | undefined,
    type?: ProtonActionType
) => {
    for (let i = 0; i < tokenTransfers.length; i++) {
        const tx = tokenTransfers[i] as TempTokenTransfer;

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

        const amount = tx.tokenAmount;

        if (!address) {
            const sent = tx.mint;
            actions.push({
                actionType: type as ProtonActionType | "TRANSFER",
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
                actionType = "SENT";
            } else if (tx.toUserAccount === address) {
                actionType = "RECEIVED";
            }

            if (actionType === "SENT") {
                const sent = tx.mint;
                actions.push({
                    actionType,
                    amount,
                    from,
                    fromName,
                    sent,
                    to,
                    toName,
                });
            } else if (actionType === "RECEIVED") {
                const received = tx.mint;
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
};
