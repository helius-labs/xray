<script lang="ts">
    import { ownedAssets } from "$lib/state/assets";

    import AssetProvider from "$lib/components/providers/asset-provider.svelte";

    $: console.log($ownedAssets, "ownedAssets");
</script>

<div class="grid grid-cols-3">
    {#each $ownedAssets.das as id}
        <AssetProvider
            {id}
            let:asset
        >
            <img
                src={asset.data.imagePreview}
                class="aspect-square w-10 rounded-lg"
                alt=""
            />
        </AssetProvider>
    {/each}
</div>
