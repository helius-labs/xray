import {
    transactionActionsMetadata,
    UITransactionActionType,
    type UITransaction,
    type UITransactionAction,
    type UITransactionActionGroup,
} from "$lib/types";

import { TransactionType } from "helius-sdk";

export const parseTransactionActions = (
    tx: UITransaction,
    user?: string
): UITransactionAction[] => {
    const merged: UITransactionAction[] = [];

    const { actions } = tx.parsed;
    const type = tx.parsed.type as TransactionType;

    if (tx.parsed.type === TransactionType.TRANSFER) {
        (actions || []).forEach((action) => {
            let actionType: UITransactionActionType =
                UITransactionActionType.UNKNOWN;

            if (user && user === action.from) {
                actionType = UITransactionActionType.TRANSFER_SENT;
            } else if (user && user === action.to) {
                actionType = UITransactionActionType.TRANSFER_RECEIVED;
            }

            merged.push({
                actionType,
                amount: action.amount,
                received: action.received,
                receivedFrom: action.from,
                sent: action.sent,
                sentTo: action.to,
                signature: tx?.raw?.signature,
                timestamp: tx?.raw?.timestamp,
                type,
            });
        });
    } else if (tx.parsed.type === TransactionType.SWAP) {
        const sentTransfers = (actions || []).filter(
            (action) => action.from === tx?.parsed?.primaryUser
        );
        const received = (actions || []).find(
            (action) => action.to === tx?.parsed?.primaryUser
        );
        const sent = sentTransfers.find(
            (transfer) => transfer?.fromName === received?.toName
        );

        merged.push({
            actionType: UITransactionActionType.SWAP_SENT,
            amount: sent?.amount,
            received: "",
            receivedFrom: "",
            sent: sent?.sent,
            sentTo: "",
            signature: tx?.raw?.signature,
            timestamp: tx?.raw?.timestamp,
            type: TransactionType.SWAP,
        });

        merged.push({
            actionType: UITransactionActionType.SWAP_RECEIVED,
            amount: received?.amount,
            received: received?.received,
            receivedFrom: "",
            sent: "",
            sentTo: "",
            signature: tx?.raw?.signature,
            timestamp: tx?.raw?.timestamp,
            type: TransactionType.SWAP,
        });
    } else {
        merged.push({
            actionType: UITransactionActionType.UNKNOWN,
            amount: 0,
            received: "",
            receivedFrom: "",
            sent: "",
            sentTo: "",
            signature: tx?.raw?.signature,
            timestamp: tx?.raw?.timestamp,
            type,
        });
    }

    return merged;
};

export const mergeTransactionActions = (
    transactions: UITransaction[],
    user?: string
): UITransactionAction[] => {
    const merged: UITransactionAction[] = [];

    transactions.forEach((tx) => {
        const actions = parseTransactionActions(tx, user);

        merged.push(...actions);
    });

    return merged;
};

// eslint-disable-next-line max-statements
export const groupTransactionActions = (actions: UITransactionAction[]) => {
    // Things that can be grouped:
    // - TRANSFER_SENT
    // - TRANSFER_RECEIVED
    // - TRANSFER
    // - UNKNOWN

    const groups: UITransactionActionGroup[] = [];

    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const { type, actionType } = action;

        const lastGroup = groups[groups.length - 1];

        let groupType: string = type;

        if (
            type === TransactionType.TRANSFER &&
            actionType === UITransactionActionType.TRANSFER_SENT
        ) {
            groupType = UITransactionActionType.TRANSFER_SENT;
        } else if (
            type === TransactionType.TRANSFER &&
            actionType === UITransactionActionType.TRANSFER_RECEIVED
        ) {
            groupType = UITransactionActionType.TRANSFER_RECEIVED;
        }

        const matchesLastGroupType =
            groupType && lastGroup && groupType === lastGroup?.type;
        const isWithin24Hours =
            actions[i].timestamp - lastGroup?.timestamp < 1000 * 60 * 60 * 24;

        const { icon, label } =
            transactionActionsMetadata[actionType as UITransactionActionType] ||
            transactionActionsMetadata.UNKNOWN;

        // Add new group
        if (!matchesLastGroupType || !groups.length) {
            groups.push({
                actions: [action],
                icon,
                label,
                timestamp: action.timestamp,
                type: groupType,
            });

            continue;
        }

        // Add to existing group
        groups[groups.length - 1].actions.push(action);
    }

    console.log({ groups });

    return groups;
};
