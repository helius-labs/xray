<script>
    import AssetsSummary from "$lib/components/next/assets-summary.svelte";
    import TokensSummary from "$lib/components/next/tokens-summary.svelte";
    import TransactionsSummary from "$lib/components/next/transactions-summary.svelte";
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
