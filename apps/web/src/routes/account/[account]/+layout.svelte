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
    import Nav from "$lib/components/nav.svelte";

    import Icon from "$lib/components/icon.svelte";

    import AccountHeader from "$lib/components/account-header.svelte";
    import { showModal } from "$lib/state/stores/modals";

    const account = $page.params.account;

    $: isTransactions =
        !$page.url.pathname.endsWith("/tokens") &&
        !$page.url.pathname.endsWith("/assets");
</script>

<Nav />

<div class="relative mx-auto w-full max-w-2xl pb-32">
    <AccountHeader
        {account}
        link={$page.url.href}
    />

    <div>
        <div
            class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border"
        >
            <div class="tabs w-full pt-1 md:w-auto">
                <div />
                <button
                    class="tab tab-bordered"
                    on:click={() =>
                        (window.location.href = `/account/${$page.params.account}`)}
                    class:tab-active={isTransactions}>Transactions</button
                >
                <button
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith("/tokens")}
                    on:click={() =>
                        (window.location.href = `/account/${$page.params.account}/tokens`)}
                    >Tokens</button
                >
                <button
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith("/assets")}
                    on:click={() =>
                        (window.location.href = `/account/${$page.params.account}/assets`)}
                    >Assets</button
                >
            </div>
            {#if isTransactions}
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
</div>
