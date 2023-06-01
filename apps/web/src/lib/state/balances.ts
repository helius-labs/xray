import type { BalancesByOwner, TokenBalance } from "$lib/types";

import { derived, writable } from "svelte/store";

import { account } from "$lib/state/accounts";

import { FETCH_MODEL } from "$lib/constants";

// Map of accounts to token balances
export const assetBalances = writable<BalancesByOwner>(new Map());

export const balancesForOwner = derived(
    [assetBalances, account],
    ([$assetBalances, $account]) => $assetBalances.get($account)
);

// Add balance for owner
export const addBalanceForOwner = (
    owner: string,
    token: string,
    amount: number
) => {
    assetBalances.update(($balances) => {
        const balances = $balances.get(owner) || {
            ...FETCH_MODEL(),
            data: new Map(),
        };

        balances.data.set(token, amount);

        $balances.set(owner, balances);

        return $balances;
    });
};
