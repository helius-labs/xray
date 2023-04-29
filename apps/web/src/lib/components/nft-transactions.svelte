<style>
    :root {
        --date-picker-background: hsl(var(--b1));
        --date-picker-foreground: hsl(var(--bc));
    }
</style>

<script lang="ts">
    import { page } from "$app/stores";

    import type { TransactionPage } from "$lib/types";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fly } from "svelte/transition";

    import { DateInput } from "date-picker-svelte";

    import Collapse from "$lib/components/collapse.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";

    export let account: string;

    let cachedAddress = "";

    function dateObjectToTimestamp(dateObj: Date): number {
        // Get the Unix timestamp value by dividing the time value by 1000
        if (!dateObj) {
            return 0;
        }
        const timestamp = Math.floor(dateObj.getTime() / 1000);

        return timestamp;
    }

    let fromDate = new Date();
    let toDate = new Date();
    let selectedOptions: string[] = [];
    let selectedSortOption = "DESC";

    const client = trpcWithQuery($page);

    const createTransactionQuery = (input: {
        account: string;
        sortOrder: string;
        types: string[];
        cursor?: string;
    }) =>
        client.nftHistory.createInfiniteQuery(input, {
            getNextPageParam: (lastPage) => lastPage.oldest,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });

    const loadMore = () => {
        $transactions.fetchNextPage();
    };

    $: transactions = createTransactionQuery({
        account,
        sortOrder: selectedSortOption,
        types: selectedOptions,
    });

    // const transactions = client.nftHistory.createQuery(
    //     { account },
    //     {
    //         refetchOnMount: false,
    //         refetchOnWindowFocus: false,
    //     }
    // );

    // TODO: Janky casting because the query resykt comes back super nested and not the right type.
    // Issue: Ttransaction is SerializeObject<UndefinedToOptional<ProtonTransaction>>
    // Expected: ProtonTransaction[]
    $: transactionPages =
        $transactions.data?.pages || ([] as TransactionPage[]);

    // // Hard reset the query when the account changes
    $: if (cachedAddress !== account) {
        cachedAddress = account;

        transactions = createTransactionQuery({
            account,
            sortOrder: selectedSortOption,
            types: selectedOptions,
        });
    }

    $: lastPage = transactionPages[transactionPages.length - 1];

    $: lastPageHasTransactions = lastPage
        ? transactionPages[transactionPages.length - 1].result?.length
        : false;

    function handleSubmit() {
        // Do nothing at the moment
        // transactions = createTransactionQuery({
        //     account,
        //     sortOrder: selectedSortOption,
        //     types: selectedOptions,
        // });
    }
</script>

<div class="my-3">
    <Collapse
        sectionTitle="Filter"
        iconId="settings"
    >
        <form
            on:submit|preventDefault={handleSubmit}
            class="space-y-2"
        >
            <div class="flex items-center">
                <label
                    class="flex cursor-pointer items-center justify-center pr-2"
                >
                    <input
                        type="checkbox"
                        bind:group={selectedOptions}
                        value="NFT_MINT"
                        name="NFT Mint"
                        class="checkbox"
                    />
                    <span class="label-text ml-2">NFT Mint</span>
                </label>
                <label
                    class="flex cursor-pointer items-center justify-center pr-2"
                >
                    <input
                        type="checkbox"
                        bind:group={selectedOptions}
                        value="NFT_SALE"
                        name="NFT Sale"
                        class="checkbox"
                    />
                    <span class="label-text ml-2">NFT Sale</span>
                </label>
                <label
                    class="flex cursor-pointer items-center justify-center pr-2"
                >
                    <input
                        type="checkbox"
                        bind:group={selectedOptions}
                        value="NFT_LISTING"
                        name="NFT List"
                        class="checkbox"
                    />
                    <span class="label-text ml-2">NFT List</span>
                </label>
                <label
                    class="flex cursor-pointer items-center justify-center pr-2"
                >
                    <input
                        type="checkbox"
                        bind:group={selectedOptions}
                        value="NFT_BID"
                        name="NFT Bid"
                        class="checkbox"
                    />
                    <span class="label-text ml-2">NFT Bid</span>
                </label>

                <div class="flex space-x-2">
                    <select
                        class="select-bordered select w-full max-w-xs"
                        bind:value={selectedSortOption}
                    >
                        <option value="DESC">Descending</option>
                        <option value="ASC">Ascending</option>
                    </select>
                </div>
            </div>

            <div class="z-30 flex gap-4">
                <div class="flex flex-col">
                    <div>After Date</div>
                    <DateInput bind:value={fromDate} />
                </div>
                <div>
                    <div>Before Date</div>
                    <DateInput bind:value={toDate} />
                </div>
            </div>
            <!-- <button
                type="submit"
                class="btn-primary btn"
                on:submit={handleSubmit}>Submit</button
            > -->
        </form>
    </Collapse>
</div>
{#if $transactions.isLoading}
    {#each Array(3) as _}
        <div class="py-2">
            <IconCard />
        </div>
    {/each}
    <!-- {:else if transactionPages.length === 1 && !lastPageHasTransactions}
    <p class="opacity-50">No transactions</p> -->
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
