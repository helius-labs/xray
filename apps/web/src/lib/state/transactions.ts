import { writable, derived, get } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import type { Transactions, TransactionsByOwner } from "$lib/types";

import type { ProtonTransaction } from "@helius-labs/xray";

import { account } from "$lib/state/accounts";

export const transactions = writable<Transactions>();

export const transactionsByOwner = writable<TransactionsByOwner>(new Map());

export const addTransaction = (transaction: ProtonTransaction) => {
    transactions.update((value = new Map()) => {
        value.set(transaction.signature, transaction);

        return value;
    });
};

export const addTransactionByOwner = (
    ownerAddress: string,
    transaction: ProtonTransaction
) => {
    transactionsByOwner.update((map = new Map()) => {
        let result = map.get(ownerAddress) || { data: [] };

        if (!result.data.includes(transaction.signature)) {
            result.data.push(transaction.signature);
        }

        map.set(ownerAddress, result);

        return map;
    });
};

// set fetching state for a specific owner
const setFetchState = (
    ownerAddress: string,
    options: { isLoading: boolean; error: string; nextCursor: string }
) => {
    const byOwnerMap = get(transactionsByOwner) || new Map();

    const ownerEntry = byOwnerMap.get(ownerAddress) || {
        data: [],
    };

    transactionsByOwner.set(
        byOwnerMap.set(ownerAddress, {
            ...ownerEntry,
            ...options,
        })
    );
};

export const updateTransactionsByOwner = async (
    ownerAddress: string,
    cursor = ""
) => {
    try {
        setFetchState(ownerAddress, {
            error: "",
            isLoading: true,
            nextCursor: "",
        });

        const transactionsByOwnerResponse = await fetchJson<{
            oldest: string;
            result: ProtonTransaction[];
        }>("/api/transactions", {
            account: ownerAddress,
            cursor,
            user: ownerAddress,
        });

        transactionsByOwnerResponse?.result?.map((transaction) => {
            // add details to the main asset map
            addTransaction(transaction);

            // add keys to the assetsByOwner map
            addTransactionByOwner(ownerAddress, transaction);
        });

        setFetchState(ownerAddress, {
            error: "",
            isLoading: false,

            // Add cursor if we got transactions back
            nextCursor:
                transactionsByOwnerResponse.result.length > 0
                    ? transactionsByOwnerResponse.oldest
                    : "",
        });
    } catch (error: any) {
        console.log(error);

        setFetchState(ownerAddress, {
            error: error?.message,
            isLoading: false,
            nextCursor: "",
        });
    }
};

export const fetchNextTransactionPage = async (ownerAddress: string) => {
    const ownerEntry = get(transactionsByOwner).get(ownerAddress);

    // If there is no next cursor, we have reached the end
    if (!ownerEntry || !ownerEntry.nextCursor) {
        return;
    }

    await updateTransactionsByOwner(ownerAddress, ownerEntry.nextCursor);
};

export const ownedTransactions = derived(
    [transactionsByOwner, account],
    ([$transationsByOwner, $account]) =>
        $transationsByOwner.get($account) || { data: [] }
);
