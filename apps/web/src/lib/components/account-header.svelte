<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { SOL } from "@helius-labs/xray";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";

    import { fade } from "svelte/transition";

    import formatMoney from "$lib/util/format-money";

    import CopyButton from "$lib/components/copy-button.svelte";
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

<div class="nav sticky top-16 z-30">
    <div class="flex flex-wrap items-center justify-between">
        <div class="my-2 flex items-center">
            <h3
                class="relative m-0 text-lg font-bold md:text-2xl"
                in:fade={{ duration: 1000 }}
            >
                <ShortenAddress address={account} />
            </h3>
            <div class="relative flex items-center">
                <div class="mt-1 ml-2 flex">
                    <div in:fade={{ delay: 250, duration: 1000 }}>
                        <CopyButton text={account} />
                    </div>
                    <div in:fade={{ delay: 750, duration: 1000 }}>
                        <CopyButton
                            text={link}
                            icon="link"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="text-right">
            {#if $price?.isLoading}
                <div
                    class="mt-1 ml-1 animate-pulse rounded-xl bg-gray-300 bg-opacity-10 p-2 text-xs md:block"
                />
            {:else}
                <div
                    class="flex text-lg md:block"
                    in:fade={{ duration: 1000 }}
                >
                    <span class="">{$balance.toFixed(6)}</span>
                    <span class="opacity-50">SOL</span>
                </div>
            {/if}

            {#if $price?.isLoading}
                <div class="flex w-full justify-end">
                    <div
                        class="mt-1 ml-1 w-2/3 animate-pulse rounded-xl bg-gray-500 bg-opacity-10 p-1 text-xs md:block"
                    />
                </div>
            {:else}
                <span
                    class="mr-1 text-right text-xs opacity-50 md:block"
                    in:fade={{ duration: 1000 }}>{formatMoney(worth)} USD</span
                >
            {/if}
        </div>
    </div>
</div>
