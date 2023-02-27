<style>
    .input {
        background: rgba(0, 0, 0, 0.95);
    }
</style>

<script lang="ts">
    import type { SearchResult } from "$lib/types";

    import { onMount, createEventDispatcher } from "svelte";

    import { nameFromString } from "@helius-labs/helius-namor";

    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

    import { pasteFromClipboard } from "$lib/util/clipboard";

    import { showConnectWallet } from "$lib/state/stores/connect-wallet";

    import { showModal } from "$lib/stores/modals";

    import Icon from "$lib/components/icon.svelte";

    import { recentSearchesKey } from "$lib/config";
    import Page from "src/routes/+page.svelte";

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
    let isBackpack = false;

    let recent = [] as SearchResult[];

    const dispatch = createEventDispatcher();

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

        showModal("INVALID_SEARCH");
    };

    // For testing
    // DRky4ahiHbDj7XsZULUhSxPTM9V7VcFfNZfF7VJsEqXi
    // MatrfYnDmsBrdnETpW2S6uksrChkGwyN4RRCXtTPZsv
    //

    const getRecentSearches = () =>
        JSON.parse(
            localStorage.getItem(recentSearchesKey) || "[]"
        ) as SearchResult[];

    const addRecent = (value: SearchResult) => {
        console.log("added reent");
        if (!value.search) {
            return;
        }

        const stored = getRecentSearches();

        console.log({ stored, value });

        // // Already exists
        const exists = stored.find(({ url }) => {
            console.log({ url });

            return url === value.url;
        });

        // console.log({ exists });

        // if (exists) {
        //     return;
        // }

        localStorage.setItem(
            recentSearchesKey,
            JSON.stringify([value, ...getRecentSearches()])
        );
    };

    const clearRecents = () => {
        window.localStorage.setItem(recentSearchesKey, JSON.stringify([]));

        recent = [];
    };

    const loadSearch = ({ url }: SearchResult) =>
        (window.location.href = url || "/");

    const newSearch = async () => {
        searchError = "";
        isSearching = true;

        try {
            const response = await fetch(`/$/api/search/${inputValue}`);

            const { data } = await response.json();

            if (!data?.valid) {
                return searchFailed();
            }

            addRecent(data);
            // loadSearch(data);
        } catch (error) {
            searchFailed();
        }
    };

    onMount(() => {
        recent = getRecentSearches();

        isBackpack =
            window?.localStorage?.getItem("walletAdapter") === '"Backpack"';
    });

    $: if ($walletStore.connected && !connected) {
        focusInput();

        inputValue = $walletStore.publicKey?.toBase58() || "";

        addRecent({
            address: inputValue,
            isAccount: true,
            isDomain: false,
            isToken: false,
            isTransaction: false,
            search: inputValue,
            url: `/${inputValue}/wallet`,
            valid: true,
        });

        window.location.href = `/${inputValue}/wallet`;

        connected = true;
    }
</script>

<div class="relative my-2 w-full">
    <div class="dropdown relative w-full">
        <input
            bind:this={inputEl}
            class="input-bordered input h-10  w-full rounded-lg focus:input-primary"
            class:h-14={size === "lg"}
            placeholder="Search Solana"
            tabindex="0"
            type="text"
            on:focusin={() => dispatch("focusin")}
            on:focusout={() => dispatch("focusout")}
            bind:value={inputValue}
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    newSearch();
                }
            }}
        />
        {#if recent.length > 0}
            <ul
                class="dropdown-content relative z-20 my-3 w-full rounded-lg border bg-base-100 p-2 px-4 shadow"
            >
                <div class="flex flex-wrap items-center justify-between">
                    <p class="text-md mb-1 mt-2">Recents</p>
                    <button
                        class="btn-xs btn border-none bg-transparent"
                        on:click={clearRecents}
                    >
                        <span class="my-1">Clear all</span>
                    </button>
                </div>
                {#if recent.length}
                    {#each recent as recentSearch}
                        {#if recentSearch}
                            <li
                                class="m1-ds2 relative z-30 w-full truncate px-0 hover:opacity-60"
                            >
                                <a
                                    class="block w-full max-w-full text-ellipsis rounded-lg px-1 py-2 text-left hover:bg-secondary"
                                    data-sveltekit-preload-data="hover"
                                    href={recentSearch.url}
                                >
                                    <p class="text-micro text-xs opacity-50">
                                        {nameFromString(recentSearch?.address)}
                                    </p>
                                    <p class="text-micro text-xs">
                                        {recentSearch?.search}
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
        {/if}
    </div>

    <button
        class="btn-ghost btn absolute right-4 bottom-1/2 translate-y-1/2 px-2"
        class:loading={isSearching}
    >
        {#if !isSearching}
            <Icon id="search" />
        {/if}
    </button>
</div>

{#if size === "lg"}
    <div class="relative z-10 grid grid-cols-1 py-2 md:grid-cols-3">
        <button
            class="bg-faint btn-outline btn mb-4"
            on:click|preventDefault={clearSearch}
        >
            <span class="text-sm">Clear</span>
        </button>

        <button
            class="bg-faint btn-outline btn mb-4 md:ml-2"
            on:click|preventDefault={setFromClipboard}
        >
            <span class="text-sm">Paste</span>
        </button>

        <button
            class="bg-faint btn-outline btn mb-4 md:ml-2"
            on:click|preventDefault={connectWallet}
        >
            <span class="text-sm">{isBackpack ? "🎒" : ""}Connect Wallet</span>
        </button>
    </div>
{/if}
