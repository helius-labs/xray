<script>
    import formatMoney from "$lib/util/format-money";

    import { SOL } from "@helius-labs/xray-proton";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fade } from "svelte/transition";

    const client = trpcWithQuery($page);

    const tps = client.tps.createQuery();

    const price = client.price.createQuery(SOL);

    const slot = client.currentSlot.createQuery();
</script>

<div
    class="flex h-8 w-full items-center justify-center border border-x-0 border-t-0 border-transparent text-xs"
>
    <div class="mr-4">
        {#if !$tps.isLoading}
            <div
                in:fade={{
                    duration: 500,
                }}
            >
                <span class="font-bold">TPS </span>
                <span class="opacity-50">{$tps?.data?.toFixed(0)}</span>
            </div>
        {:else}
            <div class="pulse my-2 h-2 w-16 rounded-lg bg-secondary" />
        {/if}
    </div>
    <div class="mr-4">
        {#if !$tps.isLoading}
            <div
                in:fade={{
                    duration: 500,
                }}
            />
            <span class="font-bold">SOL/USD </span>
            <span class="opacity-50">{formatMoney($price?.data)}</span>
        {:else}
            <div class="pulse my-2 h-2 w-20 rounded-lg bg-secondary" />
        {/if}
    </div>
    <div>
        {#if !$tps.isLoading}
            <div
                in:fade={{
                    duration: 500,
                }}
            />
            <span class="font-bold">Current Slot </span>
            <span class="opacity-50 hover:opacity-100">
                <a
                    data-sveltekit-reload
                    href="/"
                    class="pointer-events-auto hover:link-success"
                    >{$slot?.data?.toLocaleString()}</a
                >
            </span>
        {:else}
            <div class="pulse my-2 h-2 w-32 rounded-lg bg-secondary" />
        {/if}
    </div>
</div>
