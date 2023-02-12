export const swapUsdcSol = {
    description    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv swapped 1485.000 USDC for 61.027185382 SOL",
    type           : "SWAP",
    source         : "JUPITER",
    fee            : 5000,
    feePayer       : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
    signature      : "3gf6XH8mEDRxLvs6UXEkuUJbKoc2JNDixzQSkTiLc6yYhBmUUpABpRhpuAVBE6jEefQG4p9sf3iTdLa4Azkie4Gw",
    slot           : 175188614,
    timestamp      : 1675093534,
    tokenTransfers : [
        {
            fromTokenAccount : "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
            toTokenAccount   : "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
            fromUserAccount  : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            toUserAccount    : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
            tokenAmount      : 1485,
            mint             : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            tokenStandard    : "Fungible",
        },
        {
            fromTokenAccount : "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
            toTokenAccount   : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            fromUserAccount  : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
            toUserAccount    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            tokenAmount      : 61.027185382,
            mint             : "So11111111111111111111111111111111111111112",
            tokenStandard    : "Fungible",
        },
        {
            fromTokenAccount : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            toTokenAccount   : "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
            fromUserAccount  : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            toUserAccount    : "tzvXws1qhmfdPkPcprezULCDQPAJqzPhbZ3SMrqRPNE",
            tokenAmount      : 0.518731075,
            mint             : "So11111111111111111111111111111111111111112",
            tokenStandard    : "Fungible",
        },
    ],
    nativeTransfers : [
        {
            fromUserAccount : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            toUserAccount   : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            amount          : 60508454307,
        },
        {
            fromUserAccount : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            toUserAccount   : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            amount          : 2039280,
        },
    ],
    accountData : [
        {
            account             : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            nativeBalanceChange : 60508449307,
            tokenBalanceChanges : [],
        },
        {
            account             : "4Sz4W2pC1YaLZyVP6ptNXNf727c6BtnB5BEYNQhHdCxN",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "7XLWyPdHWK8Fs6s1yzWnheFS61e2C6CUP7oTYH5VW34n",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [
                {
                    userAccount    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                    tokenAccount   : "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                    rawTokenAmount : {
                        tokenAmount : "-1485000000",
                        decimals    : 6,
                    },
                    mint : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                },
            ],
        },
        {
            account             : "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
            nativeBalanceChange : -61027185382,
            tokenBalanceChanges : [
                {
                    userAccount    : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                    tokenAccount   : "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
                    rawTokenAmount : {
                        tokenAmount : "-61027185382",
                        decimals    : 9,
                    },
                    mint : "So11111111111111111111111111111111111111112",
                },
            ],
        },
        {
            account             : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "B5mW68TkDewnKvWNc2trkmmdSRxcCjZz3Yd9BWxQTSRU",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [
                {
                    userAccount    : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                    tokenAccount   : "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
                    rawTokenAmount : {
                        tokenAmount : "1485000000",
                        decimals    : 6,
                    },
                    mint : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                },
            ],
        },
        {
            account             : "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
            nativeBalanceChange : 518731075,
            tokenBalanceChanges : [
                {
                    userAccount    : "tzvXws1qhmfdPkPcprezULCDQPAJqzPhbZ3SMrqRPNE",
                    tokenAccount   : "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
                    rawTokenAmount : {
                        tokenAmount : "518731075",
                        decimals    : 9,
                    },
                    mint : "So11111111111111111111111111111111111111112",
                },
            ],
        },
        {
            account             : "p9c32PDrUYuLvy9MsfmWa4ALUdUE7oaRAKmg6URmuR6",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "11111111111111111111111111111111",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "6vK8gSiRHSnZzAa5JsvBF2ej1LrxpRX21Y185CzP4PeA",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "So11111111111111111111111111111111111111112",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
        {
            account             : "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
            nativeBalanceChange : 0,
            tokenBalanceChanges : [],
        },
    ],
    transactionError : null,
    instructions     : [
        {
            accounts : [
                "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                "So11111111111111111111111111111111111111112",
                "11111111111111111111111111111111",
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            ],
            data              : "",
            programId         : "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            innerInstructions : [
                {
                    accounts : [
                        "So11111111111111111111111111111111111111112",
                    ],
                    data      : "84eT",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    accounts : [
                        "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                    ],
                    data      : "11119os1e9qSs2u7TsThXqkBSRVFxhmYaFKFZ1waB2X7armDmvK3p5GmLdUxYdg3h7QSrL",
                    programId : "11111111111111111111111111111111",
                },
                {
                    accounts : [
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                    ],
                    data      : "P",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    accounts : [
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                        "So11111111111111111111111111111111111111112",
                    ],
                    data      : "6MVHZns5aWd9287skYyhMv5M9NjnXA2Dg4ybGh7aGgiJt",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
        },
        {
            accounts : [
                "B5mW68TkDewnKvWNc2trkmmdSRxcCjZz3Yd9BWxQTSRU",
                "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
            ],
            data              : "fC8nMvWeAaD",
            programId         : "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
            innerInstructions : [],
        },
        {
            accounts : [
                "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
                "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
                "7XLWyPdHWK8Fs6s1yzWnheFS61e2C6CUP7oTYH5VW34n",
                "4Sz4W2pC1YaLZyVP6ptNXNf727c6BtnB5BEYNQhHdCxN",
                "p9c32PDrUYuLvy9MsfmWa4ALUdUE7oaRAKmg6URmuR6",
                "6vK8gSiRHSnZzAa5JsvBF2ej1LrxpRX21Y185CzP4PeA",
                "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
            ],
            data              : "HkEEuBSFCNsQimDfAbjpZ3AyXV3dAMhQcucMr",
            programId         : "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
            innerInstructions : [
                {
                    accounts : [
                        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                        "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                        "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                        "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
                        "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                        "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
                        "7XLWyPdHWK8Fs6s1yzWnheFS61e2C6CUP7oTYH5VW34n",
                        "4Sz4W2pC1YaLZyVP6ptNXNf727c6BtnB5BEYNQhHdCxN",
                        "p9c32PDrUYuLvy9MsfmWa4ALUdUE7oaRAKmg6URmuR6",
                        "6vK8gSiRHSnZzAa5JsvBF2ej1LrxpRX21Y185CzP4PeA",
                    ],
                    data      : "59p8WydnSZtTGMQev9eRJs4ayUUYBg7tLNWaNWQYnTb1jZMmAwhJXqUyNf",
                    programId : "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
                },
                {
                    accounts : [
                        "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                        "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
                        "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                    ],
                    data      : "3QDP1z8pux7y",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    accounts : [
                        "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                        "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                    ],
                    data      : "3t63K29j2QD5",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
                {
                    accounts : [
                        "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                        "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
                        "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                    ],
                    data      : "3QhbBAtJnnsZ",
                    programId : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                },
            ],
        },
        {
            accounts : [
                "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
            ],
            data              : "A",
            programId         : "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            innerInstructions : [],
        },
    ],
    events : {
        swap : {
            nativeInput  : null,
            nativeOutput : {
                account : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                amount  : "61027185382",
            },
            tokenInputs : [
                {
                    userAccount    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                    tokenAccount   : "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                    rawTokenAmount : {
                        tokenAmount : "1485000000",
                        decimals    : 6,
                    },
                    mint : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                },
            ],
            tokenOutputs : [],
            nativeFees   : [],
            tokenFees    : [
                {
                    userAccount    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                    tokenAccount   : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                    rawTokenAmount : {
                        tokenAmount : "518731075",
                        decimals    : 9,
                    },
                    mint : "So11111111111111111111111111111111111111112",
                },
            ],
            innerSwaps : [
                {
                    tokenInputs : [
                        {
                            fromTokenAccount : "8yfHA9icV1snz5a6LSCw7zjx5iWbnH3Wogc1dTSVa9qE",
                            toTokenAccount   : "BVNo8ftg2LkkssnWT4ZWdtoFaevnfD6ExYeramwM27pe",
                            fromUserAccount  : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                            toUserAccount    : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                            tokenAmount      : 1485,
                            mint             : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                            tokenStandard    : "Fungible",
                        },
                    ],
                    tokenOutputs : [
                        {
                            fromTokenAccount : "9RfZwn2Prux6QesG1Noo4HzMEBv3rPndJ2bN2Wwd6a7p",
                            toTokenAccount   : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                            fromUserAccount  : "7qbRF6YsyGuLUVs6Y1q64bdVrfe4ZcUUz1JRdoVNUJnm",
                            toUserAccount    : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                            tokenAmount      : 61.027185382,
                            mint             : "So11111111111111111111111111111111111111112",
                            tokenStandard    : "Fungible",
                        },
                    ],
                    tokenFees : [
                        {
                            fromTokenAccount : "AjSXQTbiYDz858cfjyWGK2mZBy93b5nkCX2wBCVu2Ae5",
                            toTokenAccount   : "DftazW19RJ75kzNB5XogQSQTURJC1bv3a2DiBALFDyd6",
                            fromUserAccount  : "MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv",
                            toUserAccount    : "tzvXws1qhmfdPkPcprezULCDQPAJqzPhbZ3SMrqRPNE",
                            tokenAmount      : 0.518731075,
                            mint             : "So11111111111111111111111111111111111111112",
                            tokenStandard    : "Fungible",
                        },
                    ],
                    nativeFees  : [],
                    programInfo : {
                        source          : "ORCA",
                        account         : "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
                        programName     : "ORCA_WHIRLPOOLS",
                        instructionName : "whirlpoolSwap",
                    },
                },
            ],
        },
    },
};
