<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import Transactions from "$lib/components/transactions.svelte";
    import { filterStore } from "src/lib/util/stores/filter";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const balances = client.balances.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($balances?.data?.nativeBalance) {
        balance.set($balances.data.nativeBalance / LAMPORTS_PER_SOL);
    }
</script>

<div class="pl-2 md:pl-0">
    <Transactions
        {account}
        filter={$filterStore}
        user={account}
    />
</div>
