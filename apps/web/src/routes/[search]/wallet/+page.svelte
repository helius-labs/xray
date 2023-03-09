<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import Transactions from "$lib/components/transactions.svelte";
    import { transactionActionsMetadata } from "src/lib/types";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const balances = client.balances.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    let filter = "";

    $: filterList = Object.entries(transactionActionsMetadata).filter(
        ([key, value]) => value.filterLabel
    );

    $: if ($balances?.data?.nativeBalance) {
        balance.set($balances.data.nativeBalance / LAMPORTS_PER_SOL);
    }
</script>

<!-- <div>
    <select
        class="select w-full max-w-xs"
        bind:value={filter}
        placeholder="Filter"
    >
        <option
            disabled
            selected
            value="">All</option
        >
        {#each filterList as [key, value]}
            <option value={key}>{value.filterLabel}</option>
        {/each}
    </select>
</div> -->
<div class="pl-2 md:pl-0">
    <Transactions
        {account}
        {filter}
        user={account}
    />
</div>
