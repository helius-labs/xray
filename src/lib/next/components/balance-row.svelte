<script lang="ts">
    import { ASSET } from "$lib/next/constants";

    import { balances, assets,  } from "$lib/next/state/assets";

    import { Image } from "lucide-svelte"

    import TokenProvider from "$lib/next/components/providers/token-provider.svelte";

    export let address: string;

    $: asset = $assets.data.get(address) ||  ASSET();
    $: balance = $balances.data.get(address);
    $: amount = balance?.amount.toLocaleString() || 0;
    $: rate = balance?.exchangeRate?.USD;
    $: price = rate ? rate * ((balance?.amount || 0)) : 0;

    // $: console.log("balance asset", asset)
</script>

<TokenProvider {address}>
    <div class="flex items-center justify-between">
        <div class="flex flex-1">
            <div
                class="mr-2 mb-2 aspect-square w-10 bg-secondary bg-cover bg-center rounded-full flex justify-center items-center"
                class:animate-pulse={asset?.loading}
                style:background-image="url({asset.image})"
            >
                {#if !asset.image}
                    <div class="opacity-50">
                        <Image size={16}/>
                    </div>
                {/if}
            </div>
            {#if asset?.loading}
                <div class="animate-pulse">
                    <div class="w-20 h-5 rounded bg-secondary">

                    </div>
                    <div class="w-8 h-3 rounded bg-secondary">

                    </div>
                </div>
            {:else}
                <div>
                    <h2 class="font-bold">
                        {asset?.name || address.slice(0,6) + "..."}
                    </h2>
                    <p class="text-xs opacity-80">
                        <!-- {} -->
                        {asset?.symbol || "-"}
                    </p>
                </div>
            {/if}
        </div>
        <h3>
            {amount}
        </h3>
    </div>
</TokenProvider>
