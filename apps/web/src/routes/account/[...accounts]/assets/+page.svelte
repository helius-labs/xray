<script lang="ts">
    import { ownedDas, assets } from "$lib/state/assets";
</script>

<div class="grid grid-cols-3">
    {#each $ownedDas?.data || [] as asset}
        <div class="rounded-lg">
            <img
                src={$assets.get(asset)?.data.imagePreview}
                alt=""
            />
        </div>
    {/each}
</div>

<!-- <div class="content grid grid-cols-4 gap-3">
    {#if $assets?.data}
        {#each $assets.data as asset}
            {asset?.content?.metadata?.name}
        {/each}
    {:else}
        {#each Array(8) as _}
            <div class="grid aspect-square animate-pulse rounded-lg" />
        {/each}
    {/if}
</div> -->
