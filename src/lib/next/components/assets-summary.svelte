<script>
    import { assets, loadAssets } from "$lib/next/state/assets";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { ChevronRight } from "lucide-svelte";

    import TokenProvider from "$lib/next/components/providers/token-provider.svelte";

    onMount(async () => {
        await loadAssets($page.params.account);
    });

    $: firstFifteenAssets = Array.from($assets?.data?.values() || [])
        .filter(({ type }) => type === "asset")
        .slice(0, 15);
</script>

<!-- Loading: {$assets.loading} -->
<div class="grid min-h-full grid-cols-5 gap-3 rounded-xl border p-4">
    <div class="col-span-5 flex justify-between">
        <h2 class="text-lg font-semibold">Assets</h2>

        <button class="btn-outline btn-sm btn">
            <ChevronRight size={16} />
        </button>
    </div>
    {#each Array(15) as _, idx}
        {@const asset = firstFifteenAssets[idx]}

        {#if $assets.loading}
            <div class="col-span-1 animate-pulse rounded-md">
                <div class="w-fullrounded aspect-square bg-secondary" />
            </div>
        {:else if asset}
            <TokenProvider
                address={asset?.id}
                let:asset
            >
                <div class="col-span-1 overflow-hidden rounded-md">
                    <button
                        class="relative w-full rounded bg-secondary transition-transform hover:scale-95 hover:border-2 hover:opacity-50"
                    >
                        {#if asset?.image}
                            <img
                                alt={asset.name}
                                class="relative z-10 aspect-square object-cover"
                                src={asset?.image}
                            />
                        {/if}
                    </button>
                </div>
            </TokenProvider>
        {:else}
            <div class="col-span-1 rounded-md">
                <div class="aspect-square w-full rounded bg-secondary" />
            </div>
        {/if}
    {/each}
</div>
