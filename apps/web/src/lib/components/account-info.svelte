<script lang="ts">
    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import shortenString from "$lib/util/shorten-string";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    import { tweened } from "svelte/motion";

    const client = trpcWithQuery($page);

    export let account: string;

    const info = client.accountInfo.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($info?.data?.balance) {
        balance.set($info.data.balance);
    }
</script>

<Namor
    text={$page.params.search}
    let:result
    let:shortenedOriginal
>
    <div
        class="sticky top-20 z-10 flex flex-row-reverse items-center justify-between bg-base-100 md:flex-row"
    >
        <div>
            <h3 class="m-0 text-3xl font-bold">{result}</h3>
        </div>
        <div>
            <CopyButton
                text={$page.params.search}
                success="Copied Address"
                classList="px-3"
            />

            <CopyButton
                text={$page.params.search}
                success="Copied Address"
                classList="px-3"
                icon="share"
            />
        </div>
    </div>

    <div class="mb-3">
        <div class="grid grid-cols-12 items-center">
            <div class="col-span-8">
                <!-- <div class="flex items-center">
                    <p class="m-0 mr-1 text-xs opacity-50">
                        {shortenString($page.params.search)}
                    </p>
                    <div>
                        <CopyButton
                            text={$page.params.search}
                            success="Copied Address"
                            classList="py-0"
                        />
                    </div>
                </div> -->
                <h1 class="text-lg">
                    {$balance.toFixed(6)}
                    <span class="opacity-50">SOL</span>
                </h1>
            </div>
            <div class="col-span-3 text-right">
                <!-- <h1 class="text-sm font-semibold text-success">$100</h1> -->
                <!-- <h1 class="text-lg">
                    {$balance.toFixed(6)}
                    <span class="opacity-50">SOL</span>
                </h1> -->
            </div>
        </div>
    </div>
</Namor>
