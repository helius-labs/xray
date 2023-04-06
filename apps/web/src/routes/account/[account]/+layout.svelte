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

    import { SOL } from "@helius-labs/xray";

    import Icon from "$lib/components/icon.svelte";

    import { showModal } from "$lib/state/stores/modals";
    import AccountInfo from "src/lib/components/account-info.svelte";

    const account = $page.params.account;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);
    const price = client.price.createQuery(SOL);

    const balance = tweened(0, {
        duration: 1000,
    });

    let animate = false;

    onMount(() => {
        animate = true;
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    $: worth = $balance * $price?.data;
</script>

<AccountInfo {account} />

<div class="content">
    <div
        class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border"
    >
        <div class="tabs w-full pt-1 md:w-auto">
            <div />
            <button
                class="tab tab-bordered"
                on:click={() =>
                    (window.location.href = `/account/${$page.params.account}`)}
                class:tab-active={!$page.url.pathname.endsWith("/tokens")}
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
                class:tab-active={$page.url.pathname.endsWith("/tokens")}
                on:click={() =>
                    (window.location.href = `/account/${$page.params.account}/tokens`)}
                >Tokens</button
            >
        </div>
        {#if !$page.url.pathname.endsWith("/tokens")}
            <button
                class="btn-ghost btn-sm btn"
                on:click={() => showModal("TRANSACTION_FILTER")}
            >
                <Icon id="settings" />
            </button>
        {/if}
    </div>
</div>

<div class="content px-3">
    <slot />
</div>
