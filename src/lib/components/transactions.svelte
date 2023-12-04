<script lang="ts">
    /* eslint-disable */
    //@ts-nocheck
    import { page } from "$app/stores";

    import type { TransactionPage } from "$lib/types";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fly } from "svelte/transition";

    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";

    export let account: string;
    export let user = "";
    export let filter = "";
    export let compressed = false;

    let cachedAddress = "";

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const createTransactionQuery = (input: {
        account: string;
        filter: string;
        user: string;
        cursor?: string;
        isMainnet: boolean;
    }) =>
        compressed
            ? client.cnftTransactions.createInfiniteQuery(input, {
                  getNextPageParam: (lastPage) => lastPage.oldest,
                  refetchOnMount: false,
                  refetchOnWindowFocus: false,
              })
            : client.transactions.createInfiniteQuery(input, {
                  getNextPageParam: (lastPage) => lastPage.oldest,
                  refetchOnMount: false,
                  refetchOnWindowFocus: false,
              });

    const loadMore = () => {
        $transactions.fetchNextPage();
    };

    $: transactions = createTransactionQuery({
        account,
        filter,
        isMainnet: isMainnetValue,
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

        transactions = createTransactionQuery({
            account,
            filter,
            isMainnet: isMainnetValue,
            user,
        });
    }

    $: lastPage = transactionPages[transactionPages.length - 1];

    $: lastPageHasTransactions = lastPage
        ? transactionPages[transactionPages.length - 1].result?.length
        : false;
</script>

{#if $transactions.isLoading}
    {#each Array(3) as _}
        <div class="py-2">
            <IconCard />
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
                            duration: 500,
                            y: 30,
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

{#if $transactions.hasNextPage && lastPageHasTransactions}
    <div class="flex justify-center">
        <button
            class="btn-outline btn"
            class:loading={$transactions.isFetching}
            class:disabled={$transactions.isFetching}
            on:click={loadMore}>Load More</button
        >
    </div>
{/if}
