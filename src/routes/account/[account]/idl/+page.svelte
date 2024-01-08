<script>
    import { idlStore } from "$lib/util/stores/idl";
    // @ts-ignore
    import formatHighlight from "json-format-highlight";

    let formattedIdl = "";

    $: if ($idlStore) {
        formattedIdl = formatHighlight(JSON.stringify($idlStore, null, 2), {
            keyColor: "#a5a3a",
            numberColor: "#e8a034",
            stringColor: "#24ae67",
        });
    }
</script>

<div class="relative mx-auto w-full max-w-2xl pb-32">
    {#if $idlStore}
        <div class="code col-span-12 w-full overflow-hidden px-3">
            <pre><code class="text-xs">{@html formattedIdl}</code></pre>
        </div>
    {:else}
        <p>No IDL data available.</p>
    {/if}
</div>
