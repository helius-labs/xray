<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import Transactions from "$lib/components/transactions.svelte";
    import { filterStore } from "src/lib/util/stores/filter";

    import { page } from "$app/stores";

    const { account } = $page.params;

    import solanaQuery from "$lib/solana";

    const client = trpcWithQuery($page);

    $: transactions = solanaQuery.transactions(client, {
        account,
        filter: $filterStore,
        user: account,
    });

    $: console.log("transactions", $transactions);
</script>

<div class="pl-2 md:pl-0">
    <Transactions
        {account}
        filter={$filterStore}
        user={account}
    />
</div>
