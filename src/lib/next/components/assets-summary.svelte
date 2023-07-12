<script>
    import { assets, loadAssets } from "$lib/next/state/assets";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import {
        ChevronRight
    } from "lucide-svelte";

    import TokenProvider from "$lib/next/components/providers/token-provider.svelte";

    onMount(async () => {
        await loadAssets($page.params.account);
    });

    $: firstFifteenAssets = Array.from(
        $assets?.data?.values() || []
    ).filter(({ type }) => type === "asset").slice(0, 15);
</script>

<!-- Loading: {$assets.loading} -->
<div class="grid grid-cols-5 gap-3 border rounded-xl p-4 min-h-full">
    <div class="col-span-5 flex justify-between">
        <h2 class="text-lg font-semibold">Assets</h2>

        <button class="btn btn-sm btn-outline">
            <ChevronRight size={16} />
        </button>
    </div>
    {#each Array(15) as _, idx}
        {@const asset = firstFifteenAssets[idx]}

        {#if $assets.loading}
            <div class="col-span-1 rounded-md animate-pulse">
                <div
                    class="aspect-square w-fullrounded bg-secondary"
                    >
                </div>
            </div>
        {:else if asset}
            <TokenProvider
                address={asset?.id}
                let:asset
            >
                <div class="col-span-1 overflow-hidden rounded-md">
                    <div class="w-full rounded bg-secondary relative">
                        {#if asset?.image}
                            <img
                                alt={asset.name}
                                class="object-cover aspect-square z-10 relative"
                                src={asset?.image}
                            />
                        {/if}
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
