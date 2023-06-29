<script>
    import { assets, loadAssets } from "$lib/state/assets";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/next/providers/token-provider.svelte";

    onMount(async () => {
        await loadAssets($page.params.account);
    });

    // eslint-disable-next-line
    $: console.log($assets);

    $: firstFifteenAssets = Array.from(
        $assets?.assetsMap?.values() || []
    ).slice(0, 15);
</script>

<!-- Loading: {$assets.loading} -->
<div class="grid grid-cols-5 gap-3">
    {#each Array(15) as _, idx}
        {@const asset = firstFifteenAssets[idx]}

        {#if $assets.loading}
            <div class="col-span-1 rounded-md">
                <div
                    class="aspect-square w-full animate-pulse rounded bg-secondary"
                />
            </div>
        {:else if firstFifteenAssets[idx]}
            <TokenProvider
                address={firstFifteenAssets[idx]}
                let:asset
            >
                <div class="col-span-1 overflow-hidden rounded-md">
                    <div class="aspect-square w-full rounded bg-secondary">
                        <img
                            alt={asset.name}
                            class="object-cover"
                            src={asset?.thumbnail}
                        />
                    </div>
                </div>
            </TokenProvider>
        {:else}
            <div class="col-span-1 rounded-md">
                <div class="aspect-square w-full rounded bg-secondary" />
            </div>
        {/if}
    {/each}
</div>
