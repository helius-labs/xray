import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { EnrichedTransaction, Source, TokenTransfer } from "helius-sdk";
import { ProtonTransaction, ProtonTransactionAction, SOL } from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseTransfer = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    const {
        signature,
        timestamp,
        tokenTransfers = [],
        nativeTransfers = [],
    } = transaction;

    const type = "TRANSFER";
    let source = "SYSTEM_PROGRAM" as Source;

    if (tokenTransfers === null || nativeTransfers === null) {
        return {
            actions: [],
            fee: 0,
            primaryUser: "",
            signature: "",
            source,
            timestamp: 0,
            type,
        };
    }

    const primaryUser = tokenTransfers[0]?.fromUserAccount || "";
    const fee = transaction.fee / LAMPORTS_PER_SOL;

    source = transaction.source;

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

        if (address === undefined) {
            const sent = tx.mint;
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
            const actionType =
                tx.fromUserAccount === address
                    ? "TRANSFER_SENT"
                    : "TRANSFER_RECEIVED";

            if (actionType === "TRANSFER_SENT") {
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
            } else if (actionType === "TRANSFER_RECEIVED") {
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

    const nativeTransfersLength =
        nativeTransfers.length - tokenTransfers.length;

    for (let i = 0; i < nativeTransfersLength; i++) {
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

        const amount = tx.amount / LAMPORTS_PER_SOL;
        if (address === undefined) {
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
            const actionType =
                tx.fromUserAccount === address
                    ? "TRANSFER_SENT"
                    : "TRANSFER_RECEIVED";

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
