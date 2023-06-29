<script lang="ts">
    import IntersectionObserver from "svelte-intersection-observer";

    import { ASSET } from "$lib/components/next/constants";

    import { enrichAsset, assets } from "$lib/state/assets";

    export let address: string;

    let intersecting = false;
    let element: HTMLElement;

    $: asset = $assets.data.get(address) || ASSET();

    $: if (intersecting) {
        enrichAsset(address);
    }
</script>

<div>
    <IntersectionObserver
        once={true}
        {element}
        bind:intersecting
    >
        <div bind:this={element} />

        {#if intersecting}
            <slot {asset} />
        {/if}
    </IntersectionObserver>
</div>
