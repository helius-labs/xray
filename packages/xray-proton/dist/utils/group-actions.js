export const groupActions = (actions) => {
    const match = (a, b) => a.actionType === b.actionType &&
        a.from === b.from &&
        a.to === b.to &&
        (a.sent === b.sent || a.received === b.received);
    const grouped = actions.reduce((acc, action) => {
        let idx = 0;
        const existing = acc.find((a, i) => {
            idx = i;
            return match(a, action);
        });
        if (existing) {
            acc[idx].amount += action.amount;
        }
        else {
            acc.push(action);
        }
        return acc;
    }, []);
    return grouped;
};
