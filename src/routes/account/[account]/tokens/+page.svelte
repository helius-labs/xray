<script>
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import { SOL } from "$lib/xray";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";
    import formatMoney from "$lib/util/format-money";
    import { writable } from 'svelte/store';

    const account = $page.params.account;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const balances = client.balances.createQuery([account, isMainnetValue]);

    const token2022 = client.token2022.createQuery([account, isMainnetValue]);

    const sol = client.price.createQuery(SOL);

    $: sorted = $balances?.data?.tokens
        // @ts-ignore
        ?.filter(({ decimals, amount }) => decimals && amount)
        // @ts-ignore
        .sort(({ amount: a, decimals: ad }, { amount: b, decimals: bd }) =>
            a / 10 ** ad < b / 10 ** bd ? 1 : -1
        );
    // Fetch Solana balance from Birdeye API
const solBalance = $sol.data || 0;

const queryParams = new URLSearchParams(window.location.search);

const url = import.meta.env.VITE_HELIUS_URL;

let totalTokensBalance = 0; 

/** @type {{ symbol: string, totalPrice: number }[]} */
let tokenPricesArray = [];

export const tokenPrices = writable([]);

const getAssetsWithNativeBalance = async () => {
        try {
            const response = await fetch(url, {
                body: JSON.stringify({
                    id: 'my-id',
                    jsonrpc: '2.0',
                    method: 'searchAssets',
                    params: {
                        displayOptions: {
                            showNativeBalance: true,
                        },
                        ownerAddress: account,
                        tokenType: 'fungible',
                    },
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });

            const { result } = await response.json();

            if (result && result.items && Array.isArray(result.items)) {
                result.items.forEach((asset) => {
                    const { token_info } = asset;
                });

                const pricedAssets = result.items.filter(
                    (asset) => asset.token_info && asset.token_info.price_info
                );

                if (pricedAssets.length > 0) {
                    pricedAssets.forEach((asset) => {
                        const { symbol, price_info } = asset.token_info;
                        const { total_price } = price_info;
                        const formattedPrice = `$${total_price.toFixed(2)}`;
                    });

                    totalTokensBalance = calculateTotalTokens(pricedAssets); // Calculate total tokens balance
                    // console.log('Total Tokens Balance: $', totalTokensBalance.toFixed(2));
                    return totalTokensBalance;
                } else {
                }
            } else {
            }
        } catch (error) {
        }
};

const calculateTotalTokens = (pricedAssets) => {
        const tokenPricesArray = [];

        if (pricedAssets && pricedAssets.length > 0) {
            const totalTokensBalance = pricedAssets.reduce((total, asset) => {
                const { symbol, associated_token_address, price_info } = asset.token_info;
                const { total_price } = price_info;
                const { id } = asset; 

                tokenPricesArray.push({ associated_token_address, id, symbol, totalPrice: total_price });

                return total + total_price;
            }, 0);

            tokenPrices.set(tokenPricesArray);

            return totalTokensBalance;
        }

        tokenPrices.set([]);

        return 0;
};

getAssetsWithNativeBalance();

const calculateWalletBalance = async () => {
        const sol = solBalance / LAMPORTS_PER_SOL;
        const tokens = await getAssetsWithNativeBalance();
        const totalBalance = sol + tokens;

        return totalBalance;
};

const updateWalletBalance = async () => {
        const walletBalance = await calculateWalletBalance();
};

updateWalletBalance();

</script>

<div>
    <a
        class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary"
        href="/token/{SOL}"
    >
        <div class="col-span-2 p-1 md:col-span-1">
            <!-- background so that if it doesn't load you dont' get ugly no image icons -->
            <div
                style="background-image: url(/media/tokens/solana.png)"
                class="aspect-square w-full rounded-lg bg-cover"
            />
        </div>
        <div
            class="col-span-10 flex items-center justify-between text-right md:col-span-11"
        >
            <div>
                <h4 class="font-semibold md:text-sm">SOL</h4>
            </div>
            <div>
                {#if $balances.data?.nativeBalance}
                    <h4 class="font-semibold md:text-sm">
                        {(
                            $balances.data?.nativeBalance / LAMPORTS_PER_SOL
                        ).toLocaleString()}
                    </h4>
                {/if}

                <h4 class="text-xs opacity-50">
                    {#if $sol.data}
                        {formatMoney(
                            ($sol.data * $balances.data?.nativeBalance) /
                                LAMPORTS_PER_SOL
                        )}
                    {/if}
                </h4>
            </div>
        </div>
    </a>

    {#if $token2022.data}
    {#each $token2022.data.filter(token => token.decimals > 0 && token.mint !== SOL)
        .sort((a, b) => {
            const tokenAPrice = $tokenPrices.find(price => price.id === a.mint)?.totalPrice || 0;
            const tokenBPrice = $tokenPrices.find(price => price.id === b.mint)?.totalPrice || 0;
            return tokenBPrice - tokenAPrice;
        }) as token}
        
        <TokenProvider address={token.mint} let:metadata>
            <a
                class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary"
                href="/token/{token.mint}"
            >
                <!-- Token Image -->
                <div class="col-span-2 p-1 md:col-span-1">
                    <div
                        style="background-image: url('{metadata.image}')"
                        class="aspect-square w-full rounded-lg bg-cover"
                    />
                </div>
                <!-- Token Details -->
                <div class="col-span-10 flex items-center justify-between text-right md:col-span-11">
                    <div>
                        <h4 class="font-semibold md:text-sm">
                            {metadata.name || ""}
                        </h4>
                    </div>
                    <div>
                        <!-- Display Token Amount -->
                        <h4 class="font-semibold md:text-sm">
                            {token.amount.toLocaleString()}
                        </h4>
                        <!-- Display Token Value -->
                        <h4 class="text-xs opacity-50">
                            {#each $tokenPrices.filter(price => price.id === token.mint) as price}
                                {formatMoney(price.totalPrice)}
                            {/each}
                        </h4>
                    </div>
                </div>
            </a>
        </TokenProvider>
    {/each}
{/if}
{#if sorted}
    {#each sorted.filter(token => token.decimals > 0 && token.mint !== SOL)
        .sort((a, b) => {
            const tokenAPrice = $tokenPrices.find(price => price.id === a.mint)?.totalPrice || 0;
            const tokenBPrice = $tokenPrices.find(price => price.id === b.mint)?.totalPrice || 0;
            return tokenBPrice - tokenAPrice;
        }) as token (token.mint)}
        
        <TokenProvider address={token.mint} let:metadata>
            <a class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary" href="/token/{token.mint}">
                <!-- Token Image -->
                <div class="col-span-2 p-1 md:col-span-1">
                    <div style="background-image: url('{metadata.image}')" class="aspect-square w-full rounded-lg bg-cover"></div>
                </div>

                <!-- Token Details -->
                <div class="col-span-10 flex items-center justify-between text-right md:col-span-11">
                    <div>
                        <h4 class="font-semibold md:text-sm">{metadata?.name || ""}</h4>
                    </div>
                    <div>
                        <!-- Display Token Amount -->
                        <h4 class="font-semibold md:text-sm">{(token.amount / 10 ** token.decimals).toLocaleString()}</h4>
                        <!-- Display Token Value -->
                        <h4 class="text-xs opacity-50">
                            {#each $tokenPrices as price}
                                {#if price.id === token.mint}
                                    <h4>{formatMoney(price.totalPrice)}</h4>
                                {/if}
                            {/each}
                        </h4>
                    </div>
                </div>
            </a>
        </TokenProvider>
    {/each}
{#each Array(3) as _}
<div class="mb-3 grid animate-pulse grid-cols-12 items-center gap-3 rounded-lg">
        <div class="col-span-2 p-1 md:col-span-1">
            <div class="aspect-square w-full rounded-full bg-secondary"></div>
            </div>
            <div class="col-span-10 flex items-center justify-between md:col-span-11">
                <div>
                    <div class="mb-2 h-3 w-32 animate-pulse rounded-full bg-secondary"></div>
                        <div class="h-2 w-20 animate-pulse rounded-full bg-secondary"></div>
                    </div>
                        <div class="h-2 w-5 animate-pulse rounded-full bg-secondary"></div>
                </div>
            </div>
        {/each}
    {/if}
</div>
