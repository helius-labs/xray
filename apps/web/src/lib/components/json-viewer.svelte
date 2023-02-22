<script lang="ts">
    // @ts-ignore
    import formatHighlight from "json-format-highlight";
    import { fade } from "svelte/transition";
    import Icon from "$lib/components/icon.svelte";

    export let data: any;

    $: metadataHTML = formatHighlight(JSON.stringify(data || {}, null, 4), {
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
    <div
        class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1"
    >
        <div class="col-span-2 p-1 md:col-span-1">
            <div class="center h-10 w-10 rounded-full bg-secondary">
                <Icon
                    id="json"
                    size="sm"
                />
            </div>
        </div>
        <div
            class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
        >
            <div>
                <h4 class="text-lg font-semibold md:text-sm">JSON</h4>
                <h3 class="mr-2 text-xs opacity-50">
                    Raw transaction data from Helius.
                </h3>
            </div>
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
                        id="dots"
                        size="md"
                    />
                {/if}
            </button>
        </div>
        {#if showCode}
            <div class="code col-span-12 w-full overflow-hidden px-3">
                <pre><code class="text-xs">{@html metadataHTML}</code></pre>
            </div>
        {/if}
    </div>
</div>
