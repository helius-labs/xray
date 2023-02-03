<script lang="ts">
    import { page } from "$app/stores";
    import Transaction from "src/lib/components/transaction.svelte";
    
    import transactionsQuery from "$lib/state/queries/solana-account-transactions";

    const transactions = transactionsQuery($page.params.search);

</script>

{#if $transactions?.data?.length === 0}
    <div class="center">
        <p class="text-center">
            No transactions found
        </p>
    </div>
{:else if $transactions?.isFetching}
    <div class="center">
        <button class="btn btn-ghost loading"></button>
    </div>
{:else if $transactions?.data?.length}
    {#each $transactions?.data as transaction }
        <div class="mb-8">
            <Transaction {transaction} />
            <a
                class="btn mt-2"
                href="/{transaction?.signature}/tx">
                View Tx
            </a>
        </div>
    {/each}
{/if}

