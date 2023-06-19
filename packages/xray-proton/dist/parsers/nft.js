import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SOL, unknownProtonTransaction, } from "../types";
import { getSolanaName } from "@helius-labs/helius-namor";
import { traverseAccountData } from "../utils/account-data";
const generateDefaultTransaction = (type) => ({
    ...unknownProtonTransaction,
    type,
});
const generateNftTransaction = ({ transaction, event, primaryUser, accounts, actions, }) => ({
    ...generateDefaultTransaction(transaction.type),
    accounts,
    actions,
    fee: transaction.fee / LAMPORTS_PER_SOL,
    primaryUser,
    signature: event.signature,
    source: event.source,
    timestamp: event.timestamp * 1000,
});
export const parseNftSale = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const actions = [];
    const accounts = [];
    traverseAccountData(transaction.accountData, accounts);
    if (address) {
        let actionType = "NFT_SALE";
        if (nftEvent.buyer === address) {
            actionType = "NFT_BUY";
        }
        else if (nftEvent.seller === address) {
            actionType = "NFT_SELL";
        }
        transaction.type = actionType;
        if (actionType === "NFT_BUY") {
            actions.push({
                actionType: "SENT",
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: nftEvent.buyer,
                fromName: getSolanaName(nftEvent.buyer),
                sent: SOL,
                to: nftEvent.seller,
                toName: getSolanaName(nftEvent.seller),
            }, {
                actionType: "RECEIVED",
                amount: 1,
                from: nftEvent.seller,
                fromName: getSolanaName(nftEvent.seller),
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
        }
        else if (actionType === "NFT_SELL") {
            actions.push({
                actionType: "SENT",
                amount: 1,
                from: nftEvent.seller,
                fromName: getSolanaName(nftEvent.seller),
                sent: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            }, {
                actionType: "RECEIVED",
                amount: nftEvent.amount / LAMPORTS_PER_SOL,
                from: nftEvent.buyer,
                fromName: getSolanaName(nftEvent.buyer),
                received: SOL,
                to: nftEvent.seller,
                toName: getSolanaName(nftEvent.seller),
            });
            return generateNftTransaction({
                accounts,
                actions,
                event: nftEvent,
                primaryUser: nftEvent.seller,
                transaction,
            });
        }
    }
    actions.push({
        actionType: "TRANSFER",
        amount: nftEvent.amount / LAMPORTS_PER_SOL,
        from: nftEvent.buyer,
        fromName: getSolanaName(nftEvent.buyer),
        sent: SOL,
        to: nftEvent.seller,
        toName: getSolanaName(nftEvent.seller),
    }, {
        actionType: "TRANSFER",
        amount: 1,
        from: nftEvent.seller,
        fromName: getSolanaName(nftEvent.seller),
        received: (nftEvent.nfts || [{}])[0]?.mint,
        to: nftEvent.buyer,
        toName: getSolanaName(nftEvent.buyer),
    });
    return generateNftTransaction({
        accounts,
        actions,
        event: nftEvent,
        primaryUser: nftEvent.seller,
        transaction,
    });
};
export const parseNftList = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const accounts = [];
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
export const parseNftCancelList = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const accounts = [];
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
export const parseNftBid = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const accounts = [];
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
export const parseNftCancelBid = (transaction) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const accounts = [];
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
export const parseNftMint = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.nft;
    const { source, nativeTransfers, accountData } = transaction;
    if (!nftEvent || !nativeTransfers) {
        return generateDefaultTransaction(transaction.type);
    }
    const actions = [];
    const accounts = [];
    traverseAccountData(accountData, accounts);
    let mintAmount = 0;
    if (source === "SOLANA_PROGRAM_LIBRARY") {
        for (let i = 0; i < nativeTransfers.length; i++) {
            mintAmount += nativeTransfers[i].amount / LAMPORTS_PER_SOL;
        }
    }
    else {
        mintAmount = nftEvent.amount / LAMPORTS_PER_SOL;
    }
    if (!address) {
        actions.push({
            actionType: "TRANSFER",
            amount: mintAmount,
            from: nftEvent.buyer,
            fromName: getSolanaName(nftEvent.buyer),
            sent: SOL,
            to: "",
            toName: "",
        }, {
            actionType: "TRANSFER",
            amount: 1,
            from: "",
            fromName: "",
            received: (nftEvent.nfts || [{}])[0]?.mint,
            to: nftEvent.buyer,
            toName: getSolanaName(nftEvent.buyer),
        });
    }
    else {
        if (nftEvent.buyer !== address) {
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
        }
        else {
            actions.push({
                actionType: "SENT",
                amount: mintAmount,
                from: nftEvent.buyer,
                fromName: getSolanaName(nftEvent.buyer),
                sent: SOL,
                to: "",
                toName: "",
            }, {
                actionType: "RECEIVED",
                amount: 1,
                from: "",
                fromName: "",
                received: (nftEvent.nfts || [{}])[0]?.mint,
                to: nftEvent.buyer,
                toName: getSolanaName(nftEvent.buyer),
            });
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
export const parseCompressedNftMint = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.compressed;
    const { signature, timestamp, accountData, type, source } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const primaryUser = transaction.feePayer;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const actions = [];
    const accounts = [];
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
    }
    else if (address === transaction.feePayer) {
        actions.push({
            actionType: "AIRDROP",
            amount: 1,
            from: "",
            fromName: "",
            received: nftEvent[0].assetId,
            to: transaction.feePayer,
            toName: getSolanaName(transaction.feePayer),
        });
    }
    else {
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
export const parseCompressedNftTransfer = (transaction, address) => {
    // @ts-ignore
    const nftEvent = transaction.events.compressed;
    const { signature, timestamp, accountData, type, source } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    const primaryUser = transaction.feePayer;
    if (!nftEvent) {
        return generateDefaultTransaction(transaction.type);
    }
    const actions = [];
    const accounts = [];
    traverseAccountData(accountData, accounts);
    if (!address) {
        actions.push({
            actionType: "TRANSFER",
            amount: 1,
            from: nftEvent[0].oldLeafOwner,
            fromName: nftEvent[0].oldLeafOwner,
            sent: nftEvent[0].assetId,
            to: nftEvent[0].newLeafOwner,
            toName: getSolanaName(nftEvent[0].newLeafOwner),
        });
    }
    else {
        if ((address = nftEvent[0].oldLeafOwner)) {
            actions.push({
                actionType: "TRANSFER_SENT",
                amount: 1,
                from: nftEvent[0].oldLeafOwner,
                fromName: nftEvent[0].oldLeafOwner,
                sent: nftEvent[0].assetId,
                to: nftEvent[0].newLeafOwner,
                toName: getSolanaName(nftEvent[0].newLeafOwner),
            });
        }
        else if (address === nftEvent[0].newLeafOwner) {
            actions.push({
                actionType: "TRANSFER_RECEIVED",
                amount: 1,
                from: nftEvent[0].oldLeafOwner,
                fromName: nftEvent[0].oldLeafOwner,
                received: nftEvent[0].assetId,
                to: nftEvent[0].newLeafOwner,
                toName: getSolanaName(nftEvent[0].newLeafOwner),
            });
        }
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
