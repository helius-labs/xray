import type {
    EnrichedTransaction,
    Source
} from "@helius-labs/helius-types";

import {
    ProtonTransaction,
    ProtonTransactionAction
} from "../types";

import { getSolanaName } from "@helius-labs/helius-namor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const parseTransfer = (transaction: EnrichedTransaction): ProtonTransaction => {
    const {
        signature,
        timestamp,
        tokenTransfers = [],
        nativeTransfers = [],
    } = transaction;

    const type = "TRANSFER";
    let source = "SYSTEM_PROGRAM" as Source;

    if(tokenTransfers === null || nativeTransfers === null) {
        return {
            type,
            primaryUser : "",
            fee         : 0,
            signature   : "",
            timestamp   : 0,
            source,
            actions     : [],
        };
    }
    
    const primaryUser = tokenTransfers[0]?.fromUserAccount || "";
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    source = transaction.source;
    
    const actions: ProtonTransactionAction[] = [];

    for(let i = 0; i < tokenTransfers.length; i++) {
        const [ tx ] = tokenTransfers;
        const from = tx.fromUserAccount || "";
        let fromName;
        if(tx.fromUserAccount) {
            fromName = getSolanaName(tx.fromUserAccount);
        }
        const to = tx.toUserAccount || "";
        let toName;
        if(tx.toUserAccount) {
            toName = getSolanaName(tx.toUserAccount);
        }
        const sent = tx.mint;
        const amount = tx.tokenAmount;
    
        actions.push({
            from,
            fromName,
            to,
            toName,
            sent,
            amount,
        });
    }

    const nativeTransfersLength = nativeTransfers.length - tokenTransfers.length;
    
    for(let i = 0; i < nativeTransfersLength; i++) {
        const [ tx ] = nativeTransfers;

        const from = tx.fromUserAccount || "";
        let fromName;
        if(tx.fromUserAccount) {
            fromName = getSolanaName(tx.fromUserAccount);
        }
        const to = tx.toUserAccount || "";
        let toName;
        if(tx.toUserAccount) {
            toName = getSolanaName(tx.toUserAccount);
        }
        const sent = "So11111111111111111111111111111111111111112";
        const amount = tx.amount / LAMPORTS_PER_SOL;

        actions.push({
            from,
            fromName,
            to,
            toName,
            sent,
            amount,
        });
    }
    
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
