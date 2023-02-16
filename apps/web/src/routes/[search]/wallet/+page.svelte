<script>
    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";

    const address = $page.params.search;

    const transactions = state(["solanaTransactions", address], address);
    const accountInfo = state(["solanaAccountInfo", address], address);
</script>

<section>
    <div class="mb-5 flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold">Wallet</h1>
            <Namor
                text={$page.params.search}
                let:result
                let:shortenedOriginal
            >
                <h3
                    class="tooltip tooltip-right text-sm"
                    data-tip={shortenedOriginal}
                >
                    <span class="opacity-50">
                        {result}
                    </span>
                </h3>
            </Namor>
        </div>

        {#if !$accountInfo?.hasFetched || !$transactions.hasFetched}
            <button class="loading btn-ghost btn pr-0" />
        {/if}

        {#if !$accountInfo?.hasFetched}
            <h1>{$accountInfo?.data?.balance}</h1>
        {/if}
    </div>

    {#if !$transactions.hasFetched}
        {#each Array(3) as _}
            <div class="mb-3">
                <IconCard />
            </div>
        {/each}
    {:else}
        <Transactions
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</section>
