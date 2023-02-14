import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type {
    TransactionType,
    NFTEvent,
    EnrichedTransaction,
} from "helius-sdk";

import {
    ProtonParser,
    ProtonTransactionAction,
    unknownProtonTransaction,
} from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";

const generateDefaultTransaction = (type: TransactionType) => ({
    ...unknownProtonTransaction,
    type,
});

const generateNftTransaction = ({
    transaction,
    event,
    primaryUser,
    actions,
}: {
    transaction: EnrichedTransaction;
    event: NFTEvent;
    primaryUser: string;
    actions: ProtonTransactionAction[];
}) => ({
    ...generateDefaultTransaction(transaction.type),
    actions,
    fee: transaction.fee / LAMPORTS_PER_SOL,
    primaryUser,
    signature: event.signature,
    source: event.source,
    timestamp: event.timestamp * 1000,
});

const SOL = "So11111111111111111111111111111111111111112";

export const parseNftList: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: nftEvent.seller,
                fromName: getSolanaName(nftEvent.seller || ""),
                sent: (nftEvent.tokensInvolved || [])[0]?.mint,
                to: "",
                toName: "",
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftSale: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: nftEvent.seller,
                fromName: getSolanaName(nftEvent.seller),
                received: SOL,
                sent: (nftEvent.tokensInvolved || [])[0].mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftCancelList: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: nftEvent.seller,
                fromName: getSolanaName(nftEvent.seller),
                sent: (nftEvent.tokensInvolved || [])[0].mint,
                to: "",
                toName: "",
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftCancelBid: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: "",
                fromName: "",
                sent: (nftEvent.tokensInvolved || [])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftBid: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: "",
                fromName: "",
                sent: (nftEvent.tokensInvolved || [])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftBurn: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: "",
                fromName: "",
                sent: (nftEvent.tokensInvolved || [])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};
