<script lang="ts">
    //@ts-nocheck
    import { trpcWithQuery } from "$lib/trpc/client";
    import { page } from "$app/stores";
    import Image from "$lib/components/image.svelte";

    const { account } = $page.params;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const createAssetsQuery = (input: {
        account: string;
        cursor: number;
        isMainnet: boolean;
    }) =>
        client.assets.createInfiniteQuery(input, {
            getNextPageParam: (lastPage) => lastPage.page + 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });

    $: assets = createAssetsQuery({
        account,
        cursor: 1,
        isMainnet: isMainnetValue,
    });

    $: lastPageHadAssets =
        $assets.data?.pages[$assets.data.pages.length - 1].total > 0;

    $: isOnePage = $assets.data?.pages.length == 1;
</script>

<div class="grid grid-cols-3 gap-3 md:grid-cols-5">
    {#each $assets.data?.pages || [] as page}
        {#each page.items as asset}
            {@const image = asset.content.files.find(
                (file) => file.mime.startsWith("image") && file.uri
            )}

            {#if asset.burnt !== true}
                <a
                    href="/token/{asset.id}?network={isMainnetValue
                        ? 'mainnet'
                        : 'devnet'}"
                >
                    <Image
                        src={image?.uri}
                        className="aspect-square w-full rounded-lg"
                        alt=""
                    />
                </a>
            {/if}
        {/each}
    {/each}
</div>

{#if $assets.hasNextPage && lastPageHadAssets && !isOnePage}
    <div class="flex justify-center">
        <button
            class="btn-outline btn"
            class:loading={$assets.isFetching}
            class:disabled={$assets.isFetching}
            on:click={() => $assets.fetchNextPage()}>Load More</button
        >
    </div>
{/if}
