<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";

    // Check for mainnet
    const balances = client.balances.createQuery([account, isMainnetValue]);
</script>

<div class="content grid grid-cols-4 gap-3">
    {#if $balances.data}
        {#each $balances.data.tokens as token}
            {#if token.decimals === 0}
                <div class="aspect-square w-full">
                    <TokenProvider
                        address={token.mint}
                        let:metadata
                        let:tokenIsLoading
                    >
                        {#if !tokenIsLoading && metadata?.image}
                            <button
                                on:click={() =>
                                    (window.location.href = `/token/${token.mint}`)}
                                class=" block aspect-square h-full w-full overflow-hidden rounded-lg border bg-cover bg-center hover:border-primary"
                                style="basckground-image: url({metadata?.image})"
                            />
                        {:else}
                            <div
                                class="pulse aspect-square rounded-lg bg-secondary"
                            />
                        {/if}
                    </TokenProvider>
                </div>
            {/if}
        {/each}
    {:else}
        {#each Array(8) as _}
            <div class="grid aspect-square animate-pulse rounded-lg" />
        {/each}
    {/if}
</div>
