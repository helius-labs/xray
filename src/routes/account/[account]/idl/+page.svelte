<script lang="ts">
    import { idlStore } from "$lib/util/stores/idl";
    // @ts-ignore
    import formatHighlight from "json-format-highlight";

    let idl: string;
    let idlData = $idlStore;

    $: if (idlData) {
        idl = formatHighlight(JSON.stringify(idlData, null, 2), {
            keyColor: "#a5a3a",
            numberColor: "#e8a034",
            stringColor: "#24ae67",
        });
    }

</script>

<div>
    <div class="relative mx-auto w-full max-w-2xl pb-32">
        {#if idlData}
        <div class="code col-span-12 w-full overflow-hidden px-3">
            <pre><code class="text-xs">{@html idl}</code></pre>
        </div>
        {/if}
    </div>
</div>