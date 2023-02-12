<script>
    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import { fly } from "svelte/transition";

    import { cubicOut } from "svelte/easing";

    import shortenAddress from "$lib/util/shorten-string";

    import { state } from "svelte-snacks";

    import { getSolanaName } from "@helius-labs/helius-namor/dist";

    import formatMoney from "$lib/util/format-money";

    import Icon from "$lib/icon";
    
    const tweenedBalance = tweened(0, {
        duration : 1000,
        easing   : cubicOut,
    });

    const tweenedUSDBalance = tweened(0, {
        duration : 2000,
        easing   : cubicOut,
    });

    const address = $page.params.search;

    const solanaPrice = state("tokenPrice", "So11111111111111111111111111111111111111112");
    const accountInfo = state("solanaAccountInfo", address);

    $: tweenedBalance.set($accountInfo?.data?.balance || 0);
    $: tweenedUSDBalance.set($accountInfo?.data?.balance * $solanaPrice?.data || 0);

    $: console.log($solanaPrice);
</script>
     
{#if $accountInfo?.isSuccess}
    <div class="relative">
        <h1 class="text-3xl font-bold mb-2">
            Wallet
        </h1>

        <div class="card mb-3 pr-0">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="font-bold text-lg mr-2">
                        {getSolanaName($page.params.search || "")}
                    </h2>
                    
                    <p class="text-xs opacity-50">{shortenAddress($page.params.search, 6)}</p>
                </div>
                <div>
                    <button class="btn btn-ghost">
                        <Icon
                            id="copy"
                            size="md" />
                    </button>
                </div>
            </div>
        </div>
        <div
            class="card"
            in:fly={{
                y        : 50,
                duration : 500,
            }}>

            <div class="w-full flex items-center justify-between">
                <div class="flex items-center">
                    <img
                        class="h-9 rounded-full mr-1"
                        alt=""
                        src="/media/tokens/solana.png">
                    <p class="opacity-50">
                        Balance
                    </p>
                </div>
                <div class="text-right">
                    <p class="font-semibold text-sm opacity-50">
                        {formatMoney($tweenedUSDBalance)}
                    </p>
                    <p class="font-bold text-lg">
                        {$tweenedBalance.toFixed(5)}
                    </p>
                </div>
            </div>
        </div>
    </div>
{/if}

