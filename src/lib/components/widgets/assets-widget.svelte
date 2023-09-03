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
    <div class="my-3 flex justify-between items-center">
        <h2 class="text-2xl font-bold">Assets</h2>

        <a
            href="/account/{account}/assets"
            class="btn btn-secondary btn-sm text-xs"
        >
            VIEW ALL
        </a>
    </div>

    <div class="mb-3 grid grid-cols-4 gap-3">
        {#each list as asset}
            {@const image = asset.content.files.find(
                (file) => file.mime.startsWith("image") && file.uri
            )}

            <a href="/token/{asset.id}">
                <Image
                    src={image?.uri}
                    className="aspect-square w-full rounded-lg border"
                    alt=""
                />
            </a>
        {/each}
    </div>
</div>
