<script lang="ts">
    import type { CreateQueryResult } from "@tanstack/svelte-query";

    import type {
        TRPCTransactionsInput,
        TRPCTransactionsOutput,
        CreateBaseQueryResult,
    } from "$lib/types";

    // import type { UITransaction, UITransactionActionGroup } from "src/lib/types";

    import { page } from "$app/stores";

    // import {
    //     groupTransactionActions,
    //     mergeTransactionActions,
    // } from "$lib/util/transactions";

    import prettyDate from "$lib/util/pretty-date";

    import Icon from "$lib/components/icon.svelte";

    import TransactionAction from "$lib/components/transaction-action.svelte";

    import { fade } from "svelte/transition";

    import type { ProtonTransaction } from "@helius-labs/xray-proton/dist";
    import type { EnrichedTransaction } from "helius-sdk";
    import IconCard from "$lib/components/icon-card.svelte";
    import Transaction from "$lib/components/transaction.svelte";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { Result } from "postcss";

    export let account: string;

    const client = trpcWithQuery($page);

    const transactions = client.transactions.createQuery({
        address: [account],
    });
    // TODO: Janky casting because the query resykt comes back super nested and not the right type.
    // Issue: let transaction: SerializeObject<UndefinedToOptional<ProtonTransaction>>
    // Expexted: let transaction: ProtonTransaction
    $: transactionsList = $transactions.data
        ? ($transactions.data.result as ProtonTransaction[])
        : [];

    $: console.log($transactions);
</script>

{#if $transactions.isLoading}
    {#each Array(3) as _}
        <div class="py-2">
            <IconCard />
        </div>
    {/each}
{:else if $transactions.data}
    {#each transactionsList as transaction}
        <div class="mb-10">
            <Transaction {transaction} />
        </div>
    {/each}
{/if}
