<script lang="ts">
    import { onMount } from "svelte";
    import { assets, balances, enrichAsset, loadBalances } from "$lib/next/state/assets";
    import { page } from "$app/stores";

    import type { Balance } from "$lib/next/types";

    import BalanceRow from "$lib/next/components/balance-row.svelte";

    import {
        SOL,
        USDC
    } from "$lib/next/constants"

    import {
        ChevronRight
    } from "lucide-svelte";

    onMount(async () => {
        await loadBalances($page.params.account);
    });

    const COUNT = 5;

    $: sorted = Array.from($balances.data?.values())
        .sort((a, b) => (a.amount < b.amount ? 1 : -1));

    const getBalanceSummary = (list: Balance[]) => sorted.reduce((acc:any, balance) => {
        console.log({balance});

        const solAdded = acc.find(({ id = ""}  = {}) => id && id === SOL);

        const usdcAdded = acc.find(({ id = ""} = {}) => id && id === USDC);

        if(!solAdded && $balances.data.has(SOL)) {
            return [
                ...acc,
                $balances.data.get(SOL),
            ];
        }

        if(!usdcAdded && $balances.data.has(USDC)) {
            return [
                ...acc,
                $balances.data.get(USDC),
            ];
        }
        
        if(acc.length < COUNT && balance.id !== SOL && balance.id !== USDC) {
            return [
                ...acc,
                balance,
            ];
        }

        return acc;
    }, []);

    $: balanceSummary = getBalanceSummary(sorted) || [];

    $: balanceSummary?.forEach(({ id = ""} = {}) => enrichAsset(id));

    $: console.log({balanceSummary});
</script>

<div class="border rounded-xl p-4 min-h-full">
    <div class="col-span-5 flex justify-between mb-1">
        <h2 class="text-xl font-semibold">Tokens</h2>

        <button class="btn btn-sm btn-outline">
            <ChevronRight size={16} />
        </button>
    </div>
    
    {#each balanceSummary as _, idx}
        {@const balance = balanceSummary[idx]}
    
        {#if $assets?.loading}
            <div class="flex">
                <div
                    class="aspect-square w-[10%] animate-pulse rounded bg-secondary"
                />
                <div>
                    <div class="h-4 w-[40%] animate-pulse rounded bg-secondary" />
                    <div class="h-2 w-[20%] animate-pulse rounded bg-secondary" />
                </div>
            </div>
        {:else if balance}
            <div class="my-2">
                <BalanceRow address="{balance.id}" />
            </div>
        {/if}
    {/each}
</div>
