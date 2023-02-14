import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import type { Source } from "helius-sdk";

import { ProtonParser } from "../../types";

import { getSolanaName } from "@helius-labs/helius-namor";

export const parseNftList:ProtonParser = (transaction) => {
    let source = "SYSTEM_PROGRAM" as Source;
    
    const { type } = transaction;

    const nftEvent = transaction.events.nft;

    const data = {
        actions     : [],
        fee         : 0,
        primaryUser : "",
        signature   : "",
        source,
        timestamp   : 0,
        type,
    };

    if(!nftEvent) {
        return data;
    }

    const {
        signature,
        timestamp,
        seller : from,
        tokensInvolved,
    } = nftEvent;

    const primaryUser = nftEvent.seller;

    const [ firstToken ] = tokensInvolved;

    const fee = transaction.fee / LAMPORTS_PER_SOL;

    source = nftEvent.source;

    return {
        actions : [
            {
                amount   : 0,
                from,
                fromName : getSolanaName(from || ""),
                sent     : firstToken.mint,
                to       : "",
                toName   : "",
            },
        ],
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
