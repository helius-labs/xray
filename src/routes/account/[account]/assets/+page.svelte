<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";
    import Image from "$lib/components/image.svelte";
    import Icon from "$lib/components/icon.svelte";
    import shortenString from "$lib/util/shorten-string";

    const { account } = $page.params;

    const client = trpcWithQuery($page);

    const createAssetsQuery = (input: { account: string; cursor: number }) =>
        client.assets.createInfiniteQuery(input, {
            getNextPageParam: (lastPage) => lastPage.page + 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });

    $: assets = createAssetsQuery({
        account,
        cursor: 1,
    });

    $: lastPageHadAssets =
        $assets.data?.pages[$assets.data.pages.length - 1].total > 0;
</script>

<div>
    <div class="my-5 flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-bold">Assets</h2>
            <a
                href="/account/{account}"
                class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
            >
                {shortenString(account)}
            </a>
        </div>
        <a
            href="/account/{account}"
            class="btn btn-outline btn-md"
        >
            <Icon
                id="arrowLeft"
                size="md"
            />
            <span class="ml-2"> Account </span>
        </a>
    </div>
    <div class="grid grid-cols-3 gap-3 md:grid-cols-5">
        {#each $assets.data?.pages || [] as page}
            {#each page.items as asset}
                {@const image = asset.content.files.find(
                    (file) => file.mime.startsWith("image") && file.uri
                )}

                <a href="/token/{asset.id}">
                    <Image
                        src={image?.uri}
                        className="aspect-square w-full rounded-lg"
                        alt=""
                    />
                </a>
            {/each}
        {/each}
    </div>

    {#if $assets.hasNextPage && lastPageHadAssets}
        <div class="mt-5 flex justify-center">
            <button
                class="btn btn-outline"
                class:loading={$assets.isFetching}
                class:disabled={$assets.isFetching}
                on:click={() => $assets.fetchNextPage()}>Load More</button
            >
        </div>
    {/if}
</div>
