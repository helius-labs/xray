<script>
    import {
        loadTransactions,
        transactionsList,
    } from "$lib/next/state/transactions";
    import { ChevronRight } from "lucide-svelte";
    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import Transactions from "$lib/next/components/transactions.svelte";

    onMount(async () => {
        await loadTransactions($page.params.account);
    });

    $: firstFifteen = $transactionsList.slice(0, 8);
</script>

<div class="rounded-xl border p-4">
    <div class="flex justify-between">
        <h2 class="text-lg font-semibold">Activity</h2>

        <button class="btn-outline btn-sm btn">
            <ChevronRight size={16} />
        </button>
    </div>

    <div>
        <Transactions ids={firstFifteen} />
    </div>
</div>
