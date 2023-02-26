import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { EnrichedTransaction, TokenTransfer } from "helius-sdk";
import { ProtonParser, ProtonTransactionAction, SOL } from "../types";
import { traverseNativeTransfers } from "../utils/native-transfers";
import { traverseTokenTransfers } from "../utils/token-transfers";

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

    traverseTokenTransfers(tokenTransfers, actions, address);
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
