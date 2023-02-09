import { Source } from "@helius/types";

const supportedTransactions = {
    TRANSFER : "TRANSFER",
    SWAP     : "SWAP",
    UNKNOWN  : "UNKNOWN",
    BURN     : "BURN",
    BURN_NFT : "BURN_NFT",
};

type SupportedTransactionTypes = keyof typeof supportedTransactions;

export interface ProtonTransactionAction {
    from: string,
    to: string,
    sent?: string,
    received?: string,
    amount: number,
}

export interface ProtonTransaction {
    type: SupportedTransactionTypes,
    primaryUser: string,
    timestamp: number,
    source: Source,
    actions: ProtonTransactionAction[],
}
