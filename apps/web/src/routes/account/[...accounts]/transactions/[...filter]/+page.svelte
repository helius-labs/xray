<script lang="ts">
    import Transaction from "$lib/components/transaction.svelte";
    import TransactionsLoader from "$lib/components/loaders/transactions.svelte";
    import AnimEach from "$lib/components/anim-each.svelte";

    import { account } from "$lib/state/accounts";

    import {
        transactions,
        fetchNextTransactionPage,
        ownedTransactions,
    } from "$lib/state/transactions";

    $: console.log($ownedTransactions);
</script>

<AnimEach
    each={$ownedTransactions?.data}
    let:item
    let:index
>
    <Transaction
        transaction={$transactions.get(item)}
        userAccount={$account}
        {index}
    />
</AnimEach>

{#if $ownedTransactions?.isLoading}
    <TransactionsLoader />
{:else if !$ownedTransactions?.data.length}
    <p class="opacity-50">No transactions</p>
{/if}

{#if $ownedTransactions?.nextCursor}
    <div class="flex justify-center pb-10">
        <button
            class="btn-outline btn"
            class:loading={$ownedTransactions.isLoading}
            on:click={() =>
                !$ownedTransactions?.isLoading &&
                fetchNextTransactionPage($account)}>Load More</button
        >
    </div>
{/if}
