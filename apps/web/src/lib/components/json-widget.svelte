<script lang="ts">
    import formatHighlight from "json-format-highlight";

    import { fade } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    
    export let jsonData;
    export let page = "";

    let metadataHTML = formatHighlight(jsonData, {
        keyColor: "#a5a3a3",
        numberColor: "#e8a034",
        stringColor: "#24ae67",
    });

    let showCode = false;
</script>

<div class="mb-3">
    <IconCard>
        <div slot="icon">
            <div class="center h-10 w-10 rounded-full bg-secondary">
                <Icon
                    id="json"
                    size="sm"
                />
            </div>
        </div>
        <div
            slot="title"
            class="flex items-center justify-between"
        >
            <div>
                <p>JSON</p>
                <p class="text-xs opacity-50">
                    View raw {page} metadata.
                </p>
            </div>
            <div>
                {#if showCode}
                    <button
                        class="btn-ghost btn-sm btn"
                        on:click={() => (showCode = false)}
                    >
                        <Icon
                            id="cancel"
                            size="md"
                        />
                    </button>
                {:else}
                    <button
                        class="btn-ghost btn-sm btn"
                        on:click={() => (showCode = true)}
                    >
                        <Icon
                            id="dots"
                            size="md"
                        />
                    </button>
                {/if}
            </div>
        </div>
    </IconCard>

    {#if showCode}
        <div
            class="card mt-4 w-full overflow-hidden"
            in:fade={{ duration: 500 }}
        >
            <div class="code overflow-hidden">
                <pre><code class="text-xs"
                        >{@html metadataHTML}</code
                    ></pre>
            </div>
        </div>
    {/if}
</div>