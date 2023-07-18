<script lang="ts">
import { onMount } from "svelte";

import { goto } from "$app/navigation";

import { page } from "$app/stores";

import {
    ChevronLeft
} from "lucide-svelte";

import { assets, loadAssets } from "$lib/next/state/assets";

import TokenProvider from "$lib/next/components/providers/token-provider.svelte";
import ImageProvider from "$lib/next/components/providers/image-provider.svelte";

onMount(async () => {
    await loadAssets($page.params.account);
});

let assetsToShow = new Set<string>();
let assetErrors = new Set<string>();
    
const showAsset = (id: string) => assetsToShow.add(id);
const errorAsset = (id: string) => assetErrors.add(id);

$: assetsList = (Array.from($assets.data.keys()) || []);
</script>

<div class="grid grid-cols-7 gap-3 border rounded-xl p-4 min-h-full">
    <div class="col-span-1 flex items-center">
        <div>
            <button class="btn btn-sm btn-outline">
                <ChevronLeft size={16} />
            </button>
        </div>
    </div>

    <div class="col-span-5 flex items-center justify-center">
        <h2 class="text-xl font-semibold text-center">Assets</h2>
    </div>

    <div class="col-span-1"></div>

    {#each assetsList as id}
        {#if $assets.loading}
            <div class="col-span-1 rounded-md animate-pulse">
                <div
                    class="aspect-square w-fullrounded bg-secondary"
                    >
                </div>
            </div>
        {:else}
            <TokenProvider
                address={id}
                let:asset
            >
                <div class="col-span-1 overflow-hidden rounded-md">
                    <button
                        on:click|self={() => goto($page.url.pathname + "/" + id)}
                        class="w-full rounded bg-secondary relative hover:scale-95 transition-transform hover:border-2 hover:opacity-50">
                        
                        <ImageProvider let:image src={""}>
                            <img
                                alt={asset.name}
                                class="object-cover aspect-square w-full relative"
                                src={image.src}
                            />
                        </ImageProvider>
                    </button>
                </div>
            </TokenProvider>
        {/if}
    {/each}
</div>
