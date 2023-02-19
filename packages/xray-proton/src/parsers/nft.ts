import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type {
    EnrichedTransaction,
    NFTEvent,
    TransactionType,
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
                sent: (nftEvent.nfts || [{}])[0]?.mint,
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
                sent: (nftEvent.nfts || [{}])[0]?.mint,
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
                sent: (nftEvent.nfts || [{}])[0]?.mint,
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
                sent: (nftEvent.nfts || [{}])[0]?.mint,
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
                sent: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};

export const parseNftMint: ProtonParser = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    const { nativeTransfers } = transaction;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    let mintAmount = 0;
    if (nativeTransfers) {
        for (let i = 0; i < nativeTransfers.length; i++) {
            const nativeTransferAmount =
                nativeTransfers[i].amount / LAMPORTS_PER_SOL;
            if (nativeTransferAmount > mintAmount) {
                mintAmount = nativeTransferAmount;
            }
        }
    }
    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                amount: mintAmount,
                from: "",
                fromName: "",
                received: (nftEvent.nfts || [{}])[0]?.mint,
                sent: SOL,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            },
        ],
        event: nftEvent,
        primaryUser: nftEvent.buyer,
        transaction,
    });
};
