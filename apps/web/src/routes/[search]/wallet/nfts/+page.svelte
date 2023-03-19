<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const assets = client.ownerAssets.createQuery(account);
</script>

<div class="grid grid-cols-4 gap-3">
    {#if $assets.data}
        {#each $assets.data.items as token}
            <div class="aspect-square w-full">
                <TokenProvider
                    address={token.id}
                    let:metadata
                    let:tokenIsLoading
                >
                    {#if !tokenIsLoading && metadata?.image}
                        <button
                            on:click={() =>
                                (window.location.href = `/${token.mint}/token`)}
                            class=" block aspect-square h-full w-full overflow-hidden rounded-lg border bg-cover bg-center hover:border-primary"
                            style="background-image: url({metadata?.image})"
                        />
                    {:else}
                        <div
                            class="pulse aspect-square rounded-lg bg-secondary"
                        />
                    {/if}
                </TokenProvider>
            </div>
        {/each}
    {:else}
        {#each Array(8) as _}
            <div class="grid aspect-square animate-pulse rounded-lg" />
        {/each}
    {/if}
</div>
