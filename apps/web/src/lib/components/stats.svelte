<script lang="ts">
    import formatMoney from "$lib/util/format-money";

    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";

    import solana from "$lib/solana";

    import Icon from "$lib/components/icon.svelte";

    const slot = solana.currentSlot();
    const price = solana.price();
    const tps = solana.tps();

    const priceTweened = tweened(0, {
        duration: 2000,
    });

    const slotTweened = tweened(0, {
        duration: 2000,
    });

    const tpsTweened = tweened(0, {
        duration: 2000,
    });

    $: $slotTweened = $slot?.data?.pages[0] || (0 as number);
    $: $priceTweened = $price?.data?.pages[0] || (0 as number);
    $: $tpsTweened = $tps?.data?.pages[0] || (0 as number);
</script>

<div class="stats w-full rounded-lg bg-opacity-40 shadow">
    <a
        class="stat"
        href="https://birdeye.so/token/So11111111111111111111111111111111111111112?chain=solana"
        target="_blank"
        rel="noreferrer"
        in:fade={{ duration: 1000 }}
    >
        <div class="stat-title">SOL/USD</div>
        <div
            class="stat-value text-xl text-primary hover:text-orange-500 md:text-4xl"
        >
            {formatMoney($priceTweened)}
        </div>
    </a>

    <a
        class="stat"
        target="_blank"
        rel="noreferrer"
        href="https://explorer.solana.com/"
        in:fade={{ delay: 500, duration: 1000 }}
    >
        <div class="stat-title">TPS</div>
        <div class="stat-value text-xl hover:text-orange-500 md:text-4xl">
            {$tpsTweened?.toFixed(0)}
        </div>
    </a>

    <a
        class="stat "
        href="/block/{$slot?.data?.pages[0]}"
        in:fade={{ delay: 1000, duration: 1000 }}
    >
        <div class="stat-title">Current Slot</div>
        <div class="stat-value text-xl hover:text-orange-500 md:text-4xl">
            {Number($slotTweened.toFixed()).toLocaleString()}
        </div>
    </a>
</div>

<div class="stats mt-3 flex w-full rounded-lg bg-opacity-40 px-6 py-3 shadow">
    <div class="flex w-full items-center justify-between">
        <div
            class="flex items-center"
            in:fade={{ duration: 1000 }}
        >
            <Icon
                id="network"
                fill="success"
            />
            <div>
                <p class="ml-3">Connected</p>
            </div>
        </div>
        <div in:fade={{ delay: 1000, duration: 1000 }}>
            <a
                class="link ml-3 border-dotted text-xs opacity-50"
                href="https://www.helius.xyz/"
                target="_blank"
                rel="noreferrer">rpc.helius.xyz</a
            >
        </div>
    </div>
</div>
