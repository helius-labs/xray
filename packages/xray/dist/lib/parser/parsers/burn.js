import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { traverseAccountData } from "../utils/account-data";
import { traverseNativeTransfers } from "../utils/native-transfers";
export const parseBurn = (transaction, address) => {
    const { tokenTransfers = [], nativeTransfers = [], accountData = [], signature, timestamp, type, source, } = transaction;
    const fee = transaction.fee / LAMPORTS_PER_SOL;
    if (tokenTransfers === null || nativeTransfers === null) {
        return {
            accounts: [],
            actions: [],
            fee,
            primaryUser: "",
            signature,
            source,
            timestamp,
            type: "BURN",
        };
    }
    const primaryUser = tokenTransfers[0]?.fromUserAccount || "";
    const actions = [];
    const accounts = [];
    for (let i = 0; i < tokenTransfers.length; i++) {
        const tx = tokenTransfers[i];
        const from = tx.fromUserAccount || "";
        const to = tx.toUserAccount || "";
        const amount = tx.tokenAmount;
        let actionType = "";
        if (!address) {
            if (to === "") {
                const sent = tx.mint;
                actions.push({
                    actionType: type,
                    amount,
                    from,
                    sent,
                    to,
                });
            }
            else {
                actions.push({
                    actionType: "TRANSFER",
                    amount,
                    from,
                    sent: tx.mint,
                    to,
                });
            }
        }
        else {
            if (to === "") {
                const sent = tx.mint;
                actions.push({
                    actionType: type,
                    amount,
                    from,
                    sent,
                    to,
                });
            }
            else {
                if (tx.fromUserAccount === address) {
                    actionType = "SENT";
                }
                else if (tx.toUserAccount === address) {
                    actionType = "RECEIVED";
                }
                if (actionType === "SENT") {
                    const sent = tx.mint;
                    actions.push({
                        actionType,
                        amount,
                        from,
                        sent,
                        to,
                    });
                }
                else if (actionType === "RECEIVED") {
                    const received = tx.mint;
                    actions.push({
                        actionType,
                        amount,
                        from,
                        received,
                        to,
                    });
                }
            }
        }
    }
    traverseNativeTransfers(nativeTransfers, actions, address);
    traverseAccountData(accountData, accounts);
    return {
        accounts,
        actions,
        fee,
        primaryUser,
        signature,
        source,
        timestamp,
        type,
    };
};
