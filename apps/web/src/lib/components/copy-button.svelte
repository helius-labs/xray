<script lang="ts">
    import type { Icon as IconType } from "$lib/types";

    import { copyToClipboard } from "$lib/util/clipboard";

    import Icon from "$lib/components/icon.svelte";

    let copied = false;

    export let text: string = "";
    export let className: string = "";
    export let icon: IconType = "copy";
    export let label: string = "";
    export let success: string = "";

    const copy = () => {
        copyToClipboard(text);

        copied = true;

        setTimeout(() => {
            copied = false;
        }, 2000);
    };
</script>

<button
    class="btn {className} btn-sm"
    class:btn-success={copied}
    class:btn-ghost={!copied}
    on:click={copy}
>
    {#if copied}
        <span>{success || "Copied"}</span>
    {:else}
        <Icon id={icon} />

        {#if label}
            <span class="ml-2">{label}</span>
        {/if}
    {/if}
</button>
