<script lang="ts">
    import IntersectionObserver from "svelte-intersection-observer";

    import { ASSET } from "$lib/next/constants";

    import { enrichAsset, assets } from "$lib/next/state/assets";

    export let address: string;

    let lastUpdate = 0;

    let intersecting = false;
    let element: HTMLElement;

    $: asset = $assets.data.get(address) || ASSET();

    $: if (intersecting && Date.now() - lastUpdate > (1000)) {
        lastUpdate = Date.now();

        console.log("enriching asset", address);
        
        enrichAsset(address);
    }
</script>

<div>
    <IntersectionObserver
        once={false}
        {element}
        bind:intersecting
    >
        <div bind:this={element} />

        {#if intersecting}
            <slot {asset} />
        {/if}
    </IntersectionObserver>
</div>
