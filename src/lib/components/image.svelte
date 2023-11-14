<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let className = "";
    export let alt = "image";

    let loaded = false;
    let failed = false;
    let loading = false;

    onMount(() => {
        const img = new Image();
        img.src = src;
        loading = true;

        img.onload = () => {
            loading = false;
            loaded = true;
        };
        img.onerror = () => {
            loading = false;
            failed = true;
        };
    });
</script>

{#if loading}
    <img
        src="https://samherbert.net/svg-loaders/svg-loaders/bars.svg"
        class="{className} scale-[0.25] opacity-50"
        {alt}
    />
{:else if failed}
    <img
        src="https://imgs.search.brave.com/_21o9NXVQGftTNHMC4ZBLatg4jZkXGTJj3bRU6Q11CY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvb2ZmaWNlLXRo/aWNrLW91dGxpbmUv/MzYvb2ZmaWNlLTA4/LTEyOC5wbmc"
        class="{className} scale-50 opacity-50"
        {alt}
    />
{:else if loaded}
    <img
        {src}
        class={className}
        {alt}
    />
{/if}
