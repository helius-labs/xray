import type {
    Transaction,
    TransactionActionType,
    TransferType,
} from "$lib/next/types";

import {
    TRANSACTION,
    SOL,
    MINIMUM_TRANSACTION_AMOUNT,
} from "$lib/next/constants";

import { TRANSACTION_TYPES } from "$lib/next/transaction-parser/config";

import type {
    CompressedNftEvent,
    EnrichedTransaction,
    NativeTransfer,
    TokenTransfer,
} from "helius-sdk";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const addressInvolved = (
    {
        fromUserAccount: a = "",
        toUserAccount: b = "",
    }: NativeTransfer | TokenTransfer,
    address: string
) => a && b && (a === address || b === address);

export const parseTransaction = (
    enriched: EnrichedTransaction,
    userAddress: string
): Transaction => {
    const mintBalances: Map<string, number> = new Map();

    const transaction = TRANSACTION({
        accounts: [],
        actions: [],
        fee: enriched.fee,
        id: enriched.signature,
        raw: enriched,
        source: enriched.source,
        timestamp: enriched.timestamp * 1000,
        type: enriched.type,
    });

    // Parse normal token and native transfers
    const parseTransfer = ({
        tokenTransfer,
        nativeTransfer,
        address,
    }: {
        tokenTransfer?: TokenTransfer;
        nativeTransfer?: NativeTransfer;
        address: string;
    }) => {
        let transferType: TransferType = nativeTransfer ? "native" : "token";

        let actionType: TransactionActionType = "UNKNOWN";

        let transfer = nativeTransfer || tokenTransfer;

        if (transfer?.fromUserAccount === address) {
            actionType = "SENT";
        } else if (transfer?.toUserAccount === address) {
            actionType = "RECEIVED";
        }

        let amount = 0;

        if (transferType === "native" && nativeTransfer?.amount) {
            amount = nativeTransfer?.amount / LAMPORTS_PER_SOL;
        } else if (transferType === "token" && tokenTransfer?.tokenAmount) {
            amount = tokenTransfer.tokenAmount;
        }

        let mint = SOL;

        if (tokenTransfer?.mint) {
            mint = tokenTransfer.mint;
        }

        const mintBalance = mintBalances.get(mint) || 0;

        if (actionType === "SENT") {
            mintBalances.set(mint, mintBalance - amount);
        } else if (actionType === "RECEIVED") {
            mintBalances.set(mint, mintBalance + amount);
        }

        return {
            actionType,
            amount,
            from: transfer?.fromUserAccount || "",
            to: transfer?.toUserAccount || "",
            token: mint,
            transferType,
        };
    };

    // Process all token transfers
    for (let i = 0; i < (enriched?.tokenTransfers || []).length; i++) {
        const tokenTransfer = enriched?.tokenTransfers
            ? enriched?.tokenTransfers[i]
            : undefined;

        const processed = parseTransfer({
            address: userAddress,
            tokenTransfer,
        });

        if (!tokenTransfer || !addressInvolved(tokenTransfer, userAddress)) {
            continue;
        }

        transaction.actions.push(processed);
    }

    // Process all native transfers
    for (let i = 0; i < (enriched?.nativeTransfers || [])?.length; i++) {
        const nativeTransfer = enriched?.nativeTransfers
            ? enriched?.nativeTransfers[i]
            : undefined;

        const processed = parseTransfer({
            address: userAddress,
            nativeTransfer,
        });

        if (
            !nativeTransfer ||
            !addressInvolved(nativeTransfer, userAddress) ||
            processed.amount < MINIMUM_TRANSACTION_AMOUNT
        ) {
            continue;
        }

        transaction.actions.push(processed);
    }

    transaction.actions = transaction.actions
        .filter((action) => mintBalances.get(action.token))
        .sort(({ actionType: a }, { actionType: b }) => b.localeCompare(a));

    // Run transaction through type parser if we have one
    const { parser } = TRANSACTION_TYPES[transaction.type as string] || {};

    if (parser) {
        transaction.actions = parser(transaction, userAddress);
    }

    return transaction;
};

export * from "./config";
