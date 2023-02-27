<script>
    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import { fly, fade } from "svelte/transition";

    import { SOL } from "@helius-labs/xray-proton";

    import { trpcWithQuery } from "$lib/trpc/client";

    import formatMoney from "$lib/util/format-money";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    const price = client.price.createQuery(SOL);

    const balance = tweened(0, {
        duration: 1000,
    });

    let animate = false;

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    $: worth = $balance * $price?.data;

    onMount(() => {
        animate = true;
    });
</script>

<Namor
    text={$page.params.search}
    let:result
>
    <div class="md:hidden">
        <h1 class="my-1 text-lg">
            <span class="">{$balance.toFixed(6)}</span>
            <span class="opacity-50">SOL</span>
        </h1>
    </div>
    <div class="sticky top-16 z-10 bg-base-100 py-1">
        <div class="flex flex-wrap  items-center justify-between bg-base-100">
            <div>
                <h3 class="m-0 text-xl font-bold md:text-3xl">
                    {result}
                </h3>
            </div>

            <div>
                <div class="my-2">
                    <CopyButton
                        text={$page.params.search}
                        success="Copied Address"
                        label="Address"
                        classList="px-3 btn-outline"
                    />

                    <CopyButton
                        text={$page.url.href}
                        success="Copied Link"
                        label="Share"
                        classList="px-3 btn-outline"
                        icon="share"
                    />
                </div>
            </div>
        </div>
    </div>

    <div>
        <div
            class="mb-5 flex flex-wrap justify-between pr-3 md:flex-row-reverse md:items-end"
        >
            <div class="text-right">
                <h1 class="my-1 hidden text-xl md:block">
                    <span class="">{$balance.toFixed(6)}</span>
                    <span class="opacity-50">SOL</span>
                </h1>
                {#if !$price?.isLoading}
                    <span class="ml-1 text-xs opacity-50"
                        >{formatMoney(worth)} USD</span
                    >
                {/if}
            </div>

            <div class="tabs w-full md:w-auto">
                <a
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith("wallet")}
                    href="/{$page.params.search}/wallet">Transactions</a
                >
                <a
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith(
                        "wallet/nfts"
                    )}
                    href="/{$page.params.search}/wallet/nfts">NFTs</a
                >
                <a
                    class="tab tab-bordered"
                    class:tab-active={$page.url.pathname.endsWith(
                        "wallet/tokens"
                    )}
                    href="/{$page.params.search}/wallet/tokens">Tokens</a
                >
            </div>
        </div>
    </div>
</Namor>

<slot />
