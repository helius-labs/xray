<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";
    import Image from "$lib/components/image.svelte";
    import Icon from "$lib/components/icon.svelte";

    export let account: string = "";

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

    $: list = ($assets.data?.pages[0].items || []).slice(0, 12);
</script>

<div>
    <div class="flex my-3 justify-between">
        <h2 class="text-xl font-bold">Assets</h2>

        <a href="/account/{account}/assets" class="btn btn-outline btn-sm">
            <Icon id="arrowRight" size="md" />
        </a>
    </div>

    <div class="grid grid-cols-4 gap-3 mb-3">
        {#each list as asset}
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
    </div>
</div>