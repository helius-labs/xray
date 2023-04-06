<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { SOL } from "@helius-labs/xray";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";

    import formatMoney from "$lib/util/format-money";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import ShortenAddress from "./shorten-address.svelte";

    const client = trpcWithQuery($page);

    export let account: string = "";
    export let link: string = "";

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

<div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
    <div class="flex flex-wrap items-center justify-between bg-base-100">
        <div class="flex items-center">
            <h3 class="relative m-0 text-lg font-bold md:text-2xl">
                <ShortenAddress address={account} />
            </h3>
            <div class="relative flex items-center">
                <div class="my-2">
                    <CopyButton text={account} />
                    <CopyButton
                        text={link}
                        icon="link"
                    />
                </div>
            </div>
        </div>
        <div class="relative text-right">
            <h1 class="text-md md:block">
                <span class="">{$balance.toFixed(6)}</span>
                <span class="opacity-50">SOL</span>
            </h1>

            {#if !$price?.isLoading}
                <span class="ml-1 text-xs opacity-50 md:block"
                    >{formatMoney(worth)} USD</span
                >
            {/if}
        </div>
    </div>
</div>
