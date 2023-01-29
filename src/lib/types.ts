import type { TransactionError } from "@solana/web3.js";

import type {
    TransactionType,
    Source,
    TokenStandard,
    TransactionContext,
    ProgramName,
} from "helius-sdk";

export {
    TransactionType,
    Source,
    TokenStandard,
    TransactionContext,
    ProgramName,
};

// Types prefixed with UI are custom types used in the UI to manage state.
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

export interface RawTokenAmount {
    tokenAmount: string;
    decimals: number;
}

export interface TokenBalanceChange {
    userAccount: string;
    tokenAccount: string;
    rawTokenAmount: RawTokenAmount;
    mint: string;
}

export interface AccountData {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: TokenBalanceChange[] | null;
}

export interface Token {
    mint: string;
    tokenStandard: TokenStandard;
}

export interface TokenTransfer {
    fromUserAccount: string | null;
    toUserAccount: string | null;
    fromTokenAccount: string | null;
    toTokenAccount: string | null;
    rawTokenAmount: number;
    decimals: number;
    tokenStandard: TokenStandard;
    mint: string;
}

export interface NativeTransfer {
    fromUserAccount: string | null;
    toUserAccount: string | null;
    amount: number;

}

export interface NftData {
    buyer: string;
    seller: string;
    amount: number;
    saleType: TransactionContext;
}

export interface NftMetadata {
    listingAddress?: string;
    biddingAddress?: string;
    firstVerifiedCreator?: string;
    certifiedCollectionKey?: string;
    englishAuctionConfigAddress?: string;
}

export interface StakeData {
    staker: string;
    vault: string;
    amount: number;
    transfersIntoVault: string[];
    transfersOutOfVault: string[];
}

export interface NativeBalanceChange {
    account: string;
    amount: string;
}

export interface TokenSwap {
    nativeInput: NativeTransfer | null;
    nativeOutput: NativeTransfer | null;
    tokenInputs: TokenTransfer[];
    tokenOutputs: TokenTransfer[];
    tokenFees: TokenTransfer[];
    nativeFees: NativeTransfer[];
    programInfo: ProgramInfo;
}

export interface ProgramInfo {
    source: Source;
    account: string;
    programName: ProgramName;
    instructionName: string;
}

export interface SwapData {
    nativeInput: NativeBalanceChange | null;
    nativeOutput: NativeBalanceChange | null;
    tokenInputs: TokenBalanceChange[];
    tokenOutputs: TokenBalanceChange[];
    tokenFees: TokenBalanceChange[];
    nativeFees: NativeBalanceChange[];
    innerSwaps: TokenSwap[];
}

export interface AccountsToGetDataFor {
    accountName: string;
    account: string;
}

export type Instruction = {
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: InnerInstruction[];
};

export type InnerInstruction = {
    accounts: string[];
    data: string;
    programId: string;
}

export interface EnrichedTransactionResponseV2 {
    type: TransactionType;
    source: Source;
    fee: number;
    feePayer: string;
    signature: string;
    timestamp: number;
    accountData: AccountData[];
    tokens: Token[];
    tokenTransfers: TokenTransfer[] | null;
    nativeTransfers: NativeTransfer[] | null;
    nftData: NftData | null;
    nftMetadata: NftMetadata | null;
    stakeData: StakeData | null;
    swapData: SwapData | null;
    description: string;
    accountsToGetDataFor?: AccountsToGetDataFor[];
    slot: number;
    transactionError: TransactionError | null;
    instructions: Instruction[];
}
