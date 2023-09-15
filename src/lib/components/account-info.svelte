<script>
    import { onMount } from "svelte";

    import { trpcWithQuery } from "$lib/trpc/client";
    import { tweened } from "svelte/motion";

    import { page } from "$app/stores";
    import { SOL } from "$lib/xray";

    import formatMoney from "$lib/util/format-money";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    export let account = "";

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const accountInfo = client.accountInfo.createQuery([
        account,
        isMainnetValue,
    ]);
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
    <div class="content mt-2 flex items-center px-3 md:hidden">
        <h1 class="my-1 text-lg">
            <span class="">{$balance.toFixed(6)}</span>
            <span class="opacity-50">SOL</span>
        </h1>
        <span class="ml-3 text-xs opacity-50 md:block"
            >{formatMoney(worth)} USD</span
        >
    </div>

    <div class="nav sticky top-14 z-30 bg-base-100 px-3 md:pt-3">
        <div
            class="content flex flex-wrap items-center justify-between bg-base-100"
        >
            <div class="flex items-center">
                <h3 class="relative m-0 text-lg font-bold md:text-2xl">
                    {result}
                </h3>
                <div class="relative ml-3 flex items-center">
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
