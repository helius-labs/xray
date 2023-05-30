<script lang="ts">
    import { page } from "$app/stores";

    import Transaction from "$lib/components/transaction.svelte";
    import TransactionsLoader from "$lib/components/loaders/transactions.svelte";
    import AnimEach from "$lib/components/anim-each.svelte";

    import {
        transactions,
        transactionsByOwner,
        fetchNextTransactionPage,
    } from "$lib/state/transactions";

    $: ({ account } = $page.params);
    $: ownerTransactions = $transactionsByOwner?.get(account);
    $: signatures = ownerTransactions?.data || [];
</script>

<AnimEach
    each={signatures}
    let:item
    let:index
>
    <Transaction
        transaction={$transactions.get(item)}
        {index}
    />
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
