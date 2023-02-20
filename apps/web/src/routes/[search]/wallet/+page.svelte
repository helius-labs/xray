<script>
    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import DetailsPage from "$lib/components/details-page.svelte";

    const address = $page.params.search;

    const transactions = state(["solanaTransactions", address], address);
</script>

<DetailsPage pageDetails={{page: "wallet", tokenName: ""}}>
    {#if !$transactions.hasFetched}
        {#each Array(3) as _}
            <div class="mb-3">
                <IconCard />
            </div>
        {/each}
    {:else}
        <Transactions
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</DetailsPage>
