import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, TokenTransfer } from "helius-sdk";

import {
    ProtonAccount,
    ProtonTransaction,
    ProtonTransactionAction,
    SOL,
} from "../types";

import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { rentTransferCheck } from "../utils/rent-transfer-check";
import { traverseTokenTransfers } from "../utils/token-transfers";

interface TempTokenTransfer extends TokenTransfer {
    tokenAmount: number;
}

export const parseSwap = (
    transaction: EnrichedTransaction,
    address: string | undefined
): ProtonTransaction => {
    // @ts-ignore
    const swapEvent = transactions.events.nft;
    const { type, source, signature, timestamp, accountData } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;

    if (
        transaction.tokenTransfers === null ||
        transaction.nativeTransfers === null
    ) {
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
        for (let j = 0; j < swapEvent.innerSwaps[i].length; j++) {
            actions.push({
                actionType: "TRANSFER",
                amount: swapEvent.innerSwaps[i][j].tokenAmount,
                from: swapEvent.innerSwaps[i][j].fromUserAccount,
                sent: swapEvent.innerSwaps[i][j].mint,
                to: swapEvent.innerSwaps[i][j].toUserAccount,
            });
        }
    }

    // if (source === "HADESWAP") {
    //     traverseTokenTransfers(tokenTransfers, actions, address);
    //     traverseNativeTransfers(nativeTransfers, actions, address);
    // } else {
    //     traverseTokenTransfers(tokenTransfers, actions, address);
    // }
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
