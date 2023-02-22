import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type {
    EnrichedTransaction,
    NFTEvent,
    TransactionType,
} from "helius-sdk";

import {
    ProtonParser,
    ProtonTransactionAction,
    SOL,
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

export const parseNftSale: ProtonParser = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    if (address) {
        const actionType = nftEvent.buyer === address ? "NFT_BUY" : "NFT_SELL";

        if (actionType === "NFT_BUY") {
            return generateNftTransaction({
                actions: [
                    {
                        // @ts-ignore
                        actionType,
                        amount: nftEvent.amount / LAMPORTS_PER_SOL,
                        from: nftEvent.buyer,
                        fromName: getSolanaName(nftEvent.buyer),
                        received: (nftEvent.nfts || [{}])[0]?.mint,
                        sent: SOL,
                        to: nftEvent.seller,
                        toName: getSolanaName(nftEvent.seller),
                    },
                ],
                event: nftEvent,
                primaryUser: nftEvent.buyer,
                transaction,
            });
        } else if (actionType === "NFT_SELL") {
            return generateNftTransaction({
                actions: [
                    {
                        // @ts-ignore
                        actionType,
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
        }
    }

    return generateNftTransaction({
        actions: [
            {
                // @ts-ignore
                actionType: "NFT_SALE",
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
                actionType: "NFT_LISTING",
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
                actionType: "NFT_CANCEL_LISTING",
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
                actionType: "NFT_BID",
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
                actionType: "NFT_BID_CANCELLED",
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

export const parseNftMint: ProtonParser = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    const { nativeTransfers } = transaction;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    const actions: ProtonTransactionAction[] = [];

    let mintAmount = nftEvent.amount / LAMPORTS_PER_SOL;
    let index = 0;
    if (nativeTransfers) {
        for (let i = 0; i < nativeTransfers.length; i++) {
            const nativeTransferAmount =
                nativeTransfers[i].amount / LAMPORTS_PER_SOL;
            if (nativeTransferAmount > mintAmount) {
                mintAmount = nativeTransferAmount;
                index = i;
            }
        }

        if (nativeTransfers[index].fromUserAccount !== address) {
            actions.push({
                actionType: "NFT_MINT_AIRDROP",
                amount: 1,
                from: "",
                fromName: "",
                received: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            });
            return generateNftTransaction({
                actions,
                event: nftEvent,
                primaryUser: nftEvent.buyer,
                transaction,
            });
        } else {
            actions.push(
                {
                    actionType: "SENT",
                    amount: mintAmount,
                    from: nftEvent.buyer,
                    fromName: getSolanaName(nftEvent.buyer),
                    sent: SOL,
                    to: "",
                    toName: "",
                },
                {
                    actionType: "RECEIVED",
                    amount: 1,
                    from: "",
                    fromName: "",
                    received: (nftEvent.nfts || [{}])[0]?.mint,
                    to: nftEvent.buyer,
                    toName: getSolanaName(nftEvent.buyer),
                }
            );
        }
    }

    return generateNftTransaction({
        actions,
        event: nftEvent,
        primaryUser: nftEvent.buyer,
        transaction,
    });
};
