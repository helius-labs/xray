export declare const transferMulti: {
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
export declare const transferNFT: {
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
export declare const transferSol: {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: never[];
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
    tokenTransfers: never[];
    transactionError: null;
    type: string;
};
export declare const transferToken: {
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
    nativeTransfers: never[];
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
export declare const transferUnknown1: {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: never[];
    }[];
    description: string;
    events: {};
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
    tokenTransfers: never[];
    transactionError: null;
    type: string;
};
export declare const transferUnkown2: {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: never[];
    }[];
    description: string;
    events: {};
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
    tokenTransfers: never[];
    transactionError: null;
    type: string;
};
