<script>
    // import { balances } from "$lib/state/balances";
    import { assets, balances } from "$lib/state/assets";

    $: fiveLargestBalances = Array.from($balances.data?.values())
        .sort((a, b) => (a.amount < b.amount ? 1 : -1))
        .slice(0, 5);

    import BalanceRow from "$lib/components/next/balance-row.svelte";
</script>

<!-- <div class="flex">
    <div class="bg-secondary rounded w-[10%] aspect-square bg-cover bg-center mr-4" >
    </div>
    <div>
        {"SOL"} {$balances.data.get("So11111111111111111111111111111111111111112")?.amount}
    </div>
</div> -->

<!-- <div class="flex justify-between items-center mb-3">
    <div class="flex flex-1">
        <div class="bg-secondary rounded w-[10%] aspect-square bg-cover bg-center mr-2" style="background-image: url(https://xray.helius.xyz/media/tokens/solana.png)"></div>
        <div>
            <h2 class="font-bold">
                SOL
            </h2>
            <p class="opacity-80 text-xs">
                $100
            </p>
        </div>
    </div>
    <div>
        {$balances.data.get("So11111111111111111111111111111111111111112")?.amount.toLocaleString()}
    </div>
</div> -->

<BalanceRow address="So11111111111111111111111111111111111111112" />

{#each Array(5) as _, idx}
    {@const balance = fiveLargestBalances[idx]}

    {#if $assets?.loading}
        <div class="flex">
            <div
                class="aspect-square w-[10%] animate-pulse rounded bg-secondary"
            />
            <div>
                <div class="h-4 w-[40%] animate-pulse rounded bg-secondary" />
                <div class="h-2 w-[20%] animate-pulse rounded bg-secondary" />
            </div>
        </div>
    {:else if balance}
        <div class="flex justify-between">
            <div class="flex">
                <div class="aspect-square w-[10%] rounded bg-secondary" />
                <div>
                    <h2>
                        {$assets.assetsMap.get(balance.mint)?.name}
                    </h2>
                    <p>
                        {$assets.assetsMap.get(balance.mint)?.symbol}
                    </p>
                </div>
            </div>
            <div>
                {balance.amount}
            </div>
        </div>
    {/if}
{/each}
