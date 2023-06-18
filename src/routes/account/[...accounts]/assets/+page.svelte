<!-- <script lang="ts">
    import { ownedAssets } from "$lib/state/assets";

    import { PREVIEW_CDN } from "$lib/constants";

    import AssetProvider from "$lib/components/providers/asset-provider.svelte";
    import { onMount } from "svelte";
    import ImageProvider from "$lib/components/providers/image-provider.svelte";
    import { error } from "@sveltejs/kit";

    let img: HTMLImageElement;

    onMount(() => {
        img.addEventListener("load", () => {
            console.log("loaded");
        });
        img.addEventListener("error", () => {
            console.log("error image");
        });
    });

    $: console.log($ownedAssets, "ownedAssets");
</script>

<div class="grid grid-cols-3 gap-2">
    {#each $ownedAssets.das as id}
        <AssetProvider
            {id}
            let:asset
        >
            <ImageProvider
                src={asset.data.imagePreview}
                let:loaded
                let:error
            >
                {#if loaded || error}
                    <img
                        class="aspect-square h-full w-full rounded-xl object-cover"
                        src={asset.data.imagePreview}
                    />
                {:else}
                    <div class="h-full w-full animate-pulse bg-gray-500" />
                {/if}
            </ImageProvider>
        </AssetProvider>
    {/each}
</div> -->
