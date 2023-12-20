<script>
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import { SOL } from "$lib/xray";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";
    import formatMoney from "$lib/util/format-money";
    import formatTokens from "$lib/util/format-tokens";

    const account = $page.params.account;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";

    const tokens = client.searchAssets.createQuery({
        account,
        isMainnet: isMainnetValue,
        nativeBalance: true,
        tokenType: "fungible",
    });

    const sol = client.price.createQuery(SOL);
</script>

<div>
    {#if $tokens.data}
        {#each formatTokens($tokens.data.items.concat( { id: SOL } ), $sol.data, $tokens.data?.nativeBalance.lamports) as token}
            {#if token.id !== SOL}
                <TokenProvider
                    {token}
                    status={{
                        isError: $tokens.isError,
                        isLoading: $tokens.isLoading,
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
                                style="background-image: url('{metadata.image}')"
                                class="aspect-square w-full rounded-lg bg-cover"
                            />
                        </div>
                        <div
                            class="col-span-10 flex items-center justify-between text-right md:col-span-11"
                        >
                            <div>
                                <h4 class="font-semibold md:text-sm">
                                    {metadata?.name || ""}
                                </h4>
                            </div>
                            <div>
                                <h4 class="font-semibold md:text-sm">
                                    {(
                                        token.token_info.balance /
                                        10 ** token.token_info.decimals
                                    ).toLocaleString()}
                                </h4>
                                <h4 class="text-xs opacity-50">
                                    {#if token.token_info.price_info}
                                        {formatMoney(
                                            (token.token_info?.price_info
                                                ?.price_per_token *
                                                token.token_info.balance) /
                                                10 ** token.token_info.decimals
                                        )}
                                    {/if}
                                </h4>
                            </div>
                        </div>
                    </a>
                </TokenProvider>
            {:else}
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
                            {#if $tokens.data?.nativeBalance.lamports}
                                <h4 class="font-semibold md:text-sm">
                                    {(
                                        $tokens.data?.nativeBalance.lamports /
                                        LAMPORTS_PER_SOL
                                    ).toLocaleString()}
                                </h4>
                            {/if}

                            <h4 class="text-xs opacity-50">
                                {#if $sol.data}
                                    {formatMoney(
                                        ($sol.data *
                                            $tokens.data?.nativeBalance
                                                .lamports) /
                                            LAMPORTS_PER_SOL
                                    )}
                                {/if}
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
