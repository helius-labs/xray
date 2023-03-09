<script lang="ts">
    import { page } from "$app/stores";

    import type { ProtonTransaction } from "@helius-labs/xray-proton/dist";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { fly } from "svelte/transition";

    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";

    export let account: string;
    export let user = "";
    export let filter = "";

    let cachedAddress = "";

    const client = trpcWithQuery($page);

    $: transactions = client.transactions.createQuery({
        account,
        filter,
        user,
    });

    // TODO: Janky casting because the query resykt comes back super nested and not the right type.
    // Issue: let transaction: SerializeObject<UndefinedToOptional<ProtonTransaction>>
    // Expexted: let transaction: ProtonTransaction
    $: transactionsList = $transactions.data
        ? ($transactions.data.result as ProtonTransaction[])
        : [];

    $: if (cachedAddress !== account) {
        cachedAddress = account;

        transactions = client.transactions.createQuery({
            account,
            user,
        });
    }
</script>

{#if $transactions.isLoading}
    {#each Array(3) as _}
        <div class="py-2">
            <IconCard />
        </div>
    {/each}
{:else if !transactionsList.length}
    <p class="opacity-50">No transactions</p>
{:else}
    {#each transactionsList as transaction, idx (transaction)}
        {#if transaction?.signature}
            <!-- Only animate the first few intro transactions -->
            {#if idx < 8}
                <div
                    class="mb-8"
                    in:fly={{
                        delay: idx * 100,
                        duration: 500,
                        y: 30,
                    }}
                >
                    <Transaction {transaction} />
                </div>
            {:else}
                <div class="mb-10">
                    <Transaction {transaction} />
                </div>
            {/if}
        {/if}
    {/each}
{/if}
