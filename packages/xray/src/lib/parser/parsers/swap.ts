import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, TokenTransfer } from "helius-sdk";

import {
    ProtonAccount,
    ProtonTransaction,
    ProtonTransactionAction,
    SOL,
} from "../types";

import { traverseAccountData } from "../utils/account-data";
import { transferType } from "../utils/action-type";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseSwap = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    // @ts-ignore
    const swapEvent = transaction.events.swap;
    const { type, source, signature, timestamp, accountData, tokenTransfers } =
        transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;

    if (swapEvent === null || transaction.tokenTransfers === null) {
        return {
            accounts: [],
            actions: [],
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type,
        };
    }

    const primaryUser = transaction.tokenTransfers[0].fromUserAccount || "";

    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    for (let i = 0; i < swapEvent.innerSwaps.length; i++) {
        const innerSwap = swapEvent.innerSwaps;
        for (let j = 0; j < innerSwap.length; j++) {
            const swap = innerSwap[j];
            const { tokenInputs, tokenOutputs, tokenFees, nativeFees } = swap;
            for (let k = 0; k < tokenInputs.length; k++) {
                const tokenInput = tokenInputs[k];
                actions.push({
                    actionType: transferType(tokenInput, address),
                    amount: tokenInput.tokenAmount,
                    from: tokenInput.fromUserAccount || "",
                    sent: tokenInput.mint,
                    to: tokenInput.toUserAccount || "",
                });
            }
            for (let k = 0; k < tokenOutputs.length; k++) {
                const tokenOutput = tokenOutputs[k];
                actions.push({
                    actionType: transferType(tokenOutput, address),
                    amount: tokenOutput.tokenAmount,
                    from: tokenOutput.fromUserAccount || "",
                    sent: tokenOutput.mint,
                    to: tokenOutput.toUserAccount || "",
                });
            }
            for (let k = 0; k < tokenFees.length; k++) {
                const tokenFee = tokenFees[k];
                actions.push({
                    actionType: transferType(tokenFee, address),
                    amount: tokenFee.tokenAmount,
                    from: tokenFee.fromUserAccount || "",
                    sent: tokenFee.mint,
                    to: tokenFee.toUserAccount || "",
                });
            }
            for (let k = 0; k < nativeFees.length; k++) {
                const nativeFee = nativeFees[k];
                actions.push({
                    actionType: transferType(nativeFee, address),
                    amount: nativeFee.amount,
                    from: nativeFee.fromUserAccount || "",
                    sent: SOL,
                    to: nativeFee.toUserAccount || "",
                });
            }
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
