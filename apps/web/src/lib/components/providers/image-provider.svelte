<script type="ts">
    import { onMount } from "svelte";

    let img: HTMLImageElement;

    export let src: string;

    let loaded = false;
    let error = false;

    let className = "";

    onMount(() => {
        img.addEventListener("load", () => {
            loaded = true;
        });
        img.addEventListener("error", () => {
            error = true;
        });
    });
</script>

<div class={className}>
    <img
        class="pointer-events-none h-0 w-0 opacity-0"
        bind:this={img}
        alt="preview"
        {src}
    />

    <slot
        {loaded}
        {error}
    />
</div>
