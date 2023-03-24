<script lang="ts">
    import formatMoney from "../util/format-money";
    import shortenString from "../util/shorten-string";
    import CopyButton from "./copy-button.svelte";

    import { page } from "$app/stores";
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
    const usernames = client.accountUsernames.createQuery(account);

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
    $: console.log($usernames?.data);
</script>

<!-- <Username
    address={account}
    let:usernames
>
    {console.log(usernames)} -->
<div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
    <div class="flex flex-wrap items-center justify-between bg-base-100">
        <div>
            <!-- <h3
                    class="tooltip tooltip-bottom tooltip-secondary relative m-0 text-lg font-bold md:text-2xl"
                    data-tip="A nickname generated for this account"
                >
                    {result.substring(0, result.indexOf(" "))}
                </h3> -->
            <div class="relative flex items-center">
                <h3 class="m-0 text-lg font-bold md:text-2xl">
                    <ShortenAddress address={account} />
                </h3>
                <!-- <p class="mr-3 text-xs opacity-50">
                        {shortenString(account)}
                    </p> -->
                {#if usernames}
                    {#each usernames as username}
                        <p class="mr-3 text-xs opacity-50">
                            {username}
                        </p>
                    {/each}
                {/if}
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
<!-- </Username> -->
