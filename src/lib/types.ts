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
