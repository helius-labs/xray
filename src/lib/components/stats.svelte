<script>
    import formatMoney from "$lib/util/format-money";

    import { SOL } from "$lib/xray";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fade } from "svelte/transition";

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const tps = client.tps.createQuery(isMainnetValue);

    const price = client.price.createQuery(SOL);

    const slot = client.currentSlot.createQuery([isMainnetValue]);
</script>

<div class="flex h-10 w-full items-center justify-center text-sm">
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
                    href="/block/{$slot?.data}?network={isMainnetValue
                        ? 'mainnet'
                        : 'devnet'}"
                    class="pointer-events-auto hover:link-success"
                    >{$slot?.data?.toLocaleString()}</a
                >
            </span>
        {:else}
            <div class="pulse my-2 h-2 w-32 rounded-lg bg-secondary" />
        {/if}
    </div>
</div>
