<script>
    import { onMount } from "svelte";

    import { trpcWithQuery } from "$lib/trpc/client";
    import { tweened } from "svelte/motion";

    import { page } from "$app/stores";
    import { SOL } from "@helius-labs/xray";

    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";

    export let account = "";

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);
    const price = client.price.createQuery(SOL);

    const balance = tweened(0, {
        duration: 1000,
    });

    let animate = false;

    onMount(() => {
        animate = true;
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    $: worth = $balance * $price?.data;
</script>

<Namor
    text={account}
    let:result
>
    <div class="content flex items-center px-3 md:hidden">
        <h1 class="my-1 text-lg">
            <span class="">{$balance.toFixed(6)}</span>
            <span class="opacity-50">SOL</span>
        </h1>
        <span class="ml-3 text-xs opacity-50 md:block"
            >{formatMoney(worth)} USD</span
        >
    </div>

    <div class="nav content sticky top-16 z-30 bg-base-100 px-3 pt-2">
        <div class="flex flex-wrap items-center justify-between bg-base-100">
            <div class="flex">
                <h3 class="relative m-0 text-lg font-bold md:text-2xl">
                    {result}
                </h3>
                <div class="relative ml-3 flex items-center">
                    <!-- <p class="mr-3 text-xs opacity-50">
                        {shortenString($page.params.search)}
                    </p> -->
                    <div class="my-2">
                        <CopyButton text={$page.params.search} />
                        <CopyButton
                            text={$page.url.href}
                            icon="link"
                        />
                    </div>
                </div>
            </div>
            <div class="relative text-right">
                <h1 class="text-md hidden md:block">
                    <span class="">{$balance.toFixed(6)}</span>
                    <span class="opacity-50">SOL</span>
                </h1>

                {#if !$price?.isLoading}
                    <span class="ml-1 hidden text-xs opacity-50 md:block"
                        >{formatMoney(worth)} USD</span
                    >
                {/if}
            </div>
        </div>
    </div>
</Namor>
