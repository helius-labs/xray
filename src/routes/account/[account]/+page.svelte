<script>
    import AssetsSummary from "$lib/next/components/assets-summary.svelte";
    import TokensSummary from "$lib/next/components/tokens-summary.svelte";
    import TransactionsSummary from "$lib/next/components/transactions-summary.svelte";
</script>

<div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 md:col-span-6">
        <AssetsSummary />
    </div>
    <div class="col-span-12 md:col-span-6">
        <TokensSummary />
    </div>
    <div class="col-span-12">
        <TransactionsSummary />
    </div>
</div>
