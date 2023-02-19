import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { EnrichedTransaction, Source, TokenTransfer } from "helius-sdk";
import { ProtonTransaction, ProtonTransactionAction } from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";
import { rentTransferCheck } from "../utils/rent-transfer-check";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseUnknown = (
    transaction: EnrichedTransaction
): ProtonTransaction => {
    const {
        signature,
        timestamp,
        type,
        source,
        tokenTransfers = [],
        nativeTransfers = [],
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

    const primaryUser =
        tokenTransfers[0]?.fromUserAccount ||
        nativeTransfers[0]?.fromUserAccount ||
        "";

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

        const sent = tx.mint;
        const amount = tx.tokenAmount;

        actions.push({
            amount,
            from,
            fromName,
            sent,
            to,
            toName,
        });
    }

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

            const sent = "So11111111111111111111111111111111111111112";
            const amount = tx.amount / LAMPORTS_PER_SOL;

            actions.push({
                amount,
                from,
                fromName,
                sent,
                to,
                toName,
            });
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
