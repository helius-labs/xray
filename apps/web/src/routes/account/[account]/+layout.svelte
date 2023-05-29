<style>
    .nav::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100vw;
        transform: translate(-50%, 0);
        background-color: black;
    }
</style>

<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { fade } from "svelte/transition";

    import { User } from "lucide-svelte";

    import AccountHeader from "$lib/components/account-header.svelte";
    import { filterStore } from "src/lib/util/stores/filter";

    import solanaQuery from "$lib/solana";

    const client = trpcWithQuery($page);

    const { account } = $page.params;

    $: transactions = solanaQuery.transactions(client, {
        account,
        filter: $filterStore,
        user: account,
    });

    $: tokens = solanaQuery.tokens(client, {
        account,
    });

    $: assets = solanaQuery.assets(client, {
        account,
    });

    $: $transactions && $tokens && $assets;

    $: transactionsFirstPage = $transactions.data?.pages[0] || [];

    $: isTransactions = $page.url.pathname.endsWith("/transactions");
    $: isTokens = $page.url.pathname.endsWith("/tokens");
    $: isAssets = $page.url.pathname.endsWith("/assets");

    // $: console.log(
    //     transactionsFirstPage,
    //     "tokens",
    //     $tokens,
    //     $tokens?.data,
    //     "txns",
    //     $transactions?.data?.pages[0],
    //     "assets",
    //     $assets?.data
    // );

    // TODO this better
    $: isUserHome =
        !$page.url.pathname.endsWith("/tokens") &&
        !$page.url.pathname.endsWith("/assets") &&
        !$page.url.pathname.endsWith("/transactions");
</script>

<div class="relative mx-auto w-full max-w-2xl pb-3">
    <AccountHeader
        {account}
        link={$page.url.href}
    />

    <div
        class="mb-2 mt-3 flex w-full items-center justify-between rounded-lg bg-black bg-opacity-60"
    >
        <div
            class="tabs- tabs w-full overflow-hidden  rounded-lg pt-1 md:w-auto"
        >
            <a
                in:fade={{ delay: 0, duration: 1000 }}
                class="tab"
                href="/account/{$page.params.account}/"
                class:tab-bordered={isUserHome}
                class:font-bold={isUserHome}
                class:tab-active={isUserHome}><User size={16} /></a
            >
            <a
                in:fade={{ delay: 0, duration: 1000 }}
                class="tab"
                href="/account/{$page.params.account}/transactions"
                class:font-bold={isTransactions}
                class:tab-bordered={isTransactions}
                class:tab-active={isTransactions}>Transactions</a
            >
            <a
                in:fade={{ delay: 500, duration: 1000 }}
                class="tab"
                href="/account/{$page.params.account}/tokens"
                class:font-bold={isTokens}
                class:tab-bordered={isTokens}
                class:tab-active={isTokens}>Tokens</a
            >
            <a
                in:fade={{ delay: 1000, duration: 1000 }}
                class="tab"
                href="/account/{$page.params.account}/assets"
                class:font-bold={isAssets}
                class:tab-bordered={isAssets}
                class:tab-active={isAssets}>Assets</a
            >
        </div>
        <!-- <div class="flex justify-end">
                {#if isTransactions}
                    <button
                        class="btn-ghost btn-xs btn"
                        on:click={() => showModal("TRANSACTION_FILTER")}
                    >
                        <span class="mr-1"> Filter </span>
                        <Icon id="settings" />
                    </button>
                {/if}
                <button
                    class="btn-ghost btn-xs btn"
                    on:click={() => showModal("TRANSACTION_FILTER")}
                >
                    <span class="mr-1"> New Search </span>
                    <Search size={18} />
                </button>
            </div> -->
    </div>
</div>
<div>
    <div class="content pl-3">
        <slot />
    </div>
</div>
