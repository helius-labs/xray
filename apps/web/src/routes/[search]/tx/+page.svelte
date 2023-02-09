<script lang="ts">
    import { page } from "$app/stores";

    import query from "$lib/state";

    import TxType from "$lib/components/transaction/type.svelte";
    import TxAction from "$lib/components/transaction/actions.svelte";
    import TxTokenPreview from "$lib/components/transaction/token-preview.svelte";
    import TxNFTDetails from "$lib/components/transaction/nft-preview.svelte";
    import TxSendReceive from "$lib/components/transaction/send-receive.svelte";
    import TxSwap from "$lib/components/transaction/swap.svelte";
    import TxFooter from "$lib/components/transaction/footer.svelte";

    const transaction = query("solana-transaction");
    const tokenRegistry = query("solana-token-registry");

    $: if($transaction?.load) {
        $transaction.load($page.params.search);
    }
</script>

{#if $transaction?.isLoading}
    <p>Loading...</p>
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    <div class="text-xs card mb-3">
        Parsed
        <pre>{JSON.stringify($transaction?.data?.parsed, null, 4)}</pre>
    </div>
    <div class="text-xs card mb-3">
        Raw
        <pre>{JSON.stringify($transaction?.data?.raw, null, 4)}</pre>
    </div>
    <TxType />
    {#if $transaction?.data?.type === "TRANSFER"}
        {#if $tokenRegistry?.data?.has($transaction?.data?.tokenTransferMintAddress)}
            <TxSendReceive />
            <TxTokenPreview />
        {:else if $tokenRegistry?.hasFetched}
            <TxNFTDetails />
            <TxAction />
        {/if}
    {:else if $transaction?.data?.type === "SWAP"}
        <TxSwap />
        <TxFooter />
    {/if}
    <TxFooter />
{/if}

