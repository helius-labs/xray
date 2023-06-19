export declare const burnToken: {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: {
            mint: string;
            rawTokenAmount: {
                decimals: number;
                tokenAmount: string;
            };
            tokenAccount: string;
            userAccount: string;
        }[];
    }[];
    description: string;
    events: {};
    fee: number;
    feePayer: string;
    instructions: {
        accounts: string[];
        data: string;
        innerInstructions: never[];
        programId: string;
    }[];
    nativeTransfers: {
        amount: number;
        fromUserAccount: string;
        toUserAccount: string;
    }[];
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: {
        fromTokenAccount: string;
        fromUserAccount: string;
        mint: string;
        toTokenAccount: string;
        toUserAccount: string;
        tokenAmount: number;
        tokenStandard: string;
    }[];
    transactionError: null;
    type: string;
};
export declare const burnNFT: {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: {
            mint: string;
            rawTokenAmount: {
                decimals: number;
                tokenAmount: string;
            };
            tokenAccount: string;
            userAccount: string;
        }[];
    }[];
    description: string;
    events: {
        nft: {
            amount: number;
            buyer: string;
            description: string;
            fee: number;
            feePayer: string;
            nfts: {
                mint: string;
                tokenStandard: string;
            }[];
            saleType: string;
            seller: string;
            signature: string;
            slot: number;
            source: string;
            staker: string;
            timestamp: number;
            type: string;
        };
    };
    fee: number;
    feePayer: string;
    instructions: {
        accounts: string[];
        data: string;
        innerInstructions: {
            accounts: string[];
            data: string;
            programId: string;
        }[];
        programId: string;
    }[];
    nativeTransfers: {
        amount: number;
        fromUserAccount: string;
        toUserAccount: string;
    }[];
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: {
        fromTokenAccount: string;
        fromUserAccount: string;
        mint: string;
        toTokenAccount: string;
        toUserAccount: string;
        tokenAmount: number;
        tokenStandard: string;
    }[];
    transactionError: null;
    type: string;
};
