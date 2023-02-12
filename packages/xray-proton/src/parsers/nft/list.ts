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

export const parseNftList = (transaction: EnrichedTransaction): ProtonTransaction => {
    let source = "SYSTEM_PROGRAM" as Source;

    // TODO: fix this
    // @ts-ignore
    if(transaction?.events.nft === null) {
        return {
            type        : "NFT_LISTING",
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
    const to = "";
    const toName = undefined;
    const sent = nftEvent.nfts[0].mint;
    const amount = nftEvent.amount / LAMPORTS_PER_SOL;

    actions.push({
        from,
        fromName,
        to,
        toName,
        sent,
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
