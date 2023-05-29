<script lang="ts">
    // import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    // import solanaQuery from "$lib/solana";

    // const client = trpcWithQuery($page);

    // const { account } = $page.params;

    // const assets = solanaQuery.assets(client, {
    //     account,
    // });

    // $: console.log({ account });

    // import TokenProvider from "$lib/components/providers/token-provider.svelte";

    const { account } = $page.params;

    // const client = trpcWithQuery($page);

    // const balances = client.balances.createQuery(account);

    // const assets = client.assetsByOwner.createQuery({
    //     limit: 50,
    //     owner: account,
    //     page: 0,
    //     sortBy: {
    //         sortBy: "created",
    //         sortDirection: "asc",
    //     },
    // });

    // $: console.log("assets", $assets);

    import { onMount } from "svelte";

    import { getAssetByOwner } from "$lib/state/assets";

    onMount(async () => {
        const assets = await getAssetByOwner(account);
    });
</script>

<!-- <div class="content grid grid-cols-4 gap-3">
    {#if $assets?.data}
        {#each $assets.data as asset}
            {asset?.content?.metadata?.name}
        {/each}
    {:else}
        {#each Array(8) as _}
            <div class="grid aspect-square animate-pulse rounded-lg" />
        {/each}
    {/if}
</div> -->
