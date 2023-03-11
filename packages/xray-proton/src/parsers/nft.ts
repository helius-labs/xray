import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type {
    EnrichedTransaction,
    NFTEvent,
    TransactionType,
} from "helius-sdk";

import {
    ProtonAccount,
    ProtonParser,
    ProtonTransactionAction,
    SOL,
    unknownProtonTransaction,
} from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";
import { traverseAccountData } from "../utils/account-data";

const generateDefaultTransaction = (type: TransactionType) => ({
    ...unknownProtonTransaction,
    type,
});

const generateNftTransaction = ({
    transaction,
    event,
    primaryUser,
    accounts,
    actions,
}: {
    transaction: EnrichedTransaction;
    event: NFTEvent;
    primaryUser: string;
    accounts: ProtonAccount[];
    actions: ProtonTransactionAction[];
}) => ({
    ...generateDefaultTransaction(transaction.type),
    accounts,
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

    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    traverseAccountData(transaction.accountData, accounts);

    if (address) {
        let actionType = "NFT_SALE";
        if (nftEvent.buyer === address) {
            actionType = "NFT_BUY";
        } else if (nftEvent.seller === address) {
            actionType = "NFT_SELL";
        }

        transaction.type = actionType as TransactionType;

        if (actionType === "NFT_BUY") {
            actions.push(
                {
                    actionType: "SENT",
                    amount: nftEvent.amount / LAMPORTS_PER_SOL,
                    from: nftEvent.buyer,
                    fromName: getSolanaName(nftEvent.buyer),
                    sent: SOL,
                    to: nftEvent.seller,
                    toName: getSolanaName(nftEvent.seller),
                },
                {
                    actionType: "RECEIVED",
                    amount: 1,
                    from: nftEvent.seller,
                    fromName: getSolanaName(nftEvent.seller),
                    received: (nftEvent.nfts || [{}])[0]?.mint,
                    to: nftEvent.buyer,
                    toName: getSolanaName(nftEvent.buyer),
                }
            );
            return generateNftTransaction({
                accounts,
                actions,
                event: nftEvent,
                primaryUser: nftEvent.buyer,
                transaction,
            });
        } else if (actionType === "NFT_SELL") {
            actions.push(
                {
                    actionType: "SENT",
                    amount: 1,
                    from: nftEvent.seller,
                    fromName: getSolanaName(nftEvent.seller),
                    sent: (nftEvent.nfts || [{}])[0]?.mint,
                    to: nftEvent.buyer,
                    toName: getSolanaName(nftEvent.buyer),
                },
                {
                    actionType: "RECEIVED",
                    amount: nftEvent.amount / LAMPORTS_PER_SOL,
                    from: nftEvent.buyer,
                    fromName: getSolanaName(nftEvent.buyer),
                    received: SOL,
                    to: nftEvent.seller,
                    toName: getSolanaName(nftEvent.seller),
                }
            );
            return generateNftTransaction({
                accounts,
                actions,
                event: nftEvent,
                primaryUser: nftEvent.seller,
                transaction,
            });
        }
    }

    actions.push(
        {
            actionType: "TRANSFER",
            amount: nftEvent.amount / LAMPORTS_PER_SOL,
            from: nftEvent.buyer,
            fromName: getSolanaName(nftEvent.buyer),
            sent: SOL,
            to: nftEvent.seller,
            toName: getSolanaName(nftEvent.seller),
        },
        {
            actionType: "TRANSFER",
            amount: 1,
            from: nftEvent.seller,
            fromName: getSolanaName(nftEvent.seller),
            received: (nftEvent.nfts || [{}])[0]?.mint,
            to: nftEvent.buyer,
            toName: getSolanaName(nftEvent.buyer),
        }
    );

    return generateNftTransaction({
        accounts,
        actions,
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

    const accounts: ProtonAccount[] = [];
    traverseAccountData(transaction.accountData, accounts);

    return generateNftTransaction({
        accounts,
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

    const accounts: ProtonAccount[] = [];
    traverseAccountData(transaction.accountData, accounts);

    return generateNftTransaction({
        accounts,
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

    const accounts: ProtonAccount[] = [];
    traverseAccountData(transaction.accountData, accounts);

    return generateNftTransaction({
        accounts,
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

    const accounts: ProtonAccount[] = [];
    traverseAccountData(transaction.accountData, accounts);

    return generateNftTransaction({
        accounts,
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
    const { source, nativeTransfers, accountData } = transaction;

    if (!nftEvent || !nativeTransfers) {
        return generateDefaultTransaction(transaction.type);
    }

    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    traverseAccountData(accountData, accounts);

    let mintAmount = 0;
    if (source === "SOLANA_PROGRAM_LIBRARY") {
        for (let i = 0; i < nativeTransfers.length; i++) {
            mintAmount += nativeTransfers[i].amount / LAMPORTS_PER_SOL;
        }
    } else {
        mintAmount = nftEvent.amount / LAMPORTS_PER_SOL;
    }

    if (!address) {
        actions.push(
            {
                actionType: "TRANSFER",
                amount: mintAmount,
                from: nftEvent.buyer,
                fromName: getSolanaName(nftEvent.buyer),
                sent: SOL,
                to: "",
                toName: "",
            },
            {
                actionType: "TRANSFER",
                amount: 1,
                from: "",
                fromName: "",
                received: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            }
        );
    } else {
        if (nativeTransfers[0].fromUserAccount !== address) {
            actions.push({
                actionType: "AIRDROP",
                amount: 1,
                from: "",
                fromName: "",
                received: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            });
            return generateNftTransaction({
                accounts,
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
        accounts,
        actions,
        event: nftEvent,
        primaryUser: nftEvent.buyer,
        transaction,
    });
};

export const parseCompressedNftMint: ProtonParser = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.compressed;
    const { signature, timestamp, accountData, type, source } = transaction;

    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const primaryUser = transaction.feePayer;

    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }

    const actions: ProtonTransactionAction[] = [];
    const accounts: ProtonAccount[] = [];

    traverseAccountData(accountData, accounts);

    if (!address) {
        actions.push({
            actionType: "TRANSFER",
            amount: 1,
            from: "",
            fromName: "",
            sent: nftEvent[0].assetId,
            to: transaction.feePayer,
            toName: getSolanaName(transaction.feePayer),
        });
    } else if (address === transaction.feePayer) {
        actions.push({
            actionType: "AIRDROP",
            amount: 1,
            from: "",
            fromName: "",
            received: nftEvent[0].assetId,
            to: transaction.feePayer,
            toName: getSolanaName(transaction.feePayer),
        });
    } else {
        actions.push({
            actionType: "RECEIVED",
            amount: 1,
            from: "",
            fromName: "",
            received: nftEvent[0].assetId,
            to: transaction.feePayer,
            toName: getSolanaName(transaction.feePayer),
        });
    }

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
