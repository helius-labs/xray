import {
    type UITransaction,
    type UITransactionAction,
    type UITransactionActionGroup,
    type Icon,
    actionTypeMetadata
} from "$lib/types";

export const mergeTransactionActions = (transactions:UITransaction[], user?:string) =>
    transactions.reduce<UITransactionAction[]>((acc, tx) => {
        const { actions = [] }  = tx?.parsed || {};

        if(actions.length) {
            return [
                ...acc,
                ...tx?.parsed?.actions.map((action) => {
                    let actionType:string = tx?.parsed?.type;

                    if(user && user === action.from) {
                        actionType = `TRANSFER_SENT`;
                    } else if(user && user === action.to) {
                        actionType = `TRANSFER_RECEIVED`;
                    }

                    return {
                        amount       : action.amount,
                        received     : action.received,
                        receivedFrom : action.from,
                        sent         : action.sent,
                        sentTo       : action.to,
                        signature    : tx?.raw?.signature,
                        timestamp    : tx?.raw?.timestamp,
                        type         : actionType,
                    };
                }),
            ];
        }

        return [
            ...acc,
            {
                signature : tx?.raw?.signature,
                timestamp : tx?.raw?.timestamp,
                type      : "UNKNOWN",
            },
        ];
    }, []);

// eslint-disable-next-line max-statements
export const groupTransactionActions = (actions:UITransactionAction[]) => {
    // Things that can be grouped:
    // - TRANSFER_SENT
    // - TRANSFER_RECEIVED
    // - TRANSFER
    // - UNKNOWN

    const groupableTypes = [
        "TRANSFER_SENT",
        "TRANSFER_RECEIVED",
        "TRANSFER",
        "UNKNOWN",
    ];

    const groups:UITransactionActionGroup[] = [];

    for(let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const { type } = action;

        const lastGroup = groups[groups.length - 1];

        const matchesLastGroupType = type && lastGroup && type === lastGroup?.type;
        const isGroupable = groupableTypes.includes(type);
        const isWithin24Hours = actions[i].timestamp - lastGroup?.timestamp < 1000 * 60 * 60 * 24;

        const shouldGroup = matchesLastGroupType && isGroupable || isWithin24Hours;

        const icon = (actionTypeMetadata[type]?.icon || actionTypeMetadata.UNKNOWN.icon) as Icon;

        // Add new group
        if(!matchesLastGroupType && isGroupable || !groups.length) {
            groups.push({
                actions : [
                    action,
                ],
                icon,
                label     : actionTypeMetadata[type]?.label || actionTypeMetadata.UNKNOWN.label,
                timestamp : action.timestamp,
                type      : action.type,
            });

            continue;
        }

        // Add to existing group
        groups[groups.length - 1].actions.push(action);
    }

    return groups;
};
