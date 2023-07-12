import { writable } from "svelte/store";

import type { Transaction, TransactionsState } from "$lib/next/types";

import {
    updateItem,
    setLoading,
    setError,
} from "$lib/next/state/util/update";

// List of all fetched transaction metadatas (TODO: sync with local storage)
export const transactions = writable<TransactionsState>({
    data: new Map(),
    error: "",
    loading: false,
});

// A list of transaction signatures in some order. this can get flipped, sorted, or cleared. 
export const transactionsList = writable<string[]>([]);

const fetchTransactions = (account: string) =>  fetch("/api/transactions", {
    method: "POST",
    body: JSON.stringify({
        account,
    }),
}).then((res) => res.json());

export const loadTransactions = async (account: string) => {
    setLoading(transactions, true);

    try {
        const _transactions = await fetchTransactions(account);

        transactionsList.update((current) => [
            ...current,
            ..._transactions,
        ]);

        _transactions.forEach((transaction: Transaction) => {
            updateItem(transactions, transaction);
        });
    } catch (error) {
        setError(transactions, error.message);
    } finally {
        setLoading(transactions, false);
    }
};