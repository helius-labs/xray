import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { EnrichedTransaction, Source, TokenTransfer } from "helius-sdk";
import { ProtonTransaction, ProtonTransactionAction, SOL } from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { rentTransferCheck } from "../utils/rent-transfer-check";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseUnknown = (
    transaction: EnrichedTransaction,
    address: string | undefined
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

        const amount = tx.tokenAmount;

        if (!address) {
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
                address === tx.fromUserAccount
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

    traverseNativeTransfers(nativeTransfers, actions, address);

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
