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
    import { onMount } from "svelte";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import { SOL } from "@helius-labs/xray-proton";

    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Icon from "$lib/components/icon.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import { showModal } from "$lib/state/stores/modals";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);
    const price = client.price.createQuery(SOL);

    const showFilter = () => {
        showModal("TRANSACTION_FILTER", {
            updateFilter: (key: string) => (filter = key),
        });
    };

    const balance = tweened(0, {
        duration: 1000,
    });

    let animate = false;
    let filter = "";

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    onMount(() => {
        animate = true;
    });

    $: worth = $balance * $price?.data;
</script>

<Namor
    text={$page.params.search}
    let:result
>
    <div class="flex items-center px-3 md:hidden">
        <h1 class="my-1 text-lg">
            <span class="">{$balance.toFixed(6)}</span>
            <span class="opacity-50">SOL</span>
        </h1>
        <span class="ml-3 text-xs opacity-50 md:block"
            >{formatMoney(worth)} USD</span
        >
    </div>

    <div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
        <div class="flex flex-wrap items-center justify-between bg-base-100">
            <div>
                <h3
                    class="tooltip tooltip-bottom tooltip-secondary relative m-0 text-lg font-bold md:text-2xl"
                    data-tip="A nickname generated for this account"
                >
                    {result}
                </h3>
                <div class="relative flex items-center">
                    <p class="mr-3 text-xs opacity-50">
                        {shortenString($page.params.search)}
                    </p>
                    <div class="my-2">
                        <CopyButton text={$page.params.search} />
                        <CopyButton
                            text={$page.url.href}
                            icon="link"
                        />
                    </div>
                </div>
            </div>
            <div class="relative text-right">
                <h1 class="text-md hidden md:block">
                    <span class="">{$balance.toFixed(6)}</span>
                    <span class="opacity-50">SOL</span>
                </h1>

                {#if !$price?.isLoading}
                    <span class="ml-1 hidden text-xs opacity-50 md:block"
                        >{formatMoney(worth)} USD</span
                    >
                {/if}
            </div>
        </div>
    </div>

    <div>
        <div
            class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border "
        >
            <div class="tabs w-full pt-1 md:w-auto">
                <div />
                <button
                    class="tab tab-bordered"
                    on:click={() =>
                        (window.location.href = `/${$page.params.search}/wallet`)}
                    class:tab-active={$page.url.pathname.endsWith("wallet")}
                    >Transactions</button
                >
                <!-- <button
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith(
                        "wallet/nfts"
                    )}
                    on:click={() =>
                        (window.location.href = `/${$page.params.search}/wallet/nfts`)}
                    >NFTs</button
                > -->
                <button
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith(
                        "wallet/tokens"
                    )}
                    on:click={() =>
                        (window.location.href = `/${$page.params.search}/wallet/tokens`)}
                    >Tokens</button
                >
            </div>
            {#if $page.url.pathname.endsWith("/wallet")}
                <button
                    class="btn-ghost btn-sm btn"
                    on:click={showFilter}
                >
                    <Icon id="settings" />
                </button>
            {/if}
        </div>
    </div>
</Namor>

<div class="px-3">
    <slot {filter} />
</div>
