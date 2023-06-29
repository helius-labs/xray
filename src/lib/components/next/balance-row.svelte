<script lang="ts">
    import { balances } from "$lib/state/assets";

    import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    import TokenProvider from "$lib/components/next/providers/token-provider.svelte";

    export let address: string;

    $: balance = $balances.data.get(address);
    $: amount = balance?.amount.toLocaleString() || 0;
    $: rate = balance?.exchangeRate?.USD;
    $: price = rate ? rate * ((balance?.amount || 0) / LAMPORTS_PER_SOL) : 0;
</script>

<TokenProvider
    {address}
    let:asset
>
    <div class="mb-3 flex items-center justify-between">
        <div class="flex flex-1">
            <div
                class="mr-2 aspect-square w-[10%] rounded bg-secondary bg-cover bg-center"
                class:animate-pulse={asset.loading}
                style:background-image="url(https://xray.helius.xyz/media/tokens/solana.png)"
            />
            <div>
                <h2 class="font-bold">
                    {asset?.name}
                </h2>
                <p class="text-xs opacity-80">
                    {price.toLocaleString(undefined, {
                        currency: "USD",
                        style: "currency",
                    })}
                </p>
            </div>
        </div>
        <h3>
            {amount}
        </h3>
    </div>
</TokenProvider>
