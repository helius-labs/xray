<script lang="ts">
    import formatMoney from "../util/format-money";
    import shortenString from "../util/shorten-string";
    import CopyButton from "./copy-button.svelte";

    import { page } from "$app/stores";
    import { SOL } from "@helius-labs/xray-proton/dist";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { trpcWithQuery } from "../trpc/client";

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

<div class="nav sticky top-16 z-30 bg-base-100 px-3 pt-2">
    <div class="flex flex-wrap items-center justify-between bg-base-100">
        <div>
            <h3
                class="tooltip tooltip-bottom tooltip-secondary relative m-0 text-lg font-bold md:text-2xl"
                data-tip="A nickname generated for this account"
            >
                {shortenString(account)}
            </h3>
            <div class="relative flex items-center">
                <p class="mr-3 text-xs opacity-50">
                    {shortenString(account)}
                </p>
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
