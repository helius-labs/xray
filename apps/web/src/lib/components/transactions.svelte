<script lang="ts">
    import Transaction from "$lib/components/transaction.svelte";
    import TransactionsLoader from "$lib/components/loaders/transactions.svelte";

    export let signatures: string[];

    import {
        transactions,
        transactionsByOwner,
        fetchNextTransactionPage,
    } from "$lib/state/transactions";

    import AnimEach from "$lib/components/anim-each.svelte";
</script>

<AnimEach
    each={signatures}
    let:item
>
    <Transaction transaction={$transactions.get(String(item))} />
</AnimEach>

{#if ownerTransactions?.isLoading}
    <TransactionsLoader />
{:else if !ownerTransactions?.data.length}
    <p class="opacity-50">No transactions</p>
{/if}

{#if ownerTransactions?.nextCursor}
    <div class="flex justify-center pb-10">
        <button
            class="btn-outline btn"
            class:loading={ownerTransactions.isLoading}
            on:click={() =>
                !ownerTransactions?.isLoading &&
                fetchNextTransactionPage(account)}>Load More</button
        >
    </div>
{/if}
