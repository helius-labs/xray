import { derived, writable } from "svelte/store";
import { page } from "$app/stores";

const accounts = derived(page, ($page) => $page.params.accounts.split("/"));

const selectedAccountIndex = writable(0);

const account = derived(
    [accounts, selectedAccountIndex],
    ([$accounts, $index]) => $accounts[$index]
);

export { accounts, account, selectedAccountIndex };
