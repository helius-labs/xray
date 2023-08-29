<script lang="ts">
    import { page } from "$app/stores";
    import AssetsWidget from "$lib/components/widgets/assets-widget.svelte";

    import TransactionsWidget from "$lib/components/widgets/transactions-widget.svelte";
    import TokensWidget from "$lib/components/widgets/tokens-widget.svelte";    
    import AccountWidget from "$lib/components/widgets/account-widget.svelte";
    
    const { account } = $page.params;
</script>

<div class="grid md:grid-cols-12 relative gap-x-5 gap-y-5 my-5">
    <div class="md:col-span-12">
        <AccountWidget
            {account}
        />
    </div>
    <div class="md:col-span-6 border rounded-lg px-3">
        <AssetsWidget
            {account} />
    </div>
    <div class="md:col-span-6 border rounded-lg px-3">
        <TokensWidget
            {account} />
    </div>
    <div class="md:col-span-12 border rounded-lg px-3">
        <TransactionsWidget
            {account}
        />
    </div>
</div>
