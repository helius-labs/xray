<script lang="ts">
    import { page } from "$app/stores";
    import AssetsWidget from "$lib/components/widgets/assets-widget.svelte";

    import TransactionsWidget from "$lib/components/widgets/transactions-widget.svelte";
    import TokensWidget from "$lib/components/widgets/tokens-widget.svelte";
    import AccountWidget from "$lib/components/widgets/account-widget.svelte";
    import ProfileWidget from "$lib/components/widgets/profile-widget.svelte";
    import MerkleTreeWidget from "$lib/components/widgets/merkle-tree-widget.svelte";
    import { PROGRAM_ID as ACCOUNT_COMPRESSION_ID } from "@solana/spl-account-compression";
    import { trpcWithQuery } from "$lib/trpc/client";

    const { account } = $page.params;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    $: isLoading = $accountInfo?.isLoading;

    $: isMerkleTree = $accountInfo?.data?.value?.owner === ACCOUNT_COMPRESSION_ID.toBase58()

    $: domains = client.domainsFromPublicKey.createQuery(account, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
});

    $: hasProfile = !$domains.isLoading && $domains.isFetched && $domains?.data?.length > 0;
</script>

<div class="relative my-5 grid gap-x-5 gap-y-5 md:grid-cols-12">
    <div class="md:col-span-12 bg-black">
        <AccountWidget {account} />
    </div>

    {#if isLoading}
        <div class="rounded-lg bg-black px-3 md:col-span-12 border">
            <div class="flex justify-between items-center py-3">
                <div class="animate-pulse bg-secondary rounded-2xl px-10 py-3"></div>
                <div class="flex">
                    <div class="animate-pulse bg-secondary rounded-2xl px-10 py-2 mr-2"></div>
                    <div class="animate-pulse bg-secondary rounded-2xl px-10 py-2"></div>
                </div>
            </div>
        </div>
    {:else if isMerkleTree}
        <div class="rounded-lg bg-black px-3 md:col-span-12 border">
            <MerkleTreeWidget {account} />
        </div>
    {:else}
        {#if hasProfile}
            <div class="rounded-lg bg-black md:col-span-12">
                <ProfileWidget {account} />
            </div>
        {/if}
        <div class="rounded-lg bg-black px-3 md:col-span-6 border">
            <AssetsWidget {account} />
        </div>
    {/if}

    {#if !isLoading}
        <div class="rounded-lg bg-black px-3 border {isMerkleTree || isLoading ? "md:col-span-12" : "md:col-span-6"}">
            <TokensWidget {account} />
        </div>
    {/if}

    <div class="rounded-lg px-3 bg-black md:col-span-12 border">
        <TransactionsWidget {account} />
    </div>
</div>
