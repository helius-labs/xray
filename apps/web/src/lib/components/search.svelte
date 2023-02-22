<style>
    .input {
        background: rgba(0, 0, 0, 0.25);
    }
</style>

<script lang="ts">
    import type { Icon as IconType } from "src/lib/types";

    import { onMount } from "svelte";

    import { nameFromString } from "@helius-labs/helius-namor";

    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

    import { pasteFromClipboard } from "$lib/util/clipboard";

    import { showConnectWallet } from "$lib/state/stores/connect-wallet";

    import Icon from "$lib/components/icon.svelte";

    import Modal from "$lib/components/modal.svelte";

    export let inputEl: HTMLInputElement | null = null;
    export let searchError = "";
    export let size = "sm" as "sm" | "lg";

    export const focusInput = () => {
        inputEl?.focus();
    };

    export const clearSearch = () => {
        inputValue = "";

        inputEl?.focus();
    };

    let inputValue: string = "";
    let isSearching = false;
    let connected = false;

    let showSearchError = () => "";

    const setFromClipboard = async () => {
        const clipboard = await pasteFromClipboard();

        if (clipboard) {
            inputValue = clipboard;
        }
    };

    const connectWallet = () => {
        connected = false;

        showConnectWallet();
    };

    const searchFailed = () => {
        isSearching = false;

        showSearchError();
    };

    const addRecent = (value: string) => {
        const recentStorage = window?.localStorage?.getItem(
            "xray:recent-searches"
        );

        const recentJson = JSON.parse(recentStorage || "[]");

        if (!recent.includes(value)) {
            window.localStorage?.setItem(
                "xray:recent-searches",
                JSON.stringify([value, ...recentJson.slice(0, 5)])
            );
        }
    };

    const newSearch = async () => {
        searchError = "";
        isSearching = true;

        try {
            const response = await fetch(`/$/api/search/${inputValue}`);

            const { data } = await response.json();

            if (!data?.valid) {
                return searchFailed();
            }

            addRecent(inputValue);

            window.location.href = data?.url || "/";
        } catch (error) {
            searchFailed();
        }
    };

    let recent: string[] = [];

    onMount(() => {
        const recentStorage = window?.localStorage?.getItem(
            "xray:recent-searches"
        );

        recent = JSON.parse(recentStorage || "[]");
    });

    const supportedSearches: Array<[IconType, string]> = [
        ["globe", "Bonfida .sol Domains"],
        ["backpack", "xNFT Backpack Usernames"],
        ["person", "Wallet/Account Addresses"],
        ["coins", "Token Addresses"],
        ["lightning", "Transaction Signatures"],
    ];

    $: if ($walletStore.connected && !connected) {
        focusInput();

        inputValue = $walletStore.publicKey?.toBase58() || "";

        addRecent(inputValue);

        window.location.href = `/${inputValue}`;

        connected = true;
    }
</script>

<Modal
    id="search-error"
    bind:show={showSearchError}
>
    <h1 class="text-2xl font-bold">Invalid Search</h1>
    <p class="mb-3">
        Invalid search. Make sure you provided a valid search that contains one
        of the following.
    </p>

    <strong class="uppercase">Supported Searches</strong>

    {#each supportedSearches as [icon, text]}
        <div class="my-2 grid grid-cols-6 items-center">
            <div class="center col-span-1">
                <Icon
                    id={icon}
                    size="md"
                />
            </div>
            <div class="col-span-5">
                <p>{text}</p>
            </div>
        </div>
    {/each}
</Modal>

<form
    class="relative my-2 w-full"
    on:submit|preventDefault={newSearch}
    on:keydown={(event) => {
        if (event.key === "Enter") {
            newSearch();
        }
    }}
>
    <div class="dropdown w-full">
        <input
            bind:this={inputEl}
            class="input-bordered input h-10  w-full rounded-lg focus:input-primary"
            class:h-14={size === "lg"}
            placeholder="Search Solana"
            tabindex="0"
            type="text"
            bind:value={inputValue}
        />
        <ul
            class="dropdown-content relative mt-3 w-full rounded-lg border bg-base-100 p-2 px-4 shadow"
        >
            <div class="flex flex-wrap items-center justify-between">
                <p class="text-md mb-1 mt-2 font-bold">Recents</p>
            </div>
            {#if recent.length}
                {#each recent as address}
                    {#if address}
                        <li class="m1-ds2 relative z-30 w-full truncate px-0">
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
                    {/if}
                {/each}
            {:else}
                <i class="pt-2 text-xs opacity-50"
                    >Paste an address or connect a wallet to get started.</i
                >
            {/if}
        </ul>
    </div>

    <button
        class="btn-ghost btn absolute right-4 bottom-1/2 translate-y-1/2 px-2"
        class:loading={isSearching}
    >
        {#if !isSearching}
            <Icon id="search" />
        {/if}
    </button>
</form>

{#if size === "lg"}
    <div class="grid grid-cols-1 py-2 md:grid-cols-3">
        <button
            class="btn-outline btn mb-4"
            on:click|preventDefault={clearSearch}
        >
            <span class="text-sm">Clear</span>
        </button>

        <button
            class="btn-outline btn mb-4 md:ml-2"
            on:click|preventDefault={setFromClipboard}
        >
            <span class="text-sm">Paste</span>
        </button>

        <button
            class="btn-outline btn mb-4 md:ml-2"
            on:click|preventDefault={connectWallet}
        >
            <span class="text-sm">Connect Wallet</span>
        </button>
    </div>
{/if}
