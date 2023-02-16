<script lang="ts">
    import { onMount } from "svelte";

    import { nameFromString } from "@helius-labs/helius-namor";

    import Icon from "$lib/icon";

    let inputEl: HTMLInputElement;
    let inputValue: string = "";
    let recent: string[] = [];
    let searchError = "";
    let isSearching = false;

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

            window.location.href = data?.url || "/";
        } catch (error) {
            searchFailed();
        }
    };

    onMount(() => {
        const recentStorage = window?.localStorage?.getItem(
            "xray:recent-searches"
        );

        recent = JSON.parse(recentStorage || "[]");
    });
</script>

<form
    class="relative my-2  w-full"
    on:submit|preventDefault={newSearch}
>
    <svg
        class="absolute left-4 bottom-1/2 h-7 translate-y-1/2 fill-white opacity-50"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
            d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
            fill-rule="nonzero"
        /></svg
    >

    <div class="dropdown w-full">
        <input
            bind:this={inputEl}
            class="input-bordered input w-full rounded-lg  focus:input-success"
            placeholder="Search Solana"
            tabindex="0"
            type="text"
            bind:value={inputValue}
        />

        {#if recent.length}
            <ul
                class="dropdown-content menu relative mt-3 w-full rounded-lg bg-base-100 p-2 px-4 shadow"
            >
                <p class="mt-2 mb-1 text-xs font-bold">Recent</p>
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
        class="btn-ghost btn absolute right-4 bottom-1/2 translate-y-1/2 px-2"
        class:loading={isSearching}
    >
        {#if !isSearching}
            <Icon id="search" />
        {/if}
    </button>
</form>
