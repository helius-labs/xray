<script>
    import AccountsInfo from "./_components/accounts-info.svelte";
    import Transactions from "$lib/components/transactions.svelte";

    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    const address = $page.params.search;

    const transactions = state([ "solanaTransactions", address ], address);

</script>

<section>
    <AccountsInfo />
</section>

<section>
    {#if $transactions.isLoading}
        <button class="btn btn-ghost loading"></button>
    {:else}
        <Transactions
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</section>
