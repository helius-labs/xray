<script lang="ts">
    import { page } from "$app/stores";

    import type { TransactionPage } from "$lib/types";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fly } from "svelte/transition";

    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";

    export let account: string;
    export let user = "";
    export let filter = "";

    import solanaQuery from "$lib/solana";

    let cachedAddress = "";

    const client = trpcWithQuery($page);

    const loadMore = () => {
        $transactions.fetchNextPage();
    };

    $: transactions = solanaQuery.transactions(client, {
        account,
        filter,
        user,
    });

    // TODO: Janky casting because the query resykt comes back super nested and not the right type.
    // Issue: Ttransaction is SerializeObject<UndefinedToOptional<ProtonTransaction>>
    // Expected: ProtonTransaction[]
    $: transactionPages =
        $transactions.data?.pages || ([] as TransactionPage[]);

    // Hard reset the query when the account changes
    $: if (cachedAddress !== account) {
        cachedAddress = account;

        transactions = solanaQuery.transactions(client, {
            account,
            filter,
            user,
        });
    }

    $: lastPage = transactionPages[transactionPages.length - 1];

    $: lastPageHasTransactions = lastPage
        ? transactionPages[transactionPages.length - 1].result?.length
        : false;
</script>

{#if $transactions.isLoading}
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
{:else if transactionPages.length === 1 && !lastPageHasTransactions}
    <p class="opacity-50">No transactions</p>
{:else}
    {#each transactionPages as transactionsList}
        {#each transactionsList.result as transaction, idx (transaction)}
            {#if transaction?.signature}
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
    {/each}
{/if}

{#if $transactions.hasNextPage && lastPageHasTransactions && !transactions.isLoading}
    <div class="flex justify-center">
        <button
            class="btn-outline btn"
            class:loading={$transactions.isFetching}
            class:disabled={$transactions.isFetching}
            on:click={loadMore}>Load More</button
        >
    </div>
{/if}
