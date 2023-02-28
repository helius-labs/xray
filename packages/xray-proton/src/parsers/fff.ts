import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { EnrichedTransaction, TokenTransfer } from "helius-sdk";
import {
    ProtonAccount,
    ProtonTransaction,
    ProtonTransactionAction,
} from "../types";
import { traverseAccountData } from "../utils/account-data";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseBorrowFox = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    const { type, source, signature, timestamp, tokenTransfers, accountData } =
        transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    if (tokenTransfers === null) {
        return {
            accounts,
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
            // This is the second transfer, which is the foxy burn
        } else if (i === 1) {
            const sent = tx.mint;
            actions.push({
                actionType: "BURN",
                amount,
                from,
                fromName,
                sent,
                to,
                toName,
            });
        }
    }

    traverseAccountData(accountData, accounts);

    return {
        accounts,
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
    const accounts: ProtonAccount[] = [];

    if (!accountData) {
        return {
            accounts,
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
        amount: 0,
        from: primaryUser,
        fromName: getSolanaName(primaryUser),
        sent,
        to: "",
        toName: undefined,
    });

    traverseAccountData(accountData, accounts);

    return {
        accounts,
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
