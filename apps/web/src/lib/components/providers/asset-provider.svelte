<script lang="ts">
    import { type Asset } from "$lib/types";
    import { ASSET } from "$lib/constants";
    import IntersectionObserver from "svelte-intersection-observer";

    import { assets, enrichAsset } from "$lib/state/assets";

    export let id: string = "";

    let intersecting = false;

    let element: HTMLDivElement;

    $: asset = $assets.get(id) || { data: ASSET() };

    $: if (!asset.enriched && intersecting && !asset.isLoading) {
        enrichAsset(id);
    }
</script>

<IntersectionObserver
    once={true}
    {element}
    bind:intersecting
>
    <div bind:this={element} />

    <slot {asset} />
</IntersectionObserver>
