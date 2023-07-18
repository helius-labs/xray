import type { Transaction } from "$lib/next/types";

export const COMPRESSED_NFT_TRANSFER = (
    transaction: Transaction,
    userAddress?: string
) => {
    const actions = transaction.actions;

    // @ts-ignore (its gonna be there if this is a compressed nft mint transaction)
    const [compressedEvent] = transaction.raw?.events?.compressed;

    actions.push({
        actionType:
            compressedEvent?.newLeafOwner === userAddress ? "RECEIVED" : "SENT",
        amount: 1,
        from: compressedEvent?.oldLeafOwner || "",
        to: compressedEvent?.newLeafOwner || "",
        token: compressedEvent?.assetId || "",
    });

    return transaction.actions;
};
