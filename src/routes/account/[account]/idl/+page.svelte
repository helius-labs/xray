<script>
    import { idlStore } from "$lib/util/stores/idl";
    // @ts-ignore
    import formatHighlight from "json-format-highlight";
    import { copyToClipboard } from "$lib/util/clipboard";
    import CopyButton from "$lib/components/copy-button.svelte";

    let formattedIdl = "";
    let idlText = "";
    let isCopying = false;

    const handleCopyClick = () => {
        if ($idlStore) {
            copyToClipboard(idlText);
            isCopying = true;
            setTimeout(() => (isCopying = false), 500);
        }
    };

    $: if ($idlStore) {
        idlText = JSON.stringify($idlStore, null, 2);
        formattedIdl = formatHighlight(JSON.stringify($idlStore, null, 2), {
            keyColor: "#a5a3a",
            numberColor: "#e8a034",
            stringColor: "#24ae67",
        });
    }
</script>

<div class="relative mx-auto w-full max-w-2xl pb-32">
    {#if $idlStore}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex flex-col items-center justify-between">
            <div
                class="code col-span-12 w-full cursor-pointer rounded-lg border px-3 py-2 hover:border-primary"
                class:cursor-copy={isCopying}
                on:click={handleCopyClick}
            >
                <pre><code class="text-xs">{@html formattedIdl}</code></pre>
            </div>
            <CopyButton
                text={idlText}
                classList="btn-sm mt-4"
                label="Copy IDL"
                success="Copied!"
            />
        </div>
    {:else}
        <p>No IDL data available.</p>
    {/if}
</div>
