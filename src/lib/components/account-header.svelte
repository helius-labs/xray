<style>
    .username-block {
        opacity: 90%;
    }

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
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { SOL } from "$lib/xray";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";

    import formatMoney from "$lib/util/format-money";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Icon from "$lib/components/icon.svelte";
    import Username from "$lib/components/providers/username-provider.svelte";
    import ShortenAddress from "./shorten-address.svelte";

    const client = trpcWithQuery($page);

    export let account: string = "";
    export let link: string = "";

    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    let isMainnetValue = network !== "devnet";
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
    function toggleNetwork() {
        isMainnetValue = !isMainnetValue;
        localStorage.setItem("isMainnet", JSON.stringify(isMainnetValue));

        const params = new URLSearchParams(window.location.search);

        params.set("network", isMainnetValue ? "mainnet" : "devnet");

        history.replaceState({}, "", "?" + params.toString());
        history.go(0);
    }

    $: worth = $balance * $price?.data;
</script>

<Username
    address={account}
    let:usernames
    let:usernameIsLoading
>
    <div class="nav sticky top-16 z-30 gap-2 bg-base-100 px-3 pt-2">
        <div class="flex flex-col bg-base-100">
            <div class="flex items-center justify-between">
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
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="badge-outline badge relative mx-2 flex cursor-default px-4 py-2 opacity-90"
                        on:click={toggleNetwork}
                    >
                        {isMainnetValue ? "mainnet" : "devnet"}
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
            {#if usernameIsLoading}
                <div class="flex flex-wrap gap-2 pt-2">
                    {#each [1, 2, 3] as _}
                        <div
                            class="username-block inline-block h-6 w-[72px] animate-pulse rounded-full px-3 py-1 text-xs font-extrabold"
                        />
                    {/each}
                </div>
            {:else if usernames && usernames?.length > 0}
                <div class="flex flex-wrap gap-2 pt-2">
                    {#each usernames as username}
                        <div
                            class="username-block inline-block rounded-full px-3 py-1 text-xs font-extrabold"
                        >
                            {username.username}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</Username>
