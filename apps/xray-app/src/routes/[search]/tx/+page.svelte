<script lang="ts">
    import { page } from "$app/stores";

    import Transaction from "src/lib/components/transaction.svelte";

    import transactionQuery from "$lib/state/queries/solana-account-transaction";

    const transaction = transactionQuery($page.params.search);

</script>

<h1>Transaction</h1>
<Transaction transaction={$transaction || {}} />
