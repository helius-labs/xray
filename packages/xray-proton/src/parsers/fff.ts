import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { EnrichedTransaction, TokenTransfer } from "helius-sdk";
import { ProtonTransaction, ProtonTransactionAction } from "../types";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseBorrowFox = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    const {
        type,
        source,
        signature,
        timestamp,
        tokenTransfers = [],
    } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const actions: ProtonTransactionAction[] = [];

    if (tokenTransfers === null) {
        return {
            actions,
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type,
        };
    }

    const primaryUser = tokenTransfers[0]?.fromUserAccount || "";

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

        // This is the first transfer, which is the foxy transfer
        if (i === 0) {
            if (!address) {
                const sent = tx.mint;
                actions.push({
                    actionType: "TRANSFER",
                    from,
                    fromName,
                    to,
                    toName,
                    sent,
                    amount,
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
                        from,
                        fromName,
                        to,
                        toName,
                        sent,
                        amount,
                    });
                } else if (actionType === "TRANSFER_RECEIVED") {
                    const received = tx.mint;
                    actions.push({
                        actionType,
                        from,
                        fromName,
                        to,
                        toName,
                        received,
                        amount,
                    });
                }
            }
            // This is the second transfer, which is the foxy burn
        } else if (i === 1) {
            const sent = tx.mint;
            actions.push({
                actionType: "BURN",
                from,
                fromName,
                to,
                toName,
                sent,
                amount,
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

export const parseLoanFox = (
    transaction: EnrichedTransaction
): ProtonTransaction => {
    const { signature, timestamp, type, source, accountData } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const actions: ProtonTransactionAction[] = [];

    if (!accountData) {
        return {
            actions,
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type,
        };
    }

    const primaryUser = accountData[0]?.account || "";
    const sent = accountData[8]?.account;

    actions.push({
        actionType: "FREEZE",
        from: primaryUser,
        fromName: getSolanaName(primaryUser),
        to: "",
        toName: undefined,
        sent,
        amount: 0,
    });

    return {
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
<<<<<<< HEAD
};
=======
};
>>>>>>> d40918a (chore: rebase)
