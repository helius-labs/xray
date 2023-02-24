<script>
    // import { state } from "svelte-snacks";

    import formatMoney from "$lib/util/format-money";

    import Icon from "$lib/components/icon.svelte";

    // const solanaPrice = state(
    //     "tokenPrice",
    //     "So11111111111111111111111111111111111111112"
    // );

    // const solanaTPS = state("solanaTps");

    import { SOL } from "@helius-labs/xray-proton";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    const tps = client.tps.createQuery();

    const price = client.price.createQuery(SOL);
</script>

<div class="ml-1 hidden items-center text-xs md:flex">
    <div>
        <div class="mr-5">
            <span class="font-bold">TPS </span>
            {#if !$tps.isLoading}
                <span class="ml-1 opacity-50">{$tps?.data?.toFixed(0)}</span>
            {:else}
                ...
            {/if}
        </div>
        <div>
            <span class="font-bold">SOL/USD </span>
            {#if !$price?.isLoading}
                <span class="ml-1 opacity-50">{formatMoney($price?.data)}</span>
            {:else}
                ...
            {/if}
        </div>
    </div>
</div>
