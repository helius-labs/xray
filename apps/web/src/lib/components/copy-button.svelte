<script lang="ts">
    import { copyToClipboard } from "$lib/util/clipboard";

    import Icon from "$lib/icon";

    let copied = false;

    export let text: string = "";
    export let className: string = "";

    const copy = () => {
        copyToClipboard(text);

        copied = true;

        setTimeout(() => {
            copied = false;
        }, 2000);
    };
</script>

<button
    class="btn {className}"
    class:btn-success={copied}
    class:btn-ghost={!copied}
    on:click={copy}
>
    {#if copied}
        <span>Copied</span>
    {:else}
        <Icon
            id="copy"
            size="md"
        />
    {/if}
</button>
