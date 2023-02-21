<script>
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }
</script>

<Namor
    text={$page.params.search}
    let:result
    let:shortenedOriginal
>
    <div class="sticky top-16 z-10 bg-base-100 py-1">
        <div
            class="flex flex-row-reverse items-center justify-between bg-base-100 md:flex-row"
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
                    text={$page.url.href}
                    success="Copied Link"
                    classList="px-3"
                    icon="share"
                />
            </div>
        </div>

        <div class="flex items-center justify-between py-3">
            <div class="tabs">
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
            <h1 class="text-lg">
                <span class="">{$balance.toFixed(6)}</span>
                <span class="opacity-50">SOL</span>
            </h1>
        </div>
    </div>
</Namor>

<slot />
