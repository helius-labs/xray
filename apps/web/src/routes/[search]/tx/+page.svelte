<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import type { TransactionType } from "@helius/types";

    import { page } from "$app/stores";

    import query from "$lib/state";

    import TxType from "$lib/components/transaction/type.svelte";
    import TxAction from "$lib/components/transaction/actions.svelte";
    import TxTokenPreview from "$lib/components/transaction/token-preview.svelte";
    import TxNFTDetails from "$lib/components/transaction/nft-preview.svelte";
    import TxFooter from "$lib/components/transaction/footer.svelte";
    import TxSendReceive from "$lib/components/transaction/send-receive.svelte";
    import TxSwap from "$lib/components/transaction/swap.svelte";

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
