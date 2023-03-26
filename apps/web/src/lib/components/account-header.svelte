<style>
    .username-block:nth-child(3n + 2) {
        background-color: #dbeafe;
        color: #2563eb;
    }

    .username-block:nth-child(3n + 1) {
        background-color: #fef08a;
        color: #ca8a04;
    }

    .username-block:nth-child(3n + 3) {
        background-color: #bbf7d0;
        color: #16a34a;
    }
</style>

<script lang="ts">
    import formatMoney from "../util/format-money";
    import shortenString from "../util/shorten-string";
    import CopyButton from "./copy-button.svelte";

    import { page } from "$app/stores";
    import Icon from "$lib/components/icon.svelte";
    import { SOL } from "@helius-labs/xray-proton/dist";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { trpcWithQuery } from "../trpc/client";
    import Username from "./providers/username-provider.svelte";
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

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    onMount(() => {
        animate = true;
    });

    $: worth = $balance * $price?.data;
</script>

<Username
    address={account}
    let:usernames
>
    <div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
        <div class="flex flex-wrap items-center justify-between bg-base-100">
            <div>
                <div class="relative flex items-center">
                    <h3 class="m-0 text-lg font-bold md:text-2xl">
                        <ShortenAddress address={account} />
                    </h3>
                    <div class="my-2">
                        <CopyButton text={account} />
                        <CopyButton
                            text={link}
                            icon="link"
                        />
                    </div>
                </div>
                <div class="flex gap-2">
                    {#if usernames && usernames?.length > 0}
                        {#each usernames as username}
                            {#if username.type === "backpack"}
                                <div
                                    class="inline-block rounded-full bg-red-200 py-1 px-3 text-xs font-extrabold text-red-600"
                                >
                                    <div class="flex items-center gap-1">
                                        <Icon
                                            id="backpack"
                                            size="sm"
                                        />

                                        {username.username}
                                    </div>
                                </div>
                            {:else}
                                <div
                                    class="username-block inline-block rounded-full py-1 px-3 text-xs font-extrabold"
                                >
                                    {username.username}
                                </div>
                            {/if}
                        {/each}
                    {/if}
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
</Username>
