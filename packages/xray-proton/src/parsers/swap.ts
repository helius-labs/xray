import { getSolanaName } from "@helius-labs/helius-namor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { EnrichedTransaction, Source, TokenTransfer } from "helius-sdk";

import { ProtonTransaction, ProtonTransactionAction, SOL } from "../types";
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
    const {
        type,
        source,
        signature,
        timestamp,
        tokenTransfers,
        nativeTransfers,
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

    const primaryUser = tokenTransfers[0].fromUserAccount || "";
    const actions: ProtonTransactionAction[] = [];

    if (source === "HADESWAP") {
        address = undefined;
        traverseTokenTransfers(tokenTransfers, actions, address);
        traverseNativeTransfers(nativeTransfers, actions, address);
    } else {
        traverseTokenTransfers(tokenTransfers, actions, address);
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
