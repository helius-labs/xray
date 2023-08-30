<script lang="ts">
    import { page } from "$app/stores";
    import AssetsWidget from "$lib/components/widgets/assets-widget.svelte";

    import TransactionsWidget from "$lib/components/widgets/transactions-widget.svelte";
    import TokensWidget from "$lib/components/widgets/tokens-widget.svelte";
    import AccountWidget from "$lib/components/widgets/account-widget.svelte";

    const { account } = $page.params;
</script>

<div class="relative my-5 grid gap-x-5 gap-y-5 md:grid-cols-12">
    <div class="md:col-span-12">
        <AccountWidget {account} />
    </div>
    <div class="rounded-lg border px-3 md:col-span-6">
        <AssetsWidget {account} />
    </div>
    <div class="rounded-lg border px-3 md:col-span-6">
        <TokensWidget {account} />
    </div>
    <div class="rounded-lg border px-3 md:col-span-12">
        <TransactionsWidget {account} />
    </div>
</div>
