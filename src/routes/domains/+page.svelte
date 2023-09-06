<script>
    // @ts-nocheck
    import { calculatePrice } from "$lib/util/calc-price";
    import { restrictSpaces } from "$lib/util/restrict-spaces";
    import { shortenAddress } from "$lib/util/shorten-address";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { onMount, onDestroy } from "svelte";
    import { page } from "$app/stores";
    import { registry } from "$lib/util/stores/owner";

    let query = "";
    let searchQuery = null;
    let searchResult = null;

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        searchQuery = params.get("search");
    });

    let unsubscribe;
    $: if (searchQuery) {
        searchResult = `Search results for ${searchQuery}`;
        const client = trpcWithQuery(page);
        const queryObject = client.domain.createQuery(searchQuery);
        unsubscribe = queryObject.subscribe((value) => {
            registry.set(value);
        });
    }

    onDestroy(() => {
        unsubscribe && unsubscribe();
    });

    const search = () => {
        if (query.trim() !== "") {
            window.location.href = `/domains?search=${query}`;
        }
    };
</script>

<div class="h-32 bg-black">
    <h1 class="p-6 text-center text-6xl font-bold">Domains</h1>
    <p class="text-center">Powered by Bonfida</p>
</div>

<div class="flex w-full justify-center p-3">
    <input
        type="text"
        placeholder="Type here"
        class="input my-2 w-2/4 max-w-xs border-2 border-opacity-30"
        bind:value={query}
        on:keydown={restrictSpaces}
    />
    <button
        class="ml-5"
        on:click={search}>Search</button
    >
</div>
{#if $registry}
    <p class="text-center font-bold">{searchResult}.sol</p>
    <div
        class="col-1 card m-auto my-4 flex h-64 w-6/12 bg-primary text-primary-content"
    >
        <div class="card-body">
            <h2 class="card-title text-4xl">{searchQuery}.sol</h2>
            {#if $registry?.data?.owner}
                <div class="badge bg-[#595982] p-4 text-white">
                    domain taken
                </div>
                <div class="badge badge-outline font-bold">
                    Current Owner: {shortenAddress($registry.data.owner)}
                </div>
            {:else if !$registry?.data?.owner}
                <p class="text-xl font-bold text-white">
                    {calculatePrice(searchQuery)} USDC
                </p>
                <div
                    class="badge gap-2 border-2 border-[#7C7CFF] bg-black p-4 font-bold"
                >
                    available
                </div>
                <div class="card-actions justify-end">
                    <button
                        style="background: linear-gradient(to right, #00F0FF, #CBFF5E);"
                        class="cols-1 btn flex flex-col text-black"
                    >
                        <img
                            class="w-6"
                            src="buy.svg"
                            alt=""
                        /> Buy Now
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
