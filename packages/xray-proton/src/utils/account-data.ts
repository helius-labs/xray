import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { AccountData } from "helius-sdk";
import { ProtonAccount, ProtonAccountChange, SOL } from "../types";

export const traverseAccountData = (
    accountData: AccountData[],
    accounts: ProtonAccount[]
) => {
    accountData.forEach((data) => {
        if (
            data.nativeBalanceChange !== 0 ||
            (data.tokenBalanceChanges && data.tokenBalanceChanges.length > 0)
        ) {
            const account = data.account;
            const index = accounts.findIndex((a) => a.account === account);

            if (data.nativeBalanceChange !== 0) {
                const amount = data.nativeBalanceChange / LAMPORTS_PER_SOL;
                const mint = SOL;

                indexChecker(accounts, index, account, amount, mint);
            }

            if (
                data.tokenBalanceChanges &&
                data.tokenBalanceChanges.length !== null
            ) {
                for (let j = 0; j < data.tokenBalanceChanges.length; j++) {
                    const tokenBalanceData = data.tokenBalanceChanges[j];
                    const mint = tokenBalanceData.mint;
                    const index = accounts.findIndex(
                        (a) => a.account === tokenBalanceData.userAccount
                    );
                    const nativeIndex = accounts.findIndex(
                        (a) => a.account === account
                    );

                    let amount;
                    if (tokenBalanceData.rawTokenAmount.decimals === 0) {
                        amount = parseInt(
                            tokenBalanceData.rawTokenAmount.tokenAmount
                        );
                    } else {
                        amount =
                            parseInt(
                                tokenBalanceData.rawTokenAmount.tokenAmount
                            ) /
                            10 ** tokenBalanceData.rawTokenAmount.decimals;
                    }

                    if (
                        !(
                            nativeIndex !== -1 &&
                            accounts[nativeIndex].changes[0].amount === amount
                        )
                    ) {
                        indexChecker(
                            accounts,
                            index,
                            tokenBalanceData.userAccount,
                            amount,
                            mint
                        );
                    }
                }
            }
        }
    });
};

const indexChecker = (
    accounts: ProtonAccount[],
    index: number,
    account: string,
    amount: number,
    mint: string
) => {
    if (index !== -1) {
        accounts[index].changes.push({ amount, mint });
    } else {
        accounts.push({
            account,
            changes: [{ amount, mint }],
        });
    }
};
