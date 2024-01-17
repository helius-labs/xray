<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    // @ts-ignore
    import formatHighlight from "json-format-highlight";
    import { fade } from "svelte/transition";

    import CopyButton from "$lib/components/copy-button.svelte";
    import { prevent_default } from "svelte/internal";

    export let data: any;
    export let label: string;

    $: metadataHTML = formatHighlight(JSON.stringify(data || {}, null, 2), {
        keyColor: "#a5a3a3",
        numberColor: "#e8a034",
        stringColor: "#24ae67",
    });

    let showCode = false;
</script>

<div
    class="mb-3"
    in:fade={{ duration: 500 }}
>
    <div class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg p-1">
        <div class="col-span-2 p-1 md:col-span-1">
            {#if label !== "token" && label !== "update-cNFT"}
                <div class="center h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="json"
                        size="sm"
                    />
                </div>
            {/if}
        </div>
        <div
            class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
        >
            <div>
                <h4 class="text-lg font-semibold md:text-sm">
                    {#if label === "proton"}
                        Simple
                    {:else if label === "enriched"}
                        Medium
                    {:else if label === "raw"}
                        Advanced
                    {/if}
                </h4>
                <h3 class="mr-2 text-xs opacity-50">
                    {#if label === "proton"}
                        Parsed transaction data from XRAY's Proton
                    {:else if label === "enriched"}
                        Enriched transaction data from the Helius API
                    {:else if label === "raw"}
                        Raw transaction data from the Solana RPC
                    {/if}
                </h3>
            </div>
            <div class="flex items-center">
                {#if label === "token" || label === "update-cNFT"}
                    <h3 class="mr-2 text-xs">Copy JSON</h3>
                {/if}
                <CopyButton text={JSON.stringify(data, null, 2)} />
                {#if label !== "token" && label !== "update-cNFT"}
                    <button
                        class="btn-ghost btn-sm btn"
                        on:click={() => (showCode = !showCode)}
                    >
                        {#if showCode}
                            <Icon
                                id="cancel"
                                size="md"
                            />
                        {:else}
                            <Icon
                                id="fullscreen"
                                size="sm"
                            />
                        {/if}
                    </button>
                {/if}
            </div>
        </div>
        {#if showCode || label === "token" || label === "update-cNFT"}
            <div class="code col-span-12 w-full overflow-hidden px-3">
                <pre><code class="text-xs">{@html metadataHTML}</code></pre>
            </div>
        {/if}
    </div>
</div>
