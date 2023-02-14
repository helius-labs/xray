<script>
    // import AccountsInfo from "./_components/accounts-info.svelte";
    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";

    import { state } from "svelte-snacks";

    import { page } from "$app/stores";
    import Namor from "src/lib/components/namor.svelte";

    const address = $page.params.search;

    const transactions = state([ "solanaTransactions", address ], address);
    const accountInfo = state([ "solanaAccountInfo", address ], address);

</script>

<section>
    <div class="flex justify-between items-center mb-5">
        <div>
            <h1 class="text-3xl font-bold">
                Wallet
            </h1>
            <Namor
                text={$page.params.search}
                let:result
                let:shortenedOriginal>
                <h3
                    class="text-sm tooltip tooltip-right"
                    data-tip={shortenedOriginal}>
                    <span class="opacity-50">
                        {result}
                    </span>
                </h3>
            </Namor>
        </div>
    
        {#if !$accountInfo?.hasFetched || !$transactions.hasFetched }
            <button class="btn btn-ghost pr-0 loading"></button>
        {:else}
            <h1>{$accountInfo?.balance}</h1>
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
            gap={8}
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</section>

<section>
    {#if !$transactions.hasFetched}
        {#each Array(3) as _}
            <div class="mb-3">
                <IconCard />
            </div>
        {/each}
    {:else}
        <Transactions
            gap={8}
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</section>
