<script>
    import formatMoney from "$lib/util/format-money";

    import { SOL } from "@helius-labs/xray-proton";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fade } from "svelte/transition";

    const client = trpcWithQuery($page);

    const tps = client.tps.createQuery();

    const price = client.price.createQuery(SOL);
</script>

<div class="ml-1 items-center text-xs">
    <div>
        <div class="mr-5">
            {#if !$tps.isLoading}
                <div
                    in:fade={{
                        duration: 500,
                    }}
                >
                    <span class="font-bold">TPS </span>
                    <span class="ml-1 opacity-50">{$tps?.data?.toFixed(0)}</span
                    >
                </div>
            {:else}
                <div class="pulse my-2 h-2 w-16 rounded-lg bg-secondary" />
            {/if}
        </div>
        <div>
            {#if !$tps.isLoading}
                <div
                    in:fade={{
                        duration: 500,
                    }}
                />
                <span class="font-bold">SOL/USD </span>
                <span class="ml-1 opacity-50">{formatMoney($price?.data)}</span>
            {:else}
                <div class="pulse my-2 h-2 w-20 rounded-lg bg-secondary" />
            {/if}
        </div>
    </div>
</div>
