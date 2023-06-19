export declare const swapUsdcSol: {
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
        swap: {
            innerSwaps: {
                nativeFees: never[];
                programInfo: {
                    account: string;
                    instructionName: string;
                    programName: string;
                    source: string;
                };
                tokenFees: {
                    fromTokenAccount: string;
                    fromUserAccount: string;
                    mint: string;
                    toTokenAccount: string;
                    toUserAccount: string;
                    tokenAmount: number;
                    tokenStandard: string;
                }[];
                tokenInputs: {
                    fromTokenAccount: string;
                    fromUserAccount: string;
                    mint: string;
                    toTokenAccount: string;
                    toUserAccount: string;
                    tokenAmount: number;
                    tokenStandard: string;
                }[];
                tokenOutputs: {
                    fromTokenAccount: string;
                    fromUserAccount: string;
                    mint: string;
                    toTokenAccount: string;
                    toUserAccount: string;
                    tokenAmount: number;
                    tokenStandard: string;
                }[];
            }[];
            nativeFees: never[];
            nativeInput: null;
            nativeOutput: {
                account: string;
                amount: string;
            };
            tokenFees: {
                mint: string;
                rawTokenAmount: {
                    decimals: number;
                    tokenAmount: string;
                };
                tokenAccount: string;
                userAccount: string;
            }[];
            tokenInputs: {
                mint: string;
                rawTokenAmount: {
                    decimals: number;
                    tokenAmount: string;
                };
                tokenAccount: string;
                userAccount: string;
            }[];
            tokenOutputs: never[];
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
