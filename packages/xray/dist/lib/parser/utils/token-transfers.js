export const traverseTokenTransfers = (tokenTransfers, actions, address) => {
    for (let i = 0; i < tokenTransfers.length; i++) {
        const tx = tokenTransfers[i];
        const from = tx.fromUserAccount || "";
        const to = tx.toUserAccount || "";
        const amount = tx.tokenAmount;
        if (!address) {
            const sent = tx.mint;
            actions.push({
                actionType: "TRANSFER",
                amount,
                from,
                sent,
                to,
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
};
