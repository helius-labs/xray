<script lang="ts">
    import { page } from "$app/stores";

    import { onMount } from "svelte";

    import { state } from "svelte-snacks";

    import Highlight from "svelte-highlight";
    import hljs from "highlight.js";
    import json from "highlight.js/lib/languages/json";
    import github from "svelte-highlight/styles/github";

    import shortenString from "$lib/util/shorten-string";
    import Icon from "$lib/icon";

    import Transactions from "$lib/components/transactions.svelte";

    import { fade } from "svelte/transition";

    let showCode = false;

    const address = $page.params.search;
  
    const transaction = state([ "solanaTransaction", address ], address);

    let metadataHTML = "";

    onMount(() => {
        hljs.registerLanguage("json", json);
    });

    $: if($transaction?.data?.parsed) {
        metadataHTML = hljs.highlight(JSON.stringify($transaction?.data?.raw, null, 4), { language : "json" }).value;
    }
</script>

<svelte:head>
    {@html github}
</svelte:head>

{#if $transaction?.isLoading}
    <p>Loading...</p>
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    <div class="card prose mb-6">
        <div class="flex justify-between items-center">
            <div>
                <h4 class="opacity-50 m-0 text-sm">Transaction</h4>
                <h4 class="m-0 text-2xl">{shortenString($transaction?.data?.parsed?.signature || "", 10)}</h4>
            </div>
            <div>
                <button class="btn btn-ghost">
                    <Icon
                        id="copy"
                        size="md" />
                </button>
            </div>
        </div>
    </div>

    <div class="card prose mb-6">
        <div class="flex justify-between items-center">
            <div>
                <h4 class="m-0">Status</h4>
            </div>
            <div>
                <div class="badge badge-success h-8 px-3">
                    Success
                </div>
            </div>
        </div>
    </div>
    
    <Transactions
        transactions={[ $transaction?.data ]}
        user={$page.url.searchParams.get("wallet") || ""} />

    <div class="card grid grid-cols-12 gap-3 mt-8 mb-2">
        <div class="col-span-2 md:col-span-1 center relative">
            <Icon id="network" />
        </div>
        <div class="col-span-10 md:col-span-11  flex justify-between">
            <div>
                <p class="ml-1">Network Fee</p>
            </div>
            <div>
                {$transaction?.data?.parsed?.fee}
            </div>
        </div>
    </div>

    <div
        class="card hover:opacity-75"
        on:click={() => (showCode = !showCode)}
        on:keydown={() => (showCode = !showCode)}>
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-2 md:col-span-1 center relative">
                <Icon id="json"
                />
                <p class="ml-2">
                    JSON
                </p>
            </div>

            <div class="col-span-10 md:col-span-11  flex justify-end items-center"
            >
                <div>
                    {#if showCode}
                        <Icon
                            id="cancel"
                            size="md" />
                    {:else}
                        <Icon
                            id="dots"
                            size="md" />
                    {/if}

                </div>
            </div>
        </div>

        {#if showCode}
            <div
                class="code overflow-hidden"
                in:fade={{ duration : 500 }}>
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                <pre><code class="text-xs">{@html metadataHTML}</code></pre>
            </div>
        {/if}
    </div>

    <div class="flex justify-center my-5">
        <a
            class="btn btn-ghost text-success text-xs"
            href={`https://explorer.solana.com/tx/${$transaction?.data?.signature}`}
        >View on Solana Explorer</a>
    </div>
        
{/if}
