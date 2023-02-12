import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type {
    EnrichedTransaction,
    Source
} from "helius-sdk";
import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../../types";

import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type {
    EnrichedTransaction,
    Source
} from "helius-sdk";
import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../../types";

export const parseNftBid = (transaction: EnrichedTransaction): ProtonTransaction => {
    let source = "SYSTEM_PROGRAM" as Source;

    if(transaction?.events.nft === null) {
        return {
            type        : "NFT_BID",
            primaryUser : "",
            fee         : 0,
            signature   : "",
            timestamp   : 0,
            source,
            actions     : [],
        };
    }

    const nftEvent = transaction?.events.nft;
    const actions: ProtonTransactionAction[] = [];

    const primaryUser = transaction.buyer;

    const {
        type,
        signature,
        timestamp,
    } = nftEvent;
    const fee = nftEvent.fee / LAMPORTS_PER_SOL;

    source = nftEvent.source;

    const from = "";
    const fromName = undefined;
    const to = nftEvent.buyer;
    const toName = getSolanaName(nftEvent.buyer);
    const received = nftEvent.nfts[0].mint;
    const amount = nftEvent.amount / LAMPORTS_PER_SOL;

    actions.push({
        from,
        fromName,
        to,
        toName,
        received,
        amount,
    });

    return {
        type,
        primaryUser,
        fee,
        signature,
        timestamp,
        source,
        actions,
    };
};

import { getSolanaName } from "@helius-labs/helius-namor";

export const parseNftBid = (transaction: EnrichedTransaction): ProtonTransaction => {
    let source = "SYSTEM_PROGRAM" as Source;

    // TODO: fix this
    // @ts-ignore
    if(transaction?.events.nft === null) {
        return {
            type        : "NFT_BID",
            primaryUser : "",
            fee         : 0,
            signature   : "",
            timestamp   : 0,
            source,
            actions     : [],
        };
    }

    // TODO: fix this
    // @ts-ignore
    const nftEvent = transaction?.events.nft;
    const actions: ProtonTransactionAction[] = [];

    // TODO: fix this
    // @ts-ignore
    const primaryUser = transaction.buyer;

    const {
        type,
        signature,
        timestamp,
    } = nftEvent;
    const fee = nftEvent.fee / LAMPORTS_PER_SOL;

    source = nftEvent.source;

    const from = "";
    const fromName = undefined;
    const to = nftEvent.buyer;
    const toName = getSolanaName(nftEvent.buyer);
    const received = nftEvent.nfts[0].mint;
    const amount = nftEvent.amount / LAMPORTS_PER_SOL;

    actions.push({
        from,
        fromName,
        to,
        toName,
        received,
        amount,
    });

    return {
        type,
        primaryUser,
        fee,
        signature,
        timestamp,
        source,
        actions,
    };
};
