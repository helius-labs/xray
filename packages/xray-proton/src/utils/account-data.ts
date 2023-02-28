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
            const changes = [] as ProtonAccountChange[];
            const a = { account, changes };

            if (data.nativeBalanceChange !== 0) {
                const amount = data.nativeBalanceChange / LAMPORTS_PER_SOL;
                a.changes.push({ amount, mint: SOL });
            }
            if (data.tokenBalanceChanges) {
                for (let j = 0; j < data.tokenBalanceChanges.length; j++) {
                    const tokenBalanceData = data.tokenBalanceChanges[j];
                    const mint = tokenBalanceData.mint;

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

                    a.changes.push({
                        amount,
                        mint,
                    });
                }
            }
            accounts.push(a);
        }
    });
};
