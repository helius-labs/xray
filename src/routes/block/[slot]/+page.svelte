<script lang="ts">
    //@ts-nocheck
    import { page } from "$app/stores";

    import type { TransactionPage } from "$lib/types";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fly } from "svelte/transition";

    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";

    let cachedSlot = "";

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";

    const createTransactionQuery = (input: {
        slot: number;
        cursor?: string;
        isMainnet: boolean;
    }) =>
        client.blockTransactions.createInfiniteQuery(input, {
            getNextPageParam: (lastPage: { oldest: number }) => lastPage.oldest,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });

    const loadMore = () => {
        $transactions.fetchNextPage();
    };

    $: transactions = createTransactionQuery({
        isMainnet: isMainnetValue,
        slot: parseInt($page.params.slot),
    });

    $: transactionPages =
        $transactions.data?.pages || ([] as TransactionPage[]);

    $: if (cachedSlot !== $page.params.slot) {
        cachedSlot = $page.params.slot;

        transactions = createTransactionQuery({
            isMainnet: isMainnetValue,
            slot: parseInt($page.params.slot),
        });
    }

    $: lastPage = transactionPages[transactionPages.length - 1];

    $: lastPageHasTransactions = lastPage
        ? transactionPages[transactionPages.length - 1].result?.length
        : false;
</script>

<div class="max-w-screen content pt-5">
    <div class="relative mx-auto w-full max-w-2xl pb-32">
        <div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
            <div
                class="flex flex-wrap items-center justify-between bg-base-100"
            >
                <div>
                    <h3 class="relative m-0 text-lg font-bold md:text-2xl">
                        Slot {parseInt($page.params.slot).toLocaleString()}
                    </h3>
                </div>
            </div>
        </div>

        <div>
            <div
                class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border"
            >
                <div class="tabs w-full pt-1 md:w-auto">
                    <div />
                    <a
                        href="/"
                        class="tab-bordered tab tab-active"
                    >
                        Transactions
                    </a>
                </div>
            </div>
        </div>

        <div class="px-3">
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
        </div>
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
    </div>
</div>
