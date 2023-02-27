<script>
    import formatMoney from "$lib/util/format-money";

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
            {/if}
        </div>
        <div>
            <span class="font-bold">SOL/USD </span>
            {#if !$price?.isLoading}
                <span class="ml-1 opacity-50">{formatMoney($price?.data)}</span>
            {/if}
        </div>
    </div>
</div>
