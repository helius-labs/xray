<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import Transactions from "$lib/components/transactions.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }
</script>

<div class="pl-2 md:pl-0">
    <Transactions
        {account}
        user={account}
    />
</div>
