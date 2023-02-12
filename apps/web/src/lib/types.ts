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

export interface WebTranscationAction {
    type : string,
    primaryUser : string,
    signature : string,
    receivedFrom: string,
    sentTo: string,
    received: string,
    sent: string,
    amount: number,
    subtype: string,
}

export interface Token {
    image: string,
    name: string,
    address: string,
}
