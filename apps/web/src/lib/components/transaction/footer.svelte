<script>
    import { page } from "$app/stores";
    import query from "$lib/state";

    const transaction = query("solana-transaction");

    const { signature } = $transaction.data.raw;

    $: if($transaction?.load) {
        $transaction.load($page.params.search);
    }

</script>
<div>
    <a
        class="btn"
        href={`https://explorer.solana.com/tx/${signature}`}
    >View on Solana Explorer</a>
</div>
