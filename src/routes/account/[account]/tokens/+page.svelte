<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import fallback from "./fallback_image.svg";
    import type { UIAccountToken, UISolAccountToken } from "$lib/types";
    import formatMoney from "$lib/util/format-money";
    import { SOL } from "$lib/xray";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    const account = $page.params.account;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";

    const toUIAccountToken = (tokenData: any): UIAccountToken => {
        const balance = tokenData.token_info.balance;
        const price = tokenData.token_info.price_info?.price_per_token ?? 0;
        const decimals = tokenData.token_info.decimals;
        return {
            balance,
            balanceInUSD: (price * balance) / 10 ** decimals,
            decimals,
            fullMetadata: tokenData,
            id: tokenData.id,
            price,
        };
    };

    const toUISolAccountToken = (
        lamports: number,
        price: number = 0
    ): UISolAccountToken => {
        const balance = lamports / LAMPORTS_PER_SOL;

        return {
            balance,
            balanceInUSD: price * balance,
            id: SOL,
            price,
        };
    };

    const isSol = (
        t: UIAccountToken | UISolAccountToken
    ): t is UISolAccountToken => t.id === SOL;

    const getTokensRequest = client.searchAssets.createQuery({
        account,
        isMainnet: isMainnetValue,
        nativeBalance: true,
        tokenType: "fungible",
    });

    const getSolPrice = client.price.createQuery(SOL);

    $: getTokensRequestItems = ($getTokensRequest?.data?.items ?? []) as [];
    $: lamports = $getTokensRequest?.data?.nativeBalance?.lamports ?? 0;
    $: solToken = toUISolAccountToken(lamports, $getSolPrice.data);
    $: partialTokens = getTokensRequestItems.map(toUIAccountToken);
    $: tokens = [solToken, ...partialTokens].toSorted(
        (a, b) => b.balanceInUSD - a.balanceInUSD
    );
</script>

<div>
    {#if $getTokensRequest}
        {#each tokens as token}
            {#if !isSol(token)}
                {#if token.decimals > 0}
                    <TokenProvider
                        token={token.fullMetadata}
                        status={{
                            isError: $getTokensRequest.isError,
                            isLoading: $getTokensRequest.isLoading,
                        }}
                        let:metadata
                    >
                        <a
                            class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary"
                            href="/token/{token.id}"
                        >
                            <div class="col-span-2 p-1 md:col-span-1">
                                <!-- background so that if it doesn't load you dont' get ugly no image icons -->
                                <div
                                    style="background-image: url('{metadata.image}'), url({fallback})"
                                    class="aspect-square w-full rounded-lg bg-cover bg-no-repeat"
                                />
                            </div>
                            <div
                                class="col-span-10 flex items-center justify-between text-right md:col-span-11"
                            >
                                <div>
                                    <h4 class="font-semibold md:text-sm">
                                        {metadata?.name ||
                                            "Unrecognised Token  "}
                                    </h4>
                                </div>
                                <div>
                                    <h4 class="font-semibold md:text-sm">
                                        {(
                                            token.balance /
                                            10 ** token.decimals
                                        ).toLocaleString()}
                                    </h4>
                                    <h4 class="text-xs opacity-50">
                                        {#if token.price}
                                            {formatMoney(token.balanceInUSD)}
                                        {/if}
                                    </h4>
                                </div>
                            </div>
                        </a>
                    </TokenProvider>
                {/if}
            {:else}
                <a
                    class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg border px-3 py-2 hover:border-primary"
                    href="/token/{token.id}"
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
                            <h4 class="font-semibold md:text-sm">
                                {token.balance.toLocaleString()}
                            </h4>

                            <h4 class="text-xs opacity-50">
                                {formatMoney(token.balanceInUSD)}
                            </h4>
                        </div>
                    </div>
                </a>
            {/if}
        {/each}
    {:else}
        {#each Array(3) as _}
            <div
                class="mb-3 grid animate-pulse grid-cols-12 items-center gap-3 rounded-lg"
            >
                <div class="col-span-2 p-1 md:col-span-1">
                    <div
                        class="aspect-square w-full rounded-full bg-secondary"
                    />
                </div>
                <div
                    class="col-span-10 flex items-center justify-between md:col-span-11"
                >
                    <div>
                        <div
                            class="mb-2 h-3 w-32 animate-pulse rounded-full bg-secondary"
                        />
                        <div
                            class="h-2 w-20 animate-pulse rounded-full bg-secondary"
                        />
                    </div>
                    <div
                        class="h-2 w-5 animate-pulse rounded-full bg-secondary"
                    />
                </div>
            </div>
        {/each}
    {/if}
</div>
