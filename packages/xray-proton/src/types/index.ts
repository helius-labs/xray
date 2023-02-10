import { Source } from "@helius-labs/helius-types";

const supportedTransactions = {
    TRANSFER : "TRANSFER",
    SWAP     : "SWAP",
    BURN     : "BURN",
    BURN_NFT : "BURN_NFT",
    UNKNOWN  : "UNKNOWN",
};

export type ProtonSupportedTypes = keyof typeof supportedTransactions;

export interface ProtonTransactionAction {
    from: string,
    fromName: string | undefined,
    to: string,
    toName: string | undefined,
    sent?: string,
    received?: string,
    amount: number,
}

export interface ProtonTransaction {
    type: ProtonSupportedTypes,
    primaryUser: string,
    fee: number,
    signature: string,
    timestamp: number,
    source: Source,
    actions: ProtonTransactionAction[],
}
