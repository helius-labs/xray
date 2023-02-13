<script lang="ts">
    import { page } from "$app/stores";

    import { state } from "svelte-snacks";

    import { onMount } from "svelte";

    import { nameFromString } from "@helius-labs/helius-namor";

    import { goto } from "$app/navigation";

    import Icon from "$lib/icon";

    import formatMoney from "$lib/util/format-money";
    import shortenString from "../util/shorten-string";

    const solanaPrice = state("tokenPrice", "So11111111111111111111111111111111111111112");
    const solanaTPS = state("solanaTps");

    let backUrl = "";

    let inputEl:HTMLInputElement;
    let inputValue:string = "";
    let recent:string[] = [];
    let searchError = "";
    let isSearching = false;

    const newSearch = async () => {
        searchError = "";
        isSearching = true;

        const searchFailed = () => {
            searchError = "Invalid search. Ensure you've provided a valid wallet address, token ID, or transaction signature.";
            isSearching = false;
        };

        try {
            const response = await fetch(`/api/search/${inputValue}`);

            const { data } = await response.json();

            if(!data?.valid) {
                return searchFailed();
            }

            const recentStorage = window?.localStorage?.getItem("xray:recent-searches");

            const recentJson = JSON.parse(recentStorage || "[]");

            if(!recent.includes(inputValue)) {
                window.localStorage?.setItem("xray:recent-searches", JSON.stringify([
                    inputValue,
                    ...recentJson.slice(0, 5),
                ]));
            }

            goto(data?.url || "/");
        } catch(error) {
            searchFailed();
        }
    };

    onMount(() => {
        const recentStorage = window?.localStorage?.getItem("xray:recent-searches");
        
        recent = JSON.parse(recentStorage || "[]");
    });

    $: if($page.url.pathname.endsWith("/tx") && $page.url.searchParams.has("wallet")) {
        backUrl = `/${$page.url.searchParams.get("wallet")}/wallet`;
    } else {
        backUrl = "/";
    }
</script>

<!-- Put this part before </body> tag -->
<input
    id="my-modal"
    class="modal-toggle"
    type="checkbox" />
<div class="modal">
    <div class="modal-box">
        <label
            class="btn btn-outline btn-sm absolute right-3 top-3"
            for="my-modal">Close</label>
        <h2 class="font-bold text-2xl">ABOUT XRAY</h2>
        <p class="py-4">XRAY is an open source Solana explorer aimed at making transaction details and wallet balances easier to read.</p>

        <h2 class="font-bold text-xl">Supported Searches</h2>
        <ul class="list">
            <li>- Wallet Address</li>
            <li>- Token ID</li>
            <li>- Trandsaction Signature</li>
        </ul>
        
        <div class="flex w-full mt-8">
            <a
                class="btn btn-outline mr-2"
                href="https://github.com/helius-labs/xray"
            >
                <Icon
                    id="github"
                    size="md" />
                <p class="ml-2">Code</p>
            </a>
            <a
                class="btn btn-outline relative"
                href="https://discord.gg/Wkn3uuSby7"
            >
                <Icon
                    id="chat"
                    size="md" />
                <p class="ml-2">Discord</p>
            </a>
        </div>
    </div>
</div>

<nav class="border border-secondary grid grid-cols-3 fixed top-0 left-0 w-screen p-1 bg-black z-10">
    <div class="flex items-center ml-2">
        {#if $page.url.pathname !== "/"}
            <a
                class="btn p-1 px-4 mr- btn-ghost "
                href="/"
            >
                <span class="text-2xl">
                    XRAY
                </span>
            </a>
        {/if}

        <!-- The button to open modal -->
        <label
            class="btn btn-ghost"
            for="my-modal"><Icon
            id="info"
            size="md" /></label>
    </div>
    <div>
        {#if $page.url.pathname !== "/"}
            <form
                class="my-2 flex justify-center relative"
                on:submit|preventDefault={newSearch}>
                <svg
                    class="fill-white opacity-50 h-7 absolute left-4 bottom-1/2 translate-y-1/2"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"><path
                    d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                    fill-rule="nonzero" /></svg>
            
                <div class="dropdown w-full">
                    <input
                        bind:this={inputEl}
                        class="input input-bordered rounded-lg w-full  focus:input-success"
                        placeholder="Search Solana"
                        tabindex="0"
                        type="text"
                        bind:value={inputValue}>

                    {#if recent.length}
                        <ul class="dropdown-content w-full menu p-2 shadow bg-base-100 mt-3 relative px-4 rounded-lg">
                            <p class="text-xs font-bold mt-2 mb-1">Recent</p>
                            {#each recent as address}
                                <li class="truncate px-0 m1-ds2 w-full relative">
                                    <a
                                        class="px-1 py-2 w-full block text-ellipsis max-w-full"
                                        data-sveltekit-preload-data="hover"
                                        href="/{address}">
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
                    class="absolute right-4 bottom-1/2 translate-y-1/2 btn btn-ghost px-2"
                    class:loading={isSearching}>
                    {#if !isSearching}
                        <Icon id="search" />
                    {/if}
                </button>
            </form>
        {/if}
    </div>
    <div class="flex justify-end items-center pr-4">
        {#if $solanaTPS?.isLoading || $solanaPrice?.isLoading}
            <button class="btn btn-ghost loading"></button>
        {/if}
        
        {#if $solanaTPS?.hasFetched}
            <div class="mr-5">
                <p class="text-xs text-neutral font-bold">TPS</p>
                <p class="">{$solanaTPS?.data?.tps.toFixed(0)}</p>
            </div>
        {/if}
        
        {#if $solanaPrice?.hasFetched}
            <a
                class="mr-2"
                href="https://birdeye.so/token/So11111111111111111111111111111111111111112"
                rel="noreferrer"
                target="_blank">
                <p class="text-xs text-neutral font-bold">Price</p>
                <p class="">{formatMoney($solanaPrice?.data)}</p>
            </a>
        {/if}
    </div>
</nav>
