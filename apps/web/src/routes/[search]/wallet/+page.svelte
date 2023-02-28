<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Page from "$lib/layouts/page.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Transactions from "$lib/components/transactions.svelte";

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
>
    <div class="md:hidden">
        <h1 class="my-1 text-lg">
            <span class="">{$balance.toFixed(6)}</span>
            <span class="opacity-50">SOL</span>
        </h1>
    </div>

    <Page>
        <div slot="header-contents">
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

        <div slot="header-sub-contents">
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
            <h1 class="my-1 hidden text-lg md:block">
                <span class="">{$balance.toFixed(6)}</span>
                <span class="opacity-50">SOL</span>
            </h1>
        </div>

        <div slot="transactions">
            <Transactions
                {account}
                user={account}
                ref="@wallet:{$page.params.search}"
            />
        </div>
    </Page>
</Namor>
