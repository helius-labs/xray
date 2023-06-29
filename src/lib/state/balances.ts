import { writable } from "svelte/store";

import type { Balance } from "$lib/next/types";

const fetchBalances = (address: string) =>
    fetch("/api/balances", {
        body: JSON.stringify({
            address,
        }),
        method: "POST",
    }).then((res) => res.json());

export const addBalance = (id: string, balance: Balance) =>
    balances.update((state) => {
        state.data.set(id, balance);

        return state;
    });

// export const loadBalances = async (address: string) => {
//     balances.update((state) => ({ ...state, loading: true }));

//     try {
//         let result = await fetchBalances(address);

//         for (let i = 0; i < result?.tokens?.length; i++) {
//             const balance = result?.tokens[i]?.amount;
//         }

//         balances.set({ data: result, error: "", loading: false });
//     } catch (error) {
//         // eslint-disable-next-line no-console
//         console.log(error);

//         balances.update((state) => ({ ...state, error: String(error) }));
//     } finally {
//         balances.update((state) => ({ ...state, loading: false }));
//     }
// };
