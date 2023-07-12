<script>
    import { loadTransactions, transactionsList } from "$lib/next/state/transactions";
    import { ChevronRight } from "lucide-svelte";
    import { onMount } from "svelte";

    import { page } from "$app/stores";
    import { stringify } from "postcss";

    onMount(async () => {
        await loadTransactions($page.params.account);
    });
</script>

<div class="border p-4 rounded-xl">
    <div class="flex justify-between">
        <h2 class="text-lg font-semibold">Activity</h2>

        <button class="btn btn-sm btn-outline">
            <ChevronRight size={16} />
        </button>
    </div>

    <div>
        {#each $transactionsList as transaction}
            {JSON.stringify(transaction)}
        {/each}
    </div>
</div>