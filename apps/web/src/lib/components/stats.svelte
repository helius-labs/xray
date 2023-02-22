<script>
    // import { state } from "svelte-snacks";

    import formatMoney from "$lib/util/format-money";

    import Icon from "$lib/components/icon.svelte";

    // const solanaPrice = state(
    //     "tokenPrice",
    //     "So11111111111111111111111111111111111111112"
    // );

    // const solanaTPS = state("solanaTps");
</script>

<div class="ml-1 hidden items-center text-xs md:flex">
    <!-- <div class="mx-2">
        <Icon
            id="stats"
            size="md"
        />
    </div> -->
    <div>
        <div class="mr-5">
            <span class="font-bold">TPS </span>
            <!-- {#if $solanaTPS.hasFetched}
                <span class="ml-1 opacity-50"
                    >{$solanaTPS?.data?.tps.toFixed(0)}</span
                >
            {/if} -->
        </div>
        <div>
            <span class="font-bold">SOL/USD </span>
            <!-- {#if $solanaPrice?.hasFetched}
                <span class="ml-1 opacity-50"
                    >{formatMoney($solanaPrice?.data)}</span
                >
            {/if} -->
        </div>
    </div>
</div>
