<style>
    .show-error::after {
        content: "⚠️";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let alt: string;
    export let className: string;

    let error = false;

    let loading = true;

    let node: HTMLImageElement;

    const img = new Image();

    img.onload = () => {
        loading = false;
        error = false;

        node.setAttribute("src", src);
    };

    img.onerror = () => {
        loading = false;
        error = true;
    };

    const loadImage = () => {
        loading = true;
        error = false;

        img.src = src;
    };

    onMount(loadImage);
</script>

{#if loading}
    <div class="animate-pulse">
        <div class="h-5 w-20 rounded bg-secondary" />
        <div class="h-3 w-8 rounded bg-secondary" />
    </div>
{/if}

<img
    bind:this={node}
    {alt}
    class={className}
    class:show-error={error}
/>
