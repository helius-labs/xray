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
  
    const tokenRegistry = query("solana-token-registry");

    const transaction = query("solana-transaction");

    $: if($transaction?.load && $page.params.search) {
            $transaction.load($page.params.search);
    }

</script>

{#if $transaction?.isLoading}
    <p>Loading...</p>
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    <!-- <div class="text-xs card mb-3">
        Parsed
        <pre>{JSON.stringify($transaction?.data?.parsed, null, 4)}</pre>
    </div>
    <div class="text-xs card mb-3">
        Raw
        <pre>{JSON.stringify($transaction?.data?.raw, null, 4)}</pre>
    </div> -->
    <div class="grid grid-col-1 mx-auto">

        <TxType />
        {#if $transaction?.data?.parsed.type === "TRANSFER"}
            {#if $tokenRegistry?.data?.has($transaction?.data?.parsed.actions[0].sent)}
                <TxSendReceive />
                <TxTokenPreview />
            {:else if $tokenRegistry?.hasFetched}
                <TxNFTDetails />
                <TxAction />
            {/if}
        {:else if $transaction?.data?.parsed.type === "SWAP"}
            <TxSwap />
            <TxFooter />
        {/if}
        <TxFooter />
    </div>
{/if}

