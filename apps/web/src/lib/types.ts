import type { EnrichedTransaction } from "@helius-labs/helius-types";
import type { ProtonTransaction } from "@helius-labs/xray-proton";

export interface UIAccount {
    publicKey: string
    transactions: Array<any>
}

export interface UIToken {}

export interface UITransaction {}

export interface SearchResult {
    isValidPublicKey : boolean
    isToken : boolean
    account: UIAccount
    token : UIToken
    transaction : UITransaction
}

export interface WebTransaction {
    parsed : ProtonTransaction,
    raw : EnrichedTransaction
}
