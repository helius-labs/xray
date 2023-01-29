<script lang="ts">
    import { page } from "$app/stores";
    import { fly } from "svelte/transition";
    
    import Transaction from "src/lib/components/transaction/transaction.svelte";
    import {
        supportedTransactionTypes
    } from "$lib/config";
    
    import transactionsQuery from "$lib/state/queries/solana-account-transactions";

    const transactions = transactionsQuery($page.params.search);
    
    $: console.log(($transactions));
// import { onMount } from "svelte";

    // import { page } from "$app/stores";

    // import type {
    //     TransactionType
    // } from "helius-sdk";

    // import {
    //     accountTransactions,
    // } from "$lib/stores/account";

    // import {
    //     supportedTransactionTypes
    // } from "$lib/config";

// onMount(async () => {
    //     $accountTransactions.fetch($page.params.search);
    // });

    // only show supported transaction types
    // $: filtered = $transactions?.data.length ?
    //      : [];

// $:console.log({ filtered });
</script>

{#if $transactions?.data?.length === 0}
    <div class="center">
        <p class="text-center">
            No transactions found
        </p>
    </div>
{:else if $transactions?.isFetching}
    <div class="center">
        <button class="btn btn-ghost loading"></button>
    </div>
{:else if $transactions?.data?.supported.length}
    {#each $transactions?.data?.supported as transaction, idx}
        {#if idx < 40}
            <div
                in:fly={{
                    y        : -20,
                    duration : 500,
                    delay    : (100) + idx * 15,
                }}>
                <Transaction
                    address={$page.params.search}
                    {transaction} />
            </div>
        {:else}
            <Transaction
                address={$page.params.search}
                {transaction} />
        {/if}
    {/each}
{/if}

