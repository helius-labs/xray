<script>
    import { get } from "svelte/store";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";
    import { page } from "$app/stores";
    import { SOL } from "@helius-labs/xray/dist";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";
    import formatMoney from "src/lib/util/format-money";

    import { assetsByOwner, assets, assetBalances } from "$lib/state/assets";

    $: ownedAssets = $assetsByOwner?.get($page.params.account);

    $: tokens =
        ownedAssets?.data.filter(
            (token) => $assets.get(token)?.data.type === "token"
        ) || [];

    $: sorted = tokens
        // @ts-ignore
        .sort((a, b) =>
            Number($assetBalances.get(b)) > Number($assetBalances.get(a))
                ? 1
                : -1
        );
</script>

<div class="">
    <!-- <a
        class="mb-4 grid grid-cols-12 items-center gap-3 rounded-lg px-3 py-2"
        href="/token/{SOL}"
    >
        <div class="col-span-2 p-1 md:col-span-1">
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
                {#if $tokens?.data?.nativeBalance}
                    <h4 class="font-semibold md:text-sm">
                        {(
                            $tokens?.data?.nativeBalance / LAMPORTS_PER_SOL
                        ).toLocaleString()}
                    </h4>
                {/if}

                <h4 class="text-xs opacity-50">
                    {#if $sol.data}
                        {formatMoney(
                            (Number($sol.data) * $tokens?.data?.nativeBalance) /
                                LAMPORTS_PER_SOL
                        )}
                    {/if}
                </h4>
            </div>
        </div>
    </a> -->

    {#if ownedAssets?.isLoading}
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
    {:else}
        {#each sorted as token (token)}
            <div>
                {$assetBalances.get(token)}
                {JSON.stringify(token)}
            </div>

            <!-- {#if token.decimals > 0 && token.mint !== SOL}
                <TokenProvider
                    address={token.mint}
                    let:metadata
                >
                    <a
                        class="relative mb-4 grid grid-cols-12 items-center gap-3 rounded-lg bg-black bg-opacity-60 px-3 py-2 hover:bg-opacity-80"
                        href="/token/{token.mint}"
                    >
                        <div class="col-span-2 p-1 md:col-span-1">
                            <div
                                style="background-image: url('https://cdn.helius.services/cdn-cgi/image/fit=scale-down,width=200,quality=100/{metadata.image}')"
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
                                        token.amount /
                                        10 ** token.decimals
                                    ).toLocaleString()}
                                </h4>
                                <h4 class="text-xs opacity-50">
                                    {#if metadata.price}
                                        {formatMoney(
                                            (metadata.price * token.amount) /
                                                10 ** token.decimals
                                        )}
                                    {/if}
                                </h4>
                            </div>
                        </div>
                    </a>
                </TokenProvider>
            {/if} -->
        {/each}
    {/if}
</div>
