import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { Source } from "helius-sdk";
import { ProtonParser } from "../../types";

import { getSolanaName } from "@helius-labs/helius-namor";

export const parseNftCancelBid:ProtonParser = (transaction) => {
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
        buyer,
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
                from     : "",
                fromName : "",
                sent     : firstToken.mint,
                to       : buyer,
                toName   : getSolanaName(buyer || ""),
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
