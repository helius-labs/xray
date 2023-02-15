<style>
    .input {
        background: rgba(0, 0, 0, 0.25);
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";

    import { clusterApiUrl } from "@solana/web3.js";

    import heliusLogo from "$lib/assets/helius/helius.png";

    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

    import { nameFromString } from "@helius-labs/helius-namor";

    import { goto } from "$app/navigation";

    import { pasteFromClipboard } from "$lib/util/clipboard";

    import Icon from "$lib/icon";

    import {
        workSpace,
        WalletProvider,
        ConnectionProvider,
        WalletModal,
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        PhantomWalletAdapter,
        BackpackWalletAdapter,
        GlowWalletAdapter,
        SolflareWalletAdapter,
    } from "@solana/wallet-adapter-wallets";

    let showConnectWallet = false;

    let inputEl: HTMLInputElement;
    let inputValue: string = "";

    let searchError = "";
    let isSearching = false;

    let recent: string[] = [];

    const wallets = [
        new PhantomWalletAdapter(),
        new BackpackWalletAdapter(),
        new SolflareWalletAdapter(),
        new GlowWalletAdapter(),
    ];

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");

    const setFromClipboard = async () => {
        const clipboard = await pasteFromClipboard();

        if (clipboard) {
            inputValue = clipboard;
        }
    };

    const connectWallet = async (event: CustomEvent) => {
        await $walletStore.select(event.detail);
        await $walletStore.connect();

        inputValue = $walletStore.publicKey?.toBase58() || "";

        showConnectWallet = false;
    };

    onMount(() => {
        const recentStorage = window?.localStorage?.getItem(
            "xray:recent-searches"
        );

        recent = JSON.parse(recentStorage || "[]");
    });

    const focus = () => inputEl?.focus();

    const newSearch = async () => {
        searchError = "";
        isSearching = true;

        const searchFailed = () => {
            searchError =
                "Invalid search. Ensure you've provided a valid wallet address, token ID, or transaction signature.";
            isSearching = false;
        };

        try {
            const response = await fetch(`/api/search/${inputValue}`);

            const { data } = await response.json();

            if (!data?.valid) {
                return searchFailed();
            }

            const recentStorage = window?.localStorage?.getItem(
                "xray:recent-searches"
            );

            const recentJson = JSON.parse(recentStorage || "[]");

            if (!recent.includes(inputValue)) {
                window.localStorage?.setItem(
                    "xray:recent-searches",
                    JSON.stringify([inputValue, ...recentJson.slice(0, 5)])
                );
            }

            goto(data?.url || "/");
        } catch (error) {
            searchFailed();
        }
    };

    onMount(focus);
</script>

{#if showConnectWallet}
    <WalletModal
        maxNumberOfWallets="6"
        on:connect={connectWallet}
        on:close={() => (showConnectWallet = false)}
    />
{/if}

<WalletProvider
    autoConnect={false}
    {localStorageKey}
    {wallets}
/>

<ConnectionProvider {network} />

<div class="flex min-h-screen flex-wrap justify-center px-3 pt-40 md:pt-60">
    <div class="w-full max-w-2xl">
        <div>
            <h1 class="text-center text-8xl font-bold text-white opacity-80">
                XRAY
            </h1>
            <p class="text-center text-current opacity-50">
                A Solana explorer built by the community, made for everyone.
            </p>
        </div>
        {#if searchError && !isSearching}
            <div class="mt-4 flex items-center opacity-50">
                <Icon
                    id="info"
                    fill="warning"
                    size="md"
                />
                <p
                    class="ml-3 text-slate-100"
                    in:fly={{
                        duration: 500,
                        y: -10,
                    }}
                >
                    {searchError}
                </p>
            </div>
        {/if}
        <form
            class="relative my-5 flex justify-center"
            on:submit={newSearch}
        >
            <div class="absolute left-4 bottom-1/2 translate-y-1/2">
                <Icon
                    id="search"
                    size="md"
                />
            </div>

            <div class="dropdown w-full">
                <input
                    bind:this={inputEl}
                    class="input-bordered input h-16 w-full rounded-lg px-14 text-lg focus:input-success"
                    placeholder="Search Solana"
                    tabindex="0"
                    type="text"
                    bind:value={inputValue}
                />

                {#if recent.length}
                    <ul
                        class="dropdown-content menu relative mt-3 w-full rounded-lg bg-base-100 p-2 px-4 shadow"
                    >
                        <div class="flex items-center justify-between">
                            <p class="text-md mt-2 mb-1 font-bold">Recent</p>
                            <div>
                                <button
                                    class="btn-outline btn-sm btn"
                                    on:click|preventDefault={() =>
                                        (inputValue = "")}
                                >
                                    <span class="text-sm"> Clear </span>
                                </button>

                                <button
                                    class="btn-outline btn-sm btn ml-2"
                                    on:click|preventDefault={setFromClipboard}
                                >
                                    <span class="text-sm"> Paste </span>
                                </button>

                                <button
                                    class="btn-outline btn-sm btn ml-2"
                                    on:click|preventDefault={() =>
                                        (showConnectWallet = true)}
                                >
                                    <span class="text-sm">
                                        🎒 Connect Wallet
                                    </span>
                                </button>
                            </div>
                        </div>
                        {#each recent as address}
                            <li class="m1-ds2 relative w-full truncate px-0">
                                <a
                                    class="block w-full max-w-full text-ellipsis px-1 py-2"
                                    data-sveltekit-preload-data="hover"
                                    href="/{address}"
                                >
                                    <p class="text-micro text-xs opacity-50">
                                        {nameFromString(address)}
                                    </p>
                                    <p class="text-micro text-xs">
                                        {#if address.length > 20}
                                            {address}
                                        {:else}
                                            {address}
                                        {/if}
                                    </p>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <button
                class="btn-ghost btn absolute right-4 bottom-1/2 translate-y-1/2 px-0"
                class:loading={isSearching}
            >
                {#if !isSearching}
                    <Icon
                        id="arrowRight"
                        size="md"
                    />
                {/if}
            </button>
        </form>
        <div>
            <a
                class="flex items-center justify-center opacity-50"
                href="https://helius.xyz/"
            >
                <p class="mr-1 text-xs ">Powered by</p>
                <img
                    class="h-5"
                    alt=""
                    src={heliusLogo}
                />
            </a>
        </div>
    </div>
</div>
