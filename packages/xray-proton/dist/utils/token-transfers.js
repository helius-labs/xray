import { getSolanaName } from "@helius-labs/helius-namor";
export const traverseTokenTransfers = (tokenTransfers, actions, address, type) => {
    for (let i = 0; i < tokenTransfers.length; i++) {
        const tx = tokenTransfers[i];
        const from = tx.fromUserAccount || "";
        let fromName;
        if (tx.fromUserAccount) {
            fromName = getSolanaName(tx.fromUserAccount);
        }
        const to = tx.toUserAccount || "";
        let toName;
        if (tx.toUserAccount) {
            toName = getSolanaName(tx.toUserAccount);
        }
        const amount = tx.tokenAmount;
        if (!address) {
            const sent = tx.mint;
            type = type === undefined ? "TRANSFER" : type;
            actions.push({
                actionType: type,
                amount,
                from,
                fromName,
                sent,
                to,
                toName,
            });
        }
        else {
            let actionType = "";
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
                    fromName,
                    sent,
                    to,
                    toName,
                });
            }
            else if (actionType === "RECEIVED") {
                const received = tx.mint;
                actions.push({
                    actionType,
                    amount,
                    from,
                    fromName,
                    received,
                    to,
                    toName,
                });
            }
        }
    }
};
