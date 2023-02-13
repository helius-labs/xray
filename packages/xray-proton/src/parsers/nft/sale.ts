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

export const parseNftSale = (transaction: EnrichedTransaction): ProtonTransaction => {
    let source = "SYSTEM_PROGRAM" as Source;

    if(transaction?.events.nft === null) {
        return {
            type        : "NFT_SALE",
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

    const primaryUser = transaction.seller;

    const {
        type,
        signature,
        timestamp,
    } = nftEvent;
    const fee = nftEvent.fee / LAMPORTS_PER_SOL;

    source = nftEvent.source;

    const from = nftEvent.seller;
    const fromName = getSolanaName(nftEvent.seller);
    const to = nftEvent.buyer;
    const toName = getSolanaName(nftEvent.buyer);
    const sent = nftEvent.nfts[0].mint;
    const received = "So11111111111111111111111111111111111111112";
    const amount = nftEvent.amount / LAMPORTS_PER_SOL;

    actions.push({
        from,
        fromName,
        to,
        toName,
        sent,
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
