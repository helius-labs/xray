<script lang="ts">
    import type { Icon as IconType } from "$lib/types";

    import { copyToClipboard } from "$lib/util/clipboard";

    import Icon from "$lib/components/icon.svelte";

    let copied = false;

    export let text: string = "";
    export let classList: string = "";
    export let icon: IconType = "copy";
    export let label: string = "";
    export let success: string = "";
    export let size = "sm" as "xs" | "sm";

    const copy = () => {
        copyToClipboard(text);

        copied = true;

        setTimeout(() => {
            copied = false;
        }, 1000);
    };
</script>

<button
    class="btn-xs btn {classList}"
    class:btn-success={copied}
    class:btn-ghost={!copied}
    on:click={copy}
>
    {#if copied && success}
        <span>{success}</span>
    {:else if copied}
        <Icon
            id={"check"}
            {size}
        />
    {:else if label}
        <Icon
            id={icon || "copy"}
            {size}
        /> <span class="ml-2">{label}</span>
    {:else}
        <Icon
            id={icon || "copy"}
            {size}
        />
    {/if}
</button>
