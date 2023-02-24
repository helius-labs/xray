import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { EnrichedTransaction, TokenTransfer } from "helius-sdk";
import { ProtonParser, ProtonTransactionAction, SOL } from "../types";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseTokenMint: ProtonParser = (
    transaction: EnrichedTransaction,
    address: string | undefined
) => {
    const {
        signature,
        timestamp,
        tokenTransfers = [],
        nativeTransfers = [],
        type,
        source,
    } = transaction;

    const fee = transaction.fee / LAMPORTS_PER_SOL;

    if (tokenTransfers === null || nativeTransfers === null) {
        return {
            actions: [],
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type,
        };
    }

    const primaryUser = nativeTransfers[0]?.fromUserAccount || "";
    const actions: ProtonTransactionAction[] = [];

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

        const amount = tx?.tokenAmount;

        if (!address) {
            const sent = tx.mint;
            actions.push({
                actionType: "SENT",
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

    for (let i = 0; i < nativeTransfers.length; i++) {
        const tx = nativeTransfers[i];

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

        const amount = tx?.amount / LAMPORTS_PER_SOL;

        if (!address) {
            actions.push({
                actionType: "SENT",
                amount,
                from,
                fromName,
                sent: SOL,
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
                actions.push({
                    actionType,
                    amount,
                    from,
                    fromName,
                    sent: SOL,
                    to,
                    toName,
                });
            } else if (actionType === "RECEIVED") {
                actions.push({
                    actionType,
                    amount,
                    from,
                    fromName,
                    received: SOL,
                    to,
                    toName,
                });
            }
        }
    }

    return {
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
