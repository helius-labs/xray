<script lang="ts">
    import { fly } from "svelte/transition";

    import Transaction from "$lib/components/transaction.svelte";

    export let account: string;

    import {
        transactions,
        transactionsByOwner,
        fetchNextTransactionPage,
    } from "$lib/state/transactions";

    $: ownerTransactions = $transactionsByOwner.get(account);
</script>

{#each ownerTransactions?.data || [] as signature, idx (signature)}
    {@const transaction = $transactions.get(signature)}

    {#if transaction}
        <!-- Only animate the first few intro transactions -->
        {#if idx < 8}
            <div
                class="mb-8"
                in:fly={{
                    delay: idx * 100,
                    duration: 750,
                    y: -50,
                }}
            >
                <Transaction {transaction} />
            </div>
        {:else}
            <div class="mb-10">
                <Transaction {transaction} />
            </div>
        {/if}
    {/if}
{/each}

{#if ownerTransactions?.isLoading}
    {#each Array(3) as _, idx}
        <div
            class="relative mb-3 flex w-full rounded-lg bg-black bg-opacity-60 p-4"
            in:fly={{
                delay: idx * 50,
                duration: 500,
                y: -40,
            }}
        >
            <div class="center relative pr-3">
                <div
                    class="h-10 w-10 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                />
            </div>

            <div class="flex-1">
                <div class="flex w-full items-center justify-between">
                    <div class="w-3/4">
                        <div
                            class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                        />
                        <div
                            class="h-2 w-2/4 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                        />
                    </div>
                    <div class="flex w-1/4 justify-end">
                        <div
                            class="my-2 h-3 w-10 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    {/each}
{:else if !ownerTransactions?.data.length}
    <p class="opacity-50">No transactions</p>
{/if}

{#if ownerTransactions?.nextCursor}
    <div class="flex justify-center">
        <button
            class="btn-outline btn"
            class:loading={ownerTransactions.isLoading}
            on:click={() =>
                !ownerTransactions?.isLoading &&
                fetchNextTransactionPage(account)}>Load More</button
        >
    </div>
{/if}
